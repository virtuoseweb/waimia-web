#!/usr/bin/env python3
"""Rétro-ingénierie du filtre duotone Waimia.

Compare chaque original public/images/illustrations/<slug>.(webp|jpg) à ses variantes
ds/<slug>-paper.webp et ds/<slug>-ink.webp, calcule pour chaque niveau de luminance
(Rec.709, 0-255) la couleur médiane obtenue, interpole les trous, lisse (fenêtre 9) et
écrit scripts/illustrations/duotone-lut.json. Dépendance : Pillow.
"""
import glob, json, os, statistics as st
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
ILL = os.path.join(ROOT, 'public/images/illustrations')

def pixels(im):
    return im.get_flattened_data() if hasattr(im, 'get_flattened_data') else im.getdata()

acc = {'paper': [[] for _ in range(256)], 'ink': [[] for _ in range(256)]}
for f in sorted(glob.glob(os.path.join(ILL, '*'))):
    if not os.path.isfile(f):
        continue
    slug = os.path.splitext(os.path.basename(f))[0]
    o = Image.open(f).convert('RGB')
    for v in acc:
        p_path = os.path.join(ILL, 'ds', f'{slug}-{v}.webp')
        if not os.path.exists(p_path):
            continue
        p = Image.open(p_path).convert('RGB')
        small = (p.size[0] // 4, p.size[1] // 4)
        for a, b in zip(pixels(o.resize(small)), pixels(p.resize(small))):
            acc[v][round(0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2])].append(b)

lut = {}
for v, arr in acc.items():
    known = {L: tuple(int(st.median([c[i] for c in bs])) for i in range(3)) for L, bs in enumerate(arr) if len(bs) >= 30}
    ks = sorted(known)
    out = []
    for L in range(256):
        if L in known:
            out.append(known[L]); continue
        lo = max([k for k in ks if k < L], default=ks[0]); hi = min([k for k in ks if k > L], default=ks[-1])
        t = 0 if hi == lo else (L - lo) / (hi - lo)
        out.append(tuple(round(known[lo][i] + (known[hi][i] - known[lo][i]) * t) for i in range(3)))
    lut[v] = [[round(sum(c[i] for c in out[max(0, L - 4):L + 5]) / len(out[max(0, L - 4):L + 5])) for i in range(3)] for L in range(256)]

with open(os.path.join(ROOT, 'scripts/illustrations/duotone-lut.json'), 'w') as fh:
    json.dump({'$comment': 'LUT duotone Waimia (luminance Rec.709 0-255 -> RGB), rétro-ingénierée sur les paires public/images/illustrations/ds. Régénérer : python3 scripts/illustrations/fit-lut.py', **lut}, fh)
print('ok', {v: (lut[v][0], lut[v][128], lut[v][255]) for v in lut})
