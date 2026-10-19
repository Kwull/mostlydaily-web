#!/usr/bin/env python3
"""The App Store screenshots used on the home page (Home Screen with widgets, Who you're becoming), as 900 px JPEGs.

  python3 tools/store_images.py <dark-dir> <light-dir>

<dark-dir> is the app repo's docs/appstore/screenshots/en (2-widgets.jpg, 5-identity.jpg, made by tools/screens/appstore.sh,
dark appearance); <light-dir> holds the same screens captured in light appearance (the same script with
`simctl ui <udid> appearance light`, framed by tools/screens/appstore.swift: 2-widgets.jpg, 5-identity.jpg).
Writes assets/img/store-<name>.jpg (light) and store-<name>-dark.jpg; run tools/images.py afterwards for the WebP copies.
"""
import os, sys
from PIL import Image

IMG = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "assets", "img")
NAMES = {"2-widgets": "store-widgets", "5-identity": "store-identity"}

if len(sys.argv) != 3:
    sys.exit(__doc__)
for folder, suffix in ((sys.argv[1], "-dark"), (sys.argv[2], "")):
    for src, name in NAMES.items():
        im = Image.open(os.path.join(folder, src + ".jpg")).convert("RGB")
        im = im.resize((900, round(im.height * 900 / im.width)), Image.LANCZOS)
        out = os.path.join(IMG, name + suffix + ".jpg")
        im.save(out, "JPEG", quality=78, optimize=True, progressive=True)
        print(out, im.size, os.path.getsize(out) // 1024, "KB")
