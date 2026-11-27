@AGENTS.md

# Working in this repository

The rules above are the engineering standard. This page is what a new joiner,
human or Claude, needs on day one. Keep it under a page and review changes to it
like code. The organisation's lifecycle is in the
[engineering handbook](https://github.com/Healthalyst-Africa/.github/tree/main/engineering).

## How work flows

1. A change starts as a GitHub issue from the **Change request** form.
2. `/healthalyst-sdlc:write-intent`, `/healthalyst-sdlc:write-spec` and, in
   plan mode, `/healthalyst-sdlc:write-plan` write
   `docs/changes/<issue-number>-<slug>/{intent,spec,plan}.md`. Each needs a
   person's acceptance before the next. Small fixes and copy changes skip to
   the plan.
3. Nothing is built without an accepted `plan.md`. If the work departs from
   it, update `plan.md` in the same commit.
4. `/healthalyst-sdlc:verify-change` proves the work, then a pull request goes
   into `dev`. `main` only takes `dev` and is what Vercel deploys to
   healthalystafrica.com.

Architecture decisions go in `docs/adrs/`. Read `docs/incidents/` before
diagnosing a failure.

## Commands

| Purpose                 | Command                                         | Healthy result                    |
| ----------------------- | ----------------------------------------------- | --------------------------------- |
| Types for one workspace | `pnpm --filter @healthalyst/<name> check-types` | Exit code 0, no errors            |
| Lint                    | `pnpm lint`                                     | `Tasks: N successful, N total`    |
| Repository scripts      | `pnpm test-scripts`                             | `fail 0`                          |
| Every gate              | `pnpm test-all`                                 | Exit code 0 after the build       |
| Dev server              | `.claude/launch.json`: port 3000                | Page loads with no console errors |

## Verifying your work

The website has no automated tests; `AGENTS.md` explains why. Run the
narrowest checks for what changed, then `pnpm test-all`, and paste the result
lines before reporting done. For page changes, open each changed page at
desktop and mobile widths, check the console and network panel, and save a
screenshot of each new or changed page under
`docs/screenshots/<change-name>/`. Never report a check you did not run.
`pnpm test-scripts` covers only the repository's own scripts under `scripts/`
and `evals/`; run it when you change them.

## Things Claude gets wrong

- Pull requests target `dev`, never `main`.
- Every pull request shows a screenshot of each new or changed page.
- Applications never import `@healthalyst/ui/primitives/*`; reusable visuals
  live in `packages/ui` and are consumed through `@healthalyst/ui` exports.
- Buttons are `ActionButton`; button-styled navigation is `ActionLink`.
- Primitives are styled through their variants, never class strings at the
  call site.
- No abbreviations in names except `cn`, `ctx` and `FAQ`.
- This is a public marketing site: no patient data, credentials or internal
  product details in copy, code or screenshots.
