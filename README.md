# Riya Fashion Center

## Run the website locally

1. Install Node.js if it is not already installed.
2. Open a terminal in this project folder and run `node server.js`.
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

Do not open `r2.html` directly as a file. The local server scans the `photos/`
folders and supplies those images to the galleries.

## Publish on GitHub Pages

Set the Pages source to the `main` branch and `/(root)`. The site URL is
`https://soundharya01.github.io/Riya-fashion-center/`; no custom domain is
required. Remove any custom domain from Pages settings unless you own and
configured it.

Before pushing photo or website changes, run `node build-pages.js`. This creates
the root `index.html` and `photos.json` needed by Pages. GitHub Pages is static:
visitors can browse the galleries, but admin changes cannot be saved there.
Make updates locally, rebuild, and push the generated files.

## Add photos

Copy image files into the matching folder below, then refresh the website. Image
names are sorted naturally (for example, `image2.jpg` appears before `image10.jpg`).

| Website section | Photo folder |
| --- | --- |
| Chudi → Neck Design (Front design option) | `photos/chudi/front-neck/` |
| Chudi → Neck Design (Back design option) | `photos/chudi/back-neck/` |
| Chudi → Chudi Pattern Cutting | `photos/chudi/pattern-cutting/` |
| Chudi → Pant Design | `photos/chudi/pant-design/` |
| Blouse → Bridal Collection – Front | `photos/blouse/bridal-collection/front/` |
| Blouse → Bridal Collection – Back | `photos/blouse/bridal-collection/back/` |
| Blouse → Simple Blouse | `photos/blouse/simple-blouse/` |
| Blouse → Aari Work | `photos/blouse/aari-work/` |
| Blouse → Designer Blouse (Front design option) | `photos/blouse/design/front/` |
| Blouse → Designer Blouse (Back design option) | `photos/blouse/design/back/` |
| Blouse → Lace Design | `photos/blouse/lace-design/` |
| Lehanga → Lehanga Designs | `photos/lehanga/design/` |
| Hand Design → Hand Designs | `photos/Hand-design/design/` |

Chudi Neck Design, Bridal Collection, and Designer Blouse each appear as a
single section card. Open a card and use the Front design / Back design options
to switch between their respective photo folders.

Use `photos/chudi/cover/` and `photos/blouse/cover/` for the collection cover
images. Lehanga uses its first design photo as its cover, and Hand Design uses
`photos/Hand-design/image5.jpg`. Supported formats include JPG/JPEG, PNG, GIF,
WebP, JFIF, and BMP.
