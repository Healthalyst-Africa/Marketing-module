# Shared UI

`@healthalyst/ui` holds accessible, brand-neutral primitives and utilities shared by client apps. App-specific themes and branded components stay with their owning app. Add new shadcn components here when more than one app should share them.

The package is source-exported for Next.js workspace consumption. Each Tailwind v3 app must scan `packages/ui/src` in its Tailwind content paths and include this package in `transpilePackages`.
