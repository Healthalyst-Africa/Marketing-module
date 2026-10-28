import {
  ILLUSTRATION_COLOURS,
  ILLUSTRATION_STROKE,
  ILLUSTRATION_SURFACE_STROKE,
} from "./illustration-colours";

/**
 * Two overlapping speech bubbles, one with a letter and one with lines of
 * another script, for products that work in several languages. Drawn in the
 * GitLab SVGs style (MIT; licence in `illustration-colours.ts`).
 */
export function MultilingualIllustration({
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
      <path d="M100 112a44 44 0 0016-20" {...ILLUSTRATION_STROKE} />
      <path
        d="M72 62h36a6 6 0 016 6v20a6 6 0 01-6 6h-4v9l-10-9H72a6 6 0 01-6-6V68a6 6 0 016-6z"
        fill={ILLUSTRATION_COLOURS.primary}
      />
      <path
        d="M114 80v8a6 6 0 01-6 6h-4v9l-10-9H72a6 6 0 01-6-6"
        {...ILLUSTRATION_STROKE}
      />
      <path
        d="M80 74c4-3 8 3 12 0s8 3 12 0M80 83h14"
        {...ILLUSTRATION_SURFACE_STROKE}
      />
      <path
        d="M36 40h40a6 6 0 016 6v24a6 6 0 01-6 6H52l-10 9v-9h-6a6 6 0 01-6-6V46a6 6 0 016-6z"
        fill={ILLUSTRATION_COLOURS.surface}
      />
      <path
        d="M82 58V46a6 6 0 00-6-6H36a6 6 0 00-6 6v24a6 6 0 006 6h6v9l10-9h24a6 6 0 006-6v-4"
        {...ILLUSTRATION_STROKE}
      />
      <path
        d="M48 67l8-20 8 20m-13-7h10"
        stroke={ILLUSTRATION_COLOURS.stroke}
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
    </svg>
  );
}
