# mostlydaily.com

The website of [Mostly Daily](https://mostlydaily.com), a forgiving habit tracker for iPhone. Served by GitHub Pages
from the root of `main` with the custom domain in `CNAME`.

Plain HTML and one stylesheet (`assets/site.css`, the app's Graphite palette, light and dark). No build step, no
scripts, fonts or analytics: the privacy policy promises no tracking, so keep it that way. Every page shares the same
header and footer markup; change them everywhere at once.

| Page | Purpose |
|---|---|
| `index.html` | Home: hero, how it works, features, screenshot tour, privacy, pricing, guides, FAQ (also in the JSON-LD FAQPage block, word for word) |
| `support.html` | App Store **Support URL** |
| `privacy.html` | App Store **Privacy Policy URL** (effective 1 October 2026) |
| `terms.html` | Terms of Use (Apple standard EULA + subscription terms), linked from the app's Premium sheet |
| `guides/` | Short articles on building habits (our own words; no quotes or book titles) |
| `llms.txt` | Plain-text summary for AI assistants |
| `404.html`, `CNAME`, `.nojekyll`, `robots.txt`, `sitemap.xml` | Hosting plumbing; add new pages to `sitemap.xml` |

**Never rename or remove** `support.html`, `privacy.html` or `terms.html`: the app (`AppLinks.swift`) and App Store
Connect link to them.

Screenshots in `assets/img/` come from the app's simulator with demo data (`-demoData`, iPhone 18 Pro, 9:41 status
bar); the social preview `og-image.jpg` is drawn by `tools/web/og_image.swift` in the app repository. Update the
screenshots when the app's screens change noticeably.

Widget pictures in `assets/img/widgets/` (`<name>-light.png` / `-dark.png`, 2×) are rendered from the app's real widget
views: in the app repo, launch the Personal build with `-demoData -skipOnboarding -today 2026-11-12 -screen
widgetsExport`, copy `Documents/widget-export/` out of the simulator's app container
(`xcrun simctl get_app_container <udid> com.kwull.mostlydaily.dev data`) and downscale the 3× PNGs to 2×. The Home
Screen and Lock Screen demo on the home page swaps a widget for its `-done`/`-after` picture with a checkbox (CSS
only, no script).

When the app is live: replace the "Coming soon" buttons with Apple's official "Download on the App Store" badge and
link, add `<meta name="apple-itunes-app" content="app-id=…">`, and add the App Store URL to the JSON-LD and
`llms.txt`.

Contact: contact@mostlydaily.com
