import {
  ILLUSTRATION_COLOURS,
  ILLUSTRATION_DETAIL_STROKE,
  ILLUSTRATION_STROKE,
} from "./illustration-colours";

/**
 * Signal bars with only the first two filled and a download arrow, for
 * products that stay usable on a weak connection. Drawn in the GitLab SVGs
 * style (MIT; licence in `illustration-colours.ts`).
 */
export function LowBandwidthIllustration({
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
      <path d="M104 112a44 44 0 0014-16" {...ILLUSTRATION_STROKE} />
      <path d="M40 84h12v20H40V84z" fill={ILLUSTRATION_COLOURS.primary} />
      <path d="M40 104V84h12v14" {...ILLUSTRATION_STROKE} />
      <path d="M58 72h12v32H58V72z" fill={ILLUSTRATION_COLOURS.primary} />
      <path d="M58 104V72h12v26" {...ILLUSTRATION_STROKE} />
      <path d="M76 60h12v44H76V60z" fill={ILLUSTRATION_COLOURS.surface} />
      <path d="M76 104V60h12v44" {...ILLUSTRATION_DETAIL_STROKE} />
      <path d="M94 48h12v56H94V48z" fill={ILLUSTRATION_COLOURS.surface} />
      <path d="M94 104V48h12v56" {...ILLUSTRATION_DETAIL_STROKE} />
      <path d="M34 104h4m6 0h66" {...ILLUSTRATION_STROKE} />
      <circle cx="52" cy="46" r="12" fill={ILLUSTRATION_COLOURS.accent} />
      <path d="M63.3 50a12 12 0 11.4-7.5" {...ILLUSTRATION_STROKE} />
      <path
        d="M52 40v11m-4.5-4.5L52 51l4.5-4.5"
        stroke={ILLUSTRATION_COLOURS.surface}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
