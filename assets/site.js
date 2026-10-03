/* mostlydaily.com: small progressive enhancements. Every page works without this file (the demos are static then).
   No frameworks, no third-party code, no storage, no network requests. Respects prefers-reduced-motion. */
(function () {
  "use strict";

  /* ---------- The "miss a day" rules: the app's real engine, simplified to one daily habit ----------
     Level score (MostlyCore ConsistencyEngine, daily): 100 × Σ wᵢ·creditᵢ / Σ wᵢ over the last 60 opportunities,
     wᵢ = 0.5^(i/10), i = 0 the most recent. Rest days are not opportunities. Starting 0–24, Sometimes 25–49,
     Often 50–74, Mostly 75–100; Starting until 7 opportunities exist (always met here: the week follows 60 done days).
     Run (RunCalculator): "never missed twice" ends only after two missed opportunities in a row and starts again
     the next day; it counts days, rest days included. */
  var LEVELS = ["Starting", "Sometimes", "Often", "Mostly"];
  var PREFIX = 60;                       // two good months before the week shown

  function evaluate(days) {
    var ops = [], runStart = 0, inARow = 0, pairEver = false, misses = 0, rests = 0, p, d;
    for (p = 0; p < PREFIX; p++) ops.push(1);
    for (d = 0; d < days.length; d++) {
      if (days[d] === "rest") { rests++; continue; }
      var credit = days[d] === "done" ? 1 : 0;
      ops.push(credit);
      if (credit === 0) { misses++; inARow++; if (inARow >= 2) { runStart = d + 1; pairEver = true; } } else inARow = 0;
    }
    var weighted = 0, total = 0, w = 1, f = Math.pow(0.5, 1 / 10);
    for (var i = ops.length - 1, seen = 0; i >= 0 && seen < 60; i--, seen++) { weighted += w * ops[i]; total += w; w *= f; }
    var score = Math.round(100 * weighted / total);
    var streak = 0;
    for (var s = days.length - 1; s >= 0 && days[s] === "done"; s--) streak++;
    if (streak === days.length) streak += PREFIX;
    return {
      score: score,
      level: score < 25 ? 0 : score < 50 ? 1 : score < 75 ? 2 : 3,
      run: runStart === 0 ? PREFIX + days.length : days.length - runStart,
      streak: streak, misses: misses, rests: rests, trailing: inARow, pairEver: pairEver
    };
  }

  function message(r) {
    var level = LEVELS[r.level], t;
    if (r.misses === 0 && r.rests === 0) t = "Every day done. Mostly is the top level; there's nothing above it.";
    else if (r.misses === 0) t = "A rest day isn't a miss: your level and your run carry on as if nothing happened.";
    else if (r.trailing >= 2) t = "Two misses in a row end the run, gently. A new one starts with your next check-in, and your level is " + (r.level >= 2 ? "still " : "") + level + ".";
    else if (r.pairEver) t = "Two misses in a row ended a run and a new one started the next day. Your level is " + level + ".";
    else if (r.misses === 1) t = "One miss, nothing reset. Your level dips a few points and your run keeps going.";
    else t = r.misses + " misses, never two in a row: your run keeps going and your level is " + level + ".";
    if (r.misses > 0 && r.rests > 0) t += " Rest days don't count as misses.";
    return t;
  }

  if (typeof document === "undefined") {
    // Node: export the rules for tests (node tools/sim.test.js).
    module.exports = { evaluate: evaluate, message: message, LEVELS: LEVELS };
    return;
  }

  var root = document.documentElement;
  root.classList.add("has-js");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* ---------- Miss a day: one week track, four presets ---------- */
  function setupSimulator(sim) {
    var DAYNAMES = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    var LABELS = ["M", "T", "W", "T", "F", "S", "S"];
    var STATES = ["done", "miss", "rest"];
    var NAME = { done: "done", miss: "missed", rest: "rest day" };
    var CODE = { d: "done", m: "miss", r: "rest" };
    var PRESETS = { perfect: "ddddddd", one: "dddmddd", two: "ddmmddd", rest: "dddrddd" };
    var ICON = {
      done: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 12.5l3.6 3.6 7.4-8" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      miss: "",
      rest: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16.6 14.9A6 6 0 0 1 9.1 7.4a6 6 0 1 0 7.5 7.5z" fill="currentColor"/></svg>'
    };
    var days = PRESETS.one.split("").map(function (c) { return CODE[c]; });
    var week = sim.querySelector("[data-week]");
    var out = {
      score: sim.querySelector("[data-score]"), ring: sim.querySelector("[data-ring]"), level: sim.querySelector("[data-level]"),
      bars: sim.querySelector("[data-bars]").children, run: sim.querySelector("[data-run]"),
      streak: sim.querySelector("[data-streak]"), note: sim.querySelector("[data-note]")
    };
    var presets = sim.querySelectorAll("[data-preset]");
    var ladder = sim.querySelectorAll("[data-ladder] li");
    function draw(changed) {
      var r = evaluate(days);
      week.innerHTML = days.map(function (st, i) {
        return '<button type="button" class="wk ' + st + (i === 6 ? " today" : "") + (i === changed ? " changed" : "") + '" data-i="' + i +
          '" aria-label="' + DAYNAMES[i] + (i === 6 ? " (today)" : "") + ", " + NAME[st] + '. Tap to change."><span class="d">' + ICON[st] + '</span><span class="lbl" aria-hidden="true">' + LABELS[i] + "</span></button>";
      }).join("");
      if (changed >= 0) { var b = week.querySelector('[data-i="' + changed + '"]'); if (b) b.focus({ preventScroll: true }); }
      out.score.textContent = r.score;
      out.ring.style.setProperty("--p", r.score);
      out.level.textContent = LEVELS[r.level];
      for (var i = 0; i < 4; i++) out.bars[i].className = i <= r.level ? "on" : "";
      Array.prototype.forEach.call(ladder, function (li, i) { if (i === r.level) li.setAttribute("aria-current", "true"); else li.removeAttribute("aria-current"); });
      out.run.textContent = r.run + " days";
      out.streak.textContent = r.streak + (r.streak === 1 ? " day" : " days");
      out.note.textContent = message(r);
      var now = days.map(function (s) { return s[0]; }).join("");
      Array.prototype.forEach.call(presets, function (b) { b.setAttribute("aria-pressed", String(PRESETS[b.getAttribute("data-preset")] === now)); });
    }
    week.addEventListener("click", function (e) {
      var b = e.target.closest("button"); if (!b) return;
      var i = +b.getAttribute("data-i");
      days[i] = STATES[(STATES.indexOf(days[i]) + 1) % 3];
      draw(i);
    });
    Array.prototype.forEach.call(presets, function (b) {
      b.addEventListener("click", function () {
        days = PRESETS[b.getAttribute("data-preset")].split("").map(function (c) { return CODE[c]; });
        draw(-1);
      });
    });
    draw(-1);
  }

  /* ---------- Home Screen demo: one shared day for every widget on the page, as in the app ----------
     A ring checks in (a second tap undoes it); Next up walks the open habits (Floss, Read, Alcohol-free, Move) and shows the mosaic when
     all are done; the Limit control logs a clear day (no checkmark); every check-in lands a tile in the mosaic. */
  function setupWidgets() {
    var CLS = { floss: "a", read: "b", alcohol: "c", move: "d", meditate: "e" };
    var COLORS = { floss: "var(--pink)", read: "var(--blue)", alcohol: "var(--purple)", move: "var(--green)", meditate: "var(--orange)" };
    var NAMES = { floss: "Floss", read: "Read 10 pages", alcohol: "Alcohol-free days", move: "Move 20 minutes" };
    var ORDER = ["floss", "read", "alcohol", "move"];
    var START = { floss: false, read: false, alcohol: false, move: false, meditate: true };
    var LEVEL = { floss: ["Sometimes", 2, 42], read: ["Mostly", 4, 85], alcohol: ["Mostly", 4, 78], move: ["Often", 3, 64] };
    var day = Object.assign({}, START);
    var tiles = [];
    var BASE = [], keys = Object.keys(CLS);
    for (var n = 0; n < 60; n++) BASE.push(keys[(n * 7 + (n >> 2)) % 5]);
    var mosaics = document.querySelectorAll("[data-mosaic]");

    // Static spans become real buttons now that the script is running.
    Array.prototype.forEach.call(document.querySelectorAll("span.ring[data-tap], span.ring[data-next-ring], span.lock-tap[data-tap]"), function (el) {
      var b = document.createElement("button");
      b.type = "button";
      Array.prototype.forEach.call(el.attributes, function (a) { b.setAttribute(a.name, a.value); });
      b.removeAttribute("role");
      b.innerHTML = el.innerHTML;
      el.parentNode.replaceChild(b, el);
    });

    function drawMosaics(landed) {
      var all = BASE.concat(tiles);
      mosaics.forEach(function (m) {
        var html = "";
        for (var i = 0; i < 100; i++) {
          var k = all[i];
          html += k ? '<i class="t ' + CLS[k] + (landed && i === all.length - 1 ? " land glow" : "") + '"></i>' : "<i></i>";
        }
        m.innerHTML = html;
        if (m.getAttribute("data-mosaic") === "big") m.setAttribute("aria-label", "Your mosaic: " + Math.min(all.length, 100) + " tiles");
      });
    }

    function render(landedKey) {
      document.querySelectorAll("[data-widget]").forEach(function (w) {
        var kind = w.getAttribute("data-widget");
        if (kind === "habit" || kind === "floss" || kind === "move") {
          var key = kind === "habit" ? "read" : kind, done = day[key];
          w.classList.toggle("is-done", done);
          var b = w.querySelector("[data-tap]");
          if (b) b.setAttribute("aria-label", (done ? "Undo " : "Check in ") + NAMES[key]);
        }
        if (kind === "limit") {
          w.classList.toggle("is-clear", day.alcohol);
          var lb = w.querySelector("[data-tap]");
          if (lb) lb.setAttribute("aria-label", day.alcohol ? "Undo today's clear day" : "Log a clear day for Alcohol-free days");
        }
        if (kind === "next") {
          var open = ORDER.filter(function (k) { return !day[k]; });
          var doneCount = Object.keys(day).filter(function (k) { return day[k]; }).length;
          var all = open.length === 0;
          w.querySelector("[data-count]").textContent = doneCount + "/5";
          w.classList.toggle("is-alldone", all);
          w.querySelector("[data-next-name]").hidden = all;
          w.querySelector(".foot").hidden = all;
          w.querySelector(".alldone").hidden = !all;
          w.querySelector("[data-mosaic]").hidden = !all;
          if (!all) {
            var k = open[0], r = w.querySelector("[data-next-ring]");
            w.style.setProperty("--c", COLORS[k]);
            w.querySelector("[data-next-name]").textContent = NAMES[k];
            w.querySelector("[data-next-word]").textContent = LEVEL[k][0];
            var bars = w.querySelector("[data-next-bars]").children;
            for (var i = 0; i < 4; i++) bars[i].className = i < LEVEL[k][1] ? "on" : "";
            r.style.setProperty("--p", LEVEL[k][2]);
            r.className = "ring" + (k === "alcohol" ? " square" : "");
            r.setAttribute("aria-label", (k === "alcohol" ? "Log a clear day for " : "Check in ") + NAMES[k]);
            r.setAttribute("data-tap", k);
          }
        }
      });
      document.querySelectorAll("[data-lock-open]").forEach(function (l) {
        var k = l.getAttribute("data-tap"), base = l.getAttribute(day[k] ? "data-lock-done" : "data-lock-open");
        var img = l.querySelector("img"), src = l.querySelector("source");
        if (src) src.setAttribute("srcset", base + ".webp");
        if (img) img.setAttribute("src", base + ".png");
        l.setAttribute("aria-label", (day[k] ? "Undo " : "Check in ") + NAMES[k]);
      });
      var changed = JSON.stringify(day) !== JSON.stringify(START);
      document.querySelectorAll("[data-reset]").forEach(function (b) { b.hidden = !changed; });
      var hint = document.querySelector("[data-hero-hint]"); if (hint && tiles.length) hint.hidden = true;
      drawMosaics(!!landedKey);
    }
    document.addEventListener("click", function (e) {
      var b = e.target.closest("button[data-tap]"); if (!b) return;
      var k = b.getAttribute("data-tap");
      day[k] = !day[k];
      if (day[k]) tiles.push(k); else { var i = tiles.lastIndexOf(k); if (i >= 0) tiles.splice(i, 1); }
      document.querySelectorAll(".is-hinting").forEach(function (x) { x.classList.remove("is-hinting"); });
      render(day[k] ? k : null);
      // Next up replaces its button when the habit changes; keep focus on a control.
      var again = document.querySelector('[data-widget="next"] button[data-tap]');
      if (again && b.hasAttribute("data-next-ring") && document.activeElement !== again) again.focus({ preventScroll: true });
    });
    document.querySelectorAll("[data-reset]").forEach(function (b) {
      b.addEventListener("click", function () { day = Object.assign({}, START); tiles = []; render(null); });
    });
    render(null);
  }

  /* ---------- Tabs: one component (widgets, Build/Limit, pricing) ----------
     Markup: <div data-tabs [data-tabs-start="1"] [data-tabs-max="959"]> <div class="tablist" data-tablist hidden><button aria-controls="id">..</button>..</div>
     <div class="tabpanel" id="id"><h3 class="panel-title">..</h3>..</div>.. </div>
     Without the script the tablist stays hidden and every panel is stacked with its own heading. With it: ARIA tabs,
     roving tabindex, Arrow/Home/End, a #hash that names a panel selects it. data-tabs-max: tabs only while the viewport
     is at most that many px wide; wider, the panels sit side by side as in the HTML. */
  function setupTabs(box) {
    var list = box.querySelector("[data-tablist]");
    if (!list) return;
    var tabs = Array.prototype.slice.call(list.querySelectorAll("button"));
    var panels = tabs.map(function (t) { return document.getElementById(t.getAttribute("aria-controls")); });
    var max = box.getAttribute("data-tabs-max");
    var mq = max ? window.matchMedia("(max-width: " + max + "px)") : null;
    var enabled = false, current = +(box.getAttribute("data-tabs-start") || 0);
    tabs.forEach(function (tab, i) {
      tab.id = tab.id || "tab-" + panels[i].id;
      tab.addEventListener("click", function () { if (enabled) select(i, false); });
      tab.addEventListener("keydown", function (e) {
        if (!enabled) return;
        var next = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 }[e.key];
        if (next === undefined) return;
        e.preventDefault();
        select((next + tabs.length) % tabs.length, true);
      });
    });
    function select(index, focus) {
      current = index;
      tabs.forEach(function (t, i) {
        var on = i === index;
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
        panels[i].hidden = !on;
      });
      list.style.setProperty("--tab", index);
      if (focus) tabs[index].focus();
    }
    function enable() {
      enabled = true;
      list.setAttribute("role", "tablist");
      list.hidden = false;
      box.classList.add("is-tabbed");
      tabs.forEach(function (t, i) {
        t.setAttribute("role", "tab");
        panels[i].setAttribute("role", "tabpanel");
        panels[i].setAttribute("aria-labelledby", t.id);
        panels[i].tabIndex = 0;
      });
      select(current, false);
    }
    function disable() {
      enabled = false;
      list.removeAttribute("role");
      list.hidden = true;
      box.classList.remove("is-tabbed");
      tabs.forEach(function (t, i) {
        ["role", "aria-selected"].forEach(function (a) { t.removeAttribute(a); });
        t.removeAttribute("tabindex");
        ["role", "aria-labelledby", "tabindex"].forEach(function (a) { panels[i].removeAttribute(a); });
        panels[i].hidden = false;
      });
    }
    function fromHash() {
      var i = panels.findIndex(function (p) { return "#" + p.id === location.hash; });
      return i < 0 ? null : i;
    }
    function apply() { if (!mq || mq.matches) enable(); else disable(); }
    var h = fromHash();
    if (h !== null && (!mq || mq.matches)) current = h;
    apply();
    if (h !== null && enabled) panels[h].scrollIntoView();
    if (mq) { if (mq.addEventListener) mq.addEventListener("change", apply); else mq.addListener(apply); }
    window.addEventListener("hashchange", function () {
      var i = fromHash();
      if (i !== null && enabled) { select(i, false); panels[i].scrollIntoView(); }
    });
  }

  /* ---------- Scroll reveal, with a fallback so nothing stays hidden ---------- */
  function setupReveal() {
    if (reduceMotion.matches || !("IntersectionObserver" in window)) return;
    var items = document.querySelectorAll("[data-reveal]");
    if (!items.length) return;
    root.classList.add("reveal-on");
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add("is-in");
        io.unobserve(e.target);
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    Array.prototype.forEach.call(items, function (el) {
      Array.prototype.forEach.call(el.children, function (child, i) { child.style.setProperty("--i", i); });
      io.observe(el);
    });
    // Print, reader modes and very tall windows may never fire the observer: show everything 1.5 s after load.
    function showAll() { Array.prototype.forEach.call(items, function (el) { el.classList.add("is-in"); }); }
    if (document.readyState === "complete") setTimeout(showAll, 1500);
    else window.addEventListener("load", function () { setTimeout(showAll, 1500); });
    window.addEventListener("beforeprint", showAll);
  }

  /* ---------- Header: highlight the section in view, close the menu after a tap ---------- */
  function setupNav() {
    var links = document.querySelectorAll('.site-header a[href^="/#"]');
    var map = {};
    Array.prototype.forEach.call(links, function (a) {
      var id = a.getAttribute("href").slice(2);
      (map[id] = map[id] || []).push(a);
    });
    var menu = document.querySelector(".site-header .menu");
    if (menu) {
      menu.addEventListener("click", function (e) { if (e.target.closest("a")) menu.open = false; });
      document.addEventListener("keydown", function (e) { if (e.key === "Escape" && menu.open) { menu.open = false; menu.querySelector("summary").focus(); } });
      document.addEventListener("click", function (e) { if (menu.open && !menu.contains(e.target)) menu.open = false; });
    }
    if (!("IntersectionObserver" in window)) return;
    var sections = Object.keys(map).map(function (id) { return document.getElementById(id); }).filter(Boolean);
    if (!sections.length) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        (map[e.target.id] || []).forEach(function (a) {
          if (e.isIntersecting) a.setAttribute("aria-current", "location");
          else a.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { io.observe(s); });
  }

  function start() {
    var sim = document.querySelector("[data-sim]");
    if (sim) setupSimulator(sim);
    Array.prototype.forEach.call(document.querySelectorAll("[data-tabs]"), setupTabs);
    if (document.querySelector("[data-widget]")) setupWidgets();
    setupNav();
    setupReveal();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
