import {
  ILLUSTRATION_COLOURS,
  ILLUSTRATION_STROKE,
} from "./illustration-colours";

/** The outline of a molar, shared by its shadow and its body. */
const TOOTH_PATH =
  "M72 48c-7-6-27-6-29 11-1 10 4 16 6 26 2 11 4 21 10 21s5-15 13-15 7 15 13 15 8-10 10-21c2-10 7-16 6-26-2-17-22-17-29-11z";

/**
 * The molar's outline as an open path, leaving a short gap on the left side
 * in the GitLab line style.
 */
const TOOTH_OUTLINE_PATH =
  "M47.5 78.5c.7 2 1.2 4.2 1.5 6.5 2 11 4 21 10 21s5-15 13-15 7 15 13 15 8-10 10-21c2-10 7-16 6-26-2-17-22-17-29-11-7-6-27-6-29 11-.4 4.4.5 8 1.9 11.6";

/**
 * A clean molar with a sparkle, for dental practices. Drawn in the GitLab
 * SVGs style (MIT; licence in `illustration-colours.ts`).
 */
export function DentalIllustration({ className }: { className?: string }) {
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
        d={TOOTH_PATH}
        transform="translate(5 4)"
        fill={ILLUSTRATION_COLOURS.accentSubtle}
      />
      <path d={TOOTH_PATH} fill={ILLUSTRATION_COLOURS.surface} />
      <path d={TOOTH_OUTLINE_PATH} {...ILLUSTRATION_STROKE} />
      <path d="M56 60c3-4 9-5 13-3" {...ILLUSTRATION_STROKE} />
      <path
        d="M104 34l2.5 6.5L113 43l-6.5 2.5L104 52l-2.5-6.5L95 43l6.5-2.5L104 34z"
        fill={ILLUSTRATION_COLOURS.accent}
      />
      <path
        d="M40 96l1.5 3.5L45 101l-3.5 1.5L40 106l-1.5-3.5L35 101l3.5-1.5L40 96z"
        fill={ILLUSTRATION_COLOURS.primary}
      />
    </svg>
  );
}
