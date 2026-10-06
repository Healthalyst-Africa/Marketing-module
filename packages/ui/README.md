# Shared interface components

`@healthalyst/ui` owns all shadcn primitives in the client monorepo, including
components currently consumed by only one application. Keep tokens and primitive
behavior product-neutral. Website branding and content belong in the application. Reusable visual
structure belongs here, composed from these primitives and supplied with
application content and semantic theme values.

## Public imports

- `@healthalyst/ui/components/button`
- `@healthalyst/ui/components/input`
- `@healthalyst/ui/components/textarea`
- `@healthalyst/ui/components/accordion`
- `@healthalyst/ui/components/native-select`
- `@healthalyst/ui/components/card`
- `@healthalyst/ui/components/radio-group`
- `@healthalyst/ui/components/field`
- `@healthalyst/ui/components/label`
- `@healthalyst/ui/components/separator`
- `@healthalyst/ui/components/alert`
- `@healthalyst/ui/components/color-swatch`
- `@healthalyst/ui/components/palette-selector`
- `@healthalyst/ui/components/design-preview`
- `@healthalyst/ui/components/design-control-panel`
- `@healthalyst/ui/components/section-heading`
- `@healthalyst/ui/components/theme-preference-provider`
- `@healthalyst/ui/lib/theme-preference`
- `@healthalyst/ui/lib/utilities` exports the approved `cn` helper.
- `@healthalyst/ui/styles.css` provides neutral theme variables.

The input, textarea, and accordion sources were installed from the official
`new-york` shadcn registry for Tailwind 3. Native select was installed from the
official `new-york-v4` registry and adapted to Tailwind 3: local utility import,
`shadow-sm`, descriptive names, and a full-width wrapper. Its native selection
semantics remain intact. The visual `controlSize` property leaves the native numeric
`size` attribute available. Dependencies are declared in this package.

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

The shared button's `unstyled` variant and size allow branded compositions to
supply presentation while retaining its underlying behavior. The accordion
trigger's `showIndicator` option lets a composition supply its own indicator.
Native select retains browser-native options and forwards standard selection
attributes, including the element reference.

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
needed additional Radix dependencies. Shared reveal styles include a reduced
motion override; visibility remains controlled by the application.
