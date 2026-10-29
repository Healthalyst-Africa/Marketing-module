# Shared packages

Packages provide product-neutral capabilities reused by the client applications:
shared lint and TypeScript configurations, shadcn interface primitives, the
shared icon API (`@healthalyst/icons`), and a Vitest setup that stays unused while
testing is manual. All shadcn primitives
belong in `packages/ui`, including those currently used by only one
application. Keep brand assets, marketing content, product behavior, and
branded compositions in the owning application.
