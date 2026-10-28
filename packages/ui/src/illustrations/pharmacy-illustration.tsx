import {
  ILLUSTRATION_COLOURS,
  ILLUSTRATION_DETAIL_STROKE,
  ILLUSTRATION_STROKE,
  ILLUSTRATION_SURFACE_STROKE,
} from "./illustration-colours";

/**
 * A labelled medicine bottle and a capsule, for pharmacies. Drawn in the
 * GitLab SVGs style (MIT; licence in `illustration-colours.ts`).
 */
export function PharmacyIllustration({ className }: { className?: string }) {
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
      <path d="M104 112a44 44 0 0014-16" {...ILLUSTRATION_STROKE} />
      <path d="M46 38h36v12H46V38z" fill={ILLUSTRATION_COLOURS.primary} />
      <path d="M46 50V38h36v6" {...ILLUSTRATION_STROKE} />
      <path
        d="M42 54a4 4 0 014-4h36a4 4 0 014 4v48a4 4 0 01-4 4H46a4 4 0 01-4-4V54z"
        fill={ILLUSTRATION_COLOURS.surface}
      />
      <path d="M42 64h44v26H42V64z" fill={ILLUSTRATION_COLOURS.accentSubtle} />
      <path
        d="M86 58v-4a4 4 0 00-4-4H46a4 4 0 00-4 4v48a4 4 0 004 4h36a4 4 0 004-4V66"
        {...ILLUSTRATION_STROKE}
      />
      <path d="M42 64h30m-30 26h44" {...ILLUSTRATION_STROKE} />
      <circle cx="56" cy="77" r="7" fill={ILLUSTRATION_COLOURS.primary} />
      <path d="M56 73v8m-4-4h8" {...ILLUSTRATION_SURFACE_STROKE} />
      <path d="M68 74h12m-12 6h8" {...ILLUSTRATION_DETAIL_STROKE} />
      <g transform="rotate(-35 102 91)">
        <path
          d="M102 84h-7a7 7 0 000 14h7V84z"
          fill={ILLUSTRATION_COLOURS.accent}
        />
        <path
          d="M102 84h7a7 7 0 010 14h-7V84z"
          fill={ILLUSTRATION_COLOURS.surface}
        />
        <path
          d="M98 84h11a7 7 0 010 14H95a7 7 0 01-6.06-10.5"
          {...ILLUSTRATION_STROKE}
        />
        <path d="M102 84v14" {...ILLUSTRATION_STROKE} />
      </g>
    </svg>
  );
}
