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
pnpm check-lint     # eslint ./src (alternative lint command)
pnpm check-types    # tsc --noEmit
pnpm check-format   # prettier --check .
pnpm format         # prettier --write .
pnpm test-all       # format + lint + types + tests + build
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
| `src/app/api/contact/`            | Route handler that validates and stores contact enquiries                             |
| `db/`                             | SQL applied by hand to the enquiry database                                           |
| `src/app/(homepage)/_components/` | Route-local components for the marketing page (header, footer, `home/`)               |
| `src/components/ui/`              | Healthalyst-branded components (`button`, `input`, `select`, `textarea`, `accordion`) |
| `src/components/layout/`          | Shared layout pieces (`logo.tsx`)                                                     |
| `src/hooks/`                      | Custom hooks (`use-reveal.ts`)                                                        |
| `src/lib/`                        | Shared helpers (`utilities.ts` → the `cn()` class merger)                             |
| `src/store/`                      | Global state: Context + `useReducer` (`ProductsContext`, `Actions`, `Reducers`)       |
| `src/utilities/`                  | Utilities (`scroll.ts`)                                                               |
| `src/types/`, `src/data/`         | Shared types and static content (products, steps, FAQs, site copy)                    |
| `public/`                         | Static assets served from the root                                                    |

Route-local components stay next to their route under `_components/`; components reused
across routes belong in `src/components/`.

All brand-neutral shadcn primitives belong in `packages/ui`, including components currently used by only this application. New shadcn
components are routed there through `components.json`; keep brand-specific variants in
this app.

## Conventions

- **Imports:** use the `~/` alias (maps to `src/`).
- **State:** global state lives in `src/store` as Context + `useReducer`. Don't add Redux
  or Zustand.
- **Styling:** Tailwind, merged with the `cn()` helper from `src/lib/utilities.ts`. Prefer
  classes over inline `style` objects.
- **Design tokens:** brand colours are `forest`, `gold`, `cream`, `sand`, `ink` and
  `muted` in `tailwind.config.ts`; fonts are `font-serif` (Cormorant Garamond),
  `font-sans` (DM Sans) and `font-mono` (DM Mono), loaded through `next/font/google`.
- **Custom breakpoints:** `smallScreen` (600px) and `tablet` (900px) mirror the source design's
  collapse points.
- **Components:** reuse `src/components/ui/*` for branded site components and
  `@healthalyst/ui` for shared neutral primitives.
- **Icons:** prefer `lucide-react`.
- **Naming:** kebab-case file names, PascalCase components, `useX` hooks.
- **Lint:** unused imports and variables are errors. Prettier uses double quotes,
  semicolons and an 80-column width.

## Checks

Vitest and Testing Library are configured. `pnpm test-all` runs formatting, lint,
type checks, tests, and the production build. The test command permits an empty
suite; successful execution without test files does not establish coverage.
Follow the root `AGENTS.md` for naming rules and completion evidence.

## Environment

Copy `.env.example` to `.env.local` and fill in values. Never commit `.env.local`.

`DATABASE_URL` is the Neon connection string read by `src/app/api/contact/route.ts`
on the server. It must never be prefixed with `NEXT_PUBLIC_`. Apply
`db/contact-enquiries.sql` to that database once, then submit the form to confirm
the row was stored.
