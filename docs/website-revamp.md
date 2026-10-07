# HealthAlyst website revamp

## Working record

Updated: 6 October 2026. Branch: `revamp`.

Slice 1 is the content inventory and design direction. This document is the
maintained brief for the remaining slices. Its visual directions are proposals
for experimentation; the product designer makes the final design decision.
Recording a proposal does not establish design approval or release approval.

### Delivery sequence

| Slice | Outcome                                                                                           | Current status                                                  |
| ----- | ------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| 1     | Content baseline, route map, reusable component ownership, visual direction and palette proposals | Documented; Slice 2 authorised                                  |
| 2     | Semantic design tokens and `/control-panel`                                                       | Implemented; ready for user review                              |
| 3     | Homepage revamp and appropriate imagery                                                           | Implemented; ready for user review                              |
| 4     | Contact and partnership pages with accessible form journeys                                       | Awaiting instruction                                            |
| 5     | Terms, privacy and careers pages with approved company content                                    | Awaiting instruction and content                                |
| 6     | Contact submissions saved to Neon through the Next.js application                                 | Implemented; schema applied and live-verified on 7 October 2026 |
| 7     | Partnership submissions saved through the same enquiry foundation                                 | Awaiting instruction                                            |
| 8     | Review of routes, palettes, responsive behaviour, accessibility and integrations                  | Awaiting instruction                                            |

Complete only the slice the user authorises. Update this record after each slice.

## Scope and constraints

HealthAlyst is an institutional health technology company. Visitors need to
understand the six products, determine suitability for their institution, and
contact the company or propose a partnership. This is the marketing website;
patient booking, patient accounts and clinical dashboards are outside its scope.

- Preserve existing marketing wording, product names, numbers, audiences,
  descriptions, capabilities, process steps, questions and answers.
- Preserve the current forest, gold, cream and sand palette as the default.
- Use sentence case for interface labels. Remove forced uppercase styling and
  convert literal uppercase interface labels to sentence case without changing
  their meaning. Preserve proper product names and the supplied logo identity.
- Use meaningful imagery, deliberate typography and varied section compositions.
  Avoid unnecessary badges, decorative tags, emoji and mixed colourful bullets.
- Every new or reworked reusable visual component must come through the shared
  `@healthalyst/ui` package and compose the shared shadcn foundation.
- Use the existing Next.js application for server-side work. Add only dependencies
  required by the authorised slice.
- Experiments remain subject to the product designer's final decision.

## Evidence baseline

The working tree was clean when Slice 1 started. The baseline revision is
`b728a6604226b07b833f61b277168af79c6b03aa`. It retains the original source wording
even after sections move or components are replaced. For example:

```sh
git show b728a6604226b07b833f61b277168af79c6b03aa:apps/healthalyst-website/src/data/products.ts
```

Source inspection establishes the implementation below; it does not establish
the accuracy of company claims. Desktop visual observations from the preceding
research inform the design direction. No new browser journey audit was performed
for this document.

### Content inventory

All source paths in this table are relative to
`apps/healthalyst-website/src`. Preserve complete source content at the baseline
revision, including content hidden behind product selections or accordions.

| Content                     | Baseline source                                                                                                       | Preservation requirement                                                                                           |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Hero                        | `app/(homepage)/_components/home/hero.tsx`                                                                            | Keep headline, both paragraphs, both actions and all six product names                                             |
| Statistics                  | `data/site.ts`: `STATISTICS`                                                                                          | Keep four values: 6, 54+, 100% and 1; retain their labels and supporting text                                      |
| Product introduction        | `app/(homepage)/_components/home/what-we-build.tsx`                                                                   | Keep heading and both explanatory paragraphs                                                                       |
| Product definitions         | `data/products.ts`: `PRODUCTS`                                                                                        | Keep six names, numbers, categories, headlines, supporting headlines, descriptions, audiences and every capability |
| Product detail introduction | `app/(homepage)/_components/home/products-dive.tsx`                                                                   | Keep introductory wording, enquiry action, audience context and interoperability wording                           |
| Implementation introduction | `app/(homepage)/_components/home/how-we-work.tsx`                                                                     | Keep heading, explanatory paragraph, next-step actions and final conversation action                               |
| Implementation stages       | `data/steps.ts`: `STEPS`                                                                                              | Keep four stage titles, headlines and complete body text                                                           |
| About                       | `app/(homepage)/_components/home/about.tsx`                                                                           | Keep heading, quote, three paragraphs and partnership action                                                       |
| Approach                    | `data/site.ts`: `PILLARS`                                                                                             | Keep all four titles and bodies; their decorative glyphs may be replaced                                           |
| Questions                   | `data/faqs.ts`: `FAQS`                                                                                                | Keep all six questions and full answers                                                                            |
| Contact                     | `app/(homepage)/_components/home/contact.tsx`                                                                         | Keep heading, introduction, enquiry prompt, field meanings, action and response-time statement                     |
| Institution descriptions    | `data/site.ts`: `INSTITUTIONS`                                                                                        | Keep six institution-to-product mappings and descriptions                                                          |
| Form options                | `data/site.ts`: `CONTACT_REPRESENTATION_OPTIONS`, `CONTACT_PRODUCT_OPTIONS`; `data/products.ts`                       | Keep all organisation and product choices, including partnership and investment enquiries                          |
| Navigation                  | `data/site.ts`, `app/(homepage)/_components/header.tsx`                                                               | Keep existing destination meanings; add the requested routes                                                       |
| Footer                      | `app/(homepage)/_components/footer.tsx`, `data/site.ts`                                                               | Keep company positioning, product names, existing link meanings and copyright wording                              |
| Metadata and logo           | `app/layout.tsx`, `app/(homepage)/page.tsx`, `components/layout/logo.tsx`; `../public/logo.svg`, `../public/logo.jpg` | Preserve company identity and existing descriptions; give new routes their own canonical addresses                 |

The six products remain HealthSchedule, LabConnect, PharmaDesk, DentaFlow,
ImagingHub and MedSupply. The four process stages remain Discovery & Scoping,
Design & Architecture, Build & Integration, and Launch & Continuous Improvement.

### Content preservation procedure

1. Compare moved content against the baseline revision rather than only the
   immediately preceding diff.
2. Compare every product, process stage and expanded answer, not only initially
   visible content.
3. Treat line wrapping, whitespace and sentence-case label presentation as visual
   changes. Preserve wording and proper names.
4. Record any requested wording change separately for company approval. Do not
   rewrite a sentence simply to fit a layout.
5. Do not introduce customer stories, adoption figures, clinical outcomes,
   certifications, vacancies or product screenshots represented as real evidence.

Existing statements about production readiness, security, interoperability,
coverage and response times need company confirmation. They are existing copy,
not evidence independently verified by this revamp. Preserve them and flag their
ownership rather than inventing stronger claims.

## Existing interactions and gaps

| Journey               | Observed implementation                                                               | Target contract                                                                                                           |
| --------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Header navigation     | Buttons scroll to homepage section identifiers                                        | Use real route/anchor links; preserve navigation from every page                                                          |
| Product exploration   | Hero, product cards and footer update shared product state, then scroll to `products` | Retain selected product and all associated detail; support browser history and direct links                               |
| Product enquiry       | Scrolls to contact without carrying the selected product into the form                | Open `/contact` with the selected product prefilled; allow the visitor to change it                                       |
| Process exploration   | Four selectable stages; next action advances; final action scrolls to contact         | Preserve sequence, content and final enquiry destination                                                                  |
| About and partnership | Partnership actions scroll to the same contact section                                | Open the dedicated `/partner-with-us` journey                                                                             |
| Questions             | Shared Accordion supports one expanded answer and collapsing                          | Retain all answers and shared accessible accordion behaviour                                                              |
| Contact submission    | `preventDefault()` stops submission; there is no database write                       | Confirm success only after a server-side save; retain entered data on failure                                             |
| Contact fields        | Placeholder-based fields, two selects, optional phone and message                     | Persistent labels, named controls, explicit validation and accessible errors                                              |
| Footer company links  | All company buttons scroll to about, including Careers and Press & Media              | Careers gets `/careers`; About/Our approach use valid homepage anchors; unresolved destinations require company direction |
| Footer connect links  | All connect buttons scroll to contact                                                 | Contact/Support/Investor relations use contact with appropriate enquiry context; partnership uses its dedicated page      |
| Mobile navigation     | Custom conditionally rendered menu                                                    | Compose a shared shadcn Sheet with labelled trigger, focus handling and close-on-navigation                               |
| Theme selection       | No control panel; many fixed colours and transparency-based text styles               | Apply a validated preset consistently through semantic tokens                                                             |

Current shared product selection is not persisted across reloads. The proposed
navigation change adds explicit product context to links; it does not change
product definitions or imply a working clinical product.

## Route and navigation map

These routes are planned, not implemented in Slice 1.

| Route                   | Purpose and content                                                                         | Entry points                                                                 |
| ----------------------- | ------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `/`                     | Existing hero, statistics, product overview/details, process, about, approach and questions | Logo and home links                                                          |
| `/contact`              | Existing contact introduction, institution descriptions and enquiry fields                  | Contact, speak-to-team, product enquiry, support and investor links          |
| `/partner-with-us`      | Partnership enquiry using existing partnership meaning and reused form fields               | Header/about partnership actions and footer Partners/Partnership enquiries   |
| `/terms-and-conditions` | Approved terms in a readable document layout                                                | Footer legal navigation                                                      |
| `/privacy-policy`       | Approved privacy policy reflecting actual enquiry storage and processing                    | Footer and form privacy links                                                |
| `/careers`              | Approved careers material and confirmed recruitment destinations                            | Existing Careers link                                                        |
| `/control-panel`        | Experimental design presets and reusable component previews                                 | Direct presentation link; exclude from public navigation and search indexing |

Keep existing homepage identifiers `products`, `what-we-build`, `how-we-work`,
`about` and `faq`. Links from other pages use `/#products` and equivalent anchors.
Avoid duplicate page-level headings or inherited homepage canonical addresses.

Retain `/#contact` as a compatibility entry and short enquiry invitation when the
full form moves. Existing visitors can still find a clear link to `/contact`.
The contact page contains the complete preserved introduction and institution
list. Do not create separate product routes in this scope.

Keep the existing navigation meaning: Products, What we build, How we work, About,
Contact and Partner with us. Put careers and policy links in the footer. Press &
Media has no supplied destination; its final destination remains a company input,
and it must not silently route to an unrelated section.

## Shared component ownership

The shared package owns reusable visual building blocks and compositions.
Application code owns route entry points, content, brand token values, product
selection orchestration and server-side enquiry handling. Generic shared
components receive those values through descriptive properties or children; they
must not import HealthAlyst content, database clients or application state.

### Installed foundation

`pnpm dlx shadcn@latest info --cwd apps/healthalyst-website --json` confirmed:

- Next.js 16.3.8, React 19.2.4 from the application manifest, and Tailwind 3.
- The existing shadcn configuration uses the `new-york` style, Radix foundation
  and Lucide icons.
- Shared component destination: `packages/ui/src/components`.
- Installed primitives: Button, Accordion, Input, NativeSelect and Textarea.

Do not migrate styling versions or primitive foundations as a side effect. Review
official registry source and compatibility before adding a missing component.
Install only what the selected slice uses.

| Reusable surface              | Shared composition                                                                            | Addition needed later                                         |
| ----------------------------- | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| Site navigation and footer    | Generic navigation/footer compositions, shared Button link composition, Sheet for mobile      | Sheet; generic compositions                                   |
| Page and section presentation | Generic page container, section, heading, hero and document compositions                      | Reusable compositions; semantic HTML remains their foundation |
| Product overview              | Generic product summary composition using shadcn Card and Button                              | Card; product summary composition                             |
| Product and process details   | Shared Tabs with TabsList, TabsTrigger and TabsContent                                        | Tabs; generic details composition                             |
| Questions                     | Existing shared Accordion                                                                     | No new primitive                                              |
| Enquiry form                  | FieldGroup, Field, FieldLabel, FieldDescription, FieldError, existing inputs and NativeSelect | Field; generic enquiry fields composition                     |
| Submission feedback           | Shared Alert with existing Button for retry; loading text within the button                   | Alert; no toast library is required                           |
| Palette selection             | Shared RadioGroup with labels, plus Button for reset                                          | RadioGroup; reusable palette selector                         |
| Visual separators             | Shared Separator                                                                              | Separator when a visible divider is needed                    |

Every new reusable visual composition is exported from `@healthalyst/ui`, even
when it initially has one consumer. Shared Button, Card and form semantics must
remain appropriate: a product summary card contains an action rather than wrapping
multiple interactive controls in one button.

Existing website wrappers may become thin content/theme adapters or be replaced
by shared imports during their owning slice. Do not introduce a second local
component implementation. Logos and images use Next.js Image/Link through a shared
composition with application-supplied assets and descriptions.

## Visual direction

The intended character is confident, humane and precise: strong editorial
headings, real healthcare context, clear product relationships and generous
reading space. Preserve HealthAlyst's institutional positioning when borrowing
visual principles from consumer healthcare references.

### References and limits

| Official reference                                        | Observed treatment                                                                            | Transferable idea                                         |
| --------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| [Maven Clinic](https://www.mavenclinic.com/)              | Deep green framing, family photography and a serif accent                                     | Restraint, readable hierarchy and distinct audience paths |
| [Headspace](https://www.headspace.com/)                   | Warm neutral surfaces with vivid illustrations and colour accents                             | Humanise complex topics with purposeful illustration      |
| [Cityblock](https://www.cityblock.com/)                   | Navy/electric-blue/pale-green colour field and direct navigation                              | Strong identity with clear next steps                     |
| [Helium Health](https://heliumhealth.com/)                | Blue/purple visual treatment and grouped infrastructure offerings                             | Show the relationship between solution families           |
| [Reliance Health](https://getreliancehealth.com/nigeria/) | Sky blue, coral accents and African professional photography                                  | Contextual imagery and clear institutional enquiry paths  |
| [Oscar](https://www.hioscar.com/)                         | Official page content exposes role-based navigation; live visuals were geographically blocked | Organise choices around visitor intent                    |

Five desktop hero views were inspected during the preceding research. Mobile,
authenticated applications, motion and accessibility of those references were
not audited. These are design observations, not performance or usability proof.
Do not copy their content, assets, testimonials, uppercase labels or clinical
claims.

### Composition proposals

**Direction A: editorial healthcare infrastructure — recommended starting point.**

Use an asymmetric desktop hero: existing headline, complete paragraphs and actions
occupy seven grid columns; contextual photography or a purposeful ecosystem
illustration occupies five. Keep the forest background and restrained gold
emphasis. Use cream reading surfaces below. Product summaries form a clear
catalogue, followed by a larger selected-product explanation. Alternate narrative
and visual sections rather than repeating cards across the page.

**Direction B: product-led healthcare systems — experimental alternative.**

Use a light hero with the same copy, stronger sans-serif emphasis and a wide
illustration connecting the six product lines. Alternate broad tinted sections
with product detail views. Use one dominant accent per composition. The diagram
must describe existing capabilities; it must not resemble an actual live patient
record or claim to be a shipped product screen.

Both directions use the same content, routes and shared components. Direction A
is the proposed first homepage composition. Direction B remains a designer-review
alternative; Slice 2 implements colour switching, not an arbitrary layout editor.

### Layout and type specification

- Content width: up to 1200 pixels, with a 12-column desktop grid and 24-pixel
  gutters. Reading columns stay approximately 60–70 characters wide.
- Page gutters: 20 pixels on narrow screens, increasing to 40 pixels on desktop.
- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64 and 96 pixels. Major sections use
  approximately 64–96 pixels of vertical spacing, reducing on mobile.
- Use Source Serif 4 for headings and editorial quotations, paired with Source
  Sans 3 for interface and body text. Adobe designed these open-source typefaces
  as companion families. Keep the typography system to these two font families.
- Body text: generally 16–18 pixels with a 1.6–1.8 line height. Avoid shrinking
  existing paragraphs to fit a hero. Page headings scale approximately 40–72
  pixels; section headings 28–48 pixels. Allow natural wrapping.
- Use clear primary and secondary actions, consistent borders and restrained
  elevation. Forms and document pages prioritise reading and task completion.
- Mobile: stack hero copy before imagery; product catalogue becomes one column,
  expanding to two and then three as space permits. Keep all six products
  discoverable; let longer tabs scroll rather than hiding options.
- Follow shared focus and keyboard semantics. Keep content available before
  hydration, and honour reduced motion. Decorative reveals must not hide content
  indefinitely if scripting fails.

## Palette and theme specification

The original values below are observed in the current Tailwind configuration.
All alternative values are provisional proposals, not copied brand specifications
or contrast-approved palettes.

| Colour role        | Original, default | Green and coral | Cobalt and citrus | Plum and peach |
| ------------------ | ----------------- | --------------- | ----------------- | -------------- |
| Primary            | `#183020`         | `#145A46`       | `#224CC7`         | `#582D64`      |
| Primary emphasis   | `#254533`         | `#0F4637`       | `#193BA2`         | `#45224F`      |
| Accent             | `#B8935A`         | `#ED927D`       | `#E7CF58`         | `#F0B39D`      |
| Reading background | `#F9F6F0`         | `#FAF7EF`       | `#F6F8FE`         | `#FBF6F3`      |
| Alternate surface  | `#F2EDE3`         | `#EAF2EC`       | `#EAF0FC`         | `#F1E8F0`      |
| Border             | `#E2D9C8`         | `#CDDCD2`       | `#CCD7EE`         | `#DDCFDC`      |
| Main text          | `#0E1510`         | `#112C23`       | `#162440`         | `#2C2030`      |
| Secondary text     | `#3D3830`         | `#40584E`       | `#47536C`         | `#5D4B60`      |

Preserve remaining original shades: forest deep `#0E1510`, gold light `#CFA96E`,
cream light `#FAF4EB`, sand dark `#C8BCA8` and muted `#9A9282`. Retaining palette
values does not mean retaining low-contrast text pairings. Use stronger existing
text colours where necessary and check every foreground/background pairing before
accepting a preset.

Map palette values to semantic roles such as background, foreground, primary,
primary foreground, accent, accent foreground, border, input and focus ring.
Include hero and footer surfaces, hover/focus states, SVG illustrations and form
feedback. A preset change must not recolour errors as decoration or alter the
meaning of validation feedback. Keep branded values in the website; the shared
package consumes semantic variables.

### Control panel contract for Slice 2

1. Show four labelled preset options with swatches and a clear selected state.
2. Show a live preview of shared headings, buttons, inputs, an accordion and
   representative reading surfaces. Preview text is not production form data.
3. Selecting a preset updates the current presentation and all subsequent routes
   in that browser. Keep the chosen preset after reload and synchronise it with
   other open presentation tabs. A small validated preference cookie contains only a preset identifier.
   A script in the document head applies it before paint, keeping public routes
   statically rendered.
4. Other visitors receive the original default. Reset removes the experimental
   preference and restores the original colours across the application.
5. Invalid or unavailable preset identifiers fall back to the original. If
   browser storage is unavailable, support the current session without failing
   the page. Avoid a visible original-theme flash during hydration.
6. Label the panel as experimental. Keep it out of public navigation and search
   indexing. It does not provide access to submissions or publish a global theme.
7. Keep controls focused on palette presets and reset. Custom colour editors,
   account management and database-backed theme publishing are outside this scope.

## Image and illustration plan

| Placement                | Purpose                                          | Proposed treatment                                                                                                   |
| ------------------------ | ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| Hero                     | Ground the institutional healthcare story        | Licensed, relevant African healthcare photography or a coherent ecosystem illustration                               |
| Product overview/details | Explain the six products and their relationships | Purpose-built illustrations derived from existing descriptions; no fabricated live screens                           |
| Process                  | Explain the existing four-stage sequence         | A simple shared sequence composition; decoration only where it aids comprehension                                    |
| About                    | Support the company's context                    | Approved company imagery or contextual healthcare imagery; stock models must not be presented as employees/customers |
| Contact/partnership      | Support the task without competing with the form | A restrained contextual image or illustration beside the introduction                                                |
| Careers                  | Represent actual company culture                 | Company-approved material; no invented team portraits or open roles                                                  |

Track asset source, licence, approved usage, alternative text and focal crop when
assets are chosen. Use Next.js Image with dimensions and responsive sizes. Keep
one illustration style; do not mix unrelated sticker art, stock cartoons and
decorative multicolour shapes. Do not recolour the supplied logo with theme
experiments. Fixed-colour photographs are expected to remain unchanged.

## Form and server boundary for later slices

The contact field meanings remain first name, last name, organisation, email,
optional phone, institution type, product of interest and message. Propose reusing
those fields for partnership enquiries, with a distinct enquiry type and existing
General Partnership meaning. Additional partnership fields and copy require
company direction; do not invent budget, patient-data or qualification requests.

Use shared visual form components for both journeys and keep their application
content and server integration separate. Routes and server code remain inside
`apps/healthalyst-website`. A shared server-side enquiry operation can validate
input, distinguish enquiry type and write to Neon; choose its exact Server Action
or Route Handler implementation in Slice 6.

Define field limits, duplicate handling, abuse protection, retention and operational
ownership before recording real enquiries. Database failures retain visitor input
and provide a retry. Do not expose connection details or private submissions.
Saving an enquiry is distinct from notifying a company inbox; email notifications
are not an agreed integration in this scope.

## Company inputs and pending decisions

| Input                                                         | Needed before                                           | Consequence                                                                                      |
| ------------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Approved terms and privacy policy                             | Publishing Slice 5; accepting real enquiries in Slice 6 | Policies are not present in the source; do not publish invented legal commitments                |
| Careers copy and current recruitment destination              | Completing Slice 5                                      | Do not infer vacancies, employee benefits or hiring status                                       |
| Partnership-specific introduction or extra fields, if desired | Completing Slice 4                                      | Existing copy and reusable fields are the starting point                                         |
| Neon project, approved region and environment access          | Slice 6                                                 | Use securely configured environment variables; do not place credentials in this document or chat |
| Enquiry ownership, retention and abuse-handling requirements  | Slice 6                                                 | Determines the minimum operational handling for stored submissions                               |
| Approved imagery and licence/source information               | Completing Slice 3 and relevant new pages               | Select imagery that can be used publicly and truthfully                                          |
| Press & Media destination                                     | Final navigation review                                 | Existing label has no dedicated page or supplied destination                                     |
| Product designer's final direction                            | Promoting an experimental design                        | Palette proposals remain experiments until decided                                               |

## Slice 1 completion evidence

- Inspected the active branch, clean starting worktree, manifests, route files,
  source content, navigation, form, shared primitives and theme configuration.
- Recorded the baseline revision and content-preservation procedure.
- Recorded the route map, interaction changes, component ownership and additions
  required by each later surface.
- Defined two layout directions, four palette proposals, typography, spacing,
  responsive behaviour, imagery and control-panel behaviour.
- Confirmed shared shadcn configuration with the read-only information command.
- Corrected the discovered hero `cta` property to `callsToAction`, preserving its
  value and use. This follows the mandatory repository naming rule.
- Application routes, styling, dependencies and database integration remain for
  their authorised slices. The brief is not a rendered prototype.

Slice 2 was subsequently authorised by the user. No later slice is authorised
by completion of this record.

## Slice 2 implementation

- Added `/control-panel` with four palette choices, live component and website
  previews, colour values, an experimental notice and reset. It is not linked in
  public navigation and its metadata specifies `noindex, nofollow`.
- Kept the original forest, gold, cream and sand values as the default. The
  remaining original shades are retained as theme variables. Experimental
  palette definitions and generated styles live in the website's
  `src/data/design-palettes.ts`.
- Replaced hard-coded Tailwind brand values with theme variable aliases so the
  existing homepage, footer, form surfaces and button shadows respond to the
  panel. Marketing wording, products, typography and layouts remain unchanged;
  ordinary labels use sentence case. Low-opacity reading text now uses stronger
  foreground values, and accents on light surfaces use readable primary text.
- The green/coral palette uses its lighter coral shade for small text on primary
  surfaces; the original accent remains the button and decorative accent. Input
  boundary colours are separate from subtle surface borders. Error styling stays
  consistent across presets.
- The shared package owns the new primitives, swatches, palette selector, preview,
  panel, preference provider, headings and reveal presentation. The website owns
  route metadata, link destinations, preview copy and palette values.
- Selection stores one allowlisted identifier in `healthalyst-design-palette` for
  up to one year, with `SameSite=Lax` and `Secure` on encrypted connections. No
  preference cookie is created by a default visit; reset removes it. There are
  no analytics or personal details in this preference.
- A document-head script applies the saved identifier before paint. The root
  React store reads that selection after hydration; public pages remain static.
  BroadcastChannel synchronises tabs, with focus and page restoration also
  reconciling the cookie. When cookies are unavailable, selection works for the
  current visit and the panel explains the persistence limitation.

### Implementation boundaries

The panel previews colours and shared components. It does not publish a global
palette or provide administrative access. Site layout, images, new public pages
and enquiry storage remain assigned to their later slices. Palettes remain
experimental pending the product designer's decision. This is not a full site
accessibility audit.

### Slice 2 completion evidence

- Passed `pnpm install --frozen-lockfile`, `pnpm check-format`, `pnpm lint`,
  `pnpm check-types` and `pnpm build`. The production build lists `/` and
  `/control-panel` as statically rendered routes.
- Inspected the rendered panel in Chrome at desktop and a 390-pixel mobile
  viewport. The mobile panel and homepage had no horizontal overflow; the
  palette controls have accessible names and descriptions. Arrow keys selected
  all four presets, and the preview accordion opened correctly.
- Inspected selection across navigation and reload, and synchronisation between
  a panel tab and a homepage tab. Reset restored the original palette on both
  and removed the preference cookie.
- In the production build, an observer recorded the saved green/coral palette
  being applied while the document body was still absent. This confirms that
  the initial theme script runs before body rendering. The selected radio and
  preview matched after hydration.
- Unknown and malformed cookie values fell back to the original. With cookie
  reads and writes blocked in an isolated browser page, selection still applied
  and the panel showed its persistence warning. Next.js client navigation kept
  that unsaved selection active on the homepage during the current visit.
- Inspected browser console and network requests on the panel and homepage in
  the local production build: no console errors or warnings, and no failed
  requests in those journeys.
- Calculated contrast for the authored colour pairs. Main and secondary reading
  text, primary and accent button text, and accent text on primary surfaces
  exceed 4.5:1 for all four presets. Input boundaries against white surfaces
  exceed 3:1. This checks these role pairings, not every existing website state.
- Reviewed the changed source, dependency additions and diff. No automated test
  suites were added or run in this slice. Full accessibility and integration
  review remains assigned to Slice 8.

Slice 3 was subsequently authorised by the user. The record below describes its
implementation and review evidence.

## Slice 3 implementation

- Applied the editorial direction to the homepage: a split hero with healthcare
  imagery, a six-product catalogue, a paired product detail and capabilities
  surface, four process stages, an illustrated company narrative, readable
  questions, contact presentation and footer.
- Kept the approved marketing wording, six products, four statistics, all
  capabilities, audiences, process descriptions, approach pillars, institution
  mappings, questions, answers and footer text. Existing product, process,
  question and site data files remain unchanged. Moved section introductions
  into application-owned `src/data/homepage-content.tsx`.
- All reusable visual structure lives in `packages/ui`, composed from shared
  shadcn components. Website sections are thin content and state adapters. The
  existing product context remains the selection owner; process state remains
  in its application adapter.
- Installed shared shadcn Tabs and Sheet from the official registry. Only the
  required Radix tabs and dialog runtime dependencies were added. Generated
  local names follow the repository naming rule.
- Replaced the custom mobile menu with Sheet, including an accessible title,
  focus handling, Escape dismissal and a 44-pixel close target. Navigation now
  uses real links and preserves the existing section destinations. Added a skip
  link and main-content focus target.
- Product and process selection use shared tabs with keyboard navigation.
  Nonselected panels are hidden; their complete content remains in the rendered
  document. The next-stage action advances selection and moves focus to the new
  selector. The final stage retains its conversation action.
- Static hero, statistics, company narrative, questions and contact structure
  stay server-rendered. Removed entrance opacity and reveal dependencies from
  homepage content. Reduced-motion preferences disable Sheet and Accordion
  animations.
- Added an original editorial healthcare illustration as a 175,402-byte WebP,
  plus a palette-aware vector diagram of the existing connected products.
  Existing Lucide symbols support the product capability panels. Image origin,
  generation prompt, alternative text and approval limits are recorded in
  `website-assets.md`.
- Enabled the standard Next.js image optimiser, supplied responsive image sizes
  and preloaded the hero illustration. No image-processing package was added.
- The original palette remains the default. All authored interface colours and
  the vector diagram use semantic theme values, so the four existing panel
  choices apply throughout the refreshed homepage. Raster imagery retains its
  original colour treatment.
- The contact presentation now has persistent labels and autocomplete metadata.
  Its fields and send action are disabled with a visible availability notice;
  the preceding form prevented submission without saving or sending anything.
  The original marketing copy and choices are retained. No successful delivery
  is simulated.

### Slice 3 completion evidence

- Passed `pnpm install --frozen-lockfile`, `pnpm check-format`, `pnpm lint`,
  `pnpm check-types`, `pnpm build` and `git diff --check`. The production build
  retains statically rendered `/` and `/control-panel` routes.
- Reviewed the homepage in Chrome at 1440-pixel desktop, 390-pixel mobile and a
  constrained 320-pixel mobile width. No document overflow was observed. The
  product selector scrolls within its own container. Inspected hero, product
  details, company narrative, questions and contact presentation.
- Selected every product with keyboard arrow navigation and checked the matching
  detail heading and single visible panel. Catalogue selection also opened the
  chosen product. Advanced through all four process stages and checked focus and
  the final conversation action.
- Opened mobile navigation, used Tab and Shift+Tab within it, dismissed with
  Escape and observed focus returning to the trigger. A mobile navigation link
  closed the drawer and reached its section beneath the sticky header.
- Expanded a question and inspected its complete answer. Confirmed one primary
  heading, section heading order, no forced-uppercase text styling, no hidden
  entrance reveals and persistent labels for every enquiry control.
- Selected green/coral, cobalt/citrus and plum/peach in the control panel and
  navigated to the homepage. Observed corresponding hero, button and diagram
  colours. Reload retained plum/peach; reset restored the exact original forest
  colour and removed the preference cookie.
- Used the local production standalone server for the completed journeys.
  Inspected console and network: no application console errors or failed
  requests. The responsive illustration was served through `/_next/image` with
  a successful response. Changing emulated viewport sizes during a load produced
  a temporary unused-preload warning; a fresh mobile load had no warnings.
- Reviewed the shared sources, application adapters, dependency additions and
  changed-file diff. No automated test suites were added or run. This review is
  not the complete accessibility, performance or integration audit in Slice 8.

### Remaining work

Slice 4 is contact and partnership routes with their complete form journeys.
Legal and careers content, Neon submission handling and full cross-route review
remain assigned to their later slices. Existing unsupported company claims still
need company confirmation. Imagery and experimental palettes remain subject to
final product designer approval. No changes were committed, pushed or deployed.

Ready for Slice 4. Await the user's instruction before implementing it.

## Homepage design revision — 7 October 2026

The user requested a stronger homepage through the Sites skill, with review before
any additional pages. This revision supersedes the earlier illustrative visual
direction and the earlier invitation to begin Slice 4.

### Direction and implementation

- Revisited [Maven Clinic](https://www.mavenclinic.com/),
  [Helium Health](https://heliumhealth.com/), [Cityblock](https://www.cityblock.com/)
  and [Reliance Health](https://getreliancehealth.com/nigeria/). The resulting
  direction uses human healthcare photography, clearer product pathways and an
  editorial hierarchy. Their marketing claims, copy and visual identities were
  not copied.
- Replaced the dark illustrated hero with a light cream introduction, forest
  typography, a photographic portrait and a restrained company-positioning band.
  The original hero paragraphs remain intact in separate visual areas.
- Changed the product catalogue to a two-column directory of six large linked
  rows. Every row selects its matching existing product panel. Full capabilities,
  audiences and descriptions remain available in the shared tab interface.
- Used a clinic photograph, quotation and approach list for the company section.
  Kept the process, frequently asked questions and enquiry presentation connected
  to their existing application content and state.
- Restored the supplied JPEG logo to navigation, footer and metadata. Kept the
  original image unchanged and respected the deletion of the old SVG.
- Retained all reusable layouts in the shared component package and used the
  existing shadcn foundations. No dependencies were added for this revision.
- Preserved the original forest, gold, cream and sand palette and `/control-panel`.
  Ordinary labels use natural casing. Interface colours follow semantic tokens;
  photography and the supplied logo retain their actual colours.
- Careers and press text remain in the footer without misleading links to the
  company section. Their routes remain outside this homepage slice. Partners
  leads to the existing enquiry section.

### Review evidence

- TypeScript, lint, formatting, production build and whitespace checks passed
  during this revision. The original Next.js standalone configuration remains
  in the marketing repository.
- Inspected desktop at 1440 pixels and mobile at 390 and 320 pixels. No document
  overflow was observed; the product tab list scrolls within its own container.
- Opened and dismissed the mobile Sheet with Escape; focus returned to its
  trigger. Used catalogue navigation and keyboard arrows in the product tabs;
  selection, heading and visible panel agreed. Expanded a question and inspected
  its full answer.
- Switched to cobalt/citrus in `/control-panel`, returned to the homepage and
  observed the corresponding heading colour. Reset restored the original forest
  palette. Original and experimental palettes remain a designer review decision.
- Inspected browser console and image/document requests: no application console
  errors or warnings; observed assets loaded successfully.
- No automated test suites were added or run. This is a focused homepage review,
  not the comprehensive accessibility, performance and integration audit in Slice 8.

### Sites review copy

A separate retained-template checkout at `../site-previews/healthalyst` prepares
this same Next.js frontend as a static export for a private Sites review. It
excludes GitHub metadata, credentials, environment files and generated runtime
state. The review copy uses local compressed images and the Sites address for
metadata. The marketing repository retains its normal Next.js standalone output.
Sites publication does not push or merge the marketing repository's GitHub branch.

The review copy was exported before Slice 6, so its contact form still carries
the availability notice. Additional pages and approved policy content await
their later slices. Neon persistence arrived with Slice 6 in this repository
and is not present in that static export. The homepage is ready for the user's
design review; approval is not recorded here.

Private review: [Healthalyst Africa](https://healthalyst-africa.kinxly.chatgpt.site).
Sites confirmed the first private publication succeeded. The control panel is
available at `/control-panel` on the same site.

## Contact enquiry storage — 7 October 2026

Slice 6 was authorised by the user. The contact form now validates each
enquiry and stores it in Neon from inside the Next.js application. There is no
external service, webhook or separate server.

### Decisions taken for this slice

- The browser posts to a route handler at `POST /api/contact` rather than a
  Server Action, so the request and response contract is explicit and can be
  exercised from outside the application.
- The schema is applied by hand from
  `apps/healthalyst-website/db/contact-enquiries.sql`. The application never
  creates or alters tables, and the statements are reviewed by a person.
- Abuse handling is a hidden field that automated submissions fill, an
  in-memory per-address throttle of five attempts in ten minutes, server-side
  field limits and membership checks, and a ten-minute duplicate window.
  Client addresses are held in memory only and are never written to storage or
  logs.
- A write that fails with a connection error is retried twice, 250 and 750
  milliseconds apart, before the enquiry is reported as unavailable. Statement
  errors are not retried, because the same statement would fail the same way.
  The retry exists because live verification on this machine saw intermittent
  connection timeouts to the Neon endpoint, including a real `503` on the
  user's own submission.
- Scope is the homepage `#contact` section. The `/contact` and
  `/partner-with-us` routes remain with Slices 4 and 7, which reuse this
  foundation and add their own enquiry type value.
- Email notification of a company inbox remains out of scope, as agreed in the
  form and server boundary section.

### Where the work lives

| Concern                                      | Location                                                         |
| -------------------------------------------- | ---------------------------------------------------------------- |
| Field names, labels, limits and requirements | `apps/healthalyst-website/src/data/contact-enquiry-fields.ts`    |
| Validation and normalisation                 | `apps/healthalyst-website/src/lib/contact-enquiry-validation.ts` |
| Neon write and duplicate detection           | `apps/healthalyst-website/src/lib/contact-enquiry-storage.ts`    |
| Per-address throttle                         | `apps/healthalyst-website/src/lib/contact-enquiry-throttle.ts`   |
| Route handler                                | `apps/healthalyst-website/src/app/api/contact/route.ts`          |
| Schema                                       | `apps/healthalyst-website/db/contact-enquiries.sql`              |
| Form states, submission and field errors     | `packages/ui/src/components/marketing-contact.tsx`               |
| Request and response contract                | `packages/ui/src/lib/marketing-enquiry.ts`                       |

The shared form stays product-neutral: the application supplies the endpoint,
the field definitions and every visible message, while the shared package
supplies structure, the submitting state, accessible field errors and the
confirmation. `DATABASE_URL` is read from the environment when a request
arrives, is never prefixed with `NEXT_PUBLIC_`, and is declared in
`turbo.json` so builds depend on it. `@neondatabase/serverless` was added to
the application manifest as the only new dependency.

### Completion evidence

- `pnpm install --frozen-lockfile`, `pnpm test-all` (format, lint, type check,
  tests and production build) and `git diff --check` pass. The production
  build lists `/api/contact` as a dynamic route beside the static routes.
- 25 tests across five files cover field validation and normalisation, the
  throttle window, storage retries (a connection failure recovered by a retry,
  exhausted attempts reported as unavailable, and statement errors not
  retried), every route response (stored, duplicate, rejected, hidden field,
  unreadable body, throttled, storage failure and plain form post), and the
  form journey (confirmed receipt, rejected field with retained input, and a
  retryable failure that keeps the enquiry). The journey tests also assert
  focus: a confirmed enquiry focuses its `role="status"` confirmation, and a
  rejected submission focuses the first rejected field.
- Schema: `db/contact-enquiries.sql` was applied by hand to the Neon database
  named in the untracked local environment (PostgreSQL 18.6). The
  `contact_enquiries` table, both indexes and every column were read back and
  matched the file. The application still only reads and inserts.
- Browser journey, desktop at 1440 by 900: submitting an email the browser
  accepts but the server rejects produced a live `POST /api/contact` `400`
  with `fieldErrors.email`. The email input rendered `aria-invalid="true"`,
  `aria-describedby="enquiry-email-error"` and its visible message, both the
  form-level and field-level `role="alert"` regions announced the failure, and
  every entered value was retained. Correcting the address and resubmitting
  returned `201`; the `role="status"` confirmation received focus and the form
  reset.
- Browser journey, mobile at 390 by 844 with touch and mobile emulation: the
  submission returned `201` with the `role="status"` confirmation and no
  console messages. At 320 by 568 the page was re-checked without another
  submission: no document-level horizontal overflow and every form control
  inside the viewport. The product tab strip stays an internal horizontal
  scroller.
- Abuse handling: a direct request with the hidden field filled received the
  indistinguishable `201` acknowledgement and wrote no row. The `429` throttle
  response was not driven against the running server (it is unit-tested, and
  exhausting the shared development server's allowance on purpose would block
  the user from testing the form for ten minutes).
- Storage: rows written by the desktop and mobile submissions were read back
  from Neon with exactly the submitted values. The rejected submission and the
  hidden-field request stored nothing. Both test rows were deleted afterwards
  and the table was re-checked at zero rows.
- Found and fixed during the browser pass: a rejected submission left keyboard
  focus on the document body, because the submitting fieldset disables the
  button while the request is in flight. The shared form now returns focus to
  the first rejected field; the success and non-field failure paths already
  focus their live region. After the change, a live `400` in the browser put
  focus on the rejected email input with its `aria-describedby` error.
- Live limitation observed: connections from this machine to the Neon endpoint
  time out intermittently. The database itself was re-verified healthy after
  the user's failed submission (`neondb`, PostgreSQL 18.6, `contact_enquiries`
  with all three indexes, zero rows), and a controlled probe showed raw TCP and
  `https.request` succeeding against the same addresses where Node's `fetch`
  alternated between timing out and succeeding. One real submission therefore
  received the `503` retryable failure with its input retained. The bounded
  storage retry above now absorbs this class of failure; a `503` still
  returns when every attempt fails. The journey ran against the development
  server the user had running; the production build compiles the same route
  and passes its tests, but production-mode console output is stripped by
  configuration, so a server operator needs application monitoring to see
  storage failure reasons.
- Not done: no commit, push or deployment. Slices 4, 5, 7 and 8 are unchanged
  and still await instruction.
