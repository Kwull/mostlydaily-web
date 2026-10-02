# mostlydaily.com

The website of [Mostly Daily](https://mostlydaily.com), a forgiving habit tracker for iPhone. Served by GitHub Pages
from the root of `main` with the custom domain in `CNAME`.

Plain HTML, one stylesheet (`assets/site.css`, the app's Graphite palette, light and dark, system fonts only) and one
small script (`assets/site.js`). No build step, no web fonts, no frameworks, no third-party code, no analytics and no
cookies: the privacy policy promises no tracking, so keep it that way. Every page shares the same header and footer
markup; change them everywhere at once.

| Page | Purpose |
|---|---|
| `index.html` | Home: hero, "Try it" simulator, how it works, widgets (tabs), features, screenshot tour, privacy, pricing, guides, FAQ (also in the JSON-LD FAQPage block, word for word) |
| `support.html` | App Store **Support URL** |
| `privacy.html` | App Store **Privacy Policy URL** (effective 1 October 2026) |
| `terms.html` | Terms of Use (Apple standard EULA + subscription terms), linked from the app's Premium sheet |
| `guides/` | Short articles on building habits (our own words; no quotes or book titles) |
| `llms.txt` | Plain-text summary for AI assistants |
| `404.html`, `CNAME`, `.nojekyll`, `robots.txt`, `sitemap.xml` | Hosting plumbing; add new pages to `sitemap.xml` |
| `tools/images.py` | Makes the WebP and small copies of the pictures (see below) |

**Never rename or remove** `support.html`, `privacy.html` or `terms.html`: the app (`AppLinks.swift`) and App Store
Connect link to them.

## Script policy

`assets/site.js` is progressive enhancement only: **every page must read and work with JavaScript off.** It is
loaded with `defer`, makes no network requests, stores nothing and respects `prefers-reduced-motion` (no tilt, reveal
or slide animations then). What it adds:

| Part | Without the script | With the script |
|---|---|---|
| "Try it" simulator (`#try`, `[data-sim]`) | A static example: three weeks with two misses and a rest day, with its level, run and plain streak | Tap a day to switch done / missed / rest, or pick a pattern; level, run and streak update live (`aria-live` note) |
| Widgets (`#widgets`, `[data-tabs]`) | Home Screen, Lock Screen, StandBy and more, Every widget, one after another | A segmented control (ARIA tabs, arrow keys); `/#w-lock` etc. open a tab directly. The tap-to-check-in demo is CSS only (a checkbox) and works either way |
| Tour (`#tour`, `[data-tour]`) | A swipeable row on phones, a 4-column grid on wide screens | At 900 px and wider: a list of screens next to one phone; only the chosen screenshot loads |
| Header | All links on wide screens; a `<details>` menu below 960 px | The section in view is highlighted; the menu closes after a tap, on Escape or a tap outside |
| Hero phones, sections | Static | A gentle tilt under a mouse pointer, a little depth on scroll, sections fade in once |

The simulator uses the app's real rules (`MostlyCore`): the level score is an exponentially weighted average of the
last 60 opportunities with a half-life of 10 (Starting 0–24, Sometimes 25–49, Often 50–74, Mostly 75–100, Starting
until 7 opportunities); rest days are not opportunities; the "never missed twice" run ends only after two misses in a
row and counts days, rest included. If the engine changes, update `evaluate()` in `site.js`; `node -e
"const s=require('./assets/site.js'); console.log(s.evaluate(Array(21).fill('done')))"` runs it outside a browser.

## Pictures

Screenshots in `assets/img/` come from the app's simulator with demo data (`-demoData`, iPhone 18 Pro, 9:41 status
bar); the social preview `og-image.jpg` is drawn by `tools/web/og_image.swift` in the app repository. Update the
screenshots when the app's screens change noticeably.

Widget pictures in `assets/img/widgets/` (`<name>-light.png` / `-dark.png`, 2×) are rendered from the app's real widget
views: in the app repo, launch the Personal build with `-demoData -skipOnboarding -today 2026-11-12 -screen
widgetsExport`, copy `Documents/widget-export/` out of the simulator's app container
(`xcrun simctl get_app_container <udid> com.kwull.mostlydaily.dev data`) and downscale the 3× PNGs to 2×.

After adding or replacing any picture, run **`python3 tools/images.py`** (needs Pillow with WebP:
`pip3 install pillow`). It writes, next to each source:

- screenshots `<name>.jpg` → `<name>.webp` (full width, for 2× and 3× screens) and `<name>-<half width>.webp` (e.g. `today-253.webp`,
  for 1× screens); the `.jpg` stays as the fallback (JPEG quality 80, progressive);
- widgets `<name>.png` → `<name>.webp`; the `.png` stays as the fallback;
- the app icon → `app-icon-64.png` (header, footer) and `app-icon-192.png` (closing section).

Markup rules: every picture is a `<picture>` with a `type="image/webp"` source first and the JPEG/PNG in `<img>`;
light/dark pairs add `media="(prefers-color-scheme: dark)"` sources before the light ones. Screenshots use
`srcset` + `sizes`. Every `<img>` has `width` and `height`; the hero's first phone has `fetchpriority="high"`;
everything below the first screen has `loading="lazy" decoding="async"`.

Page weight (uncompressed, 2× screen, measured 2 October 2026): first screen about 155 KB (was about 320 KB), the
whole home page with every tab and screen opened about 620 KB (was about 1.85 MB).

## When the app is live

Replace the "Coming soon" buttons with Apple's official "Download on the App Store" badge and link, add `<meta
name="apple-itunes-app" content="app-id=…">`, and add the App Store URL to the JSON-LD and `llms.txt`.

Contact: contact@mostlydaily.com

## Widget demo (Home Screen and Lock Screen tabs)
`assets/site.js` (`setupWidgetDemos`) keeps one shared day (Floss, Read, Alcohol-free, Move, Meditate) and shows each
widget's picture for it, with buttons placed exactly over the real rings. Pictures and ring positions come from the
app: `-screen widgetsExport` writes every tap state plus `rings.json`; `assets/widget-demo.json` is the subset the demo
reaches (positions as fractions of the widget, `next` picture, what the tap does). States only the script can reach
ship as WebP only. Without JavaScript the first pictures show, static. Behaviour matches the app (tested end to end on
the Home and Lock Screen): a ring checks in, a done ring undoes, Next up moves to the next habit, the Limit tile logs a
clear day in the evening.
