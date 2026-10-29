import { cloneElement, type ReactElement, type ReactNode } from "react";
import { LinkedInIcon } from "@healthalyst/icons";

/** One person in a team grid. */
export interface MarketingTeamMember {
  name: string;
  role: string;
  /** One line of background, such as a previous role. */
  background?: string;
  /** A portrait filling a 4:5 frame; the person's initials otherwise. */
  portrait?: ReactNode;
  /**
   * A link element without children to the person's LinkedIn profile, such
   * as an `<a>` opening in a new tab. The card supplies its icon and name.
   */
  profileLink?: ReactElement<{ className?: string; children?: ReactNode }>;
}

function initialsOf(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((namePart) => namePart.charAt(0).toUpperCase())
    .join("");
}

/**
 * People as white cards on a tinted band: the portrait sits inset in the card
 * with a LinkedIn badge on its bottom-right edge, then the name in bold and
 * the role beneath. The badge grows slightly on hover and presses in on
 * click; under reduced motion it stays still. Two across until wide screens and four from there. Use
 * it inside a `MarketingContentSection` with a tinted tone, which supplies
 * the heading.
 */
export function MarketingTeam({
  members,
  listLabel,
  profileLinkLabel,
}: {
  members: readonly MarketingTeamMember[];
  /** Accessible name for the list. */
  listLabel: string;
  /** Accessible name for a profile link; `{name}` is replaced. */
  profileLinkLabel: string;
}) {
  return (
    <ul
      aria-label={listLabel}
      className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
    >
      {members.map((member) => (
        <li
          key={`${member.name}-${member.role}`}
          className="flex flex-col rounded-xl bg-card p-2 pb-4 ring-1 ring-primary/10 sm:rounded-2xl sm:p-3 sm:pb-5"
        >
          <div className="relative">
            {/* Relative, so a filled image is positioned and clipped here. */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-secondary sm:rounded-xl">
              {member.portrait ?? (
                <span
                  aria-hidden="true"
                  className="flex size-full items-center justify-center text-3xl font-semibold text-primary/60"
                >
                  {initialsOf(member.name)}
                </span>
              )}
            </div>
            {member.profileLink &&
              cloneElement(member.profileLink, {
                className:
                  "absolute bottom-0 right-2 inline-flex size-9 translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_2px_6px_rgba(15,23,20,0.18)] ring-4 ring-card transition-transform duration-200 ease-out hover:scale-105 active:scale-95 active:duration-75 focus-visible:outline-none focus-visible:ring-ring motion-reduce:transition-none motion-reduce:hover:scale-100 motion-reduce:active:scale-100 sm:right-3 sm:size-11",
                children: (
                  <>
                    <LinkedInIcon
                      aria-hidden="true"
                      className="size-4 fill-current stroke-none sm:size-5"
                    />
                    <span className="sr-only">
                      {profileLinkLabel.replace("{name}", member.name)}
                    </span>
                  </>
                ),
              })}
          </div>
          <div className="mt-5 px-1 sm:mt-3">
            <h3 className="text-[15px] font-semibold leading-snug text-foreground sm:pr-14 sm:text-lg">
              {member.name}
            </h3>
            <p className="mt-0.5 text-[13px] leading-snug text-muted-foreground sm:text-base">
              {member.role}
            </p>
            {member.background && (
              <p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground sm:text-[13px]">
                {member.background}
              </p>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
