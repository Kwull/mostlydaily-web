# mostlydaily.com

The website of [Mostly Daily](https://mostlydaily.com), a forgiving habit tracker for iPhone. Served by GitHub Pages
from the root of `main` with the custom domain in `CNAME`.

Plain HTML, one stylesheet (`assets/site.css`, the app's Graphite palette, light and dark, system fonts only) and one
small script (`assets/site.js`). No build step, no web fonts, no frameworks, no third-party code, no analytics and no
cookies: the privacy policy promises no tracking, so keep it that way. Every page shares the same header and footer
markup; change them everywhere at once.

| Page | Purpose |
|---|---|
| `index.html` | Home (redesign, 19 Oct 2026): hero with the "Try it: tap a day" week (the Miss a day rules), Why Mostly (three cards), Widgets (App Store Home Screen shot, three widget pictures, Lock Screen strip), Build and Limit colour-field cards, Who you're becoming, one black privacy band, pricing as two cards plus a Family line and "Everything, line by line", six questions (also in the JSON-LD FAQPage block, word for word), guides, closing with the three steps. No tabs, no prices (owner) |
| `support.html` | App Store **Support URL**; also the other six questions (habit steps, Limit habit, data, themes, challenges, quarterly review) with their own FAQPage JSON-LD |
| `privacy.html` | App Store **Privacy Policy URL** (effective 4 October 2026) |
| `terms.html` | Terms of Use (Apple standard EULA + subscription terms), linked from the app's Premium sheet |
| `guides/` | Short articles on building habits (our own words; no quotes or book titles) |
| `llms.txt` | Plain-text summary for AI assistants |
| `404.html`, `CNAME`, `.nojekyll`, `robots.txt`, `sitemap.xml` | Hosting plumbing; add new pages to `sitemap.xml` |
| `tools/site_images.py`, `tools/store_images.py`, `tools/images.py`, `tools/sim.test.js` | Pictures from the app, the App Store shots in light and dark, WebP copies, a test of the simulator's rules (see below) |

**Never rename or remove** `support.html`, `privacy.html` or `terms.html`: the app (`AppLinks.swift`) and App Store
Connect link to them.

## Script policy

`assets/site.js` is progressive enhancement only: **every page must read and work with JavaScript off.** It is
loaded with `defer`, makes no network requests, stores nothing and respects `prefers-reduced-motion` (no animations
then). It adds `has-js` to `<html>`; anything marked `data-js` is hidden until then. What it adds:

| Part | Without the script | With the script |
|---|---|---|
| Hero "Try it: tap a day" (`[data-sim]`) | A static week with one miss, its level, run and plain streak | Each day is a `<button>` ("Thursday, missed. Tap to change."): tap or Enter/Space cycles done, missed, rest; level, run, streak and a kind note (`aria-live="polite"`) update; the ring counts to the new score in 320 ms (none under Reduce Motion); four presets appear on wide screens |
| Header | All links on wide screens; a `<details>` menu below 960 px | The section in view is highlighted; the menu closes after a tap, on Escape or a tap outside |
| Sections | Static | Fade in once on scroll (`data-reveal`, currently unused); everything is shown 1.5 s after load and when printing |

The week uses the app's real rules (`MostlyCore`): the level score is an exponentially weighted average of the
last 60 opportunities with a half-life of 10 (Starting 0-24, Sometimes 25-49, Often 50-74, Mostly 75-100); rest days
are not opportunities; the "never missed twice" run ends only after two misses in a row and counts days, rest
included. The week follows 60 done days ("two good months"). If the engine changes, update `evaluate()` in `site.js`
and run `node tools/sim.test.js`.

## Widgets

The Home Screen is the App Store screenshot (real Home Screen with the app's widgets, with its caption and colour field), in light and dark (`store-widgets*.jpg`); the three widget pictures and the Lock Screen strip come from `-screen widgetsExport` (`assets/img/widgets/`). The old CSS-drawn interactive widget board was removed in the redesign.

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

Light and dark store shots (`store-*.jpg` / `store-*-dark.jpg`, 900 px, `tools/store_images.py`) get WebP copies at 450 and 900 px from `tools/images.py`.

Markup rules: every picture is a `<picture>` with a `type="image/webp"` source first and the JPEG/PNG in `<img>`;
light/dark pairs add `media="(prefers-color-scheme: dark)"` sources before the light ones. Screenshots use `srcset` +
`sizes`. Every `<img>` has `width` and `height`; the hero's phone has `fetchpriority="high"`; everything below the first
screen has `loading="lazy" decoding="async"`.

## When the app is live

Before launch the hero and closing show a plain "Coming soon for iPhone" status and an "Email me when it's out" mailto button (no Apple badge, no Apple logo), and the header a "Coming soon for iPhone" button to the closing section. An HTML comment marks where the badge goes. At launch replace them with Apple's official "Download on the App Store" badge and link (hero, closing and header), add `<meta
name="apple-itunes-app" content="app-id=…">`, and add the App Store URL to the JSON-LD and `llms.txt`.

Contact: contact@mostlydaily.com

**Cache:** GitHub Pages caches files for ~10 minutes. When `site.css` or `site.js` changes, bump the `?v=` on their links
in every page (all pages use the same value) so returning visitors get matching files.
