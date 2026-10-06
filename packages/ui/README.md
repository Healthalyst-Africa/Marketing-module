# Shared interface components

`@healthalyst/ui` owns all shadcn primitives in the client monorepo, including
components currently consumed by only one application. Keep tokens and primitive
behavior product-neutral. Website branding belongs in application compositions
that import and wrap these primitives.

## Public imports

- `@healthalyst/ui/components/button`
- `@healthalyst/ui/components/input`
- `@healthalyst/ui/components/textarea`
- `@healthalyst/ui/components/accordion`
- `@healthalyst/ui/components/native-select`
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
