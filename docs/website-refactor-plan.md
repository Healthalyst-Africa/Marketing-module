# Website refactor plan

Drafted 20 October 2026 for approval before any page is rebuilt. It applies
the layout and section-arrangement lessons from MyCover Genius
(`docs/design-case-studies.md`, section 6) to HealthAlyst's own identity:
the forest, gold, cream and sand palette, Inter, real openly licensed
photographs, no illustrations, no AI imagery, and only approved claims.

Nothing in this plan copies MyCover Genius's visual design, colours,
typography or copy. We take the order of sections and the way each section
is arranged.

## 1. Where things stand

Already changed this session, before the instruction to plan first. Each
can be kept or reverted:

| Change                                                                                                                    | Status             |
| ------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| `MarketingIconBadge` (thin ring, no fill) applied to the Solutions menu, About hub diagram, homepage products, office map | Built, uncommitted |
| unDraw illustrations and the `@healthalyst/icons/illustrations` export deleted                                            | Done, as asked     |
| AI-generated `healthcare-collaboration.webp` deleted (not displayed)                                                      | Done, as asked     |
| About page: hub diagram in place of cards and steps; contact page office map                                              | Built, uncommitted |
| Four Pexels photographs approved for download                                                                             | **Not downloaded** |

Content that blocks parts of the plan:

- `STATISTICS` claims "54+ African Nations" and "100% African-Context
  Design"; no evidence is recorded. Needs an accountable owner's
  confirmation or removal.
- "Institution-grade security … international health data protection
  standards" has no recorded certification.
- No approved customer logos, testimonials, partners, investors, team names
  or product screenshots exist, so the matching MyCover Genius sections are
  left out until they do.
- `doctor-at-clinic.webp` and `clinical-team.webp` (homepage) have no
  recorded source.

## 2. Principles taken from the study

1. **People, not drawings.** Real photographs of African health workers at
   work carry the pages; icons stay small and functional.
2. **One idea per section, centred openings.** Each section opens with a
   centred heading and one sentence, then one arrangement: a list beside a
   photograph, a tabbed group, three steps, or a band.
3. **Rhythm of surfaces.** White sections alternate with one brand-green
   band and one cream band per page, so the eye gets a break without
   decorative lines.
4. **One primary action per section**, repeated at the end in a closing
   band beside a photograph.
5. **Ringed icons everywhere content needs an icon**, one colour family.
6. **Leave out what we cannot support** (logos, testimonials, backers)
   instead of filling the space.

## 3. Shared building blocks (packages/ui)

Built once, reused across pages. Existing components are reused where they
already fit.

| Block                            | Arrangement                                                                                                                                                                            | Status                               |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| `MarketingIconBadge`             | Ringed icon, three sizes                                                                                                                                                               | Built                                |
| Hero with photo row              | Brand-green band, centred headline with the audience word changing (respects reduced motion), one action and a text link; three portrait photographs rising over the band's lower edge | New                                  |
| Benefit list beside a photograph | Left: list of benefits, one expanded at a time (accordion semantics); right: one photograph in a rounded frame                                                                         | New, built on the shared Accordion   |
| Tabbed product group             | Pill tabs over a band of product cards                                                                                                                                                 | Adapt the existing product catalogue |
| Numbered steps                   | Three or four columns: large outlined numeral, ringed icon, title, sentence; one action under                                                                                          | New (simple; no auto-advance)        |
| Hub diagram                      | Already built (About)                                                                                                                                                                  | Built                                |
| Closing band with photograph     | Dark green band, heading, sentence, two actions, one photograph                                                                                                                        | New                                  |
| Two-column FAQ                   | Heading and line left, accordion right                                                                                                                                                 | Adapt the existing FAQ               |
| Office map                       | Already built (Contact)                                                                                                                                                                | Built                                |

To remove once the new blocks land: `marketing-card-grid`,
`marketing-step-showcase` and the Tabs variants made for it, and any
homepage section component the new layout no longer uses.

## 4. Page by page

### Homepage

Decided 20 October 2026: the statistics bar is removed (its figures cannot
be verified). Section by section, top to bottom, with the components each
one uses. "New" means a new shared composition in `packages/ui`; every
moving part respects reduced motion and any loop longer than five seconds
has a pause control.

| #   | Section                          | Surface                | What it shows                                                                                                                                                                                                                                                               | Components                                                                                                                                                                                                                                                                                                         | MyCover Genius idea it follows                                                                              |
| --- | -------------------------------- | ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------- |
| 1   | **Hero**                         | Brand green band       | "Digital infrastructure for **hospitals** / laboratories / pharmacies / dental practices / imaging centres / medical suppliers", one sentence, "Talk to our team", a "See our products" text link                                                                           | Text rotator (new; the word slides and fades every 2.5 s, static under reduced motion, full list read once by screen readers); `ActionLink` pill; care-network pattern (existing); **photo row** (new): three portrait photographs rising over the band's lower edge, centre one taller, staggered fade-up on load | Rotating audience word; photo trio over the hero edge                                                       |
| 2   | **Built for** strip              | White                  | Six institution chips, each a ringed icon and name, linking to that tab in section 4                                                                                                                                                                                        | Chip row (new) with `MarketingIconBadge`; horizontal scroll with snap on phones                                                                                                                                                                                                                                    | Logo strip under the hero (we have no logos, so institutions take its place)                                |
| 3   | **Why HealthAlyst**              | White                  | The four approved pillars. One opens at a time with its paragraph; the photograph beside it crossfades to match, with a small floating card of approved facts (for example "Works offline", "SMS fallback")                                                                 | Accordion (shared, single open) driving a crossfading photograph frame (new); floating glass card with chips (new); optional auto-advance every 6 s with a pause control, stopping when the visitor chooses an item                                                                                                | Expanding benefit list beside a photograph with a floating card                                             |
| 4   | **Product suite**                | Brand green band       | Pill tabs by need: **Care delivery** (HealthSchedule, DentaFlow), **Diagnostics** (LabConnect, ImagingHub), **Medicines and supply** (PharmaDesk, MedSupply). Each product card: large ringed icon, name, one line, a tick list of approved capabilities, "Enquire about …" | Tabs (shared, pill variant); product cards (adapt `product-catalogue`) with a faint oversized product icon as a corner watermark; on phones the cards become a swipeable **carousel** with dots                                                                                                                    | Pill tabs over a band of plan cards with a watermark motif                                                  |
| 5   | **One connected ecosystem**      | White, faint gold glow | The six products around the HealthAlyst hub; the signal travels between them, then a caption plays the approved example: "A laboratory result processed in LabConnect flows into HealthSchedule"                                                                            | **Animated hub diagram** (built), extended so a signal can run product to product along the hub, with the caption changing in step; pause control                                                                                                                                                                  | MyCover.ai's sector diagram (the user's reference)                                                          |
| 6   | **How we work**                  | White                  | Four stages: understand your workflows, fit the product, connect and automate, train and support; one action under                                                                                                                                                          | **Numbered steps** (new): large outlined numerals, ringed icons, title, sentence; a gold progress line draws across the four as the section scrolls into view (static under reduced motion); stacks vertically on phones                                                                                           | "Get started in 3 simple steps"                                                                             |
| 7   | **Built for African conditions** | Cream band             | Feature cards from the approved pillar copy: offline-first, low bandwidth, SMS and USSD fallback, multilingual, single facility to continent-wide. Each card: text on the left, a real photograph of the setting on the right                                               | Filter chips that jump the carousel (new) over a horizontal **carousel** (shadcn Carousel / Embla, to install in `packages/ui`) with previous and next buttons, keyboard arrows and visible focus                                                                                                                  | "It's all digital" chip-filtered carousel (photographs instead of product screens until real screens exist) |
| 8   | **Statement**                    | White                  | One oversized line, for example "Built in Africa, for African healthcare.", revealed word by word on scroll, with the company's mission sentence under it                                                                                                                   | Scroll-reveal display text (new; plain text without motion, one heading for assistive technology)                                                                                                                                                                                                                  | The oversized "It Works!" word (without testimonials, which we do not have)                                 |
| 9   | **Questions**                    | White                  | Heading and one line on the left, the existing approved FAQ on the right                                                                                                                                                                                                    | Two-column FAQ (adapt `marketing-faq`), Accordion                                                                                                                                                                                                                                                                  | Two-column FAQ                                                                                              |
| 10  | **Talk to our team**             | Dark green band        | Heading, one sentence, "Contact us" and "Start a partnership enquiry", a photograph of a clinical team on the right with a gold accent shape behind it                                                                                                                      | Closing band (adapt `marketing-closing-band`) with photo frame; care-network pattern on the left                                                                                                                                                                                                                   | Dark closing band with a team photograph                                                                    |
| —   | Footer                           | —                      | Unchanged                                                                                                                                                                                                                                                                   | `MarketingFooter`                                                                                                                                                                                                                                                                                                  | —                                                                                                           |

Left out until real material exists: customer logos (section 2 uses
institution types instead), testimonials (section 8 uses a statement
instead), backers and partners, product screenshots (section 7 uses
photographs instead).

New primitives and compositions this needs: shadcn **Carousel** (Embla;
new dependency declared in `packages/ui`), text rotator, photo row,
crossfading photograph frame with floating card, chip row, numbered steps
with progress line, scroll-reveal statement, and an extended hub diagram.
Photographs needed: about eight (three for the hero, four for section 3,
five for section 7, one for section 10; some can repeat).

### About us

| Order | Today                                  | Planned                                                                          |
| ----- | -------------------------------------- | -------------------------------------------------------------------------------- |
| 1     | Green page header with network pattern | Keep                                                                             |
| 2     | What we do beside a photograph         | Keep; replace the photograph only if the photo set changes                       |
| 3     | Who we build for (hub diagram)         | Keep                                                                             |
| 4     | What guides our work (record list)     | **Benefit list beside a photograph** (shared with the homepage, different photo) |
| 5     | Talk to our team                       | **Closing band with photograph**                                                 |

### Contact us

Keep the header, form and side column. The office map stays above the
footer. Only the icons change (already done).

### Header and footer

- Solutions menu: three columns grouped by need (for example care
  delivery, diagnostics, supply and pharmacy), ringed icons, and a
  photograph with one line and "Talk to our team" on the right, following
  the products-menu arrangement. Groupings need approval.
- Footer: unchanged structure; check every link still lands.

### Later pages (not in this refactor)

One page per product or institution type, built from the same blocks:
hero, benefit list, numbered steps, FAQ, closing band. Only once each
product's approved content exists.

## 5. Photography

Openly licensed, real photographs only (Pexels, Unsplash, nappy, Wikimedia
Commons), each recorded in `docs/website-assets.md` with source,
photographer, licence, placement and alternative text, and never presented
as HealthAlyst staff or customers.

| Placement                                   | Candidate (approved to download)                                                     | Photographer        |
| ------------------------------------------- | ------------------------------------------------------------------------------------ | ------------------- |
| Homepage hero, centre                       | Doctors collaborating with a tablet (pexels.com/photo/5452224)                       | Tima Miroshnichenko |
| Homepage hero, left                         | Scientist at a microscope (pexels.com/photo/5721681)                                 | cottonbro studio    |
| Homepage hero, right or pharmacy tab        | Customers at a pharmacy in Lagos (pexels.com/photo/30678215)                         | Ninthgrid           |
| Benefit list (homepage)                     | Doctors discussing cases (pexels.com/photo/5452189)                                  | Tima Miroshnichenko |
| About "What guides our work", closing bands | To choose: two or three more (nurse in a hospital corridor, a team meeting, imaging) | —                   |

The two homepage photographs without a recorded source are retired when
these land.

## 6. Order of work

Each phase ends with `pnpm test-all` and a browser check on desktop and at
375 px (keyboard, reduced motion, no horizontal overflow, console clean),
and is shown to the user before the next starts.

1. **Decisions** (section 7) and content confirmations (section 1).
2. **Photographs:** download, optimise to WebP, record in the asset
   register.
3. **Shared blocks:** hero with photo row, benefit list, numbered steps,
   closing band; adapt product group and FAQ.
4. **Homepage** in the planned order.
5. **About** sections 4 and 5.
6. **Header Solutions menu** regrouping.
7. **Clean-up:** remove unused components and data; update `DESIGN.md`,
   the UI package README and the revamp log.

## 7. Decisions needed

1. Keep or revert the changes already made (section 1).
2. ~~Remove the statistics bar, or confirm its figures.~~ Decided: removed.
3. The rotating hero word: yes or no.
4. Homepage section 6: hub diagram teaser, or a simple link to About.
5. Solutions menu groupings.
6. Whether the homepage "How we work" should use the new four
   health-organisation stages.
7. Two or three more photographs for About and the closing bands.
