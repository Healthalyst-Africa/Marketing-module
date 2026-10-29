# Shared interface components

`@healthalyst/ui` owns all shadcn primitives in the client monorepo, including
components currently consumed by only one application. Keep tokens and primitive
behavior product-neutral. Website branding and content belong in the application. Reusable visual
structure belongs here, composed from these primitives and supplied with
application content and semantic theme values.

## Public imports

### Primitives (`src/primitives`)

shadcn registry primitives. Applications never import them; compositions in `components` do.

- `@healthalyst/ui/primitives/button` (consumed only by `ActionButton` and `ActionLink`)
- `@healthalyst/ui/primitives/input`
- `@healthalyst/ui/primitives/textarea`
- `@healthalyst/ui/primitives/accordion`
- `@healthalyst/ui/primitives/select`
- `@healthalyst/ui/primitives/card`
- `@healthalyst/ui/primitives/radio-group`
- `@healthalyst/ui/primitives/field`
- `@healthalyst/ui/primitives/label`
- `@healthalyst/ui/primitives/separator`
- `@healthalyst/ui/primitives/alert`
- `@healthalyst/ui/primitives/tabs` (variants: `default`; `pills` list with
  `inversePill` triggers for brand-coloured bands)
- `@healthalyst/ui/primitives/carousel` (shadcn carousel on Embla, adapted to
  the naming rule and `ActionButton` controls)
- `@healthalyst/ui/primitives/sheet`
- `@healthalyst/ui/primitives/breadcrumb`
- `@healthalyst/ui/primitives/navigation-menu`

### Compositions (`src/components`)

Dedicated visual components built from the primitives. Private helpers of one composition live in a folder named after it, such as `components/marketing-hub-diagram/`.

- `@healthalyst/ui/components/action-button`
- `@healthalyst/ui/components/action-link`
- `@healthalyst/ui/components/dynamic-form-fields`
- `@healthalyst/ui/components/color-swatch`
- `@healthalyst/ui/components/palette-selector`
- `@healthalyst/ui/components/design-preview`
- `@healthalyst/ui/components/design-control-panel`
- `@healthalyst/ui/components/theme-preference-provider`
- `@healthalyst/ui/components/marketing-section`
- `@healthalyst/ui/components/marketing-navigation` (sticky header; the
  Solutions panel spans the screen and rolls down to open and up to close;
  menu items take an `illustration`, shown at 48 px, or an `icon`)
- `@healthalyst/ui/components/marketing-faq`
- `@healthalyst/ui/components/marketing-contact`
- `@healthalyst/ui/components/marketing-footer`
- `@healthalyst/ui/components/marketing-page-header`
- `@healthalyst/ui/components/marketing-content-section`
- `@healthalyst/ui/components/marketing-rotating-hero` (homepage hero: a
  rotating audience word with a matching background photograph that
  crossfades behind a brand wash)
- `@healthalyst/ui/components/marketing-text-rotator` (a word that changes in
  place, self-timed or driven by `activeIndex`; hidden from assistive
  technology)
- `@healthalyst/ui/components/marketing-motion-pause` (one pause state and
  control shared by a section's moving parts)
- `@healthalyst/ui/components/marketing-illustrated-link-row` (a caption over
  linked cards, each an illustration above its label)
- `@healthalyst/ui/components/marketing-scroll-story` (a pinned heading,
  photograph and clipped text window; the chapters glide through the window
  with the scroll and the photograph follows; renders the section's `h2`)
- `@healthalyst/ui/components/marketing-product-suite` (pill tabs by need over
  product cards on a brand band; a product with an `illustration` shows it
  at 80 px in place of the ringed icon)
- `@healthalyst/ui/components/marketing-numbered-steps` (outlined numerals and
  ringed icons that rise in order)
- `@healthalyst/ui/components/marketing-reveal` (marks content revealed when it
  scrolls into view; visible before scripts run)
- `@healthalyst/ui/components/marketing-feature-carousel` (a carousel of
  feature cards with previous and next controls; a feature with an `illustration` shows it at
  80 px in place of the ringed icon)
- `@healthalyst/ui/components/marketing-testimonials` (one oversized
  quotation at a time whose words light up as it scrolls, with a floating
  avatar, attribution and previous and next buttons)
- `@healthalyst/ui/components/marketing-arrow-link` (text link with an accent
  arrow; `tone="inverse"` on brand bands; `stretched` covers its card)
- `@healthalyst/ui/components/marketing-icon-badge` (the site's single
  treatment for product, feature and contact icons: a thin ring, no fill)
- `@healthalyst/ui/components/marketing-hub-diagram` (a hub joined to six
  linked destinations, with a looping signal and a pause control; server
  markup with the client layer `marketing-hub-diagram-motion`; a node with an
  `illustration` shows it at 48 px, and its disc turns gold with the signal)
- `@healthalyst/ui/components/marketing-location-map` (an address card beside
  an embedded map, loaded lazily)
- `@healthalyst/ui/components/marketing-task-layout`
- `@healthalyst/ui/components/marketing-sequence`
- `@healthalyst/ui/components/marketing-record-list` (entries may take an
  `illustration` or a ringed `icon`; links line up when laid out in columns)
- `@healthalyst/ui/components/marketing-question-assistant` (an AI question
  box for under an FAQ: posts one question to `endpoint` and shows the answer
  with a contact link; pass it to `MarketingFAQ` as `assistant`)
- `@healthalyst/ui/components/marketing-figure`
- `@healthalyst/ui/components/marketing-closing-band`

### Illustrations (`src/illustrations`)

Decorative SVG artwork, hidden from assistive technology. Use these as focal or background pictures, never as interface icons.

- `@healthalyst/ui/illustrations/contour-pattern-illustration`
- `@healthalyst/ui/illustrations/care-network-illustration` (decorative hero pattern
  for `MarketingPageHeader`'s `decoration` slot)
- `@healthalyst/ui/illustrations/hospital-illustration`,
  `laboratory-illustration`, `pharmacy-illustration`, `dental-illustration`,
  `imaging-illustration` and `medical-supply-illustration`: one for each
  institution type, drawn on a 144 px canvas in the GitLab SVGs style with a
  background disc. Show them at 48 px or larger. Their colours come from
  theme tokens in `illustration-colours.ts`, which also keeps the MIT notice;
  a container can set `--illustration-base` to recolour the disc.
- `@healthalyst/ui/illustrations/offline-illustration`,
  `low-bandwidth-illustration`, `text-message-illustration`,
  `multilingual-illustration` and `facility-scale-illustration`: the same
  style, one for each operating condition the products are built for.

GitLab's own catalogue has no healthcare artwork, so institution
illustrations are drawn here in its style: flat geometry, white surfaces and
one brand fill, with broken lines. Fills are whole shapes without strokes; the
2 px dark outline is a separate open path that stops 6–8 units short of
closing, usually on a straight edge near a corner. Circles become arcs with a
small gap, a loose arc floats beside the object, and secondary detail uses the
pale `detail` stroke. The raw GitLab download, when present, is a
local reference in the untracked `.illustration-library/` folder; never commit
or import it, and never copy GitLab's logo or any third-party brand logo.

### Types, forms, configuration and utilities

- `@healthalyst/ui/lib/theme-preference`
- `@healthalyst/ui/lib/form-control-variants` holds the surface, focus and
  height variants shared by the input, text area and select trigger.
- `@healthalyst/ui/types/form-definition` describes form fields and their groups
- `@healthalyst/ui/types/marketing-question-assistant` is the request and
  response contract between the question assistant and its route
  for `DynamicFormFields`.
- `@healthalyst/ui/forms/form-field-validation` checks defined fields against
  their controls and returns a message for each one that fails.
- `@healthalyst/ui/lib/utilities` exports the approved `cn` helper.
- `@healthalyst/ui/styles.css` provides neutral theme variables.
- `@healthalyst/ui/forms/marketing-enquiry` records the request and response
  contract shared by `MarketingEnquiryForm` and the website endpoint.
- `@healthalyst/ui/config/motion-controls` exports `SHOW_MOTION_CONTROLS`.

The input, textarea, and accordion sources were installed from the official
`new-york` shadcn registry for Tailwind 3. The breadcrumb and navigation menu sources
were taken from the official `new-york` components and adapted to the naming
rules; the navigation menu depends on `@radix-ui/react-navigation-menu`. The
select was installed with the shadcn CLI from the official `new-york` registry
and depends on `@radix-ui/react-select`. Its names follow the repository rules,
its icons come from `@healthalyst/icons`, and its trigger uses the shared form
control variants. Dependencies are declared in this package.

## Adding components

From the monorepo root, inspect the existing installation and planned changes:

```sh
pnpm dlx shadcn@latest info --cwd apps/healthalyst-website --json
pnpm dlx shadcn@latest add <component-name> --cwd apps/healthalyst-website --dry-run
pnpm dlx shadcn@latest add <component-name> --cwd apps/healthalyst-website
```

Application aliases direct primitives and the class utility into this package.
Both `components.json` files must retain aligned styles and destinations. Review
new dependencies, generated configuration changes, and compatibility with the
installed Tailwind version. Never overwrite customized source blindly. Generated
local names must follow the root `AGENTS.md` naming requirements.

## Buttons and form controls

Compositions never restyle a primitive at the call site. They pick a variant or
property, and pass only layout classes such as width, grid placement and
spacing.

- `ActionButton` renders the button for actions. It adds `isLoading` and
  `loadingText` (spinner, `aria-busy`, disabled), and optional leading and
  trailing icons. `ActionLink` gives a link element, such as a Next.js `Link`,
  the same styling while keeping link semantics. Only these two components
  import `button`.
- Button `variant`: `default` (brand fill), `outline` (secondary action,
  control-outline border), `ghost`, `secondary`, `link`, `destructive`,
  `inverse` (primary action on a brand-coloured field), `inverseGhost` (a quiet
  control on a brand-coloured field, such as pausing decoration) and
  `inverseOutline`
  (secondary action on a brand-coloured field). `size`: `small`, `default`,
  `large` (44 px), `extraLarge` (48 px), `icon` and `largeIcon` (44 px).
  `shape`: `default` or `pill`. Hover tints use `secondary`, never `accent`.
  The `unstyled` variant and size remain only for branded wrappers in an
  application.
- `Input`, `Textarea` and `SelectTrigger` share one surface, hover, focus ring,
  rejected and disabled treatment from `form-control-variants`. `Input` and
  `SelectTrigger` take `controlSize` (`small`, `default` 44 px, `large` 48 px);
  set a text area's height with `rows`. The select shows its placeholder in
  the secondary text colour, opens a list styled like the rest of the
  interface, and highlights options with the `secondary` tint.
- Forms render fields with `DynamicFormFields` from a `FormFieldGroup` list
  rather than placing controls by hand. Each field has a `kind` (`text`,
  `email`, `tel`, `textarea` or `select`), a persistent label, optional
  guidance and its error message. The form owns submission: it sets
  `noValidate`, calls `findFormFieldErrors` before sending, shows the messages
  beside the fields and moves focus to the first rejected control, found with
  `createFormFieldIdentifier`. Radix keeps a hidden native select in the form
  for each select, so focus must never go to the element returned by
  `form.elements.namedItem`.
- `navigationMenuTriggerStyle` takes `tone` (`default` or `inverse`). Pass it to
  `NavigationMenuLink` as `className` for plain links in the same bar, and pass
  `tone` to `NavigationMenuTrigger`.
- `NavigationMenu` takes `viewportPlacement` (`trigger`, the default, or
  `container`). With `container` the root is not positioned, so the viewport
  spans the nearest positioned ancestor, such as a header container, and
  panels centre under it instead of the trigger.
- `MarketingNavigation` menus take `heading`, `groups` (each a `label` and
  `items`) and an optional `feature` (`photograph`, `description`, `link`)
  shown as a closing column.

The accordion trigger's `showIndicator` option lets a composition supply its own
indicator. Icons come from `@healthalyst/icons`.

Applications must load the shared stylesheet, transpile this package through
Next.js, and include its source in Tailwind scanning. Import through package
exports rather than relative paths into another workspace.

## Presentation preferences

The design control panel composes shared shadcn primitives. Applications supply
palette options, approved preview content and navigation elements. Supplying
React elements for links supports framework routing without coupling this
package to Next.js. The website owns the colour definitions and generates
semantic variables; shared components contain no HealthAlyst colour values.

`ThemePreferenceProvider` consumes a cookie name, a default identifier and an
allowlist of palette identifiers. `useThemePreference` exposes the current choice,
selection, reset and persistence availability. The provider applies the choice to
`data-palette` on the root element, saves only its identifier in a preference
cookie and synchronises open tabs through BroadcastChannel. Focus, visibility
and page restoration also reconcile the saved preference. Cookie or channel
restrictions do not prevent a local selection.

Place the script returned by `createThemeInitializationScript` in the root layout
head, alongside palette styles, to apply a valid saved preference before the page
paints. It falls back to the default for malformed, unknown or inaccessible
cookies. The script configuration must be application-authored, with the same
allowlist as the provider. The website remains statically rendered.

The card, radio group, field, label, separator and alert sources were installed
from the official shadcn registry. The field's responsive and selected-state
utilities were adapted for Tailwind 3. Only the radio group, label and separator
needed additional Radix dependencies.

## Marketing compositions

Marketing layouts consume application-authored content, products, illustrations
and link elements. They use semantic theme variables rather than brand colour
values. The website supplies Next.js image and routing elements; this package
has no Next.js dependency. The shared brand lockup receives its mark and wording.

Tabs and Sheet were installed from the official `new-york` registry for
Tailwind 3. They require the Radix tabs and dialog packages respectively. Local
names follow the repository rules. Sheet keeps dialog semantics, a labelled
close control, focus handling and reduced-motion support. Product and process
tabs provide keyboard selection; their panels render on the server with only the
selected panel visible. Advancing a process stage moves focus to its selector.

Static introductions, hero structure, statistics, narrative, FAQ and contact
presentation remain Server Components. Interactive catalogue, tabs and navigation
are client boundaries. Existing primitives that call React.forwardRef explicitly
mark their client boundary so server compositions can import them safely.

The enquiry form renders its fields with `DynamicFormFields`: persistent
labels, grouped fieldsets, native autocomplete metadata and the shared select.
It checks the fields before sending and shows each message beside its field,
posts to the endpoint the application supplies, and shows the sending,
rejected-field, failure and sent states the endpoint reports. The application
owns the field definitions, server validation, storage and copy.

## Animation controls

Pause and play controls (`MarketingMotionPauseButton`, the hub diagram's
pause button and the care network's button) render only when
`SHOW_MOTION_CONTROLS` from `@healthalyst/ui/config/motion-controls` is true,
which is in development. Production builds show no animation control; see
`docs/website-revamp.md` for the accessibility trade-off.

`ContourPatternIllustration` is a faint topographic field for plain bands. Pass
it to `MarketingContentSection` through `decoration` with a text colour
class, such as `text-accent`; it is decorative and static.
