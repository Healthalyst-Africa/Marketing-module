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

## Multi-page website — 19 October 2026

The user asked to turn the one-page site into a multi-page site with a proper
page for every footer destination except individual products, one page at a
time, following a written design system. Drafted copy is reviewed by the user
before it ships. This section covers the foundation and the first page,
`/contact` (the contact half of Slice 4).

### Page order

Contact us → About us → Our approach → Partners → Partnership enquiries →
Support → Investor relations → Careers → Press and media → Terms and privacy,
then a homepage revision that links out to the new pages and a cross-route
review. Each page starts only after the previous one is approved.

### Foundation

- `DESIGN.md` at the repository root records the design direction ("intake and
  wayfinding"), colour roles, type scale, spacing, shapes, components, imagery
  and copy rules. It is a proposal for the product designer.
- Source Serif 4 now loads as a variable font with its optical-size axis, so
  large headings use the display cut. No new family or dependency.
- Header and footer are shared by every route in the `(homepage)` route group.
  The group keeps its name because this session could not move files on the
  developer's machine; renaming it to `(site)` with `git mv` is a safe
  follow-up. Its layout no longer sets a canonical address; each page sets
  its own.
- `SITE_ROUTES`, `FOOTER_COMPANY_LINKS` and `FOOTER_CONNECT_LINKS` in
  `src/data/site.ts` are the route registry. A footer link without a
  destination renders as text. Until their pages ship, About us and Our
  approach point to `/#about`, and Partners, Partnership enquiries, Investor
  relations and Support point to `/contact`.
- Navigation and footer labels use sentence case. Section links use
  `/#identifier` so they work from every page. The current page is marked with
  `aria-current="page"`, weight and an accent underline.
- The logo links to `/` with the name "Healthalyst Africa home". A space
  between the wordmark and subtitle makes the visible name part of the
  accessible name.
- New shared compositions in `@healthalyst/ui`: `breadcrumb` (shadcn
  primitive), `marketing-page-header`, `marketing-task-layout`,
  `marketing-sequence`, `marketing-record-list`, `marketing-figure` and
  `marketing-closing-band`. The shadcn CLI could not reach the registry from
  this session's sandbox, so the breadcrumb source was read from the official
  `new-york` registry entry and adapted to the naming rules (and the upstream
  `BreadcrumbElipssis` display name spelling corrected). Running
  `pnpm dlx shadcn@latest add breadcrumb --cwd apps/healthalyst-website --dry-run`
  locally will confirm it matches.
- `ProductDetails` and `MarketingProcess` no longer hard-code `#contact`; the
  application supplies the destination.

### Contact page

- Route: `src/app/(homepage)/contact/page.tsx`; copy in
  `src/data/contact-page-content.ts`.
- Layout: page header with trail, then the enquiry form beside "What happens
  next", "Who we work with" and "Partnerships and investment". On phones the
  short next-steps list comes first, then the form, then the rest.
- The form keeps the same eight fields, limits, endpoint and server
  validation. It now has visible persistent labels, an "Optional" marker,
  descriptions where they help, and three fieldsets: About you, Your
  institution, Your enquiry.
- "Enquire about {product}" links open `/contact?product={name}` with that
  product preselected. Unknown or repeated values are ignored. Reading the
  query makes `/contact` render on request rather than statically.
- The homepage `#contact` section is now an invitation band that links to
  `/contact`; the anchor still works. Hero, process and about links point to
  `/contact`.
- Photograph: the documented Pexels image `clinician-tablet.webp`, shown on
  wide screens only beside the next steps.

### Drafted copy awaiting approval

| Location                    | Draft                                                                                                                                      | Basis                                      |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------ |
| Contact page heading        | Tell us about your institution                                                                                                             | New                                        |
| What happens next           | We reply within two business days; We arrange a discovery consultation; We recommend a way forward                                         | FAQ answer and existing response-time copy |
| Response time               | "Our team aims to respond within two business days" (previously "We respond to all enquiries within two business days")                    | Matches the server's existing message      |
| Partnerships and investment | Use the form and choose General Partnership / Investment Enquiry as the product of interest                                                | Existing form options                      |
| Form labels                 | First name, Last name, Email address, Phone number (Optional), Organisation or institution, Institution type, Product of interest, Message | Sentence case of existing labels           |
| Field guidance              | "Not sure yet? Choose Full Product Suite…"; "…Please do not include patient information."                                                  | New; supports the no-patient-data rule     |
| Actions and messages        | Send enquiry; Sending enquiry…; Enquiry sent. Our team aims to respond within two business days.; Your enquiry was not sent…               | New wording, same behaviour                |
| Homepage invitation action  | Start an enquiry                                                                                                                           | New                                        |

### Evidence

- `pnpm check-format`, `pnpm lint`, `pnpm check-types` and `pnpm test` pass:
  33 tests in seven files, including new tests for grouped legends, the
  optional marker, field descriptions, product preselection, the sent,
  rejected-field and network-failure journeys, the contact destination helper
  and the homepage invitation.
- `pnpm build` passes with Google Fonts replaced by a local mock
  (`NEXT_FONT_GOOGLE_MOCKED_RESPONSES`), because the sandbox cannot reach
  Google Fonts. A build on a networked machine has not been run.
- Browser (Chromium, development server): 1440, 720, 390 and 320 pixels wide
  with no horizontal overflow; product link from the homepage preselected the
  product; empty submit focused the first required field; a submission
  without a database returned `503` and showed the recoverable message with
  input kept and focus on the alert; the mobile menu opened and Escape
  returned focus to its trigger; first Tab reaches the skip link; tab order
  runs header, trail, then form; focus rings visible; no touch target under
  44 pixels; no console errors or warnings.
- axe-core (WCAG 2.0–2.2 A/AA and best practice): no violations on `/contact`
  at 1440 and 390 or on `/` at 1440, after fixing the logo name mismatch.
- Not verified: a successful live submission (no database in the sandbox),
  screen reader output, or a production deployment. No commit, push or
  deployment.

### Open items

- Image provenance: `doctor-at-clinic.webp` (homepage hero) and
  `clinical-team.webp` (homepage about section) have no recorded source in
  `docs/website-assets.md`. Record or replace them before release.
- Default palette: `THEME_PREFERENCE_CONFIGURATION.defaultIdentifier` is
  `green-coral`, while `AGENTS.md` names forest and gold as the default. The
  product designer should confirm which is intended.
- Remaining pages need licensed photography. The sandbox cannot download
  images; candidates will be proposed per page for the user to approve.

## Reference study and typography — 19 October 2026

The user judged the first contact page too generic and asked for five
professional health websites to study before more pages are built, and for
Inter to be used throughout.

- `docs/design-case-studies.md` records the study of Abridge, Flatiron
  Health, Commure, Helium Health and Hinge Health, the patterns they share and
  what they imply for HealthAlyst. The contact page and `DESIGN.md` will be
  revised against it once the user agrees the direction.
- Inter replaces Source Serif 4 and Source Sans 3. It loads through
  `next/font/google` with its optical-size axis as `--font-sans`; the Tailwind
  `serif` family now resolves to the same variable, so older components keep
  working until they are reworked. At the user's instruction, `AGENTS.md`
  now names Inter as the only typeface for now.
- Evidence: format, lint, type check and 33 tests pass; the production build
  passes with Google Fonts replaced by a local Inter mock (the sandbox cannot
  reach Google Fonts); `/` and `/contact` render in Inter at 1440 pixels with
  no console messages.

## Contact page and header rebuild — 19 October 2026

The user approved rebuilding the contact page and the shared header using the
reference study. `DESIGN.md` now records the resulting direction.

### What changed

- **Header** (`packages/ui/src/components/marketing-navigation.tsx`): sticky,
  64 px on phones and 72 px from tablet up. On routes listed in
  `BRAND_HEADER_ROUTES` it starts in the brand colour and turns white once the
  page scrolls past 8 px. Items: a Solutions menu, How we work, About and one
  "Contact us" button. "Partner with us" was removed from the header because it
  led to the same page.
- **Solutions menu**: the shadcn navigation menu (`navigation-menu.tsx`, Radix
  `@radix-ui/react-navigation-menu` 1.4.1, added to `packages/ui`). Six
  institution types, each naming its product with a one-line description, plus
  "Talk to our team". Choosing one opens that product on the homepage. The
  shadcn CLI could not reach the registry from the sandbox, so the source was
  written from the official `new-york` component and adapted to the naming
  rules; `pnpm dlx shadcn@latest add navigation-menu --cwd apps/healthalyst-website --dry-run`
  will confirm it locally.
- **Contact page**: forest-green page header with the plain heading "Contact
  us"; the form panel rises into it; "Other ways to reach us" (partnership and
  investment links that open the form with the topic chosen) and "What happens
  next" sit beside it on desktop and below it on smaller screens. No decorative
  photograph.
- **Form** (`marketing-contact.tsx`): routing questions first (Your
  institution, Your enquiry, Your details); a spinner while sending; a
  confirmation panel that replaces the form, takes focus and offers "Send
  another enquiry". Field names, limits, endpoint and server validation are
  unchanged.
- **Presets**: `?product=<name>` and `?enquiry=partnership|investment` preset
  the form (`readContactEnquiryPreset`). Footer links for Partners, Partnership
  enquiries and Investor relations now use these presets.
- **Contact details**: `CONTACT_DETAILS` in `contact-page-content.ts` holds
  email, phone and office address. It is empty, so nothing is shown; each item
  appears once the company supplies it.
- Institution names are now in sentence case. The unused scroll-reveal code
  was removed from the shared package. Shared figures use a 12 px radius.

### Drafted copy awaiting approval

| Location               | Draft                                                                                                                                                                         |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Page header            | "Contact us" / "Tell us about your institution and what you need. Our team aims to respond within two business days."                                                         |
| Form                   | "Send an enquiry" / "It takes about two minutes."                                                                                                                             |
| Topic question         | "What would you like to discuss?" / "Choose a product, or Full Product Suite if you are not sure yet."                                                                        |
| Confirmation           | "Enquiry sent" / "Thank you. Our team aims to respond within two business days." / "Send another enquiry"                                                                     |
| Other ways to reach us | Partnerships: "Technology, implementation and development partners working in African healthcare." Investors: "Funds and investors who would like to speak with the company." |
| Solutions menu         | "{Product} for {existing description}" and "Not sure which product fits your institution? Talk to our team"                                                                   |

### Evidence

- `pnpm install --frozen-lockfile`, `pnpm check-format`, `pnpm lint`,
  `pnpm check-types` and `pnpm test` (36 tests) pass. `pnpm build` passes with
  the local font mock.
- Browser (Chromium): 1440, 768, 390 and 320 pixels wide with no horizontal
  overflow and no target under 44 pixels. Header turns white on scroll. The
  Solutions menu opens with Enter, Tab enters it, Escape closes it with
  `aria-expanded="false"` and focus back on the trigger; choosing "Pharmacies"
  opened PharmaDesk on the homepage. "Start a partnership enquiry" preset
  "General Partnership". Stubbed endpoint responses confirmed the sent panel
  (focus on "Enquiry sent", form back after "Send another enquiry") and a
  rejected email (focus on the field, `aria-invalid="true"`). Tab order: skip
  link, logo, menu, contact button, trail, form, side links.
- axe-core: no violations on `/contact` or `/`. With the Solutions menu open it
  reports `aria-hidden-focus` on Radix's internal focus-proxy element, a known
  pattern of that primitive.
- Contrast (default palette): white on brand 8.1:1, 80% white on brand
  5.9:1, secondary text on white 7.7:1.
- Not verified: a real submission to Neon, a screen reader, or a production
  deployment.

### Follow-ups

- `pnpm install` is needed locally for the new Radix dependency. The lockfile
  also re-resolved one existing Vitest peer entry.
- Unused files that this session cannot delete:
  `apps/healthalyst-website/src/hooks/use-reveal.ts`. Remove with `git rm`.

## Shared components aligned with HealthSchedule — 19 October 2026

The contact form and header used shadcn primitives underneath but restyled
them at the call site: a shared class string on every field, and six buttons
rebuilt with `variant="unstyled"`. The primitives also came from two shadcn
generations with different focus rings. The fix follows the practices of the
`healthalyst-frontend` monorepo (HealthSchedule).

### Practices adopted

- Primitives carry the product's defaults, and call sites choose variants and
  properties. Call sites pass layout classes only.
- `ActionButton` is the only renderer of the shadcn `Button` for actions, with
  shared loading, busy, disabled and icon behaviour. This site adds
  `ActionLink` for navigation that looks like a button.
- Icons come from the `@healthalyst/icons` workspace package with
  purpose-based names; only that package imports Lucide.
- Forms sit in a shadcn `Card`.

Not copied: HealthSchedule's mixed focus rings, and its use of `accent` (coral)
for hover states.

### What changed

| Area            | Change                                                                                                                                                                                                                                                   |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Icons           | New `packages/icons`. Every icon import in `packages/ui` and the website goes through it; `lucide-react` moved there. `next.config.mjs` transpiles it.                                                                                                   |
| Form controls   | `Input`, `Textarea` and `NativeSelect` share `lib/form-control-variants.ts`: one surface, hover, 2 px offset focus ring, rejected and disabled treatment. `Input` and `NativeSelect` take `controlSize` (`small`, `default` 44 px, `large` 48 px).       |
| Button          | New variants `inverse` and `inverseOutline`, sizes `extraLarge` and `largeIcon`, and a `shape` variant (`pill`). `outline` and `ghost` hover with the `secondary` tint instead of coral. Busy buttons stay at 80% opacity so the label remains readable. |
| Wrappers        | New `ActionButton` (ported from HealthSchedule, with the spinner stopped under reduced motion) and `ActionLink`. Every composition now uses them; nothing outside them imports `button`.                                                                 |
| Navigation menu | `navigationMenuTriggerStyle` has a `tone` variant (`default`, `inverse`); plain links use it through `NavigationMenuLink`. The long override strings in the header are gone.                                                                             |
| Enquiry form    | The panel is a `Card`; controls use `controlSize="large"` with no class overrides; Send and "Send another enquiry" are `ActionButton`s; labels, legends and descriptions use the field primitives' own type styles.                                      |
| Header          | Contact is an `ActionLink` (`inverse` or `default`, `large`, `pill`); the phone menu trigger is an `ActionButton` (`inverseOutline` or `outline`, `largeIcon`, `pill`).                                                                                  |
| Homepage        | Hero, product details, process, about, product navigation and the closing band moved to `ActionButton` or `ActionLink`. The closing band button is now `inverse` (white), matching the header on brand fields.                                           |
| Rules           | `AGENTS.md`, `packages/ui/README.md`, `packages/README.md`, the website README and `DESIGN.md` record the rules and variant names.                                                                                                                       |

### Visible differences

A computed-style comparison of every link, button and control on `/` and
`/contact` at 1440 and 390 pixels, before and after, plus side-by-side
screenshots of both pages, show these visible changes (other differences, such
as input padding inside a fixed height, do not change what is drawn):

- Field labels are 14 px instead of 15 px and group legends are medium weight,
  because they now use the field primitives' styles (seen in the screenshots;
  the form is 14 to 20 px shorter).
- The phone menu trigger on white has a control-outline border (`#748B80`)
  instead of the pale rule colour.
- "Send another enquiry" has a control-outline border and foreground text
  instead of a brand-green outline.
- Homepage buttons and button-styled links are semibold. The hero and product
  enquiry buttons are 15 px. The closing band button is white instead of pale
  green.

### Defect found and fixed

On phones, the "Contact us" button at the foot of the slide-out menu shrank to
24 px when the menu content overflowed. It now keeps its 48 px height. This
predates the refactor.

### Evidence

- `pnpm install --frozen-lockfile`, `pnpm check-format`, `pnpm lint`,
  `pnpm check-types` and `pnpm test` (37 tests) pass. `pnpm build` passes with
  the local font mock. One new test covers the busy state: while the enquiry
  sends, the button reads "Sending enquiry…" and is disabled with
  `aria-busy="true"`.
- Browser (Chromium):
  - Submit hover is brand at 90%. While sending, the spinner shows and opacity
    is 0.8.
  - In the sent state, focus lands on "Enquiry sent", and "Send another
    enquiry" brings the form back.
  - A rejected email moves focus to the field, which has
    `aria-invalid="true"`.
  - The Solutions menu opens with Enter and closes with Escape, returning focus
    to the trigger. Choosing "Pharmacies" selects PharmaDesk.
  - The phone menu opens and closes after a link is chosen, and its contact
    button is 48 px tall.
  - The control panel renders without errors, and nothing overflows
    horizontally.
- axe-core: no violations on `/contact` at 1440 and 390 or on `/`. The known
  Radix focus proxy `aria-hidden-focus` appears only while the menu is open.
- Not verified: a screen reader, a real submission to Neon, or a production
  deployment.

### Remaining

- Restyling classes still passed to `ActionLink` and `ActionButton` in the
  homepage compositions (hero secondary link, about, process, product
  navigation) and the palette preview go when the homepage is reworked.
- `apps/healthalyst-website/src/components/ui/{accordion,button,input,select,textarea}.tsx`
  are unused wrappers in the old style, and `button.tsx` still uses
  `variant="unstyled"`. This session cannot delete files; remove them with
  `git rm`.
- Proposed next, awaiting approval: move the field types and a
  `DynamicFormFields` renderer into `packages/ui`, move the enquiry submission
  into a website feature folder with a Zod schema, and adopt the
  `features/`, `infrastructure/` and `shared/` structure.

## Completion pass — 19 October 2026

A review of the uncommitted work found one incomplete edit and finished the
clean-up that earlier sessions could not do.

- **Defect fixed:** `marketing-contact.tsx` rendered `SuccessIcon` in the sent
  confirmation without importing it, so type checking, the build and the
  sent-state tests failed. It now imports the icon from `@healthalyst/icons`.
- **Removed:** the unused wrappers
  `apps/healthalyst-website/src/components/ui/{accordion,button,input,select,textarea}.tsx`
  (including the last `variant="unstyled"` call site) and
  `apps/healthalyst-website/src/hooks/use-reveal.ts`. Nothing imported them.
  The website README no longer lists them.
- **Registry check:** `shadcn add breadcrumb --diff` and
  `shadcn add navigation-menu --diff` against the official registry show only
  the expected local changes: descriptive names, icons from
  `@healthalyst/icons`, the corrected `BreadcrumbEllipsis` display name, the
  navigation menu's `"use client"` boundary and its `tone` variant and
  restyled trigger.

### Evidence

- `pnpm install --frozen-lockfile`, `pnpm check-format`, `pnpm lint`,
  `pnpm check-types` and `pnpm test` (37 tests in seven files) pass.
- `pnpm build` passes with Google Fonts fetched over the network; no font
  mock was used. `/contact` and `/api/contact` render on request; `/`,
  `/control-panel` and the not-found page are static.
- Not verified: a browser run after this pass, a real submission to Neon, a
  screen reader, or a production deployment. No commit, push or deployment.

### Contact page adjustments

At the user's request:

- **Columns swapped.** On wide screens the enquiry form now sits in the right
  column and "Other ways to reach us" and "What happens next" in the left.
  `MarketingTaskLayout` places them with grid columns, so the form stays
  first in reading and focus order and still comes first on phones.
- **Breadcrumb removed.** `MarketingPageHeader` no longer renders a trail;
  its `trail` and `currentPageLabel` properties and the `MarketingTrailStep`
  type are gone, and the heading starts 48 px (phones) or 80 px (tablet up)
  below the site header. Inner pages are one level deep, so the logo and the
  header navigation lead back. The shadcn `breadcrumb` primitive stays in
  `packages/ui`, unused. `DESIGN.md` records both changes.
- Evidence: format, lint, type check and 37 tests pass. In the browser at
  1440, 1024 and 375 pixels: form on the right from 1024 up and first on
  phones, no breadcrumb, one `h1`, no horizontal overflow, no console errors.

### Still open

- Restyling classes passed to `ActionLink` and `ActionButton` in the homepage
  compositions and the palette preview, to be replaced when the homepage is
  reworked.
- Renaming the `(homepage)` route group to `(site)`.
- Image provenance for `doctor-at-clinic.webp` and `clinical-team.webp`, the
  default palette question, and approval of the drafted copy above.
- Next page in the agreed order: About us.

## Shared select, form field renderer and manual testing — 19 October 2026

The contact form's selects used the browser-native `NativeSelect`, so their
open list was the operating system's menu rather than a shadcn component, and
each control was placed by hand inside the form. This completes the change
proposed under "Remaining" above, without the folder restructure or Zod
schema.

### What changed

| Area               | Change                                                                                                                                                                                                                                                                                                                 |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Select primitive   | `select.tsx` installed with `shadcn add select` (new-york, `@radix-ui/react-select` 2.4.1) and adapted: descriptive names, icons from `@healthalyst/icons` (new `SelectedIcon` and `ChevronUpIcon`), the shared form control surface and `controlSize`, 44 px options highlighted with the `secondary` tint.           |
| Field definitions  | `packages/ui/src/lib/form-definition.ts`: `FormFieldDefinition` with a `kind` of `text`, `email`, `tel`, `textarea` or `select`, and `FormFieldGroup`. The website's `ContactEnquiryField` builds on it; `type`, `multiline` and `optionPrompt` became `kind` and `placeholder`.                                       |
| Field renderer     | `packages/ui/src/components/dynamic-form-fields.tsx` renders the fieldsets, labels, guidance, controls and error messages from the definition, following HealthSchedule's `DynamicFormFields`. The enquiry form uses it.                                                                                               |
| Validation in page | The form sets `noValidate` and checks the fields before sending (`lib/form-field-validation.ts`). Messages appear below each field and focus moves to the first one, with no browser pop-ups. A field's message clears when it changes. Required fields carry the server's existing messages, so wording is unchanged. |
| Focus              | Focus now goes to the visible control by its identifier. Radix keeps a hidden native select in the form, which `form.elements.namedItem` would return.                                                                                                                                                                 |
| Removed            | `native-select.tsx`, no longer used.                                                                                                                                                                                                                                                                                   |

### Manual testing only

At the user's instruction, automated tests are not used for now; the
maintainer tests the website manually.

- Deleted all seven test files: the enquiry form, homepage invitation, route
  handler, storage, throttle, validation and contact destination tests.
- `pnpm test-all` (root and website) no longer runs `pnpm test`, so
  continuous integration, which runs `pnpm test-all`, runs no tests. The
  pre-push hook still runs only `pnpm build`.
- Vitest, Testing Library and `packages/test-utilities` stay installed,
  unused, for later.
- `AGENTS.md`, `CONTRIBUTING.md`, the root, website, packages and
  test-utilities READMEs record the rule.

### Evidence

- `pnpm test-all` passes: formatting, lint, type checks and the production
  build. No tests and no browser checks were run; the maintainer will test the
  form manually.
- Worth checking by hand: choosing from both selects with mouse and keyboard;
  sending with fields empty (messages under each field, focus on the first,
  no browser pop-up); a product link such as "Enquire about LabConnect"
  preselecting the product; the sent and failure states.

## Rounded form controls — 19 October 2026

The user found the form fields' corners too sharp. The website sets the theme
radius `--radius` to 0.25 rem, so `rounded-md` on the controls drew 2 px
corners.

- Inputs, text areas and select triggers have 6 px corners, set once in
  `FORM_CONTROL_CLASS_NAME` (`packages/ui/src/lib/form-control-variants.ts`)
  rather than from the theme radius. A first try at 10 px was too round for
  the user; 6 px matches the inputs in the Healthalyst Africa Figma file. The
  focus ring follows the corners.
- The select's open list has 8 px corners and its options 4 px.
- `DESIGN.md` lists 6 px for inputs, selects and text areas.
- Open: other elements that use `rounded-sm`, `rounded-md` or `rounded-lg`
  (alerts, tabs, menu items, non-pill buttons, focus outlines on links) still
  render at 0 to 4 px because of the 0.25 rem theme radius, smaller than
  `DESIGN.md` lists. Raising `--radius` in `globals.css` would change all of
  them together and needs a decision.
- Evidence: `pnpm test-all` (format, lint, type checks, build). No tests or
  browser checks were run.

## Gold accent, no divider lines — 19 October 2026

The user asked for the brand gold to be used properly, starting with the
contact page, because green dominated. The gold was taken from the
Healthalyst Africa Figma file
(`kHA7dAre3U7zB3AwlywmHI`, "Design system" page, swatch "Secondary"):
**`#C8A062`**, read from a lossless capture of the swatch because the file's
inspect panel needs a Figma sign-in. Only the gold was taken; the file's green
(`#1B3323`) was not.

### Palette

- New default palette "Green and gold" (`green-gold`) in
  `design-palettes.ts`: the existing green, cream and neutrals with `accent`
  `#C8A062` and a pale gold `#E4D0B1` for gold text on green. "Green and
  coral" and the other palettes stay in the control panel. A browser that
  chose another palette in the control panel keeps it until it is reset.
- Contrast: dark text on gold 6.2:1; pale gold on green 5.4:1; gold on white
  only 2.4:1, so gold is never used for text, focus rings or thin lines on
  light surfaces. The footer's link focus outline used the accent (coral,
  2.2:1) and now uses the focus ring colour.

### Where gold appears

| Place                        | Use                                                                                                                                 |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Contact form                 | "Send enquiry" stays the app green; a gold version was tried and rejected by the user, and the `accent` button variant was removed  |
| What happens next            | Step numbers in gold circles with dark numerals                                                                                     |
| Other ways to reach us       | Link arrows in gold; link text in ink instead of green                                                                              |
| Enquiry sent                 | Confirmation icon in gold; form and confirmation headings in ink instead of green                                                   |
| Footer (all pages)           | Subtle gold background `#FFFCF5` (`accent-subtle`), sampled from the Figma file's step cards, at the user's request                 |
| Homepage (through the token) | Elements already using the accent token (process and catalogue focus rings, the about quotation bar) now show gold instead of coral |

The green contact page header (hero band), the green site header above it and
the white section below are unchanged. A first attempt moved the contact page
onto the cream background; the user rejected it and it was reverted: white
sections and green hero bands are not to be changed.

A first footer tint, the gold at 15% (about `#F3EADA`), did not match the
Figma file. The file's subtle gold is the step-card fill on the "Staff filled"
frame (node `50-9558`), read from the prototype view at actual size:
`#FFFCF5`. It is now the `accent-subtle` token (with pale tints for the other
palettes and a neutral default in `packages/ui/src/styles.css`). The step
cards also use the gold `#C8A062` for numbered circles and the progress bar,
which matches the accent.

### Horizontal lines removed

At the user's instruction, no horizontal divider lines are added without
explicit approval, and the existing generic ones were removed: between form
groups and above the send row, between record list rows, under the page
header and site header, in the Solutions menu and phone menu, at the top of
the footer and above its bottom bar, between FAQ and other accordion items,
under homepage process steps, around product details and capabilities, in the
hero and statistics band, about-section pillars, and the control panel header
and separator. Spacing now separates these items. Kept on purpose: the
underline that marks the selected product tab, link underlines, and vertical
lines (statistics, sequence connector, quotation bar).

### Open

- `not-found.tsx` shows "404" as 11 px gold text on cream (2.3:1) and an
  older hand-styled button; fix when that page is reworked.
- Remaining pages and the homepage bands get gold accents as they are
  reworked.

### Evidence

`pnpm test-all` (format, lint, type checks, build). No tests or browser checks
were run; the maintainer will review the pages manually.

## Contact hero as a card — 19 October 2026

At the user's request the contact page's green hero is a card rather than a
full-width band, below a white site header.

- `MarketingPageHeader` takes `shape`: `band` (default, full width) or `card`.
  A card sits inside external padding on the white surface (12 px on phones,
  20 px from tablet up) and has 16 px corners. The contact page uses
  `tone="brand"` with `shape="card"`; the green, the text and the form panel
  rising into it are unchanged.
- The site header is white on the contact page too and sits outside the card
  (`BRAND_HEADER_ROUTES` is now empty). A version that put the navigation
  inside the green card was tried and reverted at the user's request.
- Evidence: `pnpm test-all` (format, lint, type checks, build). No tests were
  run.

## Quieter enquiry form — 19 October 2026

At the user's request:

- Form group legends are "Institution", "Enquiry" and "Details" (previously
  "Your institution", "Your enquiry", "Your details").
- Field borders are softer: inputs, text areas and select triggers draw the
  control outline at 50% (about `#BAC5C0`) and at full strength on hover
  (`FORM_CONTROL_CLASS_NAME`). Outline buttons keep the full-strength outline.
- Accessibility: the softened border is about 1.8:1 against white, below the
  3:1 that WCAG 2.2 success criterion 1.4.11 asks of the boundary that
  identifies a field. Each field keeps a visible label directly above it, a
  darker border on hover, a 2 px focus ring and a red border when rejected.
  The lightest border that meets 3:1 is about `#85998F`, if strict AA
  conformance is required.
- Evidence: `pnpm test-all` (format, lint, type checks, build). No tests were
  run.

## Step circles on the subtle gold — 19 October 2026

At the user's request the "What happens next" step circles use the footer's
background, `accent-subtle` (`#FFFCF5`), instead of the solid gold. A gold
outline (`border-accent`) keeps the circles visible on white; numerals are
ink. Changed in `packages/ui/src/components/marketing-sequence.tsx`.
Evidence: `pnpm test-all` (format, lint, type checks, build). No tests were
run.

## Field borders lighter again — 19 October 2026

At the user's request field borders went from 50% to 35% of the control
outline: about `#CED6D3`, 1.5:1 against white, still full strength on hover.
The accessibility note under "Quieter enquiry form" applies with this lower
figure. Evidence: `pnpm test-all` (format, lint, type checks, build). No tests
were run.

## Placeholders and first form group — 19 October 2026

At the user's request:

- Placeholders in inputs, text areas and the closed select are 14 px and
  lighter: the secondary text colour at 60% (about `#8C9B95`), set in
  `FORM_CONTROL_CLASS_NAME` and the select trigger. Typed values stay 16 px.
  At 2.9:1 against white they are below the 4.5:1 WCAG asks of text; 80%
  (about `#667971`, 4.6:1) is the lightest that meets it.
- "Organisation or institution" now comes before "Institution type", and that
  first group has no heading. `FormFieldGroup.legend` is optional; a group
  without one is still a `fieldset`, so it is disabled while sending.
- Evidence: `pnpm test-all` (format, lint, type checks, build). No tests were
  run.

## Lighter running text — 19 October 2026

The user found supporting text too heavy (it was already regular, 400). All
paragraphs and description-list descriptions (`p`, `dd`) are now light (300)
through a base rule in `apps/healthalyst-website/src/app/globals.css`. Inter
loads as a variable font, so no new font file is needed. Elements with a weight
utility (headings, labels, links, `font-medium` lines) are unchanged. The field
guidance text (`FieldDescription` in `packages/ui`) set its own regular
weight and is now light too.
`DESIGN.md` lists 300 for lede, body and small text. Evidence: `pnpm test-all`
(format, lint, type checks, build). No tests were run.

## Smaller field descriptions — 19 October 2026

At the user's request field descriptions (the guidance between a label and its
control, `FieldDescription` in `packages/ui/src/components/field.tsx`) are 13
px instead of 14 px, still light. Labels stay 14 px medium. Evidence:
`pnpm test-all` (format, lint, type checks, build). No tests were run.

## Shorter form opening — 19 October 2026

At the user's request:

- The line "It takes about two minutes." under "Send an enquiry" is removed
  (and its entry in `CONTACT_FORM_CONTENT`).
- The message guidance, "Tell us about your institution and what you want to
  achieve. Please do not include patient information.", is now the message
  box's placeholder instead of a description above it.
- Note: a placeholder disappears once the visitor starts typing, so the
  request not to include patient information is no longer visible while they
  write. The server still accepts only the defined fields.
- Evidence: `pnpm test-all` (format, lint, type checks, build). No tests were
  run.

## Gold form group titles — 19 October 2026

At the user's request the enquiry form's group titles ("Enquiry", "Details")
use the accent colour, gold `#C8A062`. `FieldLegend` has a new `tone` variant
(`default` or `accent`); `DynamicFormFields` takes `legendTone`, and the
enquiry form sets it to `accent`.

Accessibility: gold text reaches about 2.4:1 on white, below the 4.5:1 WCAG
asks of 16 px text, and `DESIGN.md` had kept gold off text for that reason. A
darker gold such as `#8C6A35` (about 5.0:1) would keep the titles gold-toned
and readable if strict AA is needed. Evidence: `pnpm test-all` (format, lint,
type checks, build). No tests were run.

## Form group titles removed — 19 October 2026

At the user's request the "Enquiry" and "Details" titles are removed, so no
form group has a legend. The enquiry form no longer sets `legendTone`; the
`FieldLegend` `tone` variant remains available.

## Gold stepper line — 19 October 2026

At the user's request the vertical line joining the "What happens next"
steps uses the accent gold (`bg-accent`) instead of the edge colour.
The line is drawn as a 1 px left border, like the circle outline, so it
snaps to whole pixels and matches the outline's weight.

## About us page — 19 October 2026

The second page in the agreed order, built from the reference study
(`docs/design-case-studies.md`) and in the contact page's style.

### What the study suggested, and what was used

| Reference pattern                                                    | On this page                                                                                 |
| -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Brand-colour page header with a plain heading (Flatiron, Helium)     | The green header card from the contact page, heading "About us"                              |
| "What we do" beside a photograph (Flatiron)                          | Approved about-section copy beside the one photograph with a recorded licence                |
| Products grouped by who uses them (Helium, Commure)                  | "Who we build for": six institution types, each with its product and an enquiry link         |
| A genuine workflow sequence (Abridge)                                | "How we work with institutions": the four approved implementation stages in the gold stepper |
| Mission and values (Helium)                                          | "What guides our work": the four approved pillars                                            |
| Closing band repeating the main action (Hinge)                       | "Talk to our team" with "Contact us" and "Start a partnership enquiry"                       |
| Leadership, partners and investors, news (Abridge, Flatiron, Helium) | Left out: no approved names, partners, coverage or headshots exist yet                       |

### Build

- Route `src/app/(homepage)/about/page.tsx`, copy in
  `src/data/about-page-content.ts`; paragraphs reuse `homepage-content.tsx`,
  `PILLARS` and `STEPS` (pillar titles shown in sentence case).
- New shared composition `marketing-content-section` in `packages/ui`.
- `SITE_ROUTES.about` added. The header "About" link opens `/about` and is
  marked as the current page there; `NavigationLink` now carries a
  `destination`. Footer "About us" opens `/about`; "Our approach" opens
  `/about#how-we-work` until its own page ships.
- Photograph: `clinician-tablet.webp` (Pexels, recorded in
  `docs/website-assets.md`), with alternative text that describes the photo
  without implying it shows company staff.

### Drafted copy awaiting approval

| Location         | Draft                                                                                                                                          |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Page header lede | We build the digital infrastructure of African healthcare: purpose-built products for the institutions that deliver care across the continent. |
| Section headings | What we do; Who we build for; How we work with institutions; What guides our work; Talk to our team                                            |
| Product rows     | "{Product} for {existing description}." and "Enquire about {Product}"                                                                          |
| Closing actions  | Contact us; Start a partnership enquiry                                                                                                        |

### Claims to confirm

- "Institution-grade security" says the platforms comply "with international
  health data protection standards". This is existing homepage copy, but no
  certification or assessment is recorded. An accountable company owner
  should confirm it or it should be reworded.

### Content the company needs to supply for a complete About page

Leadership names, roles and headshots; partners, pilots or investors who
agree to be named; the company's story (founding year, location); photographs
of the team; press coverage.

### Evidence

- `pnpm test-all` (format, lint, type checks, build).
- Browser (development server), a load check only: `/about` at desktop and
  375 px wide renders with one `h1` and ordered headings, the header marks
  "About" as current, no horizontal overflow, links at least 44 px tall, no
  console errors. No tests were run.

## Office address in the footer — 19 October 2026

The user supplied the office address: 11 Adenubi Close, off Majekodunmi
Street, off Allen Avenue, Ikeja, Lagos, Nigeria. It is
`COMPANY_OFFICE_ADDRESS` in `src/data/site.ts` and appears in the footer's
first column, under the description, as an `<address>` headed "Office"
(`MarketingFooter` takes an optional `address`). The contact page's
`CONTACT_DETAILS.officeAddress` is still empty, so the contact page does not
show it yet. Evidence: `pnpm test-all` (format, lint, type checks, build). No
tests were run.

## Solutions menu card — 19 October 2026

At the user's request:

- The Solutions dropdown card has 12 px corners (`rounded-xl` on the
  navigation menu viewport in `navigation-menu.tsx`); it drew `rounded-md`,
  which the website's 0.25 rem theme radius made 2 px. Its items have 8 px
  corners.
- A 1 px rule (`border-border`) separates the menu's closing line, "Not sure
  which product fits your institution? Talk to our team", from the grid. This
  divider was explicitly requested; no other lines were added.
- Evidence: `pnpm test-all` (format, lint, type checks, build). No tests were
  run.

## Animated hero pattern — 19 October 2026

The user found the green hero cards too plain and asked for subtle animated
patterns that represent a healthcare system.

### Research

- From the reference study: Flatiron's hero illustrates its own data network
  (a dot map); Helium's generic dotted globe and Commure's glowing arc read as
  decoration, not meaning.
- A quick web search found mostly generic "node mesh" hero backgrounds
  ([Framer NeuroMesh](https://www.framer.com/marketplace/components/neuralmesh/),
  [Synaptic Pro](https://www.framer.com/community/marketplace/components/synaptic-pro/)).
  The useful idea is a sparse set of distinct care points with signals moving
  between them, which matches HealthAlyst's "one connected healthcare
  ecosystem" positioning.
- Accessibility guidance
  ([accessible SVG animation](https://noti.st/cariefisher/MKSNhs/present),
  [reduced motion](https://blog.openreplay.com/prefers-reduced-motion-accessible-animation/)):
  honour `prefers-reduced-motion`, prefer gentle opacity and slow movement,
  and give looping motion longer than five seconds a pause control (WCAG
  2.2.2).

### What was built

- `packages/ui/src/components/marketing-care-network.tsx`: inline SVG, no
  animation library. A field of small medical crosses masked to fade in from
  the right; six rounded-square facility nodes with crosses joined by curved
  spokes to a gold hub, with dashed curved links between neighbours; gold
  signals travel along the spokes (SMIL `animateMotion`), the hub's ring
  expands and fades, and alternate facilities breathe.
- `MarketingPageHeader` has a `decoration` slot (the card clips it). About
  uses `<MarketingCareNetwork />`; Contact uses
  `<MarketingCareNetwork reserveLowerSpace />` so the network stays above the
  overlapping form.
- Pause control: an `ActionButton` with the new `inverseGhost` variant and
  `PauseIcon` / `PlayIcon` (added to `@healthalyst/icons`), labelled "Pause
  background animation" / "Play background animation", in the card's top
  right corner. It pauses the SVG's animations.
- Reduced motion: animated elements and the pause control are hidden, leaving
  the static network. Phones show only the static crosses.
- The green background and the white sections are unchanged.

### Evidence

- `pnpm test-all` (format, lint, type checks, build).
- Browser (development server), a load check only: `/about` and `/contact` at
  desktop show the pattern to the right of the text and, on contact, above the
  form; the pause control stopped the animation clock and resumed it, its
  label switching between pause and play; at 375 px the network and control
  are hidden, with no horizontal overflow; no console errors. Reduced motion
  was not emulated in this browser. No tests were run.

## About page: actions under "What we do" — 19 October 2026

At the user's request "What we do" ends with two actions: "Explore our
products" (green, opens the homepage product suite at `/#products`) and "See
how we work" (outline, jumps to the page's own "How we work with
institutions" section). Both labels are drafts awaiting approval. Evidence:
`pnpm test-all` (format, lint, type checks, build). No tests were run.

## About page: institution cards — 19 October 2026

At the user's request "Who we build for" is a grid of cards on the light
accent colour: `MarketingCardGrid` (new, `packages/ui`) with the subtle gold
fill `accent-subtle` (`#FFFCF5`), a soft gold edge (`border-accent/25`) and 12
px corners, three columns on desktop, two on tablets, one on phones. The
arrow-link styling moved into `MarketingArrowLink`, used by both cards and
record lists. Cards take an optional 4:3 illustration.

### Illustration source

[unDraw](https://undraw.co/) is the proposed source: its
[licence](https://undraw.co/license) allows commercial use on websites with
no attribution and allows modification; it forbids redistributing the
illustrations in packs, rebuilding unDraw and using them to train AI. Its
main colour can be set before download, so the set can match the brand.
Considered and set aside: DrawKit (MIT, health packs, but a less consistent
match for six institution types), Manypixels, and GetIllustrations (paid).
unDraw has no dental illustration.

Proposed mapping, awaiting the user's approval to download:

| Card                                 | unDraw illustration |
| ------------------------------------ | ------------------- |
| Hospitals and clinics                | Medical care        |
| Laboratories                         | Scientist           |
| Pharmacies                           | Doctor's Orders     |
| Dental practices                     | Doctor              |
| Imaging centres                      | Medical research    |
| Equipment suppliers and institutions | Logistics           |

## About page: fading step showcase — 19 October 2026

At the user's request "How we work with institutions" shows the four stages
one at a time with a fade, instead of the stepper.

- New `MarketingStepShowcase` (`packages/ui`), built on the shared Tabs:
  `TabsList`, `TabsTrigger` and `TabsContent` gained semantic variants
  (`steps`, `step`, `crossfade`); the default variant keeps the homepage tabs
  unchanged.
- The four steps (approved `STEPS` tags) are tabs on the left; the panel on
  the right shows "Step n of 4", the stage headline and the full stage
  description from `STEPS`, and crossfades over 500 ms. It advances every 6 s,
  holds while the pointer or focus is inside, stops as soon as the visitor
  clicks or presses a key on the steps, and has a "Pause steps" / "Play
  steps" control (WCAG 2.2.2). Under reduced motion it neither advances nor
  fades and the control is hidden. Arrow keys move between steps.
- Inactive panels are `visibility: hidden`, so only the shown panel can be
  focused or read.
- Panels take an optional 16:10 illustration. Proposed unDraw picks,
  awaiting approval to download: File Searching (discovery and scoping),
  Master plan (design and architecture), Device Sync (build and
  integration), Product iteration (launch and continuous improvement).
- Evidence: `pnpm test-all`. Browser load check: it advanced from step 1 to
  step 2 after six seconds with only the active panel visible; clicking
  "Build & integration" selected it, it stayed there seven seconds later and
  the control read "Play steps". No tests were run.

## About page: illustrations in place — 20 October 2026

The ten unDraw illustrations proposed above for the institution cards and the
implementation steps are now in the page, as React components in
`packages/icons/src/illustrations` (new export
`@healthalyst/icons/illustrations`). `MarketingCardGrid` and
`MarketingStepShowcase` colour them with the primary green and set
`--illustration-accent` to the theme gold. The "Doctor" illustration (Dental
practices card) still had unDraw's light skin tones and pale hair; they now
use the deeper tone and dark hair like the other nine. Sources, licence and
placements are recorded in `docs/website-assets.md`.

Evidence: `pnpm test-all` (format, lint, type checks, build). Browser
(development server), a load check only: `/about` on desktop shows all six
card illustrations and the step illustration; at 375 px there is no
horizontal overflow, one `h1` and ordered headings; no console errors. No
tests were run.

## About page: even illustration frames — 20 October 2026

The user found the institution cards inconsistent in size. The unDraw art
ranges from 0.63:1 (Pharmacies, tall) to 1.97:1 (Supply, wide), and the
frames did not constrain it: the SVG's `size-full` resolved against an auto
height, so the tall illustration stretched its card. In `MarketingCardGrid`
(4:3) and `MarketingStepShowcase` (16:10) the illustration now sits in an
absolutely positioned box inset 24 px (32 px on wider screens for steps)
inside a frame on the page background with 8 px corners, and is fitted to
it. Evidence: browser on the development server, all six cards 459 px tall
at desktop and 423 px at 375 px, no horizontal overflow, no console errors;
`pnpm test-all`. No tests were run.

## About page: illustrations matched to institutions — 20 October 2026

The user found three institution cards with the wrong illustration.

- "Medical care" (nurses beside a jar of medicines) reads as a pharmacy and
  "Doctor's Orders" (a doctor writing on a chart) as a hospital, so they were
  swapped, and their components renamed for what they show:
  `MedicationDispensingIllustration` (Pharmacies) and
  `ClinicalChartingIllustration` (Hospitals and clinics).
- "Doctor" (a general examination with a stethoscope) does not represent
  dental practices. unDraw has no dental illustration (searches for
  "dentist" and "teeth" return nothing). It stays on the Dental card until a
  replacement is chosen.

At the user's choice the Dental card now has `DentalCareIllustration`, adapted
from unDraw's "Medical research" (the licence allows modification): the
clinician with a tablet is kept without the stethoscope, in dark scrubs and a
surgical mask so the figure differs from the Imaging card's, and the X-ray
board is replaced with a dental chair, an overhead lamp, an instrument tray
and a tooth sign drawn for this site in the same flat style and colours. The
unused "Doctor" illustration was removed. Evidence: `pnpm test-all`; browser
on the development server, all six cards the same height, no console errors.
No tests were run.

## About page: card border removed — 20 October 2026

At the user's request the institution cards (`MarketingCardGrid`) no longer
have the soft gold border; they keep the subtle gold fill and 12 px corners
and, at the user's request, have a subtle shadow instead
(`0 1px 2px` at 4% and `0 4px 16px` at 6% of the ink colour), a lighter
version of the form panel's shadow.
The step showcase panel is unchanged. Evidence: `pnpm test-all`; browser on
the development server. No tests were run.

## Section heading size — 20 October 2026

The user found the About page's section headings ("What we do", "Who we build
for") too small for sub-headings. They used Heading 2 (28 px), the step meant
for panel headings such as the contact form's. A new "Section" step, 40 px on
desktop and 32 px on phones (line height 1.15, weight 600, −0.02em), now sets
`MarketingContentSection` headings, between the 64 px page heading and 20 px
card headings and in line with the homepage's 36–48 px section headings. The
introduction sits 20 px below. Panel headings keep 28 px. Evidence:
`pnpm test-all`; browser on the development server. No tests were run.

At the user's request the "Who we build for" heading and introduction are
centred over the cards: `MarketingContentSection` gained
`alignment="center"` (stacked sections without media), which centres the
heading, introduction and actions. The other sections keep start alignment.

At the user's request the illustration frames have visible rounded corners:
they asked for `rounded-lg`, which the website's 0.25 rem theme radius made
4 px, so they now use `rounded-[8px]`, as `DESIGN.md` records and as the
Solutions menu items do. Evidence: `pnpm test-all`; browser on the
development server. No tests were run.

## About page: card micro-interactions — 20 October 2026

At the user's request the institution cards respond to the pointer and the
"Enquire about …" link stays hidden until the card is hovered, fading in
smoothly.

- `MarketingCardGrid`: on hover or focus within, the card lifts 4 px with a
  deeper shadow (300 ms, ease-out) and the illustration scales to 104%
  (500 ms) inside its clipped frame. The link fades in from transparent
  (300 ms); it does not move, because a transform on its wrapper would
  confine the stretched link to the wrapper.
- Accessibility: the link is hidden only on devices that can hover
  (`@media (hover: hover)`), so touch visitors always see it; keyboard focus
  reveals it (`focus-within`); it keeps its space while hidden, so nothing
  shifts. Under reduced motion there is no movement or transition.
- `MarketingArrowLink` gained `stretched`, which extends the link over the
  card, so the whole card is clickable and its accessible name is still the
  link text. Record lists are unchanged.

## About page: "What we do" centred vertically — 20 October 2026

At the user's request the "What we do" text is centred vertically against
the photograph on wide screens: `MarketingContentSection` aligns sections
with `media` to the centre (`lg:items-center`); split sections stay top
aligned. Evidence: `pnpm test-all`; browser on the development server. No
tests were run.

## Contact page: office map — 20 October 2026

The user asked for a Google map of the office address directly above the
footer on the contact page, and chose a lazily loaded map (no click needed)
and Google's keyless embed (no API key).

### Build

- New shared composition `marketing-location-map` (`packages/ui`): an address
  column and the map frame in one card; new `LocationIcon` in
  `@healthalyst/icons` (lucide `MapPin`).
- Contact page: a last section, "Visit our office", using
  `MarketingContentSection`, so it sits directly above the footer.
- Data: `COMPANY_OFFICE_ADDRESS.mapQuery` ("11 Adenubi Close, Ikeja, Lagos,
  Nigeria") in `src/data/site.ts`, and `CONTACT_OFFICE_MAP` in
  `src/data/contact-page-content.ts`, which builds the embed address
  (`maps.google.com/maps?q=…&z=16&hl=en&output=embed`) and the directions
  link (Google's documented Maps URLs, `google.com/maps/dir/?api=1&destination=…`).
- The frame has a title naming the place, `loading="lazy"` and
  `referrerPolicy="strict-origin-when-cross-origin"`. "Get directions" opens
  in a new tab and says so to screen readers. The address is real text, so it
  is readable if the map fails to load.
- A first version floated the address card over the map's top left corner;
  it covered Google's own place box, so the card became a column beside the
  map instead.

### Privacy

Once it loads, the Google map sets Google cookies and loads Google's scripts
in the visitor's browser. The site has no privacy notice or cookie banner
yet. An accountable company owner should decide whether a notice should
mention Google Maps, or whether the map should become click-to-load.

### To confirm

- Google labels the pinned place "11 Adenubi Cl, behind St. Leo's Catholic
  Church, off Toyin Street", while the site's address says "off Majekodunmi
  Street, off Allen Avenue". Zoomed in, the pin sits on Adenubi Close beside
  Majekodunmi Street, so it appears right; someone who knows the office
  should still confirm it.
- Drafts awaiting approval: the heading "Visit our office", the introduction
  "Our office is in Ikeja, Lagos." and "Get directions". If visits need an
  appointment, the introduction should say so.

### Evidence

`pnpm test-all` (format, lint, type checks, build). Browser on the
development server: desktop shows the address column beside the map with
the pin in Ikeja and Google's place box visible; at 375 px the address comes
first, then the map, with no horizontal overflow; the section is the last in
`main`, directly before the footer; headings are in order; the directions
link is 48 px tall and named "Get directions (opens in a new tab)"; no
console errors. No tests were run.

At the user's request the address column's type is smaller (name 18 px,
address 15 px light) and it carries a pattern: a faint field of green medical
crosses, the page header's motif, at 20% opacity on a 28 px grid, masked by a
radial fade from the lower right corner so the area behind the text stays
calm. Decorative and hidden from assistive technology. Evidence:
`pnpm test-all`; browser on the development server, no console errors. No
tests were run.

At the user's request there is no added space between a section heading and
its introduction (first 20 px, then 12 px, now none) in every
`MarketingContentSection` (About and Contact pages); only the lines' own
leading separates them. Evidence:
`pnpm test-all`; browser on the development server. No tests were run.

## About page: settings in the institution illustrations — 20 October 2026

At the user's request each institution card's illustration shows a
recognisable setting behind or around the figures, drawn for this site in
the same flat style and colours (green main colour, gold accents, unDraw's
greys):

| Card                  | Scenery added                                                                          |
| --------------------- | -------------------------------------------------------------------------------------- |
| Hospitals and clinics | Ward bed, drip stand, scheduling board; canvas widened to 1240 × 880                   |
| Laboratories          | Lab bench with microscope, beaker and flask; shelf of reagent bottles; molecule poster |
| Pharmacies            | Dispensary shelves of medicines under a pharmacy cross                                 |
| Imaging centres       | Brain scan and chest X-ray in place of the abstract films; CT scanner                  |
| Equipment suppliers   | Warehouse racking with stock; canvas extended upwards                                  |
| Dental practices      | Unchanged (already has its chair, lamp, tray and tooth sign)                           |

The widened canvases match the 4:3 frame, so the figures keep their size.
Sources and changes are recorded in `docs/website-assets.md`. Evidence:
`pnpm test-all`; browser on the development server, each card checked. No
tests were run.

The user found the scenery too noisy and asked for it to be really subtle,
keeping the emphasis on the important elements. The added scenery is now
drawn at 14% opacity (one `<g opacity="0.14">` per illustration; first 28%, made subtler at the user's request); the lab
bench, which stands in front of the scientist, stays opaque in pale greys
(`#ededed`, `#f3f3f3`, `#f8f8f8`) so her coat does not show through, and the
instruments on it are faded. Full strength is kept for the figures, the
original unDraw objects (pill jar, trolley and boxes, held flask) and the
brain scan and chest X-ray, which carry the Imaging card's meaning. Dental
practices is unchanged: its chair is the card's main subject. Evidence:
`pnpm test-all`; browser on the development server. No tests were run.

The user then asked for fewer elements and better balance, so each card keeps
only one or two quiet background pieces: Hospitals and clinics loses the drip
stand (bed and scheduling board stay); Laboratories loses the molecule poster
and the beaker and flask (bench, microscope and bottle shelf stay); Pharmacies
loses the pharmacy cross (shelves stay); Equipment suppliers keeps the racking
with half the boxes; Imaging centres keeps the scanner. The added scenery is
at 14% opacity (from 28%) and the lab bench in paler greys (`#ededed`,
`#f3f3f3`, `#f8f8f8`). Evidence: `pnpm test-all`; browser on the development
server, no console errors. No tests were run.

At the user's request the Equipment suppliers illustration has no added
background: the racking is removed and its original 800 × 406 canvas
restored. Evidence: `pnpm test-all`; browser on the development server. No
tests were run.

At the user's request the Equipment suppliers illustration has no added
background: the racking is removed and its original 800 × 406 canvas
restored. Evidence: `pnpm test-all`; browser on the development server. No
tests were run.

At the user's request the potted plant beside the clinician is removed from
the Imaging centres illustration (the Dental illustration, adapted from the
same drawing, keeps its plant). Evidence: `pnpm test-all`; browser on the
development server. No tests were run.

At the user's request the dental chair is subtle: the chair, overhead lamp
and instrument tray are drawn at 14% opacity like the other cards' scenery;
the tooth sign stays at full strength as the card's dental cue. Evidence:
`pnpm test-all`; browser on the development server. No tests were run.

The user found the Pharmacies illustration too crowded and asked for a
better one. unDraw has no pharmacist illustration (its "pharmacy" and
"medicine" results are "Doctor's Orders", already on the Hospitals card, a
medical representative and a pair of doctors), so "Medical care" is
simplified instead: the second figure is removed, leaving one pharmacist
beside the medicine jar with the faint dispensary shelves behind, and the
canvas is recentred (`viewBox="288 0 570 618.1"`). Evidence:
`pnpm test-all`; browser on the development server, no console errors. No
tests were run.

## About page: "How we work" reframed for health organisations — 20 October 2026

The user found the section misleading: it read like a software agency's
process ("before writing a line of code", "we architect platforms",
"offline-first", "unstructured supplementary service data and short message
service fallback"), while HealthAlyst builds products for health
organisations and helps them manage and automate their workflows.

The About page no longer uses the shared `STEPS`; it has its own
`ABOUT_APPROACH_STEPS` in `src/data/about-page-content.ts`. Drafted copy,
awaiting approval, limited to facts the site already states:

| Step                            | Headline                                      | Description (summary)                                                                           |
| ------------------------------- | --------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Understand your workflows       | We learn how your organisation works          | Time with clinical, administrative and management teams; where paperwork and repeats slow staff |
| Fit the product to your setting | Set up around your services and your teams    | Configured for services, roles and approvals, including facilities with limited connectivity    |
| Connect and automate            | Information moves without being entered twice | Products connected to each other and existing systems; the LabConnect and PharmaDesk examples   |
| Train, launch and support       | Alongside your staff from launch onwards      | Staff training, launch support, continued improvement                                           |

- Heading: "How we work with health organisations". Introduction: "We start
  from how your organisation delivers care, then shape our products around
  your teams and the work they do every day." Step list label: "How we work
  with you".
- Still open: the step illustrations are software-themed (unDraw "File
  Searching", "Master plan", "Device Sync", "Product iteration"), and the
  homepage "How we work" section still uses the original `STEPS` wording.

Evidence: `pnpm test-all`; browser on the development server. No tests were
run.

## About page: hub diagram replaces the cards and the steps — 20 October 2026

The user wanted no cards, illustrations or steppers in this part of the
page, but a looping animated sequence like the sector diagram on
MyCover.ai's homepage (a hub joined by connector lines to labelled pills),
and chose to replace both "Who we build for" and "How we work" with one
section. Our own design, not a copy: the reference was studied from the
user's screenshot.

### Build

- New shared composition `marketing-hub-diagram` (`packages/ui`), rendered
  on the server and complete without scripts, with a small client layer,
  `marketing-hub-diagram-motion`, that marks the active node through
  `data-active` (the diagram's classes light it up) and draws the signal, the
  hub's pulse and the pause control. Shared geometry is in
  `src/lib/hub-diagram-geometry.ts`; two keyframes are in
  `packages/ui/src/styles.css` (`marketing-hub-signal`,
  `marketing-hub-pulse`). Behaviour as recorded in `DESIGN.md`.
- A first version was one client component receiving the product icons as
  properties. It ran on the development server but the production build
  failed to prerender `/about` ("Element type is invalid … got: undefined"):
  icons passed from the server into the client component were missing from
  the client bundle. Splitting the server markup from the client motion layer
  fixed it.
- About page: "Who we build for" (centred heading and introduction) now
  holds the diagram, with the Healthalyst logo (`LogoMark`) in the hub and
  the six `INSTITUTIONS` as pills, each with its product icon and a link to
  that product's enquiry (accessible name, for example "Hospitals and clinics
  HealthSchedule: enquire about HealthSchedule"). Under it, one sentence sums
  up the four ways of working; it carries `id="how-we-work"`, so "See how we
  work" and the footer's "Our approach" still land there.
- Removed from the About page: the institution cards and their
  illustrations, the step showcase and `ABOUT_APPROACH_STEPS`. The shared
  components `marketing-card-grid` and `marketing-step-showcase`, the Tabs
  variants and the illustrations in `@healthalyst/icons/illustrations` are
  no longer used anywhere; they are kept until the user decides whether to
  remove them.

### Drafted copy awaiting approval

- "We work with each organisation in four stages: we learn how your teams
  work, set the product up around your services and roles, connect it to the
  systems you already use so information is not entered twice, and train and
  support your staff from launch onwards."
- List name: "Institutions we build for"; control: "Pause animation" / "Play
  animation".

### Evidence

`pnpm test-all`. Browser on the development server: at desktop width one
pill lights at a time and advances every 1.8 s, about 0.7 s after its signal
leaves the hub, and the hub's pulse ring sits exactly over the hub; "Pause
animation" held the loop for 3.7 s and switched to "Play animation"; the six
links open `/contact?product=…#enquiry-form`; at 375 px the hub sits above
one column of pills (62–81 px tall), with no horizontal overflow and headings
in order; no console errors after the edit. Reduced motion was not emulated.
No tests were run.

## Icons, illustrations and the MyCover Genius study — 20 October 2026

The user asked for icons like MyCover Genius's products menu everywhere,
for that site to be studied as the guide to section layout and arrangement
(not its design, colours or copy), for every unDraw illustration to be
removed as outdated, and for real, openly licensed photographs (not AI) to
be used instead.

- **Study:** `docs/design-case-studies.md`, section 6: their homepage
  section by section with the layout idea and our equivalent, their products
  menu, their imagery (commercial-style stock served through Cloudinary with
  metadata stripped, so their source cannot be identified or reused) and
  openly licensed sources for ours.
- **Icons:** new `MarketingIconBadge` (`packages/ui`), applied to the
  Solutions menu (desktop and phone; menu items take an optional `icon`), the
  About hub diagram (gold ring when active), the homepage product catalogue
  and product panel, and the office map card. Product icons now come from one
  map, `src/components/product-icons.tsx`.
- **Removed:** `packages/icons/src/illustrations` (all unDraw-based art and
  the adapted dental scene) and its `@healthalyst/icons/illustrations`
  export; `public/images/healthcare-collaboration.webp` (AI-generated, not
  displayed). `docs/website-assets.md` records both removals.
- **Not yet done:** choosing and downloading replacement photographs, which
  needs the user's approval per file. `doctor-at-clinic.webp` (homepage
  hero) and `clinical-team.webp` (homepage about) still have no recorded
  source and should be replaced. The shared `marketing-card-grid` and
  `marketing-step-showcase` are unused.

Evidence: `pnpm test-all`; browser on the development server: the Solutions
menu, the About diagram and the homepage product panel show the ringed icons;
no console errors. No tests were run.
