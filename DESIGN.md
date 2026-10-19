# HealthAlyst website design system

This file records the design decisions every page follows. It complements
`AGENTS.md` (engineering rules), `docs/design-case-studies.md` (the reference
study behind these decisions) and `docs/website-revamp.md` (delivery record).
Colour values are defaults: the application supplies them as semantic theme
tokens in `apps/healthalyst-website/src/data/design-palettes.ts`, and
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

- **One confident typeface, set large.** Hierarchy comes from size, weight and
  space, never from styling tricks.
- **One brand colour in large fields, gold as the accent.** Forest green
  fills page headers (the hero band) and closing bands; white is the surface
  people read and work on. These backgrounds do not change. The brand gold
  adds warmth inside them: sequence markers, link arrows, icons and the
  footer background, so green is not the only colour in view.
- **Plain, predictable structure.** Plain page headings ("Contact us"),
  navigation organised by who the visitor is, and one primary action
  everywhere: "Contact us".
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

**Inter** only, at the user's request (19 October 2026), loaded through
`next/font/google` with its optical-size axis. The `font-serif` utility still
appears in older homepage components and resolves to Inter until they are
reworked.

| Step      | Size (desktop / mobile) | Line height | Weight | Tracking | Use                                 |
| --------- | ----------------------- | ----------- | ------ | -------- | ----------------------------------- |
| Display   | 64 / 40 px              | 1.04        | 600    | −0.03em  | Page heading, one per page          |
| Heading 2 | 28 / 24 px              | 1.2         | 600    | −0.02em  | Panel and section headings          |
| Heading 3 | 20 px                   | 1.3         | 600    | −0.01em  | Side-column headings                |
| Lede      | 20 / 18 px              | 1.6         | 300    | 0        | Opening paragraph under the heading |
| Body      | 16–17 px                | 1.6–1.7     | 300    | 0        | Paragraphs and descriptions         |
| Label     | 14 px                   | 1.4         | 500    | 0        | Field labels; 16 px for legends     |
| Small     | 14 px                   | 1.5         | 300    | 0        | Helper text                         |
| Guidance  | 13 px                   | 1.5         | 300    | 0        | Field descriptions under labels     |

- Paragraphs and descriptions (`p`, `dd`) are light (300) by default, set in
  the website's `globals.css`, at the user's request; headings, labels and
  links keep their own weights.
- Measure: paragraphs up to 68 characters; ledes up to 52.
- Sentence case everywhere except product names.

## Space and layout

- Content width 1280 px, 12 columns. Page margins 20 px on phones, 40 px from
  tablet up.
- Spacing scale (px): 4, 8, 12, 16, 20, 24, 32, 48, 64, 96.
- Content is left aligned.

### Inner page with a task (contact page)

```
white site header: logo, Solutions, How we work, About, Contact us

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
that sit over a brand field (the form panel) and on dropdown menus. No other shadows. No horizontal divider
lines anywhere unless the user explicitly approves one.

## Components

- **Header.** Sticky, white, full width, 64 px on phones and 72 px from tablet
  up, with no bottom rule. It sits outside the page header card. A page listed
  in `BRAND_HEADER_ROUTES` would start it in the brand colour until the page
  scrolls; none is listed at present. Items: Solutions menu, How we work,
  About, and one solid "Contact us" button.
- **Footer.** The subtle gold background `accent-subtle` (`#FFFCF5`), the
  fill of the step cards in the Healthalyst Africa Figma file, at the user's
  request (`bg-accent-subtle`).
- **Solutions menu.** The shadcn navigation menu (Radix). Six destinations by
  institution type, each with its product and a one-line description, and a
  closing "Talk to our team" link. Opens with Enter, Space or hover; Escape
  closes it and returns focus to the trigger. On phones the same list sits at
  the top of the slide-out menu.
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
- **Fields.** Visible label above the control; optional fields say "Optional"
  beside the label; guidance between label and control; error message below
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
- Every transition is removed under `prefers-reduced-motion: reduce`, and the
  sending spinner stops.

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
- Icons come from Lucide only and are functional: arrows on links, chevrons on
  menus and accordions, ticks for confirmations, a menu icon on phones. Hidden
  from assistive technology when the text already says the same thing.

## Copy

- Plain British English, matching existing spelling (organisation, centre).
- Plain page headings: "Contact us", "About us".
- Keep one name for an action through a flow: "Send enquiry" → "Sending
  enquiry…" → "Enquiry sent".
- Errors say what happened and how to fix it. They do not apologise.
- Do not invent customers, numbers, certifications, vacancies, outcomes or
  contact details. Drafted copy is marked for approval in
  `docs/website-revamp.md` before release.
