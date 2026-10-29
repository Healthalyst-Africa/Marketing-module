import {
  ILLUSTRATION_COLOURS,
  ILLUSTRATION_DETAIL_STROKE,
  ILLUSTRATION_STROKE,
} from "./illustration-colours";

/**
 * A keypad phone with a message bubble, for text message and USSD fallback
 * on basic phones. Drawn in the GitLab SVGs style (MIT; licence in
 * `illustration-colours.ts`).
 */
export function TextMessageIllustration({ className }: { className?: string }) {
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
      <rect
        x="42"
        y="44"
        width="40"
        height="66"
        rx="6"
        fill={ILLUSTRATION_COLOURS.surface}
      />
      <path
        d="M82 66V50a6 6 0 00-6-6H48a6 6 0 00-6 6v54a6 6 0 006 6h28a6 6 0 006-6V74"
        {...ILLUSTRATION_STROKE}
      />
      <rect
        x="48"
        y="51"
        width="28"
        height="20"
        rx="2"
        fill={ILLUSTRATION_COLOURS.accentSubtle}
      />
      <path d="M48 71V51h28v14" {...ILLUSTRATION_STROKE} />
      <path
        d="M51 80h4m7 0h4m7 0h4M51 88h4m7 0h4m7 0h4M51 96h4m7 0h4m7 0h4"
        {...ILLUSTRATION_DETAIL_STROKE}
      />
      <path
        d="M78 30h32a6 6 0 016 6v16a6 6 0 01-6 6H92l-8 7v-7h-6a6 6 0 01-6-6V36a6 6 0 016-6z"
        fill={ILLUSTRATION_COLOURS.primary}
      />
      <path
        d="M116 46v6a6 6 0 01-6 6H92l-8 7v-7h-6a6 6 0 01-6-6V36a6 6 0 016-6h32a6 6 0 016 6v2"
        {...ILLUSTRATION_STROKE}
      />
      <circle cx="84" cy="44" r="2.5" fill={ILLUSTRATION_COLOURS.surface} />
      <circle cx="94" cy="44" r="2.5" fill={ILLUSTRATION_COLOURS.surface} />
      <circle cx="104" cy="44" r="2.5" fill={ILLUSTRATION_COLOURS.accent} />
    </svg>
  );
}
