#!/usr/bin/env python3
"""Translated copies of the home and support pages (de, es, pl, uk, ru).

The English pages stay the source. `extract` splits them into segments (the text of each block element, with its
inline markup, plus alt/aria-label/title attributes, the head's meta texts and the JSON-LD texts) and writes
i18n/en.json. Translations live in i18n/<lang>.json as {id: {"src", "text", "status"}}; an id is a hash of the
English text, so a changed English sentence becomes a new id and shows up as missing. `build` writes
/<lang>/index.html and /<lang>/support.html, the hreflang links on every page and the language links in the footer.
`check` lists what is missing, stale or broken (markup that differs from the English, dashes, curly quotes).

  python3 tools/i18n.py extract
  python3 tools/i18n.py todo <lang>          # segments still to translate, as JSON
  python3 tools/i18n.py check [lang...]
  python3 tools/i18n.py build [lang...]
"""
import hashlib, html, json, re, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PAGES = ["index.html", "support.html"] + sorted(p.relative_to(ROOT).as_posix() for p in (ROOT / "guides").glob("*.html"))
LANGS = ["de", "es", "pl", "uk", "ru"]
NAMES = {"en": "English", "de": "Deutsch", "es": "Español", "pl": "Polski", "uk": "Українська", "ru": "Русский"}
OG_LOCALE = {"en": "en_US", "de": "de_DE", "es": "es_ES", "pl": "pl_PL", "uk": "uk_UA", "ru": "ru_RU"}
I18N = ROOT / "i18n"
STORE_NAME = {"de": "Mostly Daily: Sanfte Routinen", "es": "Mostly Daily: Hábitos amables", "pl": "Mostly Daily: Łagodne nawyki",
              "uk": "Mostly Daily: Лагідні звички", "ru": "Mostly Daily: Мягкие привычки"}  # App Store names per locale
# The app's level names (the app's string catalog; never translated here).
LEVELS = {
    "en": ["Starting", "Sometimes", "Often", "Mostly"],
    "de": ["Anfang", "Manchmal", "Oft", "Meistens"],
    "es": ["Empezando", "A veces", "A menudo", "Casi siempre"],
    "pl": ["Na starcie", "Czasami", "Często", "Przeważnie"],
    "uk": ["Початок", "Іноді", "Часто", "Здебільшого"],
    "ru": ["Начало", "Иногда", "Часто", "В основном"],
}
INLINE = {"a", "b", "i", "em", "strong", "span", "br", "small", "code", "abbr", "sup", "sub", "time", "kbd", "mark",
          "s", "u", "q", "img", "picture", "source", "wbr"}
VOID = {"area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr"}
RAW = {"script", "style", "svg"}
ATTRS = ["alt", "aria-label", "title", "placeholder"]
KEEP = {"Mostly Daily", "iPhone Duo", "contact@mostlydaily.com", "Graphite", "Midnight", "Ocean", "Plum",
        "Glacier"}
LD_KEYS = {"description", "featureList", "keywords", "text", "name", "alternateName"}
LD_KEEP_NAMES = {"Mostly Daily: Habit Calendar", "Mostly Daily", "Uladzimir Kazakevich"}
# Strings used by assets/site.js (the "Try it" week). Plural keys hold one form per CLDR category.
SIM = {
    "sim.all_done": "Every day done. Mostly is the top level; there's nothing above it.",
    "sim.rest_only": "A rest day isn't a miss: your level and your run carry on as if nothing happened.",
    "sim.two_in_row": "Two misses in a row end the run, gently. A new one starts the next day, and your level is {level}.",
    "sim.two_in_row_still": "Two misses in a row end the run, gently. A new one starts the next day, and your level is still {level}.",
    "sim.pair_ever": "Two misses in a row ended a run and a new one started the next day. Your level is {level}.",
    "sim.one_miss": "One miss, nothing reset. Your level dips a few points and your run keeps going.",
    "sim.misses": {"one": "{n} miss, never two in a row: your run keeps going and your level is {level}.",
                   "other": "{n} misses, never two in a row: your run keeps going and your level is {level}."},
    "sim.rest_tail": "Rest days don't count as misses.",
    "sim.days": {"one": "{n} day", "other": "{n} days"},
    "sim.state_done": "done", "sim.state_miss": "missed", "sim.state_rest": "rest day",
    "sim.aria": "{day}, {state}. Tap to change.",
    "sim.aria_today": "{day} (today), {state}. Tap to change.",
}
PLURALS = {"en": ["one", "other"], "de": ["one", "other"], "es": ["one", "other"],
           "pl": ["one", "few", "many", "other"], "uk": ["one", "few", "many", "other"],
           "ru": ["one", "few", "many", "other"]}

TOKEN = re.compile(r"<!--.*?-->|<![^>]*>|<(/?)([a-zA-Z][a-zA-Z0-9-]*)((?:\"[^\"]*\"|'[^']*'|[^'\">])*)>|[^<]+", re.S)


def sid(text):
    return hashlib.sha1(text.encode()).hexdigest()[:10]


def seg_id(page, src, a, text):
    """A guide's H1 gets its own id: the same English words elsewhere (a home page label) may need other words."""
    if page.startswith("guides/") and re.search(r"<h1[^>]*>$", src[max(0, a - 40):a]):
        return sid(page + "|" + text)
    return sid(text)


class Node:
    def __init__(self, tag, start, attrs="", parent=None):
        self.tag, self.start, self.attrs, self.parent = tag, start, attrs, parent
        self.kids, self.inner0, self.inner1, self.end = [], None, None, None


def parse(src):
    """A small tree with source offsets: kids are Nodes or (start, end) text runs."""
    root = Node("#root", 0)
    root.inner0 = 0
    cur, pos = root, 0
    raw_until = None
    for m in TOKEN.finditer(src):
        s, e = m.span()
        if raw_until:
            if m.group(2) and m.group(1) and m.group(2).lower() == raw_until:
                cur.inner1, cur.end = s, e
                cur, raw_until = cur.parent, None
            continue
        if m.group(0).startswith("<!"):
            continue
        if m.group(2) is None:
            cur.kids.append((s, e))
            continue
        tag, closing = m.group(2).lower(), m.group(1) == "/"
        if closing:
            n = cur
            while n is not root and n.tag != tag:
                n = n.parent
            if n is root:
                continue
            while cur is not n:  # implicit closes
                cur.inner1 = cur.end = s
                cur = cur.parent
            n.inner1, n.end = s, e
            cur = n.parent
        else:
            n = Node(tag, s, m.group(3), cur)
            n.inner0 = e
            cur.kids.append(n)
            if tag in VOID or m.group(3).rstrip().endswith("/"):
                n.inner1 = n.end = e
            elif tag in RAW:
                cur, raw_until = n, tag
            else:
                cur = n
    return root


def has_text(src, n):
    if isinstance(n, tuple):
        return bool(re.search(r"\w", html.unescape(src[n[0]:n[1]])))
    if n.tag in RAW or n.tag in ("head",):
        return False
    return any(has_text(src, k) for k in n.kids)


def has_block(n):
    if isinstance(n, tuple):
        return False
    return any(isinstance(k, Node) and (k.tag not in INLINE or has_block(k)) for k in n.kids)


def segments_of(src, n, out):
    """Text segments as (start, end) spans of the source."""
    if isinstance(n, tuple) or n.tag in RAW or n.tag == "head" or "translate=\"no\"" in n.attrs:
        return
    if n.tag != "#root" and n.tag not in INLINE and has_text(src, n) and not has_block(n):
        out.append((n.inner0, n.inner1))
        return
    run = []

    def flush():
        if run and any(has_text(src, k) for k in run):
            a = run[0][0] if isinstance(run[0], tuple) else run[0].start
            b = run[-1][1] if isinstance(run[-1], tuple) else run[-1].end
            out.append((a, b))
        run.clear()

    for k in n.kids:
        if isinstance(k, tuple) or (k.tag in INLINE and not has_block(k)):
            run.append(k)
        else:
            flush()
            segments_of(src, k, out)
    flush()


def trim(src, a, b):
    seg = src[a:b]
    lead = len(seg) - len(seg.lstrip())
    tail = len(seg) - len(seg.rstrip())
    return a + lead, b - tail


def visible(text):
    return re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", "", text))).strip()


def keep(text):
    v = visible(text)
    return not re.search(r"[A-Za-z]", v) or v in KEEP


def attr_spans(src):
    """(start, end) spans of translatable attribute values in body and the head's meta texts."""
    spans = []
    body0 = src.find("<body")
    for t in re.finditer(r"<[a-zA-Z][^>]*>", src[body0:]):
        if 'translate="no"' in t.group(0):
            continue
        for m in re.finditer(r'\s(%s)="([^"]*)"' % "|".join(ATTRS), t.group(0)):
            if re.search(r"[A-Za-z]", m.group(2)) and m.group(2) not in KEEP:
                spans.append((body0 + t.start() + m.start(2), body0 + t.start() + m.end(2)))
    for m in re.finditer(r'<meta (?:name|property)="(description|og:title|og:description|og:image:alt|twitter:image:alt)" content="([^"]*)"', src):
        spans.append(m.span(2))
    m = re.search(r"<title>(.*?)</title>", src, re.S)
    spans.append(m.span(1))
    return spans


def ld_blocks(src):
    return [m for m in re.finditer(r'(<script type="application/ld\+json">)(.*?)(</script>)', src, re.S)]


def ld_strings(obj, path=""):
    """(path, string) pairs of the JSON-LD values to translate."""
    if isinstance(obj, dict):
        for k, v in obj.items():
            if k in LD_KEYS:
                if isinstance(v, str) and v not in LD_KEEP_NAMES and not v.startswith("http"):
                    yield v
                elif isinstance(v, list):
                    for x in v:
                        if isinstance(x, str):
                            yield x
                        else:
                            yield from ld_strings(x)
                elif isinstance(v, (dict, list)):
                    yield from ld_strings(v)
            elif isinstance(v, (dict, list)):
                yield from ld_strings(v)
    elif isinstance(obj, list):
        for x in obj:
            yield from ld_strings(x)


def page_segments(page):
    src = (ROOT / page).read_text()
    tree = parse(src)
    spans = []
    segments_of(src, tree, spans)
    spans = [trim(src, a, b) for a, b in spans]
    spans = [(a, b) for a, b in spans if b > a and not keep(src[a:b])]
    spans += attr_spans(src)
    return src, sorted(set(spans))


def context(src, a):
    if a < src.find("<body"):
        return "head (title, meta description or share text)"
    head = src[:a]
    sec = re.findall(r'<section id="([^"]+)"', head)
    hd = re.findall(r"<h[1-3][^>]*>(.*?)</h[1-3]>", head, re.S)
    if re.search(r'\s(?:%s)="$' % "|".join(ATTRS), head):
        kind = "attribute " + re.search(r'\s(%s)="$' % "|".join(ATTRS), head).group(1)
    else:
        t = re.findall(r"<([a-z0-9]+)((?:\"[^\"]*\"|[^\">])*)>", head[-400:])
        cls = re.search(r'class="([^"]*)"', t[-1][1]) if t else None
        kind = f"<{t[-1][0] if t else ''}{'.' + cls.group(1).replace(' ', '.') if cls else ''}>"
    return f"{'#' + sec[-1] if sec else ''} after heading '{visible(hd[-1])[:60] if hd else ''}' {kind}".strip()


def extract():
    for page in PAGES:  # the English pages carry the hreflang and language links before they are split
        p = ROOT / page
        p.write_text(head_and_footer(p.read_text(), page, "en"))
    en, order = {}, []
    for page in PAGES:
        src, spans = page_segments(page)
        for a, b in spans:
            t = src[a:b]
            i = seg_id(page, src, a, t)
            if i not in en:
                en[i] = {"src": t, "page": page, "where": context(src, a)}
                order.append(i)
        for m in ld_blocks(src):
            obj = json.loads(m.group(2))
            if obj.get("@type") == "Article":  # the headline is the page's H1
                en[sid(page + "|" + obj["headline"])] = {"src": obj["headline"], "page": page, "where": "H1 of the guide (also its JSON-LD headline)"}
            for s in ld_strings(obj):
                i = sid(s)
                if i not in en:
                    en[i] = {"src": s, "page": page, "where": "JSON-LD (search engines; plain text, no HTML)"}
    for k, v in SIM.items():
        en[k] = {"src": v, "page": "assets/site.js", "where": "Try it week (hero), {placeholders} stay; plural keys need one form per category: " + str(PLURALS)}
    I18N.mkdir(exist_ok=True)
    (I18N / "en.json").write_text(json.dumps(en, ensure_ascii=False, indent=1) + "\n")
    print(f"{len(en)} segments, {sum(len(visible(v['src'] if isinstance(v['src'], str) else json.dumps(v['src'])).split()) for v in en.values())} words")


def load(lang):
    p = I18N / f"{lang}.json"
    return json.loads(p.read_text()) if p.exists() else {}


def tags(s):
    return sorted(re.sub(r'\s+(%s)="[^"]*"' % "|".join(ATTRS), "", t) for t in re.findall(r"<[^>]+>", s))


def problems(lang, en, tr):
    out = []
    for i, e in en.items():
        t = tr.get(i)
        if not t or not t.get("text"):
            out.append((i, "missing"))
            continue
        if t.get("src") != e["src"]:
            out.append((i, "stale: English changed"))
        if t.get("status") != "reviewed":
            out.append((i, f"status {t.get('status')}"))
        txt, src = t["text"], e["src"]
        if isinstance(src, dict):
            if not isinstance(txt, dict) or set(PLURALS[lang]) - set(txt):
                out.append((i, f"plural forms {PLURALS[lang]} needed"))
                continue
            vals, srcvals = list(txt.values()), list(src.values())
        else:
            vals, srcvals = [txt], [src]
        for v in vals:
            if not isinstance(v, str):
                out.append((i, "not text")); continue
            if re.search("[–—]", v):
                out.append((i, "en or em dash"))
            if re.search("[“”‘’„«»]", v):
                out.append((i, "curly or angle quotes (straight quotes only)"))
            if tags(v) != tags(srcvals[0]):
                out.append((i, "markup differs from the English"))
            for ph in re.findall(r"\{\w+\}", srcvals[-1]):
                if ph not in v:
                    out.append((i, f"placeholder {ph} missing"))
    for i in tr:
        if i not in en:
            out.append((i, "unused (English removed)"))
    return out


def check(langs):
    en = json.loads((I18N / "en.json").read_text())
    bad = 0
    for lang in langs:
        ps = problems(lang, en, load(lang))
        kinds = {}
        for i, p in ps:
            kinds.setdefault(p, []).append(i)
        print(f"{lang}: {len(en)} segments, {len(ps)} problems" + "".join(f"\n  {p}: {len(v)} ({', '.join(v[:5])})" for p, v in kinds.items()))
        bad += len(ps)
    return bad


def todo(lang):
    en, tr = json.loads((I18N / "en.json").read_text()), load(lang)
    print(json.dumps({i: e for i, e in en.items() if not tr.get(i, {}).get("text") or tr[i].get("src") != e["src"]}, ensure_ascii=False, indent=1))


def localize_links(s, lang):
    s = re.sub(r'href="/(#[^"]*)?"', lambda m: f'href="/{lang}/{m.group(1) or ""}"', s)
    s = re.sub(r'href="/support\.html(#[^"]*)?"', lambda m: f'href="/{lang}/support.html{m.group(1) or ""}"', s)
    s = re.sub(r'href="/guides/([^"]*)"', lambda m: f'href="/{lang}/guides/{m.group(1)}"', s)
    return s


def path(page):
    return page[: -len("index.html")] if page.endswith("index.html") else page


def url(lang, page):
    return f"https://mostlydaily.com/{'' if lang == 'en' else lang + '/'}{path(page)}"


def alternates(page):
    lines = [f'<link rel="alternate" hreflang="{l}" href="{url(l, page)}">' for l in ["en"] + LANGS]
    lines.append(f'<link rel="alternate" hreflang="x-default" href="{url("en", page)}">')
    return "\n".join(lines)


def switcher(page, lang):
    href = lambda l: "/" + ("" if l == "en" else l + "/") + path(page)
    links = "".join(f'<a href="{href(l)}" hreflang="{l}" lang="{l}"' + (' aria-current="true"' if l == lang else "") + f">{NAMES[l]}</a>" for l in ["en"] + LANGS)
    return f'<nav class="langs" aria-label="Language" translate="no">{links}</nav>'


def head_and_footer(src, page, lang):
    src = re.sub(r'\n<link rel="alternate" hreflang="[^"]*" href="[^"]*">', "", src)
    src = re.sub(r'\n<meta property="og:locale(?::alternate)?" content="[^"]*">', "", src)
    src = src.replace('<meta name="color-scheme"', alternates(page) + "\n" + "\n".join(
        [f'<meta property="og:locale" content="{OG_LOCALE[lang]}">'] +
        [f'<meta property="og:locale:alternate" content="{OG_LOCALE[l]}">' for l in ["en"] + LANGS if l != lang]) + '\n<meta name="color-scheme"', 1)
    src = re.sub(r'\n  <nav class="langs"[^\n]*</nav>', "", src)
    src = re.sub(r'(<footer class="site-footer">.*?)(\n</div></footer>)', lambda m: m.group(1) + "\n  " + switcher(page, lang) + m.group(2), src, count=1, flags=re.S)
    return src


def sim_json(lang, tr):
    d = {k: (tr[k]["text"] if lang != "en" else SIM[k]) for k in SIM}
    d["levels"] = LEVELS[lang]
    d["plurals"] = PLURALS[lang]
    return '<script type="application/json" id="i18n">' + json.dumps(d, ensure_ascii=False).replace("</", "<\\/") + "</script>"


def build(langs):
    en = json.loads((I18N / "en.json").read_text())
    for page in PAGES:  # the English pages get the hreflang links and the language links too
        p = ROOT / page
        p.write_text(head_and_footer(p.read_text(), page, "en"))
    for lang in langs:
        tr = load(lang)
        bad = [x for x in problems(lang, en, tr) if x[1] not in ("unused (English removed)",) and not x[1].startswith("status")]
        if bad:
            sys.exit(f"{lang}: {len(bad)} problems, run check")
        T = {i: tr[i]["text"] for i in en}
        for page in PAGES:
            src, spans = page_segments(page)
            out, last = [], 0
            for a, b in spans:
                out += [src[last:a], T[seg_id(page, src, a, src[a:b])]]
                last = b
            out.append(src[last:])
            s = "".join(out)

            def ld(m):
                obj = json.loads(m.group(2))

                def walk(o):
                    if isinstance(o, dict):
                        for k, v in o.items():
                            if k in LD_KEYS and isinstance(v, str) and sid(v) in T:
                                o[k] = T[sid(v)]
                            elif k in LD_KEYS and isinstance(v, list):
                                o[k] = [T.get(sid(x), x) if isinstance(x, str) else walk(x) for x in v]
                            elif isinstance(v, (dict, list)):
                                walk(v)
                    elif isinstance(o, list):
                        for x in o:
                            walk(x)
                    return o
                obj = walk(obj)
                if obj.get("@type") == "SoftwareApplication":
                    obj["inLanguage"] = lang
                    obj["alternateName"] = [STORE_NAME[lang], "Mostly Daily"]
                    obj["url"] = url(lang, page)
                if obj.get("@type") == "Article":
                    obj["headline"] = T[sid(page + "|" + obj["headline"])]
                    obj["inLanguage"] = lang
                    obj["url"] = url(lang, page)
                    if isinstance(obj.get("about"), dict):
                        obj["about"]["url"] = url(lang, "index.html")
                return m.group(1) + json.dumps(obj, ensure_ascii=False) + m.group(3)

            s = re.sub(r'(<script type="application/ld\+json">)(.*?)(</script>)', ld, s, flags=re.S)
            s = s.replace('<html lang="en">', f'<html lang="{lang}">', 1)
            s = re.sub(r'(<link rel="canonical" href=")[^"]*', lambda m: m.group(1) + url(lang, page), s)
            s = re.sub(r'(<meta property="og:url" content=")[^"]*', lambda m: m.group(1) + url(lang, page), s)
            s = localize_links(s, lang)
            s = head_and_footer(s, page, lang)
            if 'data-sim' in s:
                s = s.replace("</head>", sim_json(lang, tr) + "\n</head>", 1)
            out_path = ROOT / lang / page
            out_path.parent.mkdir(parents=True, exist_ok=True)
            out_path.write_text(s)
        print(f"{lang}: built {len(PAGES)} pages")
    sitemap(langs)


def sitemap(langs):
    p = ROOT / "sitemap.xml"
    s = re.sub(r"\n  <url><loc>https://mostlydaily.com/(?:%s)/[^\n]*" % "|".join(LANGS), "", p.read_text())
    import datetime
    today = datetime.date.today().isoformat()
    extra = "".join(f"\n  <url><loc>{url(l, pg)}</loc><lastmod>{today}</lastmod></url>" for l in langs for pg in PAGES)
    p.write_text(s.replace("\n</urlset>", extra + "\n</urlset>"))


if __name__ == "__main__":
    cmd, rest = (sys.argv[1] if len(sys.argv) > 1 else ""), sys.argv[2:]
    if cmd == "extract":
        extract()
    elif cmd == "todo":
        todo(rest[0])
    elif cmd == "check":
        sys.exit(1 if check(rest or LANGS) else 0)
    elif cmd == "build":
        build(rest or LANGS)
    else:
        print(__doc__)
