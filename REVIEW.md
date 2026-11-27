# Review rules

Claude reviews every pull request with these rules. Its findings inform the
person who approves; they never approve or block a pull request on their own.

## Passes

Review the diff once for each pass and tag every finding with its pass.

1. **[bug]** Correctness: wrong behaviour; broken links or routes; missing
   loading, empty or error states in forms and interactive sections; broken
   keyboard or focus behaviour; effects, observers or animations that are not
   cleaned up; layout that breaks at mobile widths; motion that ignores
   `prefers-reduced-motion`.
2. **[security]** Security and privacy: secrets in `NEXT_PUBLIC_*` values or
   committed files; form submissions that send personal data somewhere
   unexpected; unvalidated external input; third-party scripts or embeds added
   without need; untrusted input inside a workflow `run:` script.
3. **[policy]** Compliance with `AGENTS.md`, `CLAUDE.md` and the change's
   `docs/changes/` records: shared component ownership in `packages/ui`,
   `ActionButton` and `ActionLink`, variants instead of call-site styling,
   names without abbreviations, WCAG 2.2 AA (contrast, alternative text,
   heading order), and behaviour the specification did not ask for.

## Severity

- **Important:** breaks behaviour, leaks data, blocks a task for keyboard or
  screen reader users, or breaks a rule in `AGENTS.md`. Give the failure
  scenario.
- **Nit:** anything else worth saying. Report at most five and summarise the
  rest as a count.

Say plainly when there are no Important findings.

## Skip

- `pnpm-lock.yaml`, `next-env.d.ts`, `*.tsbuildinfo` and other generated files.
- Formatting, lint and type errors, which CI enforces.
- Images under `docs/screenshots/` and `public/`, except to confirm each new
  or changed page has a screenshot.
