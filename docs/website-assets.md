# Homepage imagery

## Removed: AI-generated healthcare collaboration image — 20 October 2026

`public/images/healthcare-collaboration.webp`, generated with an AI image
tool for the Slice 3 prototype and no longer displayed, was removed at the
user's request: the website uses real, openly licensed photographs, not
AI-generated images. It remains in Git history.

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

| Asset                                 | Placement                                                                                                              | Source and photographer                                                                                               |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `public/images/clinician-tablet.webp` | About us page, beside "What we do"; 4:5 portrait crop, lazy loaded (previously the homepage hero and the contact page) | [Tima Miroshnichenko, Pexels](https://www.pexels.com/photo/a-braided-hair-woman-using-a-tablet-computer-5452188/)     |
| `public/images/clinical-team.webp`    | About section; responsive landscape, lazy loaded                                                                       | [Cedric Fauntleroy, Pexels](https://www.pexels.com/photo/a-receptionist-and-a-practitioner-at-the-reception-4269274/) |

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

## Removed: unDraw illustrations — 20 October 2026

The unDraw illustrations once on the About page (institution cards and
implementation steps), with the scenery and the dental illustration adapted
from them, were removed at the user's request, who considers the style
outdated. `packages/icons/src/illustrations` and the
`@healthalyst/icons/illustrations` export no longer exist. The site uses real,
openly licensed photographs instead of illustrations.

## Images without a recorded source — 19 October 2026

`public/images/doctor-at-clinic.webp` (homepage hero) and
`public/images/clinical-team.webp` (homepage about section) are in use but are
not recorded above. The about-section alternative text and the Pexels entry
for `clinical-team.webp` describe different scenes. Record the source, licence
and photographer for both, or replace them, before release.
