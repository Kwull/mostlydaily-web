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

  /* ---------- Hero "Try it: tap a day": one week track, four presets (wide screens), result with aria-live ---------- */
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
      bars: (sim.querySelector("[data-bars]") || { children: [] }).children, run: sim.querySelector("[data-run]"),
      streak: sim.querySelector("[data-streak]"), note: sim.querySelector("[data-note]")
    };
    var presets = sim.querySelectorAll("[data-preset]");
    var ladder = sim.querySelectorAll("[data-ladder] li");
    var shown = null, tween = null;
    // The score counts from the old value to the new in 320 ms (none under Reduce Motion).
    function showScore(to) {
      if (tween) cancelAnimationFrame(tween);
      if (shown === null || reduceMotion.matches) { shown = to; paint(to); return; }
      var from = shown, t0 = null;
      function step(t) {
        if (t0 === null) t0 = t;
        var k = Math.min(1, (t - t0) / 320), v = Math.round(from + (to - from) * (1 - Math.pow(1 - k, 3)));
        paint(v);
        if (k < 1) tween = requestAnimationFrame(step); else shown = to;
      }
      tween = requestAnimationFrame(step);
    }
    function paint(v) { out.score.textContent = v; out.ring.style.setProperty("--p", v); }
    function draw(changed) {
      var r = evaluate(days);
      week.innerHTML = days.map(function (st, i) {
        return '<button type="button" class="wk ' + st + (i === 6 ? " today" : "") + (i === changed ? " changed" : "") + '" data-i="' + i +
          '" aria-label="' + DAYNAMES[i] + (i === 6 ? " (today)" : "") + ", " + NAME[st] + '. Tap to change."><span class="d">' + ICON[st] + '</span><span class="lbl" aria-hidden="true">' + LABELS[i] + "</span></button>";
      }).join("");
      if (changed >= 0) { var b = week.querySelector('[data-i="' + changed + '"]'); if (b) b.focus({ preventScroll: true }); }
      showScore(r.score);
      out.level.textContent = LEVELS[r.level];
      for (var i = 0; i < out.bars.length; i++) out.bars[i].className = i <= r.level ? "on" : "";
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
    setupNav();
    setupReveal();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
