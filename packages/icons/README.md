# `@healthalyst/icons`

Shared React icons for the HealthAlyst website and the shared interface
package. The package currently uses Lucide and exposes a small semantic API, so
product code does not depend on the vendor's icon names.

```tsx
import { ArrowRightIcon, LoaderIcon } from "@healthalyst/icons";

<ArrowRightIcon aria-hidden="true" />
<LoaderIcon aria-hidden="true" className="animate-spin" />
```

Add an icon by exporting it from `src/index.ts` with a name that describes its
purpose. Keep vendor imports inside this package. Use `aria-hidden="true"` for
decorative icons, and give the control an accessible name when an icon is the
only content of an action.
