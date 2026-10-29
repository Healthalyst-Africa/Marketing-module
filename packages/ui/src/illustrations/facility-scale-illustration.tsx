import {
  ILLUSTRATION_COLOURS,
  ILLUSTRATION_DETAIL_STROKE,
  ILLUSTRATION_STROKE,
  ILLUSTRATION_SURFACE_STROKE,
} from "./illustration-colours";

/**
 * A single clinic linked to a globe of connected points, for products that
 * grow from one facility to a continent. Drawn in the GitLab SVGs style (MIT;
 * licence in `illustration-colours.ts`).
 */
export function FacilityScaleIllustration({
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
      <path d="M32 68a42 42 0 0112-26" {...ILLUSTRATION_STROKE} />
      <circle cx="84" cy="62" r="28" fill={ILLUSTRATION_COLOURS.surface} />
      <path d="M111.4 56.2A28 28 0 10111.8 64.9" {...ILLUSTRATION_STROKE} />
      <path
        d="M84 34c-9 8-9 48 0 56m0-56c9 8 9 48 0 56M57 54h54M57 70h54"
        {...ILLUSTRATION_DETAIL_STROKE}
      />
      <path d="M72 48l20 10-8 18" {...ILLUSTRATION_STROKE} />
      <circle cx="72" cy="48" r="4" fill={ILLUSTRATION_COLOURS.accent} />
      <circle cx="92" cy="58" r="4" fill={ILLUSTRATION_COLOURS.accent} />
      <circle cx="84" cy="76" r="4" fill={ILLUSTRATION_COLOURS.accent} />
      <path d="M34 110V88h28v22H34z" fill={ILLUSTRATION_COLOURS.surface} />
      <path d="M62 96v-8H34v22h28v-6" {...ILLUSTRATION_STROKE} />
      <path d="M30 88l18-10 18 10" {...ILLUSTRATION_STROKE} />
      <rect
        x="41"
        y="93"
        width="14"
        height="12"
        rx="1"
        fill={ILLUSTRATION_COLOURS.primary}
      />
      <path d="M48 95.5v7m-3.5-3.5h7" {...ILLUSTRATION_SURFACE_STROKE} />
      <path d="M66 98c8 0 14-6 16-14" {...ILLUSTRATION_STROKE} />
    </svg>
  );
}
