#!/usr/bin/env python3
"""Make the site's source pictures from the built app. Run, then `python3 tools/images.py` for the WebP copies.

  python3 tools/site_images.py <shots> <export> <app repo>

<shots>   a folder of simulator screenshots (1206 x 2622 PNG): today, today-dark, today-all-done, today-all-done-dark,
          habit-detail, habit-detail-dark, limit-detail, limit-detail-dark  (see README, "Pictures")
<export>  the app's `-screen widgetsExport` folder (Documents/widget-export, 3x PNGs)
<app repo> the app repository (for AppIcon.png and tools/web/og_image.swift; read only)

Writes assets/img/*.jpg (506 x 1100 Today screens; frameless 603 px crops of the habit and limit detail screens),
assets/img/widgets/gallery-*.png (2x composites of the real widgets, no baked background), the Lock Screen pieces
(assets/img/widgets/lock-*.png, 2x) and the icons (app-icon.png, favicon.png, apple-touch-icon.png) and og-image.jpg.
"""
import os
import subprocess
import sys

from PIL import Image

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
IMG = os.path.join(ROOT, "assets", "img")
WID = os.path.join(IMG, "widgets")
shots, export, app = sys.argv[1:4]


def rgb(path):
    return Image.open(path).convert("RGB")


# --- Screenshots: 506 x 1100 JPEG (quality 80, progressive) ---
def save_jpg(im, path):
    im.save(path, quality=80, optimize=True, progressive=True)


for name in ["today", "today-dark", "today-all-done", "today-all-done-dark"]:
    save_jpg(rgb(os.path.join(shots, name + ".png")).resize((506, 1100), Image.LANCZOS), os.path.join(IMG, name + ".jpg"))

# Habit and Limit detail: frameless crops of the screen below the title bar (no phone around them), 603 px wide.
# Habit: the ring card and the whole month calendar with its legend. Limit: the ring card, "Today is open" and the
# calendar through the row 16-22.
CROPS = {"habit-screen": ("habit-detail", (0, 330, 1206, 2300)), "limit-screen": ("limit-detail", (0, 330, 1206, 2150))}
for out, (src, box) in CROPS.items():
    for suffix in ("", "-dark"):
        im = rgb(os.path.join(shots, src + suffix + ".png")).crop(box)
        save_jpg(im.resize((im.width // 2, im.height // 2), Image.LANCZOS), os.path.join(IMG, out + suffix + ".jpg"))

# --- Widget composites: the app's real widget pictures (3x) scaled to 2x, laid out in rows ---
GAP = 24


def load(name, scheme):
    path = os.path.join(export, f"{name}-{scheme}.png")
    if not os.path.exists(path):
        path = os.path.join(export, f"{name}-dark.png")
    im = Image.open(path).convert("RGBA")
    return im.resize((round(im.width * 2 / 3), round(im.height * 2 / 3)), Image.LANCZOS)


def compose(rows, scheme, out):
    ims = [[load(n, scheme) for n in row] for row in rows]
    width = max(sum(i.width for i in r) + GAP * (len(r) - 1) for r in ims)
    height = sum(max(i.height for i in r) for r in ims) + GAP * (len(ims) - 1)
    sheet = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    y = 0
    for r in ims:
        w = sum(i.width for i in r) + GAP * (len(r) - 1)
        x = (width - w) // 2
        for i in r:
            sheet.paste(i, (x, y), i)
            x += i.width + GAP
        y += max(i.height for i in r) + GAP
    sheet.save(os.path.join(WID, out), optimize=True)


for scheme in ("light", "dark"):
    compose([["habit-read", "habit-read-done"], ["habit-move-done", "habit-meditate-new"]], scheme, f"gallery-habit-{scheme}.png")
    compose([["limit-evening", "limit-clear"], ["limit-light"]], scheme, f"gallery-limit-{scheme}.png")
    compose([["next-up", "next-up-after"], ["all-done"]], scheme, f"gallery-next-up-{scheme}.png")
    compose([["today"], ["week"]], scheme, f"gallery-today-{scheme}.png")
    compose([["today-week"]], scheme, f"gallery-large-{scheme}.png")
    compose([["calendar-limit"]], scheme, f"gallery-calendar-{scheme}.png")
    compose([["mosaic"], ["mosaic-small"]], scheme, f"gallery-mosaic-{scheme}.png")
# Accented and always-dark modes: the pictures are made for a dark ground and keep their transparency; the page puts
# them on a dark panel (.art.dark), in both themes.
compose([["tinted-today"], ["clear-today"]], "dark", "gallery-tinted.png")
compose([["standby-next-up", "standby-mosaic"]], "dark", "gallery-standby.png")

# Lock Screen pieces for the CSS Lock Screen (.lockscreen): the real exports at 2x, one picture each.
for name in ("lock-inline", "lock-ring", "lock-next-up", "lock-habit", "lock-habit-done"):
    load(name, "dark").save(os.path.join(WID, name + "-dark.png"), optimize=True)

# --- Icons from the app icon ---
icon = Image.open(os.path.join(app, "App/Assets.xcassets/AppIcon.appiconset/AppIcon.png")).convert("RGBA")
icon.resize((512, 512), Image.LANCZOS).save(os.path.join(IMG, "app-icon.png"), optimize=True)
icon.resize((180, 180), Image.LANCZOS).convert("RGB").save(os.path.join(IMG, "apple-touch-icon.png"), optimize=True)
icon.resize((64, 64), Image.LANCZOS).save(os.path.join(IMG, "favicon.png"), optimize=True)

# --- Share image: the app repo's tools/web/og_image.swift draws the icon, the name and two screenshots; it only
# takes pictures as arguments, so it runs unchanged with the new Today (light and dark). ---
subprocess.run(["swift", os.path.join(app, "tools/web/og_image.swift"), os.path.join(IMG, "app-icon.png"),
                os.path.join(shots, "today.png"), os.path.join(shots, "today-dark.png"), os.path.join(IMG, "og-image.jpg")], check=True)
print("done")
