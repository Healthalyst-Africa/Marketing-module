import {
  ILLUSTRATION_COLOURS,
  ILLUSTRATION_DETAIL_STROKE,
  ILLUSTRATION_STROKE,
} from "./illustration-colours";

/**
 * A laboratory flask and test tube, for laboratories and diagnostic centres.
 * Drawn in the GitLab SVGs style (MIT; licence in `illustration-colours.ts`).
 */
export function LaboratoryIllustration({ className }: { className?: string }) {
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
      <path
        d="M58 42v20L40 98a6 6 0 005.4 8.7h33.2A6 6 0 0084 98L66 62V42H58z"
        fill={ILLUSTRATION_COLOURS.surface}
      />
      <path
        d="M48.5 82h27l8.5 16a6 6 0 01-5.4 8.7H45.4A6 6 0 0140 98l8.5-16z"
        fill={ILLUSTRATION_COLOURS.accent}
      />
      <path d="M54 42h16M66 42v20l6 12" {...ILLUSTRATION_STROKE} />
      <path
        d="M75 80l9 18a6 6 0 01-5.4 8.7H45.4a6 6 0 01-5.4-8.7l18-36V42"
        {...ILLUSTRATION_STROKE}
      />
      <path d="M48.5 82h18" {...ILLUSTRATION_STROKE} />
      <circle cx="58" cy="95" r="3" fill={ILLUSTRATION_COLOURS.surface} />
      <circle cx="67" cy="100" r="2" fill={ILLUSTRATION_COLOURS.surface} />
      <path d="M62 68v2m-3 4v2" {...ILLUSTRATION_DETAIL_STROKE} />
      <path
        d="M92 46h12v50a6 6 0 01-12 0V46z"
        fill={ILLUSTRATION_COLOURS.surface}
      />
      <path
        d="M92 78h12v18a6 6 0 01-12 0V78z"
        fill={ILLUSTRATION_COLOURS.primary}
      />
      <path d="M92 54v42a6 6 0 0012 0V46" {...ILLUSTRATION_STROKE} />
      <path d="M88 46h20" {...ILLUSTRATION_STROKE} />
    </svg>
  );
}
