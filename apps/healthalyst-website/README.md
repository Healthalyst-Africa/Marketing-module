# Healthalyst Africa — Official Website

Marketing site for Healthalyst Africa, a health technology company building the digital
infrastructure of African healthcare.

Built with **Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS · pnpm**.
This app is a member of the Healthalyst client monorepo and consumes shared workspace
packages for lint rules, compiler settings, UI primitives, and test setup.

## Commands

```sh
pnpm install        # install dependencies
pnpm dev            # next dev
pnpm build          # next build
pnpm start          # next start
pnpm lint           # eslint ./src
pnpm lint:fix       # eslint --fix
pnpm check-lint     # eslint ./src (gate used by test-all)
pnpm check-types    # tsc --noEmit
pnpm check-format   # prettier --check .
pnpm format         # prettier --write .
pnpm test-all       # format + lint + types + build
pnpm test           # Vitest suite
pnpm test:watch     # Vitest watch mode
pnpm test:coverage  # Vitest coverage report
```

Run `pnpm test-all` before declaring a change done.

## Layout

`src/` is the application. Put new code in the matching layer:

| Path                              | Holds                                                                                 |
| --------------------------------- | ------------------------------------------------------------------------------------- |
| `src/app/`                        | App Router routes (`page.tsx`, `layout.tsx`, `not-found.tsx`)                         |
| `src/app/(homepage)/_components/` | Route-local components for the marketing page (header, footer, `home/`)               |
| `src/components/ui/`              | Healthalyst-branded components (`button`, `input`, `select`, `textarea`, `accordion`) |
| `src/components/layout/`          | Shared layout pieces (`logo.tsx`)                                                     |
| `src/hooks/`                      | Custom hooks (`use-reveal.ts`)                                                        |
| `src/lib/`                        | Shared helpers (`utils.ts` → the `cn()` class merger)                                 |
| `src/store/`                      | Global state: Context + `useReducer` (`ProductsContext`, `Actions`, `Reducers`)       |
| `src/utils/`                      | Utilities (`scroll.ts`)                                                               |
| `src/types/`, `src/data/`         | Shared types and static content (products, steps, FAQs, site copy)                    |
| `public/`                         | Static assets served from the root                                                    |

Route-local components stay next to their route under `_components/`; components reused
across routes belong in `src/components/`.

Brand-neutral components shared across client apps belong in `packages/ui`. New shadcn
components are routed there through `components.json`; keep brand-specific variants in
this app.

## Conventions

- **Imports:** use the `~/` alias (maps to `src/`).
- **State:** global state lives in `src/store` as Context + `useReducer`. Don't add Redux
  or Zustand.
- **Styling:** Tailwind, merged with the `cn()` helper from `src/lib/utils.ts`. Prefer
  classes over inline `style` objects.
- **Design tokens:** brand colours are `forest`, `gold`, `cream`, `sand`, `ink` and
  `muted` in `tailwind.config.ts`; fonts are `font-serif` (Cormorant Garamond),
  `font-sans` (DM Sans) and `font-mono` (DM Mono), loaded through `next/font/google`.
- **Custom breakpoints:** `xs` (600px) and `tablet` (900px) mirror the source design's
  collapse points.
- **Components:** reuse `src/components/ui/*` for branded site components and
  `@healthalyst/ui` for shared neutral primitives.
- **Icons:** prefer `lucide-react`.
- **Naming:** kebab-case file names, PascalCase components, `useX` hooks.
- **Lint:** unused imports and variables are errors. Prettier uses double quotes,
  semicolons and an 80-column width.

## Checks

There is no unit-test runner. The required gates are format, lint, types and a successful
production build — `pnpm test-all` runs all four.

## Environment

Copy `env.example` to `.env` and fill in values. Never commit `.env`.
