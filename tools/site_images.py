#!/usr/bin/env python3
"""Make the site's source pictures from the built app. Run, then `python3 tools/images.py` for the WebP copies.

  python3 tools/site_images.py <shots> <export> <app repo>

<shots>   a folder of simulator screenshots (1206 x 2622 PNG): today, today-dark, today-all-done, habit-detail,
          habit-detail-dark, limit-detail, limit-detail-dark, widgets-lock  (see README, "Pictures")
<export>  the app's `-screen widgetsExport` folder (Documents/widget-export, 3x PNGs)
<app repo> the app repository (for AppIcon.png and tools/web/og_image.swift; read only)

Writes assets/img/*.jpg (506 x 1100), assets/img/widgets/gallery-*.png (2x composites of the real widgets),
the icons (app-icon.png, favicon.png, apple-touch-icon.png) and og-image.jpg.
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
for name in ["today", "today-dark", "today-all-done", "habit-detail", "habit-detail-dark", "limit-detail", "limit-detail-dark"]:
    rgb(os.path.join(shots, name + ".png")).resize((506, 1100), Image.LANCZOS).save(
        os.path.join(IMG, name + ".jpg"), quality=80, optimize=True, progressive=True)

# The Lock Screen page of the widget gallery, cropped to the lock area (a bit inside the rounded card).
lock = rgb(os.path.join(shots, "widgets-lock.png")).crop((95, 220, 1160, 2125))
lock = lock.resize((lock.width // 2, lock.height // 2), Image.LANCZOS)
lock.save(os.path.join(IMG, "lock-screen.jpg"), quality=80, optimize=True, progressive=True)

# --- Widget composites: the app's real widget pictures (3x) scaled to 2x, laid out in rows ---
GAP = 24


def load(name, scheme):
    path = os.path.join(export, f"{name}-{scheme}.png")
    if not os.path.exists(path):
        path = os.path.join(export, f"{name}-dark.png")
    im = Image.open(path).convert("RGBA")
    return im.resize((round(im.width * 2 / 3), round(im.height * 2 / 3)), Image.LANCZOS)


def compose(rows, scheme, out, background=None, pad=0):
    ims = [[load(n, scheme) for n in row] for row in rows]
    width = max(sum(i.width for i in r) + GAP * (len(r) - 1) for r in ims)
    height = sum(max(i.height for i in r) for r in ims) + GAP * (len(ims) - 1)
    sheet = Image.new("RGBA", (width + 2 * pad, height + 2 * pad), background or (0, 0, 0, 0))
    y = pad
    for r in ims:
        w = sum(i.width for i in r) + GAP * (len(r) - 1)
        x = pad + (width - w) // 2
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
# Accented and always-dark modes: on a dark panel (the real pictures are made for a dark ground).
panel = (22, 24, 34, 255)
compose([["tinted-today"], ["clear-today"], ["standby-next-up", "standby-mosaic"]], "dark", "gallery-modes.png", panel, 36)
compose([["lock-inline"], ["lock-ring", "lock-habit", "lock-next-up"]], "dark", "gallery-lock.png", panel, 36)

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
