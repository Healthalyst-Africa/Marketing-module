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

## Homepage photographs — 20 October 2026

Downloaded from Pexels on 20 October 2026 with the user's approval and
encoded as WebP with the existing Sharp dependency. Licence:
[Pexels licence](https://www.pexels.com/license/), free commercial use, no
attribution required, no endorsement implied. None of them depicts
Healthalyst staff, customers, offices or products.

### Hero backgrounds (one per institution type)

Decorative backgrounds behind the hero's rotating word (empty alternative
text; the heading carries the meaning), 2000 × 1125 (16:9), under a
brand-colour wash.

| Asset                  | Word              | Crop from the original                                                                                                     | Source and photographer                                                                                                                                                         |
| ---------------------- | ----------------- | -------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `hero-hospital.webp`   | hospitals         | 2400 × 1350 from y 125                                                                                                     | [RDNE Stock project, Pexels](https://www.pexels.com/photo/a-doctor-reading-a-document-6129198/)                                                                                 |
| `hero-laboratory.webp` | laboratories      | 2000 × 1125 from y 450 (close-up)                                                                                          | [cottonbro studio, Pexels](https://www.pexels.com/photo/a-woman-looking-through-a-microscope-5721681/)                                                                          |
| `hero-pharmacy.webp`   | pharmacies        | 2000 × 1125 from y 104                                                                                                     | [Ninthgrid, Pexels](https://www.pexels.com/photo/african-customers-shopping-in-lagos-pharmacy-30678215/) (Lagos)                                                                |
| `hero-dental.webp`     | dental practices  | full frame                                                                                                                 | [Shedrack Salami, Pexels](https://www.pexels.com/photo/dentist-in-medical-uniform-curing-patient-teeth-in-clinic-16903641/) (Lagos clinic; the patient's face is mostly hidden) |
| `hero-imaging.webp`    | imaging centres   | 2400 × 1350 from y 125                                                                                                     | [Tima Miroshnichenko, Pexels](https://www.pexels.com/photo/a-woman-operating-the-machine-6234990/)                                                                              |
| `hero-supply.webp`     | medical suppliers | 1850 × 1040 from x 160, y 560, below the original's retailer signs (Walmart, Sams Mexico), so no third-party brand appears | [EqualStock IN, Pexels](https://www.pexels.com/photo/warehouse-worker-organizing-inventory-shelves-31112251/)                                                                   |

### Section photographs

| Asset                           | Size, bytes         | Placement                       | Source and photographer                                                                                                    |
| ------------------------------- | ------------------- | ------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `doctors-reviewing-tablet.webp` | 1000 × 1250, 64,048 | "Why HealthAlyst" (partnership) | [Tima Miroshnichenko, Pexels](https://www.pexels.com/photo/woman-in-white-button-up-long-sleeve-shirt-5452224/)            |
| `doctors-discussing.webp`       | 1600 × 1067, 93,600 | "Why HealthAlyst", closing band | [Tima Miroshnichenko, Pexels](https://www.pexels.com/photo/men-in-white-coat-standing-beside-woman-in-white-coat-5452189/) |

The Lagos pharmacy photograph shows customers, not pharmacy staff. "Why
HealthAlyst" also shows `hero-dental.webp` (infrastructure) and
`clinician-tablet.webp` (security). The portrait crops made
for the earlier three-photograph hero were removed with it.

## Testimonial avatars (development samples) — 20 October 2026

160 × 160 WebP face crops for the sample testimonials, shown in development
only (`isApproved: false`). The people pictured are stock models, not the
invented names beside them; replace both with real, permissioned portraits
when approved testimonials arrive.

| File                             | Bytes | Crop of                                                        | Source                                                                                                                     |
| -------------------------------- | ----- | -------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `testimonial-adaeze-okafor.webp` | 2,210 | `clinician-tablet.webp`                                        | [Tima Miroshnichenko, Pexels](https://www.pexels.com/photo/a-braided-hair-woman-using-a-tablet-computer-5452188/)          |
| `testimonial-kwame-mensah.webp`  | 2,570 | `doctors-discussing.webp` (the doctor on the right)            | [Tima Miroshnichenko, Pexels](https://www.pexels.com/photo/men-in-white-coat-standing-beside-woman-in-white-coat-5452189/) |
| `testimonial-fatima-bello.webp`  | 2,716 | Downloaded with the user's approval (800 × 1120, 56,602 bytes) | [G star Media, Pexels](https://www.pexels.com/photo/female-pharmacist-holding-medication-packages-38774686/)               |

## Leadership portraits (development samples) — 29 October 2026

640 × 800 (4:5) WebP crops in `public/images/team/` for the sample leadership
cards on the About page, shown in development only (`isApproved: false`). The
people pictured are stock models, not Healthalyst staff, and the cards carry
placeholder names (shown unlabelled, in development only); replace both with real, permissioned portraits of the team.
Cropped with sharp from photographs already in the site; nothing new was
downloaded.

| File                       | Bytes  | Crop of                                              | Source                                                                                                                     |
| -------------------------- | ------ | ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `sample-leader-one.webp`   | 43,142 | `hero-hospital.webp` (the doctor with a folder)      | [RDNE Stock project, Pexels](https://www.pexels.com/photo/a-doctor-reading-a-document-6129198/)                            |
| `sample-leader-two.webp`   | 22,460 | `doctors-discussing.webp` (the doctor in the centre) | [Tima Miroshnichenko, Pexels](https://www.pexels.com/photo/men-in-white-coat-standing-beside-woman-in-white-coat-5452189/) |
| `sample-leader-three.webp` | 20,862 | `doctors-discussing.webp` (the doctor on the right)  | [Tima Miroshnichenko, Pexels](https://www.pexels.com/photo/men-in-white-coat-standing-beside-woman-in-white-coat-5452189/) |
| `sample-leader-four.webp`  | 30,582 | `clinician-tablet.webp`                              | [Tima Miroshnichenko, Pexels](https://www.pexels.com/photo/a-braided-hair-woman-using-a-tablet-computer-5452188/)          |

## "Why HealthAlyst" pillar photographs — 20 October 2026

Chosen at the user's request to represent each pillar, downloaded with the
user's approval from Pexels (free licence) at 1600 px wide and converted to
1400 px WebP. Each has a focus point (`focus` in `data/principles.ts`) that
keeps its subject in view when the story's frame crops it. They replace
`hero-dental.webp`, `doctors-discussing.webp`, `clinician-tablet.webp` and
`doctors-reviewing-tablet.webp` in the story; the first three are still used
elsewhere, and `doctors-reviewing-tablet.webp` is now unused.

| File                                 | Size, bytes          | Pillar                       | Source                                                                                                                                       |
| ------------------------------------ | -------------------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `pillar-african-infrastructure.webp` | 1400 × 1049, 115,564 | African infrastructure first | [mk_photoz, Pexels](https://www.pexels.com/photo/community-medical-outreach-in-kaduna-nigeria-33127835/)                                     |
| `pillar-interoperability.webp`       | 1400 × 934, 74,882   | Interoperable by design      | [Thirdman, Pexels](https://www.pexels.com/photo/healthcare-professionals-working-on-their-gadgets-while-sitting-next-to-each-other-5327654/) |
| `pillar-security.webp`               | 1400 × 934, 62,406   | Institution-grade security   | [RDNE Stock project, Pexels](https://www.pexels.com/photo/a-nurse-typing-on-a-keyboard-while-sitting-6129037/)                               |
| `pillar-partnership.webp`            | 1400 × 932, 210,196  | Long-term partnership        | [Lagos Food Bank Initiative, Pexels](https://www.pexels.com/photo/doctor-educating-elderly-women-8248290/)                                   |

The partnership photograph shows community health education, not staff
training; replace it if a training image is preferred.

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
