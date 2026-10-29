import {
  ILLUSTRATION_COLOURS,
  ILLUSTRATION_DETAIL_STROKE,
  ILLUSTRATION_STROKE,
} from "./illustration-colours";

/**
 * A handshake between a sleeve in the brand colour and one in the accent, for
 * partners who work alongside the company. The hands follow Lucide's
 * `handshake` outline (ISC), drawn at four times its size; the fills, sleeves
 * and marks follow the GitLab SVGs style (MIT; licence in
 * `illustration-colours.ts`).
 */
export function PartnershipIllustration({ className }: { className?: string }) {
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
      <path d="M36 112a50 50 0 01-12-14" {...ILLUSTRATION_STROKE} />
      <path
        d="M114 26v6m-3-3h6M28 40v6m-3-3h6"
        {...ILLUSTRATION_DETAIL_STROKE}
      />
      {/* Lucide's 24-unit grid, scaled so 1 unit is 4 canvas units. */}
      <g transform="translate(24 24) scale(4)">
        <path d="M-1.5 3H3L2 14h-4.5z" fill={ILLUSTRATION_COLOURS.primary} />
        <path d="M21 3h4.5l1 11H22z" fill={ILLUSTRATION_COLOURS.accent} />
        <path
          d="M3 4h8l1.8-.8 2.2-.3 2.4.9 1.9.6L21 4l-1 10-.5 2.5-2 .3-1.5 2.2h-3l-1.5 1.5h-3L2 14z"
          fill={ILLUSTRATION_COLOURS.surface}
        />
        <g
          stroke={ILLUSTRATION_COLOURS.stroke}
          strokeWidth="0.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M11 17l2 2a1 1 0 103-3" />
          <path d="M14 14l2.5 2.5a1 1 0 103-3l-3.88-3.88a3 3 0 00-4.24 0l-.88.88a1 1 0 11-3-3l2.81-2.81a5.79 5.79 0 017.06-.87l.47.28a2 2 0 001.42.25L21 4" />
          <path d="M21 3l1 11h-2" />
          <path d="M3 3L2 14l6.5 6.5a1 1 0 103-3" />
          <path d="M3 4h8" />
          <path d="M-1.5 3H3M-2 14h4M22 14h4.5M21 3h4.5" />
        </g>
      </g>
    </svg>
  );
}
