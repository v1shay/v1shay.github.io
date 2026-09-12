# vishay-bakkum-site

A close behavioral recreation of the minimalist homepage aesthetic from
`bakks/bakks.github.io`, adapted for Vishay Agarwal.

## What is matched

- 94 × 20 Braille character render field
- one-refinement icosahedron geometry
- back-face culling
- orthographic projection
- wide Braille-cell rasterization
- 75 ms stepped animation cadence
- mouse-position-driven X/Y rotation
- reverse / 5× hover behavior over links
- `#8D54FF` → `#FF5471` row gradient
- original spacing and typography stack

The renderer in `target/ico.js` is a clean-room JavaScript reimplementation
of the public algorithm rather than a copy of the original minified bundle.

## Fonts

Font binaries are **not bundled**. The page references the public font files
used by the reference site remotely. The CSS contains fallbacks in case those
requests fail.

## Resume

Drop your current PDF at:

    resume.pdf

The homepage link already points there.

## Run

You can open `index.html` directly, or:

    python3 -m http.server 8000

Then visit:

    http://localhost:8000

## Deploy

The folder is static and works on GitHub Pages, Vercel, Netlify, or any plain
web server.

## Main content

Current public links used:

- GitHub: https://github.com/v1shay
- LinkedIn: https://www.linkedin.com/in/vishay-agarwal-a194a6416/
- Devpost: https://devpost.com/v1shay/challenges
- Email: v.agrwl17@gmail.com

Projects:

- archLLM
- Moonshot Robotics
- Erevna
- ML-Labs
