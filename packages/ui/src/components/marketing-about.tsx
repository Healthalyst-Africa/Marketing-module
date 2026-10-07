import type { ReactElement, ReactNode } from "react";
import { Button } from "@healthalyst/ui/components/button";
import {
  MarketingContainer,
  MarketingIntroduction,
  MarketingSection,
  type MarketingSectionContent,
} from "@healthalyst/ui/components/marketing-section";

export function ConnectedSolutionsIllustration({
  labels,
  description,
}: {
  labels: readonly string[];
  description: string;
}) {
  return (
    <svg
      viewBox="0 0 480 340"
      role="img"
      aria-label={description}
      className="mx-auto w-full max-w-[480px] text-primary"
    >
      <circle
        cx="240"
        cy="170"
        r="104"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.25"
      />
      {labels.map((label, index) => {
        const angle = (index * Math.PI) / 3 - Math.PI / 2;
        const horizontalPosition = 240 + Math.cos(angle) * 152;
        const verticalPosition = 170 + Math.sin(angle) * 115;
        return (
          <g key={label}>
            <path
              d={`M240 170 L${horizontalPosition} ${verticalPosition}`}
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.35"
            />
            <rect
              x={horizontalPosition - 62}
              y={verticalPosition - 20}
              width="124"
              height="40"
              rx="6"
              fill="hsl(var(--card))"
              stroke="currentColor"
              strokeOpacity="0.3"
            />
            <text
              x={horizontalPosition}
              y={verticalPosition + 5}
              textAnchor="middle"
              fill="currentColor"
              style={{
                fontFamily: "var(--font-sans), sans-serif",
                fontSize: 14,
              }}
            >
              {label}
            </text>
          </g>
        );
      })}
      <circle cx="240" cy="170" r="29" fill="currentColor" />
      <path
        d="M226 170h28M240 156v28"
        stroke="hsl(var(--primary-foreground))"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function MarketingAbout({
  content,
  quotation,
  partnershipAction,
  pillars,
  image,
  approachLabel,
}: {
  content: MarketingSectionContent;
  quotation: string;
  partnershipAction: ReactElement;
  pillars: readonly { title: string; body: string }[];
  image: ReactNode;
  approachLabel: string;
}) {
  return (
    <MarketingSection id="about" className="bg-secondary">
      <MarketingContainer>
        <div className="grid items-start gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <div>
            <MarketingIntroduction
              content={{ ...content, paragraphs: [] }}
              className="mb-8 block"
            />
            <div className="relative mb-8 aspect-[5/3] overflow-hidden rounded-[2rem] bg-background">
              {image}
            </div>
            <blockquote className="border-l-2 border-accent pl-6 font-serif text-3xl leading-[1.2] text-primary">
              {quotation}
            </blockquote>
            <Button
              asChild
              variant="link"
              className="mt-5 h-auto min-h-12 whitespace-normal p-0 text-left underline underline-offset-8"
            >
              {partnershipAction}
            </Button>
          </div>
          <div className="flex flex-col gap-5 text-base leading-[1.8] text-muted-foreground lg:pt-10">
            {content.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <h3 className="mt-5 text-base font-semibold text-primary">
              {approachLabel}
            </h3>
            <div className="divide-y divide-border border-t">
              {pillars.map((pillar) => (
                <article key={pillar.title} className="py-5">
                  <div>
                    <h4 className="mb-2 font-semibold text-primary">
                      {pillar.title}
                    </h4>
                    <p className="text-sm leading-[1.8]">{pillar.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </MarketingContainer>
    </MarketingSection>
  );
}
