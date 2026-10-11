"""Polices statiques du rapport PDF (src/lib/pdf/fonts/*.ttf), à partir des WOFF2 du site.

Pourquoi : pdf-lib n'embarque que l'instance par défaut d'une police variable (Inter Tight et
JetBrains Mono le sont, axe wght) et attend des TTF. On fige donc les graisses utiles en TTF.
Hors ligne, une seule fois ; les TTF produits sont commités, puis
`node scripts/gen-pdf-assets.mjs` les encode dans src/lib/pdf/assets.generated.ts.

Reproduire (venv jetable) :
  python3 -m venv /tmp/ftvenv && /tmp/ftvenv/bin/pip install fonttools==4.60.1 brotli
  /tmp/ftvenv/bin/python scripts/pdf-assets/build-fonts.py
"""
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

ROOT = Path(__file__).resolve().parents[2]
SRC = ROOT / "public" / "fonts"
OUT = ROOT / "src" / "lib" / "pdf" / "fonts"
OUT.mkdir(parents=True, exist_ok=True)

JOBS = [
    ("instrument-serif-regular.woff2", None, "InstrumentSerif-Regular.ttf"),
    ("instrument-serif-italic.woff2", None, "InstrumentSerif-Italic.ttf"),
    ("inter-tight-regular.woff2", 400, "InterTight-Regular.ttf"),
    ("inter-tight-regular.woff2", 500, "InterTight-Medium.ttf"),
    ("inter-tight-regular.woff2", 600, "InterTight-SemiBold.ttf"),
    ("jetbrains-mono-regular.woff2", 400, "JetBrainsMono-Regular.ttf"),
    ("jetbrains-mono-regular.woff2", 600, "JetBrainsMono-SemiBold.ttf"),
]

for src, wght, out in JOBS:
    font = TTFont(SRC / src)
    if wght is not None:
        font = instancer.instantiateVariableFont(font, {"wght": wght}, updateFontNames=False)
    font.flavor = None
    font.save(OUT / out)
    print(f"{out}: {(OUT / out).stat().st_size} octets")
