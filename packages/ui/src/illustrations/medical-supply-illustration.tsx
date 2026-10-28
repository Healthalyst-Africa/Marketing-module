import {
  ILLUSTRATION_COLOURS,
  ILLUSTRATION_STROKE,
  ILLUSTRATION_SURFACE_STROKE,
} from "./illustration-colours";

/**
 * An open supply carton marked with a medical cross, for equipment suppliers
 * and procurement. Adapted from GitLab SVGs `empty-package-md` (MIT; licence
 * in `illustration-colours.ts`).
 */
export function MedicalSupplyIllustration({
  className,
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 144 144"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <rect width="144" height="144" rx="72" fill={ILLUSTRATION_COLOURS.base} />
      <path
        d="M53 44h38l16 14H37l16-14z"
        fill={ILLUSTRATION_COLOURS.accentSubtle}
      />
      <path
        d="M107 59v33a8 8 0 01-8 8H37V59h70z"
        fill={ILLUSTRATION_COLOURS.surface}
      />
      <path
        d="M107 60v-2L91 44H53L37 58v42h62a8 8 0 008-8V66"
        {...ILLUSTRATION_STROKE}
      />
      <path d="M37 59h70M72 44v16" {...ILLUSTRATION_STROKE} />
      <circle cx="72" cy="80" r="11" fill={ILLUSTRATION_COLOURS.primary} />
      <path d="M72 74v12m-6-6h12" {...ILLUSTRATION_SURFACE_STROKE} />
      <path
        d="M45 92h8"
        stroke={ILLUSTRATION_COLOURS.accent}
        strokeWidth="2"
        strokeLinecap="square"
      />
    </svg>
  );
}
