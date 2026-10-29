import {
  ILLUSTRATION_COLOURS,
  ILLUSTRATION_DETAIL_STROKE,
  ILLUSTRATION_STROKE,
} from "./illustration-colours";

/**
 * Two people at a table signing a document, for funds and investors. Drawn in
 * the GitLab SVGs style (MIT; licence in `illustration-colours.ts`).
 */
export function InvestmentIllustration({ className }: { className?: string }) {
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
      <path d="M22 66a50 50 0 015-18" {...ILLUSTRATION_STROKE} />
      <path d="M120 34v6m-3-3h6" {...ILLUSTRATION_DETAIL_STROKE} />
      {/* People */}
      <path
        d="M28 86v-6a16 16 0 0116-16h8a16 16 0 0116 16v6z"
        fill={ILLUSTRATION_COLOURS.primary}
      />
      <path
        d="M76 86v-6a16 16 0 0116-16h8a16 16 0 0116 16v6z"
        fill={ILLUSTRATION_COLOURS.accent}
      />
      <path d="M28 86v-6a16 16 0 0116-16h8" {...ILLUSTRATION_STROKE} />
      <path d="M100 64a16 16 0 0116 16v6" {...ILLUSTRATION_STROKE} />
      <circle cx="48" cy="48" r="10" fill={ILLUSTRATION_COLOURS.surface} />
      <circle cx="96" cy="48" r="10" fill={ILLUSTRATION_COLOURS.surface} />
      <path d="M48 38a10 10 0 104 .8" {...ILLUSTRATION_STROKE} />
      <path d="M96 58a10 10 0 10-4-.8" {...ILLUSTRATION_STROKE} />
      {/* Table */}
      <path d="M18 86h108v8H18z" fill={ILLUSTRATION_COLOURS.surface} />
      <path
        d="M26 86h100v8H18v-8h2M30 94v18m84-18v18"
        {...ILLUSTRATION_STROKE}
      />
      {/* Document */}
      <path d="M58 54h22l8 8v24H58z" fill={ILLUSTRATION_COLOURS.surface} />
      <path d="M80 54l8 8h-8z" fill={ILLUSTRATION_COLOURS.accentSubtle} />
      <path d="M66 54h14l8 8v24H58V54h2M80 54v8h8" {...ILLUSTRATION_STROKE} />
      <path d="M63 64h12m-12 6h20" {...ILLUSTRATION_DETAIL_STROKE} />
      <path d="M63 80c3-5 5 2 8-1s4 2 7 0" {...ILLUSTRATION_STROKE} />
      {/* Pen */}
      <path
        d="M80 82l1.5-6 13-17 4 3-13 17z"
        fill={ILLUSTRATION_COLOURS.primary}
        {...ILLUSTRATION_STROKE}
        strokeLinejoin="round"
      />
    </svg>
  );
}
