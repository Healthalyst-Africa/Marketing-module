# Homepage imagery

## Earlier healthcare collaboration illustration (not displayed)

- Asset: `apps/healthalyst-website/public/images/healthcare-collaboration.webp`.
- Origin: generated specifically for the Slice 3 prototype with the built-in
  OpenAI image generation tool. Mode: new image generation; no reference image.
- Date: 6 October 2026.
- Format: WebP, 960 × 1200 pixels, 175,402 bytes. Encoded from the original PNG
  using the Sharp dependency already available through Next.js. No image package
  was added to the repository.
- Previous placement: homepage hero. Retained as an earlier experiment; the
  current review uses the licensed healthcare photographs below.
- Alternative text: “Editorial illustration of a clinician and an operations
  professional reviewing a tablet in a healthcare setting.”
- Meaning: an illustrated healthcare context. The people, setting and tablet are
  fictional. This is not a photograph of staff, customers, an actual company
  office, patient information or a shipped product screen.
- The illustration retains its original colours across palette choices, as a
  raster image would. Surrounding surfaces, typography, controls and the ecosystem
  diagram follow the selected semantic palette.
- Approval: experimental imagery for the requested revamp. The product designer
  still decides the final visual direction. No stock-photo licence, real-person
  consent or company endorsement is claimed.

### Generation prompt

> Create one polished editorial illustration for the hero of HealthAlyst, an
> African institutional healthcare technology company. This is an
> illustration-story asset, not a website screenshot. Portrait canvas, 4:5 aspect
> ratio, full-bleed warm ivory paper background #F9F6F0. An art-directed contemporary
> print illustration with subtle risograph grain and hand-drawn ink texture,
> restrained forest green #183020, ochre gold #B8935A and warm sand #E2D9C8. Show a
> welcoming modern outpatient healthcare setting in Africa: two clearly
> illustrated African adult people, a clinician in a simple work coat and an
> institutional operations professional reviewing a closed, unlabelled tablet
> together at a desk; a palm-frond shadow through a tall arched window, a modest
> cabinet of laboratory bottles and a small potted plant. Faces simple but
> expressive and anatomically coherent, hands believable. Editorial composition
> with architectural geometry and tactile paper, beautiful clean negative space,
> sophisticated magazine cover quality, warm and humane. Not a generic flat SaaS
> cartoon, not isometric blocks, not 3D plastic, not photorealistic stock
> photography, no floating icons, no decorative confetti. No readable text,
> letters, logos, symbols, badges, numbers, charts, patient information or product
> screens anywhere. This illustrates the healthcare context; it must not imply a
> real company office, real staff, real customers or actual shipped software.
> Keep key subjects comfortably within frame so it crops well in a right-hand
> website hero column.

## Connected product diagram

The retained, currently unused shared `ConnectedSolutionsIllustration` renders a lightweight vector diagram
from the six existing product names. Lines show the already-described connected
ecosystem. It uses semantic theme colours, has an accessible description and does
not show invented application interfaces or real clinical records.

## Product symbols

The six product-detail panels use the existing Lucide icon library for scheduling,
laboratory, pharmacy, dental, imaging and supply contexts. These symbols are
decorative and hidden from assistive technology; headings and capabilities carry
the meaning. No additional icon dependency was introduced.

## Current photographic direction — 7 October 2026

These photographs illustrate healthcare settings. They do not depict Healthalyst
staff, offices, customers, endorsed services or real product screens. The images
keep their natural colours when the website palette changes.

| Asset                                 | Placement                                        | Source and photographer                                                                                               |
| ------------------------------------- | ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| `public/images/clinician-tablet.webp` | Hero; responsive cropped portrait, preloaded     | [Tima Miroshnichenko, Pexels](https://www.pexels.com/photo/a-braided-hair-woman-using-a-tablet-computer-5452188/)     |
| `public/images/clinical-team.webp`    | About section; responsive landscape, lazy loaded | [Cedric Fauntleroy, Pexels](https://www.pexels.com/photo/a-receptionist-and-a-practitioner-at-the-reception-4269274/) |

The [Pexels licence](https://www.pexels.com/license/) permits commercial website
use. No endorsement is implied. Both source photographs were downloaded from
Pexels and encoded as WebP using the existing Next.js Sharp dependency. No new
image dependency or remote image host is required. The Next.js application uses
responsive image optimisation; the private static Sites review serves these
already compressed local assets directly.

Alternative text describes the visible healthcare context. The product designer
still needs to approve the final photographic direction.

## Supplied company logo

The current identity uses the repository's `public/logo.jpg`. The header and
footer present its original gold mark through a constrained image viewport,
alongside a readable wordmark. The source image is unchanged. The deleted
replacement `logo.svg` has not been restored. Metadata now points to the supplied
JPEG rather than the missing SVG.
