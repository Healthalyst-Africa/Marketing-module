import { cloneElement, type ReactElement, type ReactNode } from "react";
import { MarketingIconBadge } from "@healthalyst/ui/components/marketing-icon-badge";
import { MarketingHubDiagramMotion } from "@healthalyst/ui/components/marketing-hub-diagram-motion";
import {
  HUB_BOX_CLASSES,
  HUB_CANVAS_VIEW_BOX,
  HUB_CONNECTOR_ENDS,
  HUB_CONNECTOR_PATHS,
} from "@healthalyst/ui/lib/hub-diagram-geometry";
import { cn } from "@healthalyst/ui/lib/utilities";

/** One destination around the hub: an icon, a title, a detail and a link. */
export interface MarketingHubNode {
  title: string;
  /** A short second line, such as the product that serves this audience. */
  detail: string;
  icon: ReactNode;
  /**
   * The link the node opens, such as a Next.js `Link`. Its own children are
   * replaced by the node's content; `accessibleSuffix` adds text that only
   * screen readers hear after the title and detail.
   */
  link: ReactElement<{ className?: string; children?: ReactNode }>;
  accessibleSuffix?: string;
}

/** Node placement on the wide-screen canvas, three a side. */
const NODE_POSITIONS = [
  "lg:left-[2%] lg:top-[19.64%]",
  "lg:left-[2%] lg:top-1/2",
  "lg:left-[2%] lg:top-[80.36%]",
  "lg:left-[75%] lg:top-[19.64%]",
  "lg:left-[75%] lg:top-1/2",
  "lg:left-[75%] lg:top-[80.36%]",
] as const;

/*
 * Classes that light every node up while the motion layer marks the signal
 * as arrived. The 0.7 second delay lets the signal reach the nodes first.
 */
const ACTIVE_NODE_CLASSES =
  "group-data-[signal=on]/hub:border-accent group-data-[signal=on]/hub:shadow-[0_2px_4px_rgba(15,23,20,0.05),0_10px_24px_rgba(15,23,20,0.08)] group-data-[signal=on]/hub:delay-700";

const ACTIVE_ICON_CLASSES =
  "group-data-[signal=on]/hub:border-accent group-data-[signal=on]/hub:bg-accent/10 group-data-[signal=on]/hub:delay-700";

const ACTIVE_CONNECTOR_END_CLASSES =
  "group-data-[signal=on]/hub:fill-accent group-data-[signal=on]/hub:delay-700";

/**
 * A hub joined to six destinations, three on each side, with a signal that
 * travels from the hub along all six connectors at once and lights every
 * destination up together. On narrower screens the hub sits above the
 * destinations, which still light up together.
 *
 * The diagram is rendered on the server and is complete without scripts; a
 * small client layer (`MarketingHubDiagramMotion`) runs the loop. It pulses
 * every 2.4 seconds, holds while the pointer or focus is inside, stops while
 * the diagram is off screen, has a pause control (WCAG 2.2.2) and does not
 * run under reduced motion. The connectors are decorative; the destinations
 * are an ordinary list of links.
 */
export function MarketingHubDiagram({
  hub,
  nodes,
  listLabel,
  pauseLabel = "Pause animation",
  playLabel = "Play animation",
  className,
}: {
  /** The hub's content, such as a logo. */
  hub: ReactNode;
  /** Six destinations; the wide-screen layout places three a side. */
  nodes: readonly MarketingHubNode[];
  /** Accessible name for the list of destinations. */
  listLabel: string;
  pauseLabel?: string;
  playLabel?: string;
  className?: string;
}) {
  return (
    <MarketingHubDiagramMotion
      pauseLabel={pauseLabel}
      playLabel={playLabel}
      className={className}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[45%] -z-10 size-[min(90vw,640px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,hsl(var(--accent-subtle)),transparent)]"
      />
      <div className="relative lg:aspect-[1200/560]">
        <svg
          aria-hidden="true"
          focusable="false"
          viewBox={HUB_CANVAS_VIEW_BOX}
          className="absolute inset-0 hidden size-full lg:block"
        >
          {HUB_CONNECTOR_PATHS.map((path, pathIndex) => (
            <g key={path}>
              <path
                d={path}
                fill="none"
                className="stroke-primary/20"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle
                cx={HUB_CONNECTOR_ENDS[pathIndex]?.[0]}
                cy={HUB_CONNECTOR_ENDS[pathIndex]?.[1]}
                r="4"
                className={cn(
                  "fill-primary/25 transition-colors duration-500 motion-reduce:transition-none",
                  ACTIVE_CONNECTOR_END_CLASSES
                )}
              />
            </g>
          ))}
        </svg>

        <div
          className={cn(
            "relative mx-auto flex size-44 items-center justify-center",
            HUB_BOX_CLASSES
          )}
        >
          <div className="flex size-full items-center justify-center rounded-[32px] border border-primary/15 bg-card shadow-[0_2px_4px_rgba(15,23,20,0.05),0_16px_40px_rgba(15,23,20,0.10)]">
            {hub}
          </div>
        </div>

        <ul
          aria-label={listLabel}
          className="mt-10 grid gap-3 sm:grid-cols-2 lg:mt-0 lg:block"
        >
          {nodes.map((node, nodeIndex) => (
            <li
              key={node.title}
              className={cn(
                "lg:absolute lg:w-[23%] lg:-translate-y-1/2",
                NODE_POSITIONS[nodeIndex]
              )}
            >
              {cloneElement(node.link, {
                className: cn(
                  "flex w-full items-center gap-3 rounded-full border border-primary/20 bg-card py-2.5 pl-2.5 pr-5 text-left shadow-[0_1px_2px_rgba(15,23,20,0.04)] transition-[border-color,box-shadow] duration-500 ease-out hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 motion-reduce:transition-none",
                  ACTIVE_NODE_CLASSES
                ),
                children: (
                  <>
                    <MarketingIconBadge
                      icon={node.icon}
                      className={ACTIVE_ICON_CLASSES}
                    />
                    <span className="flex min-w-0 flex-col">
                      <span className="text-[15px] font-semibold leading-snug text-foreground">
                        {node.title}
                      </span>
                      <span className="text-[13px] font-light leading-snug text-muted-foreground">
                        {node.detail}
                      </span>
                      {node.accessibleSuffix && (
                        <span className="sr-only">{node.accessibleSuffix}</span>
                      )}
                    </span>
                  </>
                ),
              })}
            </li>
          ))}
        </ul>
      </div>
    </MarketingHubDiagramMotion>
  );
}
