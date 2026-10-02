#!/usr/bin/env python3
"""Make the light-weight copies of the site's pictures. Run from the repo root after adding or replacing a
screenshot or widget picture:  python3 tools/images.py   (needs Pillow with WebP: pip3 install pillow)

- Screenshots  assets/img/<name>.jpg (506 x 1100, from the app's simulator) get
  <name>.webp (506 w, for 2x and 3x screens) and <name>-253.webp (253 w, for 1x screens).
  The .jpg stays as the fallback for browsers without WebP.
- Widget pictures  assets/img/widgets/<name>.png (2x) get <name>.webp next to them; the .png is the fallback.
- The app icon  assets/img/app-icon.png (512) gets app-icon-64.png and app-icon-192.png for the header, footer
  and closing section (3 KB and 10 KB instead of 28 KB).

The script never touches the sources (only writes the copies), so running it twice is harmless.
"""
import os
import sys

from PIL import Image, features

if not features.check("webp"):
    sys.exit("This Pillow has no WebP support. Install it with: pip3 install --upgrade pillow")

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
IMG = os.path.join(ROOT, "assets", "img")
WIDGETS = os.path.join(IMG, "widgets")

# Screenshots carry small text: quality 80 is visually the same as the source JPEG at a third of the size.
SHOT_QUALITY = 80
WIDGET_QUALITY = 82


def save_webp(image, path, quality):
    image.save(path, "WEBP", quality=quality, method=6)
    return os.path.getsize(path)


def screenshots():
    for name in sorted(os.listdir(IMG)):
        if not name.endswith(".jpg") or name.startswith("og-image"):
            continue
        base = os.path.join(IMG, name[:-4])
        image = Image.open(os.path.join(IMG, name)).convert("RGB")
        full = save_webp(image, base + ".webp", SHOT_QUALITY)
        half = image.resize((image.width // 2, image.height // 2), Image.LANCZOS)
        small = save_webp(half, f"{base}-{half.width}.webp", SHOT_QUALITY + 2)
        print(f"{name}: {os.path.getsize(os.path.join(IMG, name)) // 1024} KB -> {full // 1024} KB webp, "
              f"{small // 1024} KB at {half.width} w")


def widgets():
    for name in sorted(os.listdir(WIDGETS)):
        if not name.endswith(".png"):
            continue
        image = Image.open(os.path.join(WIDGETS, name)).convert("RGBA")
        out = save_webp(image, os.path.join(WIDGETS, name[:-4] + ".webp"), WIDGET_QUALITY)
        print(f"widgets/{name}: {os.path.getsize(os.path.join(WIDGETS, name)) // 1024} KB -> {out // 1024} KB webp")


def icon():
    image = Image.open(os.path.join(IMG, "app-icon.png")).convert("RGBA")
    for side in (64, 192):
        small = image.resize((side, side), Image.LANCZOS)
        small.save(os.path.join(IMG, f"app-icon-{side}.png"), optimize=True)
    print("app-icon: 64 and 192 px copies")


if __name__ == "__main__":
    screenshots()
    widgets()
    icon()
