# Healthalyst Client Monorepo

This repository contains Healthalyst client applications. Other local repositories in the parent development workspace, such as mobile, desktop, or server projects, remain independent.

## Repository layout

```text
apps/
  healthalyst-website/       Official Healthalyst marketing website
packages/
  eslint-config/              Shared ESLint flat configurations
  test-utilities/             Shared Vitest setup (unused; testing is manual)
  typescript-config/          Shared TypeScript presets
  ui/                         Brand-neutral shadcn components and styles
```

Add each independently deployable client application under `apps/`. Keep generic shared capabilities in `packages/`. All shadcn primitives belong in `packages/ui`, including those used by a single application. Keep app branding, routes, and product-specific behavior inside the owning app.

## Commands

```sh
pnpm install
pnpm dev --filter @healthalyst/website
pnpm build
pnpm lint
pnpm check-types
pnpm check-format
pnpm test-all
```

Create another app under `apps/` with a unique package name and its own `package.json`. Extend the shared ESLint and TypeScript presets, add the shared UI package as a dependency when needed, and define the app's tasks. Turborepo runs matching tasks across the workspace.

Pull requests and pushes to `main` run formatting, lint, type checks and production builds through GitHub Actions. There are no automated tests for now; the maintainer tests the website manually.
