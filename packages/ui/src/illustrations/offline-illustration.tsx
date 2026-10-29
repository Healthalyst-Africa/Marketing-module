import {
  ILLUSTRATION_COLOURS,
  ILLUSTRATION_DETAIL_STROKE,
  ILLUSTRATION_STROKE,
  ILLUSTRATION_SURFACE_STROKE,
} from "./illustration-colours";

/**
 * A phone showing a saved tick beside a crossed-out wireless signal, for work
 * that continues without a connection. Drawn in the GitLab SVGs style (MIT;
 * licence in `illustration-colours.ts`).
 */
export function OfflineIllustration({ className }: { className?: string }) {
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
      <path d="M30 92a44 44 0 0011 18" {...ILLUSTRATION_STROKE} />
      <rect
        x="54"
        y="40"
        width="40"
        height="72"
        rx="6"
        fill={ILLUSTRATION_COLOURS.accentSubtle}
      />
      <rect
        x="48"
        y="34"
        width="40"
        height="72"
        rx="6"
        fill={ILLUSTRATION_COLOURS.surface}
      />
      <path
        d="M88 62V40a6 6 0 00-6-6H54a6 6 0 00-6 6v60a6 6 0 006 6h28a6 6 0 006-6V70"
        {...ILLUSTRATION_STROKE}
      />
      <rect
        x="53"
        y="44"
        width="30"
        height="48"
        rx="2"
        fill={ILLUSTRATION_COLOURS.primary}
      />
      <path d="M61 68l5 5 10-10" {...ILLUSTRATION_SURFACE_STROKE} />
      <path d="M65 99h6" {...ILLUSTRATION_STROKE} />
      <path
        d="M96 46a16 16 0 0122 0m-17 6a9 9 0 0112 0"
        {...ILLUSTRATION_DETAIL_STROKE}
      />
      <circle cx="107" cy="58" r="2" fill={ILLUSTRATION_COLOURS.detail} />
      <path
        d="M97 36l20 26"
        stroke={ILLUSTRATION_COLOURS.accent}
        strokeWidth="2"
        strokeLinecap="square"
      />
    </svg>
  );
}
