# Contributing to HealthAlyst marketing websites

This guide explains how to contribute to HealthAlyst Africa's public marketing
product: company and product landing pages, approved marketing content, enquiry
journeys, and the shared foundations supporting them.

Read [AGENTS.md](./AGENTS.md) before making changes. Its naming, shared component,
architecture, security, and verification rules apply to contributors and coding
agents. Follow the user's current instructions and any nearer repository rules.
This guide provides contributor onboarding and delivery steps within those rules.

## Contents

- [Product scope](#product-scope)
- [Local setup](#local-setup)
- [Repository structure](#repository-structure)
- [Planning and delivery](#planning-and-delivery)
- [Naming and code standards](#naming-and-code-standards)
- [Shared shadcn components](#shared-shadcn-components)
- [Landing page standards](#landing-page-standards)
- [Forms, privacy, and integrations](#forms-privacy-and-integrations)
- [Verification](#verification)
- [Pull requests and review](#pull-requests-and-review)
- [Release handover](#release-handover)
- [Troubleshooting](#troubleshooting)

## Product scope

The website presents HealthAlyst Africa to healthcare institutions and prospective
partners. Its current product lines are HealthSchedule, LabConnect, PharmaDesk,
DentaFlow, ImagingHub, and MedSupply. Contributions should help visitors understand
who each product serves, what it offers, and how to make a relevant enquiry.

Typical contributions include:

- Company or product landing pages and their approved copy.
- Product presentation, section navigation, FAQ content, and enquiry journeys.
- Responsive design, accessibility, image delivery, and page performance.
- Search metadata, social previews, and approved measurement integrations.
- Shared components, documentation, and checks supporting these experiences.

Work belongs in the `marketing-module` repository. The parent `healthAlyst`
directory contains independent repositories; keep their code and tooling separate.
Confirm the product requirement before introducing accounts, patient workflows,
clinical records, or other application functionality into a marketing page.

## Local setup

### Prerequisites

| Tool    | Repository requirement                                               |
| ------- | -------------------------------------------------------------------- |
| Node.js | At least `22.13.0`; continuous integration currently uses Node.js 24 |
| pnpm    | `10.27.0`, pinned in the root `package.json`                         |
| Git     | Needed for branches, change review, and contribution history         |
| Editor  | TypeScript, ESLint, and Prettier support recommended                 |

The website uses Next.js App Router, React, TypeScript, Tailwind 3, pnpm workspaces,
and Turborepo. Read the manifests for exact dependency versions. Use pnpm as the
package manager and retain `pnpm-lock.yaml` as the dependency lockfile.

### Install and configure

Obtain repository access through the company, clone the approved repository, and
open its root directory. Run all commands in this guide from that root unless
another working directory is explicitly stated.

```sh
pnpm install --frozen-lockfile
cp -n apps/healthalyst-website/env.example apps/healthalyst-website/.env
pnpm dev --filter @healthalyst/website
```

Open [the local website](http://localhost:3000). A frozen installation should work
on an unchanged checkout. If dependencies were intentionally changed, regenerate
the lockfile through pnpm and include that change for review.

Copy the environment template only when the local `.env` file does not already
exist. Preserve existing values and obtain any required private values through the
company's approved credential provider. Never place real credentials in a template,
commit, screenshot, support message, or coding-agent prompt.

| Variable                       | Current behavior                                                                                                     |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`         | Used for the website's metadata base address; use localhost locally and the approved public address for a deployment |
| `NEXT_PUBLIC_CONTACT_ENDPOINT` | Present in the template but not consumed by the current enquiry form; setting it does not connect submissions        |

Every `NEXT_PUBLIC_*` value is public. Keep credentials in server-only variables
when an approved integration needs them. Update the safe template and Turborepo
environment declarations when introducing a variable that affects a build.

### Useful commands

| Command                                    | Purpose                                               |
| ------------------------------------------ | ----------------------------------------------------- |
| `pnpm dev --filter @healthalyst/website`   | Run the website development server                    |
| `pnpm check-format`                        | Check repository formatting                           |
| `pnpm lint`                                | Run workspace lint tasks                              |
| `pnpm check-types`                         | Check workspace TypeScript types                      |
| `pnpm test`                                | Run configured workspace tests                        |
| `pnpm test:watch`                          | Watch configured tests during development             |
| `pnpm test:coverage`                       | Run configured tests with coverage reporting          |
| `pnpm build`                               | Produce production builds                             |
| `pnpm test-all`                            | Run formatting, lint, type checks, tests, and builds  |
| `pnpm --filter @healthalyst/website start` | Start the website after a successful production build |

To format a contribution, pass only the files you changed to
`pnpm exec prettier --write`. Avoid rewriting unrelated files with a repository-wide
format command.

## Repository structure

Paths beginning with `src/` below are relative to
`apps/healthalyst-website/`.

| Path                              | Responsibility                                                             |
| --------------------------------- | -------------------------------------------------------------------------- |
| `src/app/`                        | Routes, layouts, metadata, and page-level rendering                        |
| `src/app/(homepage)/_components/` | Homepage header, footer, and landing page sections                         |
| `src/components/ui/`              | HealthAlyst-branded wrappers composing shared primitives                   |
| `src/components/layout/`          | Website layout compositions, including the logo                            |
| `src/data/`                       | Marketing copy, product definitions, implementation steps, and FAQ content |
| `src/types/`                      | Website domain types                                                       |
| `src/store/`                      | Existing product selection context and reducer                             |
| `src/hooks/`                      | Website-specific client hooks                                              |
| `src/lib/` and `src/utilities/`   | Website helpers and scrolling behavior                                     |
| `public/`                         | Publicly served assets                                                     |
| `packages/ui/`                    | Product-neutral shadcn primitives, styles, hooks, and class utilities      |
| `packages/eslint-config/`         | Shared lint configuration                                                  |
| `packages/typescript-config/`     | Shared strict compiler presets                                             |
| `packages/test-utilities/`        | Shared testing setup                                                       |

Route-local compositions belong beside their route. Generic primitives belong in
`packages/ui`, including primitives used by only one application. Brand tokens,
marketing content, and product behavior stay in the website.

Use `~/` for website source imports. Import another workspace through its declared
package exports, such as `@healthalyst/ui/components/button`; do not use relative
paths into another workspace's source. Applications must not import other
applications.

## Planning and delivery

### Define the change

Before substantial work, agree on a short contribution brief with the accountable
product or marketing owner and the developer reviewing the change:

- The visitor or institution the change serves.
- The problem and intended outcome.
- Affected routes, sections, products, and destination of each call to action.
- Approved copy, design source, assets, and evidence for any new public claims.
- Acceptance criteria, expected failure states, and verification scope.
- Required integrations, configuration, dependencies, or release coordination.

Record the brief in the company's agreed work tracker or the pull request. This
repository does not mandate a particular project management service. Small copy
or defect corrections can use a concise description instead of a separate plan.

### Work on a focused branch

Confirm the integration branch and pull request target with the maintainer. Local
branches include `dev` and `main`; their existence does not establish the company's
release or branch-protection policy.

Inspect your checkout before starting:

```sh
git status --short
git branch --show-current
```

From the agreed base, create a descriptive branch, for example:

```sh
git switch -c feature/improve-product-enquiry
```

Use a focused branch for each coherent change. Preserve existing user-owned work.
Avoid unrelated refactors, dependency upgrades, generated files, and broad
formatting changes. Correct naming violations discovered during the work, as
required by `AGENTS.md`, and explain any wider reference updates in the contribution.

### Implement and keep evidence

1. Read the relevant routes, shared components, data, and configuration.
2. Maintain a short plan for substantial work.
3. Make the change in its owning layer and preserve existing visitor journeys.
4. Review copy, semantics, failure behavior, responsive layout, and shared consumers.
5. Run the applicable verification within the authorized scope.
6. Submit the change with evidence and any remaining limitations.

## Naming and code standards

### Naming is non-negotiable

Use complete, descriptive names in project-authored code, comments, filenames, and
visible text. This includes callback parameters, generic types, and temporary
variables. Correct existing violations when discovered and update all references
together.

The permitted discretionary abbreviations are `cn`, `ctx`, and `FAQ`, including
normal casing and plural forms such as `faq`, `FAQS`, and `faqs`. Other familiar
abbreviations do not automatically become exceptions.

| Avoid                | Use instead                                          |
| -------------------- | ---------------------------------------------------- |
| `obs`                | `intersectionObserver`                               |
| `el`                 | `element`                                            |
| `desc`               | `description`                                        |
| `props`              | `properties`                                         |
| Local variable `ref` | `elementReference`                                   |
| `stats`              | `statistics`                                         |
| `navLinks`           | `navigationLinks`                                    |
| Callback `i` or `e`  | `lineIndex` or `keyboardEvent`, according to purpose |
| Generic type `T`     | A meaningful name such as `ElementType`              |

Keep required framework filenames, third-party package names, published symbols,
protocol values, schema keys, generated lockfiles, and framework attributes valid.
For example, React's `ref` attribute and HTML's `id` attribute retain their spelling;
the project's variables holding those values use descriptive names. Alias imports
where appropriate, such as `cva as createClassVariants`.

Use camelCase for values and functions, PascalCase for components and types,
UPPER_SNAKE_CASE for static constants, and kebab-case for ordinary new source files.
Preserve framework-required route filenames and avoid unrelated filename churn.

### Architecture and formatting

- Default to Server Components. Add `"use client"` at the smallest boundary
  requiring state, browser events, context, effects, or browser-only libraries.
- Keep privileged operations and credentials on the server. Validate external
  inputs and keep server-to-client properties serializable.
- Preserve strict TypeScript settings. Avoid `any`, unchecked casts, blanket lint
  suppression, and `ignoreBuildErrors: true`.
- Reuse the existing state and package boundaries. Introduce dependencies only
  when the requested outcome requires them, in the package that imports them.
- Keep strict peer dependency checking enabled. Include intentional manifest and
  lockfile changes together.
- Follow Prettier: double quotes, semicolons, two-space indentation, and an
  80-character print width. Do not manually align code against the formatter.
- Read and understand generated or coding-agent output before submitting it.
  Explain substantial assistance in the pull request and take responsibility for
  the implementation and evidence.

## Shared shadcn components

All shadcn primitives are owned by `packages/ui`. The website may add branded
wrappers, but those wrappers must compose the shared implementation rather than
copy it. Preserve accessible semantics, keyboard interaction, focus, disabled
states, and element references.

Before adding a primitive, inspect the installed components and official
component documentation. From the monorepo root:

```sh
pnpm dlx shadcn@latest info --cwd apps/healthalyst-website --json
pnpm dlx shadcn@latest add <component-name> --cwd apps/healthalyst-website --dry-run
pnpm dlx shadcn@latest add <component-name> --cwd apps/healthalyst-website
```

Replace `<component-name>` with the required component. The aligned
`components.json` files route primitives into the shared package. Review the planned
files before installation and the full generated diff afterward. Do not blindly
overwrite customized components or change the preset or Tailwind major version.

Generated components must follow the naming rule. Their dependencies belong in
`packages/ui/package.json`. Keep exports, shared styles, Next.js transpilation, and
Tailwind source scanning aligned. Read the
[shared component guide](./packages/ui/README.md) for the existing installation and
its Tailwind 3 adaptations.

## Landing page standards

### Content and brand

- Preserve approved HealthAlyst Africa branding, product names, and institutional
  audiences. Use the website's forest, gold, cream, sand, ink, and muted tokens.
- Use the existing typography and theme configuration. Keep brand overrides in
  the website, with neutral defaults in the shared package.
- Use clear, complete English and descriptive calls to action. Keep the approved
  FAQ exception and proper product names.
- Obtain approval and supporting evidence for customer logos, testimonials,
  adoption figures, clinical outcomes, compliance claims, certifications, and
  product availability. Include the approval reference in the contribution.
- Check long copy and expanded terminology at narrow widths. Do not invent claims
  to fill a design or replace approved meaning with generated marketing copy.

### Routes and visitor journeys

For a new landing page, create the appropriate `page.tsx` under `src/app/`, with
route-local compositions in `_components/`. Confirm its public address, audience,
metadata, navigation entry, and conversion destination in the contribution brief.
Do not describe a planned page as an existing route.

For homepage changes, preserve section navigation, product cards and selection,
implementation steps, mobile navigation, FAQ disclosure, and enquiry links. Use
links for navigation and shared buttons for actions. Every call to action must
reach its intended destination; a styled control alone is not a completed journey.

### Accessibility and responsive behavior

Target Web Content Accessibility Guidelines 2.2 level AA. Check semantic landmarks,
one primary heading, logical heading order, accessible control names, persistent
form labels, visible focus, keyboard navigation, and meaningful image alternatives.
Hide decorative icons from assistive technology.

Support narrow mobile screens, intermediate widths, and desktop. Check wrapping,
control size, menu collapse, expanded content, and horizontal overflow. The current
custom breakpoints are `smallScreen` at 600 pixels and `tablet` at 900 pixels.
Respect reduced motion for scrolling, reveals, and animations. Static content must
remain usable when animation or hydration is unavailable.

### Search metadata, assets, and performance

- Provide accurate page titles, descriptions, canonical addresses, and social
  previews. Coordinate publication and indexing for new public routes.
- Use the approved deployment address for `NEXT_PUBLIC_SITE_URL`. Do not publish
  localhost metadata or a preview address as the production canonical address.
- Use `next/image` appropriately with dimensions or constrained fill containers,
  responsive sizes, and meaningful alternatives. Public files use paths such as
  `/images/example.webp`; source imports may supply intrinsic dimensions.
- Optimize asset dimensions and file size. Keep rights and attribution evidence
  for supplied imagery. Do not add patient-identifying imagery without approval.
- Keep essential content server-rendered where practical. Avoid unnecessary client
  dependencies, heavy animation libraries, layout shifts, and eager loading of
  below-the-fold media.
- The current image configuration uses `unoptimized: true`. Do not assume image
  conversion or resizing is enabled merely because the component is `next/image`.
  Explain and verify any intentional change to delivery configuration.

## Forms, privacy, and integrations

The current homepage enquiry form only prevents the default submission. It does
not send enquiries, and its controls currently rely on placeholders rather than
persistent labels. These are existing limitations, not evidence of a complete
conversion journey. Adding an environment value alone does not implement delivery.

An enquiry integration must include:

- Persistent labels, appropriate autocomplete, clear required fields, and
  accessible validation messages.
- Server-side input validation and appropriate protection against abusive or
  duplicate submissions.
- A submitting state, confirmed success, recoverable failure, and retained input
  when recovery is appropriate.
- An approved recipient or service, documented configuration, and authorized
  evidence that the submission reached its destination.
- Collection limited to the approved enquiry purpose. Do not ask for patient
  records or sensitive medical details through the marketing form.

Use synthetic information for local checks. Do not send verification submissions
to real recipients without authorization. Keep personal information and message
contents out of diagnostic logs and analytics.

Add analytics, trackers, cookies, and third-party scripts only for an approved
purpose, with the required privacy handling. Document event meanings and verify
that events represent real interactions without including personal or medical data.
Do not introduce a new service or deploy an integration as a side effect of a page
change.

## Verification

Match evidence to the change and respect the active user or platform instructions
on verification scope. A documentation-only change normally needs a content,
reference, formatting, and diff review. Source or configuration changes need the
relevant compiler, lint, build, and runtime evidence. Report any omitted gate.

### Repository checks

The complete configured verification command is:

```sh
pnpm test-all
```

It runs formatting, lint, type checks, tests, and production builds. Individual
commands are listed in [Local setup](#useful-commands). Run narrow checks first,
then the applicable completion gates. Never hide a failure by disabling checks or
claiming a command that was not run.

Vitest and Testing Library are configured. The current checkout has no application
test files, and the test script uses `--passWithNoTests`; a successful empty run
is not coverage. When test work is authorized, place website tests beside the
changed feature using the configured `*.test.ts`, `*.test.tsx`, `*.spec.ts`, or
`*.spec.tsx` patterns. Keep reusable setup in `packages/test-utilities` and
feature-specific fixtures and mocks in the website.

### Browser evidence

For changes to visitor journeys, verify the affected experience at desktop and
narrow mobile widths within the authorized scope:

- Navigation, anchor destinations, mobile menu, product selection, and FAQ
  opening and closing where affected.
- Keyboard operation, visible focus, control names, and form messages.
- Long text, image sizing, expanded content, and absence of horizontal overflow.
- Loading, success, failure, and recovery for any introduced integration.
- Browser console and network errors, including failed assets and submissions.

Record the route, viewport, steps, result, and any limitation. Screenshots show
appearance; they do not establish successful enquiry delivery. A build establishes
compilation and prerendering, not that an external service works. Inspect shared
component consumers when shared behavior changes.

### Current automation

[`.github/workflows/ci.yml`](./.github/workflows/ci.yml) runs on pull requests and
pushes to `main`. It installs with a frozen lockfile and runs `pnpm test-all` using
Node.js 24 and pnpm 10.27.0.

The checked-in workflow verifies the repository; it does not define a deployment.
Husky provides local staged-file formatting and commit-message checks, as described
below. Local hooks do not enforce review or branch protection on the hosting
service. Maintainers should confirm those controls separately.

## Pull requests and review

Keep each pull request focused and reviewable. Use a descriptive title and concise
commits explaining the change. Commit messages must use Conventional Commits:
`type(scope): description`. The scope is optional; use a descriptive scope such as
`marketing`, `website`, `components`, or `tooling` when it helps identify the change.
For example:

```text
fix(marketing): correct product enquiry destination

docs(contributing): document HealthAlyst landing page standards
```

Allowed types are `build`, `chore`, `ci`, `docs`, `feat`, `fix`, `perf`, `refactor`,
`revert`, `style`, and `test`. These are standard commit-format tokens. Use a
lowercase type and scope, start the description with a lowercase action, and omit
a trailing full stop. The full header must not exceed 100 characters. Separate
optional body and footer sections with a blank line; their lines must not exceed
100 characters. Use the conventional `!` marker or `BREAKING CHANGE:` footer when
an incompatible change needs to be identified.

### Local Git hooks

`pnpm install` runs the root `prepare` script, which installs Husky hooks for this
repository. Hooks are configured at the monorepo root:

- [`.husky/pre-commit`](./.husky/pre-commit) runs `pnpm pre-commit`. lint-staged
  checks supported staged source, configuration, stylesheet, and documentation
  files with Prettier. It checks formatting without automatically rewriting files.
  Fix the reported files and stage the intended changes again.
- [`.husky/commit-msg`](./.husky/commit-msg) checks the proposed message with
  commitlint and [the conventional configuration](./commitlint.config.cjs).
  Generated merge messages and other standard exceptions use the preset's default
  handling; custom file-edit messages are not exempted.

Full lint, type checks, tests, and builds remain in the existing verification
commands and continuous integration. Local hooks provide quick feedback; they do
not replace those gates or validate pull request titles on the hosting service.

To reinstall hooks after an installation that skipped lifecycle scripts, run
`pnpm prepare`. To check a message file without creating a commit, use:

```sh
pnpm commitlint --edit /path/to/commit-message.txt
```

Do not routinely bypass hooks with `--no-verify`. In automated environments that
should not install local hooks, set `HUSKY=0` for dependency installation.

### Contribution summary

Include these details in the pull request description:

```markdown
## Purpose

Visitor problem, intended outcome, and work-tracker reference if available.

## Changes

Affected pages and packages, plus copy, design, and asset approval references.

## Verification

Commands and results; browser routes, viewports, and journeys checked.
List checks not run and explain why.

## Evidence

Before and after screenshots for visible changes, where applicable.
Integration evidence with private information removed.

## Release considerations

Required environment changes, shared consumers, dependencies, known limitations,
and recovery steps. Identify any approval still needed.
```

### Contributor checklist

- [ ] The brief and acceptance criteria match the requested marketing outcome.
- [ ] Copy, claims, imagery, and brand changes have the appropriate approval.
- [ ] Naming follows `AGENTS.md`, including only the approved exceptions.
- [ ] Shared primitives live in `packages/ui`; branded wrappers compose them.
- [ ] Routes, imports, exports, dependencies, and configuration remain coherent.
- [ ] Affected responsive and accessible journeys have evidence where applicable.
- [ ] Enquiry success is backed by delivery evidence when submission was changed.
- [ ] Applicable checks pass; omitted checks and remaining limitations are explicit.
- [ ] No credentials, private data, generated build output, or unrelated edits are
      included.
- [ ] Documentation reflects any changed setup or behavior.
- [ ] The diff has been reviewed, including any manifest and lockfile changes.

### Reviewer expectations

Have another developer or the designated maintainer review the contribution before
merging. The review should assess acceptance criteria, correctness, accessibility,
shared package impact, evidence, and recovery. Obtain product or marketing review
for changes to public meaning, branding, or claims.

Resolve actionable review comments and rerun affected checks after changes. The
maintainer confirms the target branch and performs or authorizes the merge.
Approval of a change is separate from permission to publish it.

## Release handover

The repository builds the website with standalone Next.js output and strict type
checking. Run a local production preview after a build when the verification scope
calls for it:

```sh
pnpm build
pnpm --filter @healthalyst/website start
```

A local preview is not a production deployment. For an approved release, hand over
these details to the release owner:

- Reviewed change reference and passed verification evidence.
- Content approval and the intended public routes and canonical address.
- Required configuration names, approved integrations, and operational ownership.
- Any unresolved limitations and their effect on visitors.
- The previous deployable revision and a recovery approach for the chosen hosting
  platform.
- The post-release checks for page rendering, navigation, assets, and affected
  enquiries.

Do not assume a hosting provider, preview environment, deployment script, or
promotion path. Confirm the company's actual setup. Publish or change production
only after explicit authorization from the accountable release owner.

## Troubleshooting

| Problem                                 | First checks                                                                                         |
| --------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Frozen installation fails               | Confirm Node.js and pinned pnpm versions; check whether manifests and lockfile changed together      |
| Peer dependencies conflict              | Inspect declared versions and owning packages; keep strict peer checks enabled                       |
| Application imports fail                | Confirm the `~/` alias points to `src/` and the file is in the correct application                   |
| Shared component imports fail           | Check package exports, workspace dependency, owning package dependencies, and Next.js transpilation  |
| Shared component styles are missing     | Check shared stylesheet loading and Tailwind scanning of `packages/ui/src`                           |
| shadcn resolves the wrong destination   | Inspect both `components.json` files and the command's working directory with `info` and `--dry-run` |
| Production metadata points to localhost | Check the build environment's `NEXT_PUBLIC_SITE_URL` and route metadata                              |
| Enquiries are not delivered             | Inspect the implementation and authorized integration; the current form does not send submissions    |
| Formatting fails                        | Run Prettier on the reported changed files and review the resulting diff                             |
| Build or type checking fails            | Fix the reported error; do not disable type checking or silently change dependency versions          |

For a blocker, provide the affected route or package, reproduction steps, expected
and actual behavior, sanitized error output, checks already attempted, and the
specific help needed. Contact the agreed project owner or maintainer; do not
invent support channels or expose private information in public reports.

## Repository references

- [Engineering rules](./AGENTS.md)
- [Monorepo overview](./README.md)
- [Website guide](./apps/healthalyst-website/README.md)
- [Shared component guide](./packages/ui/README.md)
- [Root commands and runtime requirements](./package.json)
- [Configured continuous integration](./.github/workflows/ci.yml)
- [Repository license](./LICENSE)

Keep this guide current when contribution requirements, package boundaries,
configuration, or release responsibilities change. Do not describe a proposed
control as already configured.
