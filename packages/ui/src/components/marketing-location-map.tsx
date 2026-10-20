import { useId, type ReactNode } from "react";
import { LocationIcon } from "@healthalyst/icons";
import { MarketingIconBadge } from "@healthalyst/ui/components/marketing-icon-badge";
import { cn } from "@healthalyst/ui/lib/utilities";

/**
 * An embedded map of a place beside an address card. On wide screens the card
 * is a column to the left of the map; on narrower screens it comes first and
 * the map follows. The card never covers the map, so the map provider's own
 * controls and place box stay visible.
 *
 * The map is a third-party frame. It loads only as it nears the screen, sends
 * only the page's origin as the referrer, and keeps the surface colour while
 * loading. The address stays readable as text whether or not the map loads.
 *
 * The address column is set on the brand colour with light text, like the
 * closing band, and carries a faint field of medical crosses, the motif of
 * the brand page header, strongest in its lower corner and fading out behind
 * the text. Pass an action styled for a brand field (such as `ActionLink`
 * with `variant="inverse"`).
 */
export function MarketingLocationMap({
  embedSource,
  mapTitle,
  name,
  addressLines,
  action,
  className,
}: {
  /** The map's embed address. */
  embedSource: string;
  /** Accessible name for the map frame, naming the place it shows. */
  mapTitle: string;
  /** The place's name, shown above its address. */
  name: string;
  addressLines: readonly string[];
  /** A link to directions or the full map, rendered under the address. */
  action?: ReactNode;
  className?: string;
}) {
  const identifierPrefix = useId().replace(/[^a-zA-Z0-9]/g, "");
  const crossPatternIdentifier = `${identifierPrefix}-crosses`;
  const fadeIdentifier = `${identifierPrefix}-fade`;
  const fadeMaskIdentifier = `${identifierPrefix}-fade-mask`;

  return (
    <div
      className={cn(
        "grid overflow-hidden rounded-xl bg-primary shadow-[0_1px_2px_rgba(15,23,20,0.04),0_4px_16px_rgba(15,23,20,0.06)] lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]",
        className
      )}
    >
      <div className="relative isolate flex flex-col justify-center overflow-hidden bg-primary p-6 text-primary-foreground md:p-8">
        <svg
          aria-hidden="true"
          focusable="false"
          className="pointer-events-none absolute inset-0 -z-10 size-full text-primary-foreground"
        >
          <defs>
            <pattern
              id={crossPatternIdentifier}
              width="28"
              height="28"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M14 9.5v9M9.5 14h9"
                stroke="currentColor"
                strokeOpacity="0.2"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </pattern>
            <radialGradient
              id={fadeIdentifier}
              cx="1"
              cy="1"
              r="1.2"
              gradientUnits="objectBoundingBox"
            >
              <stop offset="0" stopColor="white" stopOpacity="1" />
              <stop offset="0.85" stopColor="white" stopOpacity="0" />
            </radialGradient>
            <mask id={fadeMaskIdentifier}>
              <rect
                width="100%"
                height="100%"
                fill={`url(#${fadeIdentifier})`}
              />
            </mask>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill={`url(#${crossPatternIdentifier})`}
            mask={`url(#${fadeMaskIdentifier})`}
          />
        </svg>
        <MarketingIconBadge icon={<LocationIcon />} tone="inverse" />
        <p className="mt-5 text-lg font-semibold leading-snug tracking-[-0.01em] text-primary-foreground">
          {name}
        </p>
        <address className="mt-2 text-[15px] font-light not-italic leading-relaxed text-primary-foreground/80">
          {addressLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </address>
        {action && <div className="mt-6">{action}</div>}
      </div>
      <div className="relative h-[320px] bg-muted md:h-[440px]">
        <iframe
          src={embedSource}
          title={mapTitle}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="absolute inset-0 size-full border-0"
        />
      </div>
    </div>
  );
}
