---
status: accepted
date: 2026-11-27
decision-makers: "@gh-i19n"
---

# 001 Adopt the AI-native delivery lifecycle

## Context and problem statement

`healthalyst-frontend` adopted the organisation's AI-native delivery
lifecycle on 2026-11-26. This repository, the public marketing website, still
had only a `verify` check on `main`: no instructions for Claude beyond
`AGENTS.md`, no code owners, no rulesets on `dev`, no security scanning and
actions pinned by tag. Should the marketing site follow the same lifecycle?

## Decision drivers

- Claude writes much of the site, so the same guardrails should apply.
- The site is public and carries the HealthAlyst brand; a broken or
  compromised release is visible to everyone.
- One process across repositories is easier to learn than several.

## Considered options

- Keep the current informal process.
- Adopt the organisation layer as `healthalyst-frontend` did.

## Decision outcome

Chosen option: adopt the organisation layer, following the
[repository standard](https://github.com/Healthalyst-Africa/.github/blob/main/engineering/repository-standard.md)
and copying from `healthalyst-frontend`, its reference implementation.

### Consequences

- Good, because the site gets the shared plugin's skills and guardrails,
  Claude review, CodeQL, dependency review, Scorecard and release records.
- Bad, because Claude review and evals need an Anthropic API key and budget.
- Bad, because a solo developer must use the recorded administrator bypass to
  merge into `main` until a second reviewer joins.

### Confirmation

- `.github/settings/` holds the rulesets and repository settings, applied
  with `scripts/github/apply-repository-settings.sh`.
- The `Agent evals` workflow checks that Claude still follows the rules
  whenever instructions or settings change.

## More information

- [Engineering handbook](https://github.com/Healthalyst-Africa/.github/tree/main/engineering)
- [HealthAlyst Claude plugin](https://github.com/Healthalyst-Africa/claude-plugins)
