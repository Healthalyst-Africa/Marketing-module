# HealthAlyst website design system

This file records the design decisions every page follows. It complements
`AGENTS.md` (engineering rules), `docs/design-case-studies.md` (the reference
study behind these decisions) and `docs/website-revamp.md` (delivery record).
Colour values are defaults: the application supplies them as semantic theme
tokens in `apps/healthalyst-website/src/config/design-palettes.ts`, and
components use the token names, never raw values.

Status: proposal for the product designer's review. Recording it here does not
approve it. First applied to the contact page and the site header on
19 October 2026.

## Direction

HealthAlyst sells software to hospitals, laboratories, pharmacies, dental
practices, imaging centres and medical suppliers. Visitors are administrators,
medical directors, procurement leads, programme managers, partners and
investors. They arrive with a question and limited time.

The site follows what the most credible health technology sites do (Abridge,
Flatiron Health, Commure, Helium Health, Hinge Health):

- **A serif for headings, a sans-serif for text, set large.** Hierarchy comes
  from size, weight and space, never from styling tricks.
- **One brand colour in large fields, gold as the accent.** Forest green
  fills page headers (the hero band) and closing bands; white is the surface
  people read and work on. These backgrounds do not change. The brand gold
  adds warmth inside them: sequence markers, link arrows, icons and the
  footer background, so green is not the only colour in view.
- **Plain, predictable structure.** Plain page headings ("Contact us"),
  navigation organised by who the visitor is, and one primary action
  everywhere: "Get started", which opens sign-up in the organisation app
  (account.healthalystafrica.com). Talking to the team is the secondary
  action beside it.
- **Proof over decoration.** Real photographs, named and sourced facts, and
  nothing invented. Where proof is missing, the page leaves the space out
  rather than filling it.
- **Quiet interaction.** Interface motion only answers what the visitor did.

### Rules that keep it from looking generic

| Avoid                                                     | Do instead                                                                                 |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| A word in a heading set in italic or another colour       | Set headings plainly                                                                       |
| Grids of identical rounded cards with icon tiles          | Lists separated by space; cards only for things that link somewhere (news, stories)        |
| Horizontal divider lines between rows, groups or sections | Space, headings and surfaces; add a line only when the user explicitly approves it         |
| All-caps or letter-spaced labels above headings           | No eyebrow labels                                                                          |
| Numbered markers as decoration                            | Numbers only for real sequences                                                            |
| Arrows typed into button text                             | Name the action; a link may carry a small arrow icon that moves 2 px on hover              |
| Scroll-triggered reveals, count-up numbers, logo marquees | Content is visible on arrival; nothing moves on its own                                    |
| Carousels that advance by themselves                      | Manual, labelled controls, and only for browsable collections                              |
| Posed stock portraits                                     | Candid photographs of real healthcare work, or the company's own people and product in use |

## Colour

Colour roles come from the active palette. The default palette is "Green and
gold": the existing green and cream with the brand gold `#C8A062`, taken from
the Healthalyst Africa Figma file (19 October 2026), as the accent. "Green and
coral", "Forest and gold" and the others remain in the control panel and map
to the same roles.

| Role            | Token                | Default   | Use                                                                    |
| --------------- | -------------------- | --------- | ---------------------------------------------------------------------- |
| Brand field     | `primary`            | `#145A46` | Page headers, closing bands, primary buttons, focus ring               |
| On brand        | `primary-foreground` | `#FFFFFF` | Text on brand fields; 80–100% opacity only                             |
| Foreground      | `foreground`         | `#112C23` | Body text and labels on white                                          |
| Secondary text  | `muted-foreground`   | `#40584E` | Supporting text, descriptions, helper text                             |
| Working surface | `card`               | `#FFFFFF` | Page body, forms, menus, panels                                        |
| Page ground     | `background`         | `#FAF7EF` | Used sparingly as an alternate band; not the default page colour       |
| Tint            | `secondary`          | `#EAF2EC` | Hover and open states of menu items and quiet buttons                  |
| Edge            | `border`             | `#CDDCD2` | Edges of cards, panels and menus; never horizontal dividers            |
| Control outline | `input`              | `#748B80` | Field borders at 35% (about `#CED6D3`), full on hover; outline buttons |
| Accent (gold)   | `accent`             | `#C8A062` | Outline of sequence markers, link arrows, decorative icons, enquiry    |
|                 |                      |           | form group titles (the user's choice; 2.4:1). Never buttons, and       |
|                 |                      |           | never the only cue for a control or focus                              |
| Gold on brand   | `accent-on-primary`  | `#E4D0B1` | Gold text and icons on the brand green                                 |
| Subtle gold     | `accent-subtle`      | `#FFFCF5` | Footer background and sequence marker fill; the Figma step-card fill   |
| Error           | `destructive`        | `#B42318` | Validation and failure messages. Not recoloured by palettes            |

Measured contrast (default palette): white on primary 8.1:1, white at 80% on
primary 5.9:1, secondary text on white 7.7:1, control outline on white 3.6:1 (field borders at
35%: 1.5:1),
dark text on gold 6.2:1 (7.1:1 on its hover tint), pale gold on primary 5.4:1.
Gold itself reaches only 2.4:1 on white, 2.3:1 on cream and 3.4:1 on primary,
which is why it is never used for text or focus on light surfaces, and on the
brand green only for large text and icons.

## Typography

Two typefaces, at the user's request (20 October 2026), both loaded through
`next/font/google`:

- **Young Serif** (`font-serif`, `--font-heading`) for page, section and
  panel headings and the homepage statement. It has a single weight that is
  already heavy, so headings use `font-normal`; never `font-bold`, which
  would make the browser synthesise a fake bold. Tracking −0.01em.
- **Inter** (`font-sans`, `--font-sans`) with its optical-size axis for
  everything else: body text, descriptions, controls, navigation, labels and
  small item titles.

The description under a page or section heading is regular (400).

| Step      | Size (desktop / mobile) | Line height | Weight | Tracking | Use                                 |
| --------- | ----------------------- | ----------- | ------ | -------- | ----------------------------------- |
| Display   | 64 / 32 px              | 1.04        | 400    | −0.01em  | Page heading, one per page          |
| Section   | 40 / 28 px              | 1.15        | 400    | −0.01em  | Section headings on content pages   |
| Heading 2 | 28 / 24 px              | 1.2         | 400    | −0.01em  | Panel headings                      |
| Heading 3 | 20 px                   | 1.3         | 600    | −0.01em  | Side-column headings                |
| Lede      | 20 / 18 px              | 1.6         | 400    | 0        | Opening paragraph under the heading |
| Body      | 16–17 px                | 1.6–1.7     | 300    | 0        | Paragraphs and descriptions         |
| Label     | 14 px                   | 1.4         | 500    | 0        | Field labels; 16 px for legends     |
| Small     | 14 px                   | 1.5         | 300    | 0        | Helper text                         |
| Guidance  | 13 px                   | 1.5         | 300    | 0        | Field descriptions under labels     |

- Text weight has two tiers, at the user's request:
  - **Running text is light (300)**, the default for `p` and `dd` in the
    website's `globals.css`: body paragraphs, addresses, field guidance and
    diagram notes.
  - **Every description under a heading is regular (400)**, at the user's
    request (medium 500 was distracting): hero and page-header ledes,
    section introductions, the FAQ and closing-band descriptions, the
    Contact panel descriptions and item descriptions such as the "Why
    HealthAlyst" pillars.
    Headings, labels and links keep their own weights.
- Measure: paragraphs up to 68 characters; ledes up to 52.
- Sentence case everywhere except product names.

## Space and layout

- Content width 1280 px, 12 columns. Page margins 20 px on phones, 40 px from
  tablet up.
- Spacing scale (px): 4, 8, 12, 16, 20, 24, 32, 48, 64, 96.
- Content is left aligned.

### Inner page with a task (contact page)

```
white site header: logo, Solutions, About, FAQ, Contact us,
                   Sign in (outline), Get started (filled)

╭────────────────────────────────────────────────────────────────────╮
│ Contact us                 ← display, white on forest green        │
│ One-sentence lede                                                  │
│                             ┌─── white form panel (7 cols) ────┐   │
╰─────────────────────────────│ rises into the green card        │───╯
 Other ways to reach us (5)   │ grouped fieldsets                │
 What happens next            │ send button, helper text         │
                              └──────────────────────────────────┘
```

The green page header is a card below the white site header: it sits inside
12 px of white space on phones and 20 px from tablet up, with 16 px corners
(`shape="card"` on `MarketingPageHeader`), and the form panel rises into its
lower part. It stays
green and the section below it stays white. On
phones and tablets the form comes first and the side column follows it.
On wide screens the form stays first in reading and focus order although it
sits in the right-hand column.

### Office map (Contact us)

The contact page ends, directly above the footer, with a "Visit our office"
section (`MarketingContentSection`) holding `MarketingLocationMap`: one card
with the subtle gold fill, 12 px corners and the linked-card shadow, split
into an address column (location icon in a soft gold circle, the company name
at 18 px, the address at 15 px light, a green "Get directions" pill, over a
faint field of green medical crosses, the page header's motif, at 20% opacity
on a 28 px grid, strongest in the lower right corner and fading out behind
the text) and Google's map at 320
px tall (440 px from tablets up). On wide screens the address is a third of
the width on the left; on phones it comes first and the map follows. The
address never sits over the map, so Google's own place box and controls stay
visible.

### Inner page of sections (About us)

The green page header card, then white sections built with
`MarketingContentSection`, separated by space only:

- A section has a 40 px (32 px on phones) semibold ink heading and an optional light
  introduction of up to 68 characters a line.
- `stacked` puts the content below, and may centre the heading and
  introduction over it (`alignment="center"`, used for "Who we build for"); `split` puts the heading in a 5-column
  side column beside 7 columns of content; a `media` photograph takes 5
  columns beside the text, which is centred vertically against it.
- **Hub diagram** (`MarketingHubDiagram`, "Who we build for" on the About
  page, at the user's request, after a MyCover.ai reference; it replaced the
  institution cards and the step showcase there). The logo sits in a 32 px
  rounded hub card with a soft shadow on a faint gold glow; three institution
  pills a side (ringed icon, institution at 15 px semibold,
  product at 13 px light, full-round with a green 20% edge) join it by curved
  connectors in green at 20%. Every 2.4 s the hub's gold ring pulses and
  gold signals travel along all six connectors at once (0.9 s); all six pills
  light up together (gold edge, gold icon ring, deeper shadow) 0.7 s later
  and fade back after about a second. Each pill links to that product's enquiry. The loop holds
  under the pointer or focus, stops off screen, has a "Pause animation"
  control and does not run under reduced motion. On phones and tablets the
  hub sits above the pills in one or two columns. The four ways of working
  follow as one centred sentence (`#how-we-work`).
- Lists of labelled items use record rows in two or three columns; real
  sequences use the gold stepper; a closing section repeats the main action
  ("Get started") with one outline secondary action ("Talk to our team").
  A section offers at most two actions, and the contact page offers none
  besides its enquiry form.
- Sections the company cannot yet support with real material (partners,
  news) are left out rather than filled. Leadership and testimonials are
  built but publish only approved entries: their labelled samples show in
  development alone, so in production each section is absent until real,
  permissioned material is added. Leadership sits on the About page after
  "Who we build for" on the cream band (`MarketingTeam`): white cards with the
  colour portrait inset, a round brand-green LinkedIn badge on the portrait's
  bottom-right edge, then the name in bold and the role beneath. No
  ornaments: no outline shapes, eyebrow capitals or staggered rows.

### Homepage (rebuilt 20 October 2026)

Section order and arrangement follow the MyCover Genius study
(`docs/design-case-studies.md`, section 6; `docs/website-refactor-plan.md`),
in HealthAlyst's own palette, type and content. Headings, ledes and section
surfaces match the About and Contact pages (40 / 32 px section headings,
white sections, one green band, one cream band).

1. **Hero** (`MarketingRotatingHero`): the green card of the inner pages,
   at least 540 px tall, with a centred 64 / 40 px heading, "Digital
   infrastructure for" and a gold word naming one institution type at a time
   (the full list for screen readers). Every 3.6 s the word changes (the old
   one leaves in 0.2 s, the new one rises in 0.5 s, so they never overlap)
   and the photograph of that setting behind it crossfades in 1.2 s and
   zooms slowly over 7 s. A radial brand-colour wash (86% behind the text,
   40% at the edges) keeps the text readable and the setting recognisable.
   Lede, a white "Get started" pill, a "Talk to our team" arrow link,
   the static cross pattern and a pause control top right; under reduced
   motion the first photograph and "African healthcare" stay still. This
   replaced a three-photograph card row that copied MyCover Genius too
   closely (the user's call).
2. **Built for** (`MarketingIllustratedLinkRow`): a caption and six
   institution cards, each a 72 px GitLab-style illustration above its label,
   three a row on tablets and one row on wide screens (hidden on phones); the
   illustration's disc takes a gold tint on hover and focus, and each card
   opens its product in the suite.
3. **Why HealthAlyst** (`MarketingScrollStory`): on wide screens the
   section heading, a photograph (5 of 12 columns, up to 440 px tall, 16 px
   corners) and a text window of the same height (columns 7 to 12) stay
   pinned under the site header while the section scrolls by (55% of the
   window's height per pillar, with a short hold at each end). Inside the
   window each pillar has a 300 px slot, the current one centred against the
   photograph, and the pillars move with the scroll through a light
   smoothing (each frame closes 14% of the remaining distance), so wheel
   steps glide; under reduced motion they follow the scroll directly. The
   Behind the photograph's lower right corner, offset 40 px, sits a field of
   the brand's medical crosses (22 px grid, green at 32%, fading out
   radially), drifting 10 px per pillar with the story (still under reduced
   motion), with a small cluster of gold crosses at the upper left. The
   text window is clipped and fully visible only between 22% and 78% of its
   height, so neighbouring pillars stay hidden at rest. The next photograph
   fades in over the current one in the middle 20% of the scroll between two
   Only the centred pillar is in full colour, its 32 px
   title in the accent gold (trial at the user's request; gold on white is
   about 2.4:1, below the 3:1 large-text minimum); incoming and outgoing
   pillars are grey (title and description mixed towards muted grey, icon
   desaturated), mixing smoothly with the scroll. Each pillar: a ringed
   icon, the title and its description; no numbers or list. On phones and tablets the heading
   leads and each pillar shows its photograph above it.
4. **Our product suite** (`MarketingProductSuite`, green band): pill tabs
   (Care delivery, Diagnostics, Medicines and supply) over two white product
   cards each: 64 px ringed icon, tagline, name, summary, gold-tick
   capabilities, enquiry link and a faint oversized icon in the corner; the
   selected product has a gold ring. The header menu and the chips select a
   product through `ProductsProvider`.
5. **One connected ecosystem**: the hub diagram with the six products and
   the approved LabConnect and PharmaDesk example under it.
6. **How we work with you** (`MarketingNumberedSteps`): four columns of
   64 px gold-outlined numerals with ringed icons, rising in order on first
   view; one "Start a conversation" pill. (No progress line: lines need the
   user's approval.)
7. **Built for African operating conditions** (`MarketingFeatureCarousel`,
   cream band): an Embla carousel of five feature cards (80 px
   illustration, title, sentence) with previous and next controls and
   arrow keys; the selected card has a gold ring.
8. **Testimonials** (`MarketingTestimonials`), at the user's request in
   place of the statement and in its design: one quotation at a time in
   Young Serif at up to 56 px, gold quotation marks, its words lighting up in
   reading order as it scrolls; a round 80 px avatar (portrait, or initials
   on the subtle gold with a gold ring) floats at the quote's lower right,
   overlapping its end slightly; name, role and institution below; previous
   and next buttons, no automatic rotation. Only approved testimonials are
   published; until one exists the section is absent in production, and
   labelled samples show in development.
9. **Frequently asked questions** (`MarketingFAQ`): heading and line in five
   columns, accordion in seven.
10. **Ready to get started?** (`MarketingClosingBand`): a green card with
    the heading, approved sentence, "Get started" and "Talk to our team",
    the cross pattern and a photograph on the right.

## Shape and depth

| Element                     | Radius |
| --------------------------- | ------ |
| Inputs, selects, text areas | 6 px   |
| Menu items, alerts          | 8 px   |
| Panels and menus            | 12 px  |
| Page header card (contact)  | 16 px  |
| Photographs inside the page | 12 px  |
| Full-bleed photographs      | 0      |
| Buttons                     | Full   |

Depth: 1 px edges on cards, panels and controls, plus one soft shadow on panels
that sit over a brand field (the form panel) and on dropdown menus, and a
lighter shadow on cards and photographs that stand on a surface (hub
pills and hub card, location map, product and feature cards), at the user's request. No
other shadows. No horizontal divider
lines anywhere unless the user explicitly approves one.

## Components

- **Header.** Sticky, white, full width, 64 px on phones and 72 px from tablet
  up, with no bottom rule. It sits outside the page header card. A page listed
  in `BRAND_HEADER_ROUTES` would start it in the brand colour until the page
  scrolls; none is listed at present. Items: Solutions menu, About, FAQ and
  Contact us, then an outline "Sign in" and a solid "Get
  started" button.
- **Footer.** The subtle gold background `accent-subtle` (`#FFFCF5`), the
  fill of the step cards in the Healthalyst Africa Figma file, at the user's
  request (`bg-accent-subtle`).
- **Solutions menu.** The shadcn navigation menu (Radix), laid out after the
  MyCover Genius products menu: a wide panel centred under the header
  (`viewportPlacement="container"`, up to 1120 px) with a heading ("Find the
  right product for your institution"), three columns grouped by need (Care
  delivery, Diagnostics, Medicines and supply) under small uppercase labels,
  each item a ringed icon badge, institution type and one-line product
  description, and a closing photograph column with a short prompt and a
  "Talk to our team" link. No column rules (no lines without permission). The
  menu card has 12 px corners and its items 8 px. Opens with Enter, Space or
  hover; Escape closes it and returns focus to the trigger. On phones the same
  groups sit at the top of the slide-out menu under their labels.
- **Buttons.** 48 px tall in content (`size="extraLarge"`), 44 px in the
  header (`size="large"`), full radius (`shape="pill"`), semibold sentence-case
  labels. Primary: brand fill (`variant="default"`), including "Send enquiry";
  buttons are never gold. Secondary: 1 px
  control-outline border with foreground text (`variant="outline"`). On a brand
  field the primary button inverts to white with brand text
  (`variant="inverse"`) and the secondary one uses a translucent white border
  (`variant="inverseOutline"`). Hover changes the fill in 150 ms. Focus shows a
  2 px ring offset from the edge. Actions use `ActionButton`; links that look
  like buttons use `ActionLink`.
- **Text links with a destination.** Brand colour, semibold, a 16 px arrow
  icon that moves 2 px right on hover over 200 ms; underline on hover.
- **Fields.** Visible label above the control; required fields carry a red
  asterisk after the label (hidden from screen readers, which announce the
  control as required) and optional fields carry no marker; guidance between label and control; error message below
  the control with `aria-invalid`. Borders are soft (the control outline at
  35%, at the user's request) and darken to full strength on hover; a 2 px focus ring,
  offset like the buttons', on keyboard focus. Every control shares this
  treatment; public forms use `controlSize="large"` (48 px). Placeholders only
  show example formats, or prompt a choice in a closed select, at 14 px in the
  secondary text colour at 60%. Selects use the
  shared select, whose open list matches the site rather than the browser's
  own menu.
- **Form groups.** `fieldset`s separated by space. The first group
  (organisation, then institution type) has no legend; the others are headed
  "Enquiry" and "Details".
  Questions that route the enquiry come before personal details.
- **Form states.** Missing or malformed answers: checked before sending; each
  message appears below its field and focus moves to the first one, with no
  browser pop-ups. Sending: button disabled with a spinner and "Sending
  enquiry…". Failure: an alert at the top of the form that takes focus, or
  focus moves to the first rejected field with its message. Sent: the form is
  replaced by a confirmation panel ("Enquiry sent") that takes focus and
  offers "Send another enquiry".
- **Record rows.** Term, short description and at most one link, separated by
  space. The link is ink with a gold arrow. Used for contact routes and facts.
- **Sequences.** Numbers in 32 px circles filled with the subtle gold
  (`bg-accent-subtle`, the footer's background) with a gold outline and dark
  numerals, joined by a vertical 1 px line; only for steps that happen in
  order.
- **No breadcrumb trail.** Inner pages sit one level below the homepage, so
  the logo and the header navigation are the way back; the header marks the
  current page with `aria-current="page"`.
- **Accordions.** Only for secondary detail such as questions: chevron on the
  right, items separated by space with no dividing lines, grouped by audience,
  with a contact link above.

## Motion

- Colour and background changes: 150 ms. Small movements (arrow nudge,
  chevron rotation): 200 ms. Nothing over 300 ms.
- Menus fade and slide using the primitive's own animation; dialogs and
  sheets slide in.
- No scroll-triggered entrances, count-ups, auto-advancing carousels, logo
  marquees or autoplaying video without a pause control.
- **Linked cards.** The whole card opens its link. On hover or keyboard focus
  it lifts 4 px and its shadow deepens (300 ms), its illustration scales to
  104% (500 ms), and the "Enquire about …" link fades into view (300 ms). The link is hidden until then only on devices that can hover; on
  touch screens it is always shown, and keyboard focus always reveals it.
- Every transition is removed under `prefers-reduced-motion: reduce`, and the
  sending spinner stops.
- **Hero pattern.** Green page header cards carry `CareNetworkIllustration`: a
  faint field of medical crosses (8–9% white) fading in from the right, and on
  tablet and desktop a network of six facilities joined to a gold hub (the
  shared record), with gold signals moving along the links over 6.5–10 s, the
  hub's ring expanding every 4 s and alternate facilities breathing every 5 s.
  It is decorative (`aria-hidden`), kept to the right so text is never over
  it, still under reduced motion, and has a pause control in the card's top
  right corner (WCAG 2.2.2). On phones only the static crosses show.

## Imagery and icons

- Photographs show real healthcare work in African settings: candid, not
  posed. Real photographs of the HealthAlyst team and of facilities using the
  products are the target.
- Each photograph is recorded in `docs/website-assets.md` with source,
  photographer, licence, placement, crop and alternative text. Meaningful
  photographs get a description; purely decorative ones get empty alt text.
- Text sits on a photograph only over a dark gradient or solid panel, and
  must meet contrast.
- Never present stock models as HealthAlyst staff, customers or partners, never
  show invented product screens or patient information, and never use
  AI-generated images as photographs.
- Task pages (contact, forms) carry no decorative photography.
- No illustrations (the unDraw set was removed at the user's request as
  outdated) and no AI-generated images: imagery is real, openly licensed
  photography (Pexels, Unsplash, nappy, Wikimedia Commons; see
  `docs/design-case-studies.md`, section 6).
- Icons come from Lucide only, through `@healthalyst/icons`. Functional icons
  (arrows on links, chevrons on menus and accordions, ticks for confirmations,
  a menu icon on phones) sit inline. Product, feature and contact icons always
  use `MarketingIconBadge`: a thin 1 px ring with no fill, brand green at 60%
  (gold when active or highlighted), around a Lucide glyph at 1.75 stroke;
  32 px in menus, 40 px in lists and cards, 64 px for a product's own icon.
  This follows the clean ringed icons of MyCover Genius's products menu, at
  the user's request, in our own colours. Icons are hidden from assistive
  technology when the text already says the same thing.

## Copy

- Plain British English, matching existing spelling (organisation, centre).
- Plain page headings: "Contact us", "About us".
- Keep one name for an action through a flow: "Send enquiry" → "Sending
  enquiry…" → "Enquiry sent".
- Errors say what happened and how to fix it. They do not apologise.
- Do not invent customers, numbers, certifications, vacancies, outcomes or
  contact details. Drafted copy is marked for approval in
  `docs/website-revamp.md` before release.
