"""Favicon set from the "Mosaic, one open" mark (app icon geometry: 1024 grid, tiles 206 r62, margin 148, open tile 44 stroke).
Writes favicon.ico (16/32/48), assets/img/icon-maskable-512.png and icon-192/512 for the manifest. favicon.svg is hand-kept.
Small sizes use a tighter crop (margin ~70) so the tiles stay legible at 16 px."""
import os
from PIL import Image, ImageDraw

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
IMG = os.path.join(ROOT, "assets", "img")
S = 2048  # work grid (2x the 1024 icon grid)
TILES = [((409, 148), "#0A84FF"), ((670, 148), "#30D158"), ((148, 409), "#64D2FF"),
         ((409, 409), "#FF9F0A"), ((670, 409), "#FF375F"), ((148, 670), "#BF5AF2")]

def art(crop, radius, scale=1.0):
    """crop = (x0, y0, size) in 1024 units; radius = corner radius of the ground in 1024 units (0 = square)."""
    k = S / crop[2]
    im = Image.new("RGBA", (S, S))
    # ground: vertical gradient #2A2A2E -> #0B0B0D
    g = Image.new("RGBA", (S, S))
    gd = ImageDraw.Draw(g)
    for y in range(S):
        t = y / (S - 1)
        c = tuple(round(a + (b - a) * t) for a, b in zip((0x2A, 0x2A, 0x2E), (0x0B, 0x0B, 0x0D)))
        gd.line([(0, y), (S, y)], fill=c + (255,))
    mask = Image.new("L", (S, S), 0)
    ImageDraw.Draw(mask).rounded_rectangle([0, 0, S - 1, S - 1], radius=radius * k, fill=255)
    im.paste(g, (0, 0), mask)
    d = ImageDraw.Draw(im)
    cx = cy = 512  # scale about the icon centre (for the maskable safe zone)
    def P(v, c): return ((v - c) * scale + c - crop[0 if c == cx else 1]) * k
    def box(x, y, w):
        return [P(x, cx), P(y, cy), P(x, cx) + w * scale * k, P(y, cy) + w * scale * k]
    for (x, y), col in TILES:
        d.rounded_rectangle(box(x, y, 206), radius=62 * scale * k, fill=col)
    # open tile: 44 stroke, centre line 162 wide at (431,692), radius 40 -> outer 206, inner 118
    d.rounded_rectangle(box(409, 670, 206), radius=62 * scale * k, fill=(237, 237, 237, 255))
    x, y = P(431 + 22, cx), P(692 + 22, cy)
    d.rounded_rectangle([x, y, x + 118 * scale * k, y + 118 * scale * k], radius=18 * scale * k, fill=(0x11, 0x11, 0x13, 255))
    return im

def save(im, name, side, rgb=False):
    out = im.resize((side, side), Image.LANCZOS)
    if rgb: out = out.convert("RGB")
    out.save(os.path.join(IMG, name), optimize=True)

tight = (70, 70, 884)  # tab icon: tight crop, rounded ground
icons = [art(tight, 190).resize((n, n), Image.LANCZOS) for n in (48, 32, 16)]
icons[0].save(os.path.join(ROOT, "favicon.ico"), format="ICO", sizes=[(48, 48), (32, 32), (16, 16)],
              append_images=icons[1:])
full = (0, 0, 1024)
save(art(full, 0, 0.74), "icon-maskable-512.png", 512, rgb=True)   # full-bleed ground, content inside the 80% safe circle
APP = os.path.join(ROOT, "..", "mostlydaily", "App", "Assets.xcassets", "AppIcon.appiconset", "AppIcon.png")
real = Image.open(APP).convert("RGB")  # the shipped icon: square and opaque; iOS rounds it
for name, side in (("apple-touch-icon.png", 180), ("icon-192.png", 192), ("icon-512.png", 512)):
    real.resize((side, side), Image.LANCZOS).save(os.path.join(IMG, name), optimize=True)
print("favicons done")
