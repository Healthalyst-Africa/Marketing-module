import {
  ILLUSTRATION_COLOURS,
  ILLUSTRATION_DETAIL_STROKE,
  ILLUSTRATION_STROKE,
  ILLUSTRATION_SURFACE_STROKE,
} from "./illustration-colours";

/**
 * A hospital building with a cross sign, for hospitals and clinics. Drawn in
 * the GitLab SVGs style (MIT; licence in `illustration-colours.ts`).
 */
export function HospitalIllustration({ className }: { className?: string }) {
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
      <path d="M30 74a42 42 0 0114-31" {...ILLUSTRATION_STROKE} />
      <path d="M100 52h7v52h-7V52z" fill={ILLUSTRATION_COLOURS.accentSubtle} />
      <path d="M100 52h7v40" {...ILLUSTRATION_STROKE} />
      <path d="M44 104V44h56v60H44z" fill={ILLUSTRATION_COLOURS.surface} />
      <path d="M100 72V44H44v60h56v-24" {...ILLUSTRATION_STROKE} />
      <circle cx="72" cy="58" r="9" fill={ILLUSTRATION_COLOURS.primary} />
      <path d="M80.46 61.08a9 9 0 11.4-4.64" {...ILLUSTRATION_STROKE} />
      <path d="M72 53.5v9m-4.5-4.5h9" {...ILLUSTRATION_SURFACE_STROKE} />
      <path d="M53 75h8v8h-8v-8zm30 0h8v8h-8v-8z" {...ILLUSTRATION_STROKE} />
      <path
        d="M53 89h8v8h-8v-8zm30 0h8v8h-8v-8z"
        {...ILLUSTRATION_DETAIL_STROKE}
      />
      <path d="M66 104V88h12v16H66z" fill={ILLUSTRATION_COLOURS.accent} />
      <path d="M66 104V88h12v10" {...ILLUSTRATION_STROKE} />
      <path d="M34 104h4m68 0h4" {...ILLUSTRATION_STROKE} />
    </svg>
  );
}
