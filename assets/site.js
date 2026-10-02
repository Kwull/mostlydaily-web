/* mostlydaily.com: small progressive enhancements. Every page works without this file.
   No frameworks, no third-party code, no storage, no network requests. Respects prefers-reduced-motion. */
(function () {
  "use strict";

  /* ---------- The "miss a day" simulator: the app's real rules, simplified to one daily habit ----------
     Level score (MostlyCore ConsistencyEngine, daily): 100 × Σ wᵢ·creditᵢ / Σ wᵢ over the last 60 opportunities,
     wᵢ = 0.5^(i/10), i = 0 the most recent. Rest days are not opportunities. Starting 0–24, Sometimes 25–49,
     Often 50–74, Mostly 75–100; Starting until 7 opportunities exist.
     Run (RunCalculator): "never missed twice" ends only after two missed opportunities in a row and starts again
     the next day; it counts days, rest days included. */
  var LEVELS = ["Starting", "Sometimes", "Often", "Mostly"];

  function levelFor(score) {
    return score < 25 ? 0 : score < 50 ? 1 : score < 75 ? 2 : 3;
  }

  function evaluate(days) {
    var ops = [];
    var runStart = 0;
    var missesInARow = 0;
    var pairEver = false;
    var misses = 0;
    var rests = 0;
    for (var d = 0; d < days.length; d++) {
      if (days[d] === "rest") { rests++; continue; }
      var credit = days[d] === "done" ? 1 : 0;
      ops.push(credit);
      if (credit === 0) {
        misses++;
        missesInARow++;
        if (missesInARow >= 2) { runStart = d + 1; pairEver = true; }
      } else {
        missesInARow = 0;
      }
    }
    var weighted = 0, total = 0, w = 1, factor = Math.pow(0.5, 1 / 10);
    for (var i = ops.length - 1, seen = 0; i >= 0 && seen < 60; i--, seen++) {
      weighted += w * ops[i];
      total += w;
      w *= factor;
    }
    var score = total > 0 ? Math.round(100 * weighted / total) : 0;
    var established = ops.length >= 7;
    var last = days.length - 1;
    var streak = 0;
    for (var s = last; s >= 0 && days[s] === "done"; s--) streak++;
    return {
      score: score,
      level: established ? levelFor(score) : 0,
      run: runStart <= last ? last - runStart + 1 : 0,
      streak: streak,
      established: established,
      misses: misses,
      rests: rests,
      trailingMisses: missesInARow,
      pairEver: pairEver
    };
  }

  function message(r) {
    var level = LEVELS[r.level];
    var text;
    if (!r.established) {
      text = "A habit shows Starting until it has 7 days to count. Rest days aren't counted, so they never pull your level down.";
    } else if (r.misses === 0 && r.rests === 0) {
      text = "Every day done. Mostly is the top level: there's nothing above it.";
    } else if (r.misses === 0) {
      text = "Rest days aren't misses: your level and your run carry on as if nothing happened.";
    } else if (r.trailingMisses >= 2) {
      text = "Two misses in a row end the run, gently. A new one starts with your next check-in, and your level is " + (r.level >= 2 ? "still " : "") + level + ".";
    } else if (r.pairEver) {
      text = "Two misses in a row ended a run, and a new one started the next day. Your level is " + level + ".";
    } else if (r.misses === 1) {
      text = "One miss, nothing reset. Your level dips a few points and your run keeps going.";
    } else {
      text = r.misses + " misses, never two in a row: your run keeps going and your level is " + level + ".";
    }
    if (r.misses > 0 && r.rests > 0) text += " Rest days don't count as misses.";
    return text;
  }

  if (typeof document === "undefined") {
    // Node: export the rules for tests (node tools/sim.test.js).
    module.exports = { evaluate: evaluate, message: message, LEVELS: LEVELS };
    return;
  }

  var root = document.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

  /* ---------- Simulator UI ---------- */
  var STATES = ["done", "miss", "rest"];
  var STATE_LABEL = { done: "done", miss: "missed", rest: "rest day" };
  var PRESETS = {
    every: function (n) { return fill(n, function () { return "done"; }); },
    one: function (n) { return fill(n, function (i) { return i === n - 4 ? "miss" : "done"; }); },
    two: function (n) { return fill(n, function (i) { return i === n - 6 || i === n - 5 ? "miss" : "done"; }); },
    off: function (n) { return fill(n, function (i) { return i >= n - 12 && i < n - 5 ? "rest" : "done"; }); }
  };
  function fill(n, f) { var a = []; for (var i = 0; i < n; i++) a.push(f(i)); return a; }

  function setupSimulator(sim) {
    var grid = sim.querySelector(".sim-grid");
    var cells = Array.prototype.slice.call(grid.children);
    var days = cells.map(function (c) { return c.getAttribute("data-state"); });
    var initial = days.slice();
    var ring = sim.querySelector(".sim-ring-value");
    var scoreEl = sim.querySelector("[data-score]");
    var levelEl = sim.querySelector("[data-level]");
    var runEl = sim.querySelector("[data-run]");
    var streakEl = sim.querySelector("[data-streak]");
    var streakUnit = sim.querySelector("[data-streak-unit]");
    var noteEl = sim.querySelector("[data-note]");
    var levelPills = sim.querySelectorAll(".sim-ladder li");
    var presetButtons = sim.querySelectorAll("[data-preset]");

    // Upgrade the static day marks to buttons.
    var buttons = cells.map(function (cell, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = cell.className;
      b.innerHTML = cell.innerHTML;
      var hidden = b.querySelector(".sr");
      if (hidden) hidden.remove();
      b.setAttribute("aria-describedby", "sim-how");
      b.addEventListener("click", function () {
        days[i] = STATES[(STATES.indexOf(days[i]) + 1) % STATES.length];
        render(i);
      });
      grid.replaceChild(b, cell);
      return b;
    });

    Array.prototype.forEach.call(presetButtons, function (b) {
      b.addEventListener("click", function () {
        var key = b.getAttribute("data-preset");
        days = key === "start" ? initial.slice() : PRESETS[key](days.length);
        render(-1);
      });
    });
    sim.classList.add("is-live");
    render(-1);

    function render(changed) {
      var r = evaluate(days);
      buttons.forEach(function (b, i) {
        var state = days[i];
        b.className = "sim-day is-" + state + (i === changed ? " is-changed" : "");
        b.setAttribute("aria-label", (i === days.length - 1 ? "Today" : "Day " + (i + 1) + " of " + days.length) + ", " + STATE_LABEL[state]);
      });
      ring.style.strokeDasharray = r.score + " 100";
      scoreEl.textContent = r.score;
      levelEl.textContent = LEVELS[r.level];
      runEl.textContent = r.run === 1 ? "1 day" : r.run + " days";
      streakEl.textContent = r.streak;
      streakUnit.textContent = r.streak === 1 ? "day in a row" : "days in a row";
      Array.prototype.forEach.call(levelPills, function (p) {
        var on = Number(p.getAttribute("data-l")) === r.level;
        p.classList.toggle("is-current", on);
        if (on) p.setAttribute("aria-current", "true"); else p.removeAttribute("aria-current");
      });
      Array.prototype.forEach.call(presetButtons, function (b) {
        var key = b.getAttribute("data-preset");
        var pattern = key === "start" ? initial : PRESETS[key](days.length);
        b.setAttribute("aria-pressed", String(pattern.join() === days.join()));
      });
      noteEl.textContent = message(r);
    }
  }

  /* ---------- Tabs (widgets section): without script every panel is shown in turn ---------- */
  function setupTabs(box) {
    var list = box.querySelector("[data-tablist]");
    var tabs = Array.prototype.slice.call(list.querySelectorAll("button"));
    var panels = tabs.map(function (t) { return document.getElementById(t.getAttribute("aria-controls")); });
    list.setAttribute("role", "tablist");
    list.hidden = false;
    box.classList.add("is-tabbed");
    tabs.forEach(function (tab, i) {
      tab.setAttribute("role", "tab");
      tab.id = tab.id || "tab-" + panels[i].id;
      panels[i].setAttribute("role", "tabpanel");
      panels[i].setAttribute("aria-labelledby", tab.id);
      panels[i].tabIndex = 0;
      tab.addEventListener("click", function () { select(i, false); });
      tab.addEventListener("keydown", function (e) {
        var next = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 }[e.key];
        if (next === undefined) return;
        e.preventDefault();
        select((next + tabs.length) % tabs.length, true);
      });
    });
    function select(index, focus) {
      tabs.forEach(function (t, i) {
        var on = i === index;
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
        panels[i].hidden = !on;
      });
      list.style.setProperty("--tab", index);
      if (focus) tabs[index].focus();
    }
    function fromHash() {
      var i = panels.findIndex(function (p) { return "#" + p.id === location.hash; });
      return i < 0 ? null : i;
    }
    select(fromHash() || 0, false);
    window.addEventListener("hashchange", function () {
      var i = fromHash();
      if (i !== null) select(i, false);
    });
  }

  /* ---------- Feature tour: on wide screens, a list of features next to one phone ---------- */
  function setupTour(tour) {
    var figures = Array.prototype.slice.call(tour.querySelectorAll("figure"));
    var wide = window.matchMedia("(min-width: 900px)");
    var list = document.createElement("div");
    list.className = "tour-list";
    list.setAttribute("role", "group");
    list.setAttribute("aria-label", "Screens");
    var stage = document.createElement("div");
    stage.className = "tour-stage";
    var active = 0;
    var buttons = figures.map(function (fig, i) {
      var cap = fig.querySelector("figcaption");
      var b = document.createElement("button");
      b.type = "button";
      b.className = "tour-item";
      b.innerHTML = cap.innerHTML;
      b.addEventListener("click", function () { show(i); });
      list.appendChild(b);
      return b;
    });
    function show(i) {
      if (i === active && figures[i].classList.contains("is-active")) return;
      var previous = figures[active];
      figures.forEach(function (f) { f.classList.remove("is-leaving"); });
      if (previous !== figures[i]) {
        previous.classList.remove("is-active");
        if (!reduceMotion.matches) {
          previous.classList.add("is-leaving");
          setTimeout(function () { previous.classList.remove("is-leaving"); }, 420);
        }
      }
      figures[i].classList.add("is-active");
      buttons.forEach(function (b, j) { b.setAttribute("aria-pressed", String(j === i)); });
      active = i;
    }
    function apply() {
      if (wide.matches) {
        figures.forEach(function (f) { stage.appendChild(f); });
        tour.appendChild(list);
        tour.appendChild(stage);
        tour.classList.add("is-stage");
        show(active);
      } else if (tour.classList.contains("is-stage")) {
        tour.classList.remove("is-stage");
        figures.forEach(function (f) { f.classList.remove("is-active", "is-leaving"); tour.appendChild(f); });
        list.remove();
        stage.remove();
      }
    }
    apply();
    wide.addEventListener("change", apply);
  }

  /* ---------- Scroll reveal ---------- */
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

  /* ---------- Hero phones: a gentle tilt under the pointer and a little depth on scroll ---------- */
  function setupHero() {
    var phones = document.querySelector(".hero .phones");
    if (!phones || reduceMotion.matches) return;
    var frame = 0, tx = 0, ty = 0, scroll = 0;
    function paint() {
      frame = 0;
      phones.style.setProperty("--rx", (ty * -5).toFixed(2) + "deg");
      phones.style.setProperty("--ry", (tx * 7).toFixed(2) + "deg");
      phones.style.setProperty("--lift", Math.min(scroll, 600) * -0.06 + "px");
    }
    function queue() { if (!frame) frame = requestAnimationFrame(paint); }
    if (finePointer.matches) {
      phones.addEventListener("pointermove", function (e) {
        var r = phones.getBoundingClientRect();
        tx = (e.clientX - r.left) / r.width - 0.5;
        ty = (e.clientY - r.top) / r.height - 0.5;
        queue();
      });
      phones.addEventListener("pointerleave", function () { tx = 0; ty = 0; queue(); });
    }
    window.addEventListener("scroll", function () { scroll = window.scrollY; queue(); }, { passive: true });
    phones.classList.add("is-tilting");
  }


  /* ---------- Widget demo: one shared day, like the real widgets. Ring positions and the pictures of every state are
     exported from the app (assets/widget-demo.json, `-screen widgetsExport`); a tap changes the day and every widget
     shows its picture for it. ---------- */
  var DOES = { "done": "mark done", "undo": "undo", "clear day": "log a clear day" };
  var KEYS = { "Floss": "floss", "Read 10 pages": "read", "Alcohol-free days": "alcohol", "Move 20 minutes": "move", "Meditate": "meditate" };
  var START = { floss: false, read: false, alcohol: false, move: true, meditate: true };

  function pictureFor(kind, day, map) {
    if (kind === "habit") return day.read ? "habit-read-done" : "habit-read";
    if (kind === "lock") return day.read ? "lock-habit-done" : "lock-habit";
    if (kind === "next") {
      if (!day.floss) return "next-up-step1";
      if (!day.read) return "next-up-step2";
      if (!day.alcohol) return "next-up-step3";
      return "next-up-step4";
    }
    // Today (medium): the exported names list what differs from the boards' day, in this order.
    var parts = [];
    if (day.read) parts.push("read");
    if (day.alcohol) parts.push("alcohol");
    if (!day.move) parts.push("no-move");
    if (day.floss) parts.push("floss");
    if (!day.meditate) parts.push("no-meditate");
    var name = parts.length ? "today-" + parts.join("-") : "today";
    return map[name] ? name : null;
  }

  function setupWidgetDemos() {
    var boxes = Array.prototype.slice.call(document.querySelectorAll("[data-demo]"));
    if (!boxes.length || !window.fetch) return;
    fetch("/assets/widget-demo.json").then(function (r) { return r.json(); }).then(function (map) {
      var day = Object.assign({}, START);
      var widgets = boxes.map(function (box) { return makeWidget(box, map); });
      function render(focus) {
        widgets.forEach(function (w) { w.show(day, focus); });
        Array.prototype.forEach.call(document.querySelectorAll("[data-demo-reset]"), function (b) {
          b.classList.toggle("is-off", JSON.stringify(day) === JSON.stringify(START));
        });
      }
      widgets.forEach(function (w) {
        w.onTap = function (t, box, keyboard) {
          var key = KEYS[t.habit];
          if (!key) return;
          var next = Object.assign({}, day);
          next[key] = t.does !== "undo";
          // Next up shows the habits in order; only states the app exported can be shown.
          if (widgets.some(function (x) { return x.kind === "today"; }) && !pictureFor("today", next, map)) return;
          day = next;
          render(keyboard ? { box: box, habit: t.habit } : null);
        };
      });
      Array.prototype.forEach.call(document.querySelectorAll("[data-demo-reset]"), function (b) {
        b.addEventListener("click", function () { day = Object.assign({}, START); render(null); });
      });
      render(null);
    }).catch(function () { /* the static pictures stay */ });
  }

  function makeWidget(box, map) {
    var start = box.getAttribute("data-demo");
    var kind = start.indexOf("next-up") === 0 ? "next" : start.indexOf("habit") === 0 ? "habit" : start.indexOf("lock") === 0 ? "lock" : "today";
    var darkOnly = box.hasAttribute("data-dark");
    var label = box.getAttribute("data-label") || "Widget";
    var picture = box.querySelector("picture");
    var img = picture.querySelector("img");
    var layer = document.createElement("div");
    layer.className = "wdemo-hits";
    box.appendChild(layer);
    box.classList.add("is-live");
    var current = null;
    var widget = { kind: kind, onTap: null };

    function src(name, scheme) { return "/assets/img/widgets/" + name + "-" + scheme + ".webp"; }
    widget.show = function (day, focus) {
      var name = pictureFor(kind, day, map);
      if (!name || !map[name]) return;
      var entry = map[name];
      if (name !== current) {
        current = name;
        var scheme = darkOnly || matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        var next = new Image();
        next.src = src(name, scheme);
        var swap = function () {
          if (current !== name) return; // a newer tap won
          Array.prototype.forEach.call(picture.querySelectorAll("source"), function (s) { s.remove(); });
          if (!darkOnly) {
            var dark = document.createElement("source");
            dark.type = "image/webp"; dark.media = "(prefers-color-scheme: dark)"; dark.srcset = src(name, "dark");
            picture.insertBefore(dark, img);
          }
          img.removeAttribute("loading");
          img.src = src(name, darkOnly ? "dark" : "light");
        };
        (next.decode ? next.decode() : Promise.resolve()).then(swap, swap);
      }
      img.alt = label + ": " + (entry.targets.length ? entry.targets.map(function (t) { return t.habit; }).join(", ") : "all done for today");
      layer.textContent = "";
      var focusTarget = null;
      entry.targets.forEach(function (t) {
        if (!t.next || !KEYS[t.habit]) return;
        var b = document.createElement("button");
        b.type = "button";
        b.className = "wdemo-hit";
        b.style.left = (t.x * 100) + "%"; b.style.top = (t.y * 100) + "%";
        b.style.width = (t.w * 100) + "%"; b.style.height = (t.h * 100) + "%";
        b.setAttribute("aria-label", t.habit + ": " + (DOES[t.does] || t.does));
        b.addEventListener("click", function (e) {
          box.classList.add("was-tapped");
          // Move focus to the new ring only for keyboard users (detail 0); a pointer tap leaves no ring behind.
          widget.onTap && widget.onTap(t, box, e.detail === 0);
        });
        layer.appendChild(b);
        if (focus && focus.box === box && t.habit === focus.habit) focusTarget = b;
      });
      if (focus && focus.box === box) (focusTarget || layer.querySelector("button") || box).focus({ preventScroll: true });
    };
    return widget;
  }

  function start() {
    var sim = document.querySelector("[data-sim]");
    if (sim) setupSimulator(sim);
    Array.prototype.forEach.call(document.querySelectorAll("[data-tabs]"), setupTabs);
    var tour = document.querySelector("[data-tour]");
    if (tour) setupTour(tour);
    setupNav();
    setupHero();
    setupReveal();
    setupWidgetDemos();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
