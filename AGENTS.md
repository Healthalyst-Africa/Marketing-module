# HealthAlyst landing page engineering rules

## Authority and scope

These instructions apply to the entire `marketing-module` monorepo, including
applications, shared packages, configuration, and documentation. Read any nearer
`AGENTS.md` before editing a directory. The user's current instructions take
precedence. More specific instructions may add requirements but must preserve the
non-negotiable naming and shared component rules below.

This repository owns HealthAlyst Africa's public marketing website. The parent
`healthAlyst` directory is a workspace containing independent repositories. Keep
application code and tooling inside this monorepo. Do not copy unrelated product
code, repository policies, or branding into it.

## Non-negotiable naming rules

- Use complete, descriptive words for project-authored variables, parameters,
  functions, components, types, properties, filenames, comments, and visible text.
  Do not introduce shorthand or single-letter names, including in callbacks,
  loops, generic type parameters, or temporary variables.
- The user explicitly permits `cn`, `ctx`, and `FAQ`. Their normal casing and
  grammatical forms, such as `faq`, `FAQS`, and `faqs`, are also permitted. This is
  the complete list of discretionary abbreviation exceptions. Do not infer new
  exceptions because an abbreviation is familiar.
- Use `intersectionObserver`, `element`, `description`, `properties`,
  `elementReference`, `navigationLinks`, and `statistics` instead of `obs`, `el`,
  `desc`, `props`, `ref`, `navLinks`, and `stats`. Use meaningful names such as
  `keyboardEvent`, `lineIndex`, and `ElementType` instead of `e`, `i`, and `T`.
- Correct existing project-authored abbreviations immediately when discovered.
  Update definitions, imports, exports, consumers, documentation, and references
  together. Preserve behavior and unrelated work. Report any external dependency
  that prevents a compatible correction.
- Third-party package names, published symbols, proper product names, framework
  filenames, protocol values, schema keys, generated lockfiles, and framework
  attributes are compatibility contracts. Keep their required spelling. Examples
  include `package.json`, `tsconfig.json`, `AGENTS.md`, `next.config.mjs`,
  `components.json`, `@healthalyst/ui`, `~/lib`, React's `ref` attribute, HTML's
  `id` and `src` attributes, Tailwind utility names, and environment variable names
  read by tools. This does not permit abbreviated local variables: alias imported
  symbols when needed, such as `cva as createClassVariants`.
- Use camelCase for values and functions, PascalCase for components and types,
  UPPER_SNAKE_CASE for static constants, and kebab-case for ordinary source files.
  Keep framework-required route filenames unchanged.

## Non-negotiable shared shadcn rules

- Use shadcn components as the standard foundation for interactive interface
  primitives. All installed primitives belong in `packages/ui/src/primitives`,
  even when only one application currently uses them. Dedicated HealthAlyst
  compositions built from them belong in `packages/ui/src/components`, and
  decorative SVG artwork in `packages/ui/src/illustrations`. Applications
  consume compositions and illustrations, never primitives directly.
- Every new or reworked reusable visual component, including page compositions,
  navigation, form layouts and presentation controls, belongs in `packages/ui`
  and is consumed through `@healthalyst/ui` exports. Compose the shared shadcn
  primitives; keep route entry points, content and application behaviour in the
  website. Do not introduce a separate application-local component foundation.
- The package is exported as `@healthalyst/ui`. Import components through its
  published exports, for example `@healthalyst/ui/components/action-button`.
  Never reach into another workspace's source using relative paths or duplicate
  primitives inside an application.
- Render buttons through `ActionButton` from
  `@healthalyst/ui/components/action-button` for actions and `ActionLink` from
  `@healthalyst/ui/components/action-link` for navigation that looks like a
  button. They are the only consumers of the shadcn `button` primitive; do not
  import or render `Button` directly in applications or other shared
  components. `ActionButton` owns loading, busy, disabled and icon behaviour.
  Use links for navigation rather than wrapping a button in an anchor.
- Choose appearance through primitive variants and properties, such as the
  button's `variant`, `size` and `shape`, the form controls' `controlSize`, and
  the navigation menu's `tone`. Do not restyle a primitive with class strings at
  the call site or use the button's `unstyled` variant in compositions; when a
  needed appearance is missing, add a semantic variant to the primitive. Call
  sites may pass layout classes, such as width, grid placement, spacing and
  responsive visibility.
- Application-specific branded wrappers may live in
  `apps/healthalyst-website/src/components/ui`, but must compose the shared
  primitives. Keep HealthAlyst colours, typography, copy, layout, and business
  behavior in the application. Shared components and tokens remain product-neutral.
- Branded wrappers are thin adapters supplying content and theme values to shared
  components. Reusable visual structure belongs in the shared package.
- Both the application and shared package must retain a valid `components.json`.
  Align their style, icon library, base colour, and component aliases. Keep the
  shared stylesheet and component destinations correctly resolved. Do not switch
  presets, component foundations, or Tailwind major versions as a side effect.
- Inspect the existing component and official documentation before adding one.
  If a required primitive is absent, install it from the official shadcn registry
  into the shared package and declare its runtime dependencies there. Add only
  what the requested change needs.
- From the monorepo root, inspect configuration and planned additions with:

  ```sh
  pnpm dlx shadcn@latest info --cwd apps/healthalyst-website --json
  pnpm dlx shadcn@latest add <component-name> --cwd apps/healthalyst-website --dry-run
  pnpm dlx shadcn@latest add <component-name> --cwd apps/healthalyst-website
  ```

- Review generated code before accepting it. Adapt generated local names to the
  naming rule, preserve existing changes, and never blindly overwrite components.
  Confirm the generated source is compatible with installed React and Tailwind.
- Reuse shared variants and `cn`; use branded wrappers for presentation changes.
  Preserve primitive semantics, focus behavior, keyboard interaction, disabled
  states, and accessible names. Do not rebuild dialogs, menus, accordions, or form
  controls as custom clickable containers when a shared primitive exists.
- Keep package exports, shared styles, Next.js transpilation, and Tailwind source
  scanning aligned when adding or moving components.
- Import icons through the `@healthalyst/icons` workspace package, in
  applications and in `packages/ui`. Do not import the icon vendor directly. Add
  icons to the package with names that describe their purpose; the package owns
  the vendor dependency. Route icon imports in generated shadcn code through it.

## Repository structure and tooling

| Location                                     | Responsibility                                                                 |
| -------------------------------------------- | ------------------------------------------------------------------------------ |
| `apps/healthalyst-website/src/app`           | Thin Next.js routes, layouts, metadata and server handlers                     |
| `apps/healthalyst-website/src/features`      | Owned pages and workflows with their components, config, types and utilities   |
| `apps/healthalyst-website/src/config`        | App-wide routes, company details and theme palettes                            |
| `apps/healthalyst-website/src/shared`        | App-local content and behaviour used by more than one feature                  |
| `apps/healthalyst-website/src/components/ui` | Thin branded wrappers, such as the HealthAlyst brand mark                      |
| `apps/healthalyst-website/public`            | Files served directly by public paths                                          |
| `packages/ui`                                | Shared shadcn primitives, compositions, illustrations, neutral tokens, helpers |
| `packages/icons`                             | Shared icon API with purpose-based names; owns the icon vendor                 |
| `packages/eslint-config`                     | Shared lint configuration                                                      |
| `packages/typescript-config`                 | Shared strict compiler configuration                                           |
| `packages/test-utilities`                    | Shared testing setup, unused while testing is manual                           |

Inside the website, each feature holds only the folders it needs:

```text
src/features/<feature>/
  components/   Render the page or workflow; the route renders its page component
  config/       Copy, options, limits and presentation maps owned by the feature
  services/     Server requests and storage (for example the enquiry database)
  types/        Domain and request types
  utilities/    Pure transformations and validation owned by the feature
```

Features are `homepage`, `about`, `contact-enquiry` and `site-navigation`.
`shared/products` owns the product catalogue, institutions, product icons and
the product selection store; `shared/contact` builds contact page addresses;
`shared/page-sections` holds sections reused by several pages. Keep route
files thin, put configuration beside its owner rather than in a global
constants file, and do not use `lib` as a catch-all folder.

`packages/ui/src` follows the same split as the frontend repository:
`primitives` (shadcn registry code), `components` (compositions; private
helpers of one composition live in a folder named after it), `illustrations`
(decorative SVG artwork), `types`, `forms`, `config`, `hooks` and `lib`.

- Read manifests rather than assuming versions. The current stack uses Next.js
  App Router, React, TypeScript, Tailwind 3, pnpm workspaces, and Turborepo.
- Use the pnpm version pinned in the root manifest and a supported Node.js
  version. Keep `pnpm-lock.yaml` as the sole dependency lockfile. Declare workspace
  dependencies with `workspace:*` and package dependencies in their owning package.
- Preserve strict peer dependency checks, shared compiler and lint presets,
  standalone build tracing, and explicit package exports. Do not hide failures by
  disabling rules, skipping checks, adding broad type assertions, or setting
  `ignoreBuildErrors` to true.
- Use `~/` for application source imports and package exports for workspace
  imports. Applications must not depend on other applications.
- Keep changes focused. Do not upgrade dependencies, replace the state system,
  add new services, or introduce new build tools without a task requirement.

## Next.js and TypeScript

- Default to Server Components. Place `"use client"` only at the smallest boundary
  needing browser events, state, effects, context, or browser-only libraries.
  Avoid moving entire routes to the client for one interactive section.
- Keep secrets and privileged operations on the server. Server-to-client
  properties must be serializable. Validate every external input at the boundary.
- Keep strict types. Prefer explicit domain types and discriminated unions over
  `any`, unchecked casts, non-null assertions, or silent fallback data.
- Use Next.js routing, metadata, fonts, and image features appropriately. Keep
  route metadata, canonical addresses, and public configuration consistent with
  the deployed environment. Never publish localhost canonical addresses.
- Handle asynchronous loading, empty results, failures, and recovery when a
  feature introduces asynchronous work. Do not add decorative states with no
  real behavior behind them.
- Clean up effects and subscriptions. Keep hooks deterministic and accessible
  content usable before hydration. Respect reduced motion for reveals and scroll.

## HealthAlyst landing page requirements

- Preserve the approved HealthAlyst Africa identity and the website's existing
  forest, gold, cream, and sand palette. Use Young Serif for headings and Inter
  for all other text, as recorded in `DESIGN.md`. Use app theme tokens rather than scattering new
  brand values across components.
- Keep product names, audiences, capabilities, and conversion messages consistent
  with approved content. Do not invent customer logos, testimonials, adoption
  numbers, clinical outcomes, certifications, regulatory compliance, or launch
  status. Flag unsupported claims for an accountable company owner.
- Use clear, complete English in visible copy, except the approved FAQ shorthand
  and proper names. Keep headings readable and calls to action specific.
- Each call to action must reach its intended destination. Use links for
  navigation and buttons for actions. Preserve product selection, section anchors,
  mobile navigation, and FAQ interaction when changing shared components.
- Forms require persistent labels, appropriate autocomplete, input validation,
  accessible errors, submitting states, and confirmed success or recoverable
  failure. A prevented submit or simulated response is not a working enquiry.
  Do not claim delivery until an authorized integration confirms it.
- Do not request patient records or sensitive medical details through a public
  marketing form. Collect only fields necessary for the approved enquiry.
- Support keyboard navigation, visible focus, semantic landmarks, one primary
  heading per page, logical heading order, descriptive image alternatives, and
  accessible names for icon controls. Decorative icons must be hidden from
  assistive technology. Target Web Content Accessibility Guidelines 2.2 level AA.
- Design for narrow mobile screens through desktop. Check navigation collapse,
  long expanded text, touch targets, form controls, and horizontal overflow.
  Avoid hiding essential information to make a layout fit.
- Use `next/image` with useful alternative text, correct dimensions or constrained
  fill containers, and responsive sizes. Public assets use paths such as
  `/images/example.webp`; static source imports may supply intrinsic dimensions.
  Choose based on usage, and optimize delivery and file size. Folder placement
  alone does not guarantee faster rendering.
- Keep static content rendered on the server where practical. Avoid unnecessary
  client dependencies, heavy animation libraries, oversized images, layout shifts,
  and eager loading of below-the-fold media. Preserve reduced-motion behavior.

## Security and privacy

- Never expose, copy, log, commit, or invent credentials. Only documented public
  values belong in `NEXT_PUBLIC_*`; all such values are visible to visitors.
- Keep local environment files untracked. Document required variable names and
  purpose in a safe template without real values. Declare build environment inputs
  in Turborepo when adding environment-dependent behavior.
- Validate and constrain enquiry submissions server-side when integrating them;
  handle abuse and duplicate submissions without leaking private details.
- Add analytics, cookies, trackers, and third-party scripts only with an approved
  purpose and appropriate privacy handling. Keep personal and medical information
  out of analytics events and diagnostic logs.

## Working process and completion evidence

1. Inspect repository status, applicable instructions, manifests, relevant source,
   and documentation. Preserve user-owned and unrelated edits.
2. Maintain a short plan for substantial work. Use applicable Next.js and shadcn
   skills and official documentation for version-sensitive changes.
3. Implement a coherent change, correcting discovered naming violations and
   keeping shared component ownership intact.
4. Review imports, exports, dependencies, content, accessibility, and the complete
   diff. Format changed files only; avoid broad unrelated reformatting.
5. Run the narrowest relevant checks, then the repository completion gates.
   Respect active user or platform restrictions on verification scope and report
   any omitted gates explicitly. The commands below are the available gates;
   never claim a check that was not run.
6. For requested browser verification, exercise affected desktop and mobile
   journeys and inspect console and network errors. Distinguish runtime evidence
   from successful compilation.
7. Report changes, actual evidence, failures, limitations, and remaining work.
   Never claim production readiness from a documentation update alone.

```sh
pnpm install --frozen-lockfile
pnpm check-format
pnpm lint
pnpm check-types
pnpm build
pnpm test-all
```

There are no automated tests for now; the maintainer tests the website
manually. Do not write test files, run `pnpm test`, or add test steps to
`pnpm test-all`, continuous integration or Git hooks unless the user asks.
Vitest and `packages/test-utilities` stay installed, unused, for later.
`pnpm test-all` runs formatting, lint, type checks and the production build, and
the configured continuous integration workflow runs it on pull requests and
pushes to `main`. Do not bypass failing checks or invent approvals, protected-branch
rules, hooks, or ticket systems that this repository does not configure.

Do not commit, push, publish, deploy, send external messages, or mutate production
unless the user authorizes that action. Summarize shared package or configuration
changes explicitly so reviewers can assess all affected applications.

## Primary references

- [Next.js documentation](https://nextjs.org/docs)
- [shadcn monorepo configuration](https://ui.shadcn.com/docs/monorepo)
- [shadcn components configuration](https://ui.shadcn.com/docs/components-json)
- [Turborepo documentation](https://turborepo.com/docs)
- [Accessibility standard](https://www.w3.org/TR/WCAG22/)

<!-- BEGIN:turborepo-agent-rules -->

# This is NOT the Turborepo you know

Turborepo configuration, task behavior, and CLI commands can vary between installed versions and may differ from your training data. Resolve the `turbo` package from this file's directory or relevant workspace; in monorepos, it may not be visible from the repository root. For example, run `node -p "require.resolve('turbo/package.json')"` from a workspace that depends on `turbo`.

Read `docs/README.md` inside that installed package first, then read the relevant pages from its `docs/` directory before changing Turborepo configuration or commands. Heed deprecation notices. These bundled docs match the installed package version and are available without network access.

This block is written and re-added by `turbo` before repository-scoped commands when an AI agent is detected. In the Turborepo source repository, its template is defined in `crates/turborepo-cli/src/cli/agent_guidance.rs`. Removing the managed block while updates are enabled means a later qualifying invocation will add it again. Set `"agentGuidance": false` in the root `turbo.json` or `turbo.jsonc` to opt out; this does not remove an existing block. Keep the block committed with your work to avoid an uncommitted change on the next agent invocation.
<!-- END:turborepo-agent-rules -->
