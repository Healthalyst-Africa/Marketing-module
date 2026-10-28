import {
  ILLUSTRATION_COLOURS,
  ILLUSTRATION_STROKE,
  ILLUSTRATION_SURFACE_STROKE,
} from "./illustration-colours";

/**
 * A viewing screen showing a chest X-ray, for diagnostic imaging centres.
 * Drawn in the GitLab SVGs style (MIT; licence in `illustration-colours.ts`).
 */
export function ImagingIllustration({ className }: { className?: string }) {
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
      <path d="M28 70a44 44 0 0110-26" {...ILLUSTRATION_STROKE} />
      <path d="M64 92h16v12H64V92z" fill={ILLUSTRATION_COLOURS.accentSubtle} />
      <path d="M64 92v12h16v-6" {...ILLUSTRATION_STROKE} />
      <path d="M54 104h4m6 0h26" {...ILLUSTRATION_STROKE} />
      <path
        d="M34 44a4 4 0 014-4h68a4 4 0 014 4v44a4 4 0 01-4 4H38a4 4 0 01-4-4V44z"
        fill={ILLUSTRATION_COLOURS.surface}
      />
      <path
        d="M110 62V44a4 4 0 00-4-4H38a4 4 0 00-4 4v44a4 4 0 004 4h68a4 4 0 004-4V70"
        {...ILLUSTRATION_STROKE}
      />
      <rect
        x="42"
        y="48"
        width="60"
        height="36"
        rx="2"
        fill={ILLUSTRATION_COLOURS.primary}
      />
      <path
        d="M72 52v28m0-24c-6 0-12 2-16 6m16-6c6 0 12 2 16 6m-16 2c-6 0-11 2-14 5m14-5c6 0 11 2 14 5m-14 3c-5 0-9 1-12 4m12-4c5 0 9 1 12 4"
        {...ILLUSTRATION_SURFACE_STROKE}
      />
      <path
        d="M46 56v-4h4m44 0h4v4M46 76v4h4m44 0h4v-4"
        stroke={ILLUSTRATION_COLOURS.accent}
        strokeWidth="2"
        strokeLinecap="square"
      />
    </svg>
  );
}
