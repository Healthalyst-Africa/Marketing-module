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
pnpm test-all       # format + lint + types + build
```

Run `pnpm test-all` before declaring a change done.

## Layout

`src/` is the application. Put new code in the matching layer:

| Path                      | Holds                                                                                        |
| ------------------------- | -------------------------------------------------------------------------------------------- |
| `src/app/`                | Thin App Router routes (`page.tsx`, `layout.tsx`, `not-found.tsx`)                           |
| `src/app/api/contact/`    | Route handler that validates and stores contact enquiries                                    |
| `src/features/<feature>/` | A page or workflow: `components/`, `config/`, `services/`, `types/`, `utilities/`            |
| `src/shared/<domain>/`    | Content and behaviour used by more than one feature (`products`, `contact`, `page-sections`) |
| `src/config/`             | App-wide routes, company office details and theme palettes                                   |
| `src/components/ui/`      | Branded wrappers composing `@healthalyst/ui` (`healthalyst-brand.tsx`)                       |
| `db/`                     | SQL applied by hand to the enquiry database                                                  |
| `public/`                 | Static assets served from the root                                                           |

Features: `homepage`, `about`, `contact-enquiry` and `site-navigation` (header
and footer). Route files only set metadata and render the feature's page
component. Code used by one feature stays inside it; move it to `src/shared/`
when a second feature needs it.

All brand-neutral shadcn primitives belong in `packages/ui`, including components currently used by only this application. New shadcn
components are routed there through `components.json`; keep brand-specific variants in
this app.

## Conventions

- **Imports:** use the `~/` alias (maps to `src/`).
- **State:** product selection lives in `src/shared/products/store` as Context +
  `useReducer`. Don't add Redux or Zustand.
- **Styling:** Tailwind, merged with the `cn()` helper from `@healthalyst/ui/lib/utilities`. Prefer
  classes over inline `style` objects.
- **Design tokens:** brand colours are `forest`, `gold`, `cream`, `sand`, `ink` and
  `muted` in `tailwind.config.ts`; the typeface is Inter for headings, interface and
  body text, loaded through `next/font/google` (`font-serif` currently resolves
  to Inter as well).
- **Custom breakpoints:** `smallScreen` (600px) and `tablet` (900px) mirror the source design's
  collapse points.
- **Components:** compose `@healthalyst/ui` primitives and compositions. Render
  buttons with `ActionButton` and button-styled links with `ActionLink`, and
  choose their look through variants rather than class overrides.
- **Icons:** import from `@healthalyst/icons`, never from the icon vendor.
- **Naming:** kebab-case file names, PascalCase components, `useX` hooks.
- **Lint:** unused imports and variables are errors. Prettier uses double quotes,
  semicolons and an 80-column width.

## Checks

`pnpm test-all` runs formatting, lint, type checks and the production build.
There are no automated tests for now: the maintainer tests the website
manually, and no test files, test runs or test steps in continuous integration
are added unless asked. Vitest and Testing Library remain installed, unused,
for later.
Follow the root `AGENTS.md` for naming rules and completion evidence.

## Environment

Copy `.env.example` to `.env.local` and fill in values. Never commit `.env.local`.

`DATABASE_URL` is the Neon connection string read by `src/app/api/contact/route.ts`
on the server. It must never be prefixed with `NEXT_PUBLIC_`. Apply
`db/contact-enquiries.sql` to that database once, then submit the form to confirm
the row was stored.

`RESEND_API_KEY` and `RESEND_FROM_EMAIL` are also server-only. Set the API key
from Resend and use a sender address on a domain verified in Resend. After a new
enquiry is stored, the website sends the visitor a short acknowledgement. A
duplicate enquiry does not send another email. If email delivery is unavailable,
the enquiry remains saved and the form tells the visitor that the confirmation
email could not be sent.
