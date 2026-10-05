# mostlydaily.com

The website of [Mostly Daily](https://mostlydaily.com), a forgiving habit tracker for iPhone. Served by GitHub Pages
from the root of `main` with the custom domain in `CNAME`.

Plain HTML, one stylesheet (`assets/site.css`, the app's Graphite palette, light and dark, system fonts only) and one
small script (`assets/site.js`). No build step, no web fonts, no frameworks, no third-party code, no analytics and no
cookies: the privacy policy promises no tracking, so keep it that way. Every page shares the same header and footer
markup; change them everywhere at once.

| Page | Purpose |
|---|---|
| `index.html` | Home: hero with a live Habit widget, widgets on tabs (Home Screen demo, a composed Lock Screen, Every widget), "Miss a day" simulator with the level ladder, Build and Limit on tabs, the mosaic, privacy facts, pricing on tabs under 960 px (no prices: owner decision), six questions (also in the JSON-LD FAQPage block, word for word), guides, closing with the three steps |
| `support.html` | App Store **Support URL** |
| `privacy.html` | App Store **Privacy Policy URL** (effective 4 October 2026) |
| `terms.html` | Terms of Use (Apple standard EULA + subscription terms), linked from the app's Premium sheet |
| `guides/` | Short articles on building habits (our own words; no quotes or book titles) |
| `llms.txt` | Plain-text summary for AI assistants |
| `404.html`, `CNAME`, `.nojekyll`, `robots.txt`, `sitemap.xml` | Hosting plumbing; add new pages to `sitemap.xml` |
| `tools/site_images.py`, `tools/images.py`, `tools/sim.test.js` | Pictures from the app, WebP copies, a test of the simulator's rules (see below) |

**Never rename or remove** `support.html`, `privacy.html` or `terms.html`: the app (`AppLinks.swift`) and App Store
Connect link to them.

## Script policy

`assets/site.js` is progressive enhancement only: **every page must read and work with JavaScript off.** It is
loaded with `defer`, makes no network requests, stores nothing and respects `prefers-reduced-motion` (no animations
then). It adds `has-js` to `<html>`; anything marked `data-js` is hidden until then. What it adds:

| Part | Without the script | With the script |
|---|---|---|
| Widgets (`#widgets`, `.wg`, the hero's widget) | Four CSS widgets in their open state, the mosaic with 60 tiles | The rings become buttons with state-aware labels ("Check in Read 10 pages" / "Undo"); one shared day for every widget on the page |
| Home Screen demo rules | Static | A ring checks in, a second tap undoes (the Lock Screen's book is the same Read habit: its picture swaps to the done export); Next up moves to the next open habit (Floss, Read, Alcohol-free, Move) and shows the mosaic when all are done; the Limit control logs a clear day (green inside the rounded square, no checkmark); each check-in lands a tile in the big mosaic (0.45 s spring, 1.5 s glow; none under Reduce Motion); "Start over" appears after the first tap |
| "Miss a day" (`#miss`, `[data-sim]`) | A static week with one miss, its level, run and plain streak | Tap a day for done, missed, rest, or pick one of four patterns; level, run and streak update live (`aria-live` note) |
| Tabs (`[data-tabs]`: widgets, Build/Limit, pricing) | The tablist is hidden; every panel is shown, stacked, each with its own `<h3 class="panel-title">` | One component, `setupTabs`: ARIA tabs, roving tabindex, Arrow/Home/End, a `#hash` naming a panel selects it (`#home-screen`, `#lock`, `#every-widget`, `#habit-build`, `#habit-limit`, `#plan-free`, `#plan-premium`, `#plan-family`); the panel titles become screen-reader only. `data-tabs-start="1"` picks the first tab; `data-tabs-max="959"` (pricing) enables tabs only below that width, wider the three cards sit in a grid |
| Header | All links on wide screens; a `<details>` menu below 960 px | The section in view is highlighted; the menu closes after a tap, on Escape or a tap outside |
| Sections | Static | Fade in once on scroll; everything is shown 1.5 s after load and when printing |

The simulator uses the app's real rules (`MostlyCore`): the level score is an exponentially weighted average of the
last 60 opportunities with a half-life of 10 (Starting 0-24, Sometimes 25-49, Often 50-74, Mostly 75-100); rest days
are not opportunities; the "never missed twice" run ends only after two misses in a row and counts days, rest
included. The week follows 60 done days ("two good months"). If the engine changes, update `evaluate()` in `site.js`
and run `node tools/sim.test.js`.

## Widgets in CSS

The Home Screen widgets are drawn in HTML and CSS (`.wg`) after the app's direction B, "colour field": the habit's
colour at 16% (light) or 24% (dark) over the card, the name, a seven-slot week track, a four-bar level meter with its
word, and one control at the bottom right (round for Build, a rounded square for Limit). Done turns the field to the
full colour and the control white. A clear Limit day turns the inside of the square green with no checkmark. All
done shows the mosaic. If the app's widgets change, change these rules and compare with the app's `-screen widgets…` pages.

## Pictures

Everything comes from the built app. `tools/site_images.py` makes the source pictures from a folder of screenshots and
the widget export; `tools/images.py` makes the WebP copies.

1. Build the app and boot an iPhone 18 Pro class simulator (light, text size large, `xcrun simctl status_bar <udid> override --time 9:41`).
   Take screenshots (`xcrun simctl io <udid> screenshot`) of `-demoData -skipOnboarding -today 2026-11-12` with `-tab today`
   (light and dark), `-screen todayAllDone` (light and dark), `-screen habitDetail` and `-screen limitDetail` (light and dark; dark
   with `xcrun simctl ui <udid> appearance dark`), named `today`, `today-dark`, `today-all-done`, `today-all-done-dark`,
   `habit-detail`, `habit-detail-dark`, `limit-detail`, `limit-detail-dark`.
2. Launch with `-screen widgetsExport` and copy `Documents/widget-export/` out of the app container
   (`xcrun simctl get_app_container <udid> com.kwull.mostlydaily data`): 3x PNGs of every widget in light and dark.
3. `python3 tools/site_images.py <shots> <export> <app repo>` writes the 506 x 1100 Today JPEGs, the frameless 603 px crops
   `habit-screen` and `limit-screen` (light and dark: the screen below the title bar, no phone), the widget composites
   (`assets/img/widgets/gallery-*.png`, 2x, transparent, from the real widget pictures; `gallery-tinted` and `gallery-standby` sit on
   a dark `.art.dark` panel), the Lock Screen pieces (`lock-inline`, `lock-ring`, `lock-next-up`, `lock-habit`,
   `lock-habit-done`, all `-dark.png` at 2x, used by the CSS `.lockscreen`), the icons (`app-icon.png`, `favicon.ico`/`favicon.svg`/`site.webmanifest` (`tools/favicons.py`),
   `apple-touch-icon.png` from the app icon) and the share image (it runs the app repo's `tools/web/og_image.swift`
   unchanged: it only takes the icon and two screenshots).
4. `python3 tools/images.py` (needs Pillow with WebP: `pip3 install pillow`) writes, next to each source:
   screenshots `<name>.jpg` become `<name>.webp` (full width) and `<name>-<half width>.webp`; widget composites
   `<name>.png` become `<name>.webp`; the app icon becomes `app-icon-64.png` and `app-icon-192.png`.

The header, footer and closing mark are the logo ("mosaic, one open") drawn in CSS (`.mark`), so it tints with the theme.

Markup rules: every picture is a `<picture>` with a `type="image/webp"` source first and the JPEG/PNG in `<img>`;
light/dark pairs add `media="(prefers-color-scheme: dark)"` sources before the light ones. Screenshots use `srcset` +
`sizes`. Every `<img>` has `width` and `height`; the hero's phone has `fetchpriority="high"`; everything below the first
screen has `loading="lazy" decoding="async"`.

## When the app is live

Before launch the badges are non-link `<span class="store-badge">` elements ("Coming soon") and the header shows a non-link "Coming soon" pill. At launch replace them with Apple's official "Download on the App Store" badge and link (hero, closing and header), add `<meta
name="apple-itunes-app" content="app-id=…">`, and add the App Store URL to the JSON-LD and `llms.txt`.

Contact: contact@mostlydaily.com

**Cache:** GitHub Pages caches files for ~10 minutes. When `site.css` or `site.js` changes, bump the `?v=` on their links
in every page (all pages use the same value) so returning visitors get matching files.
