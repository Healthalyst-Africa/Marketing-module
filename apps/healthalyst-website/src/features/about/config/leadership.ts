import type { Leader } from "~/features/about/types/leader";

/** Copy for the leadership section. The heading and line are drafts. */
export const LEADERSHIP_CONTENT = {
  identifier: "leadership",
  heading: "Leadership",
  introduction:
    "The people building the digital infrastructure of African healthcare.",
  listLabel: "Leadership team",
  profileLinkLabel: "{name} on LinkedIn (opens in a new tab)",
} as const;

/**
 * The leadership team, in display order. Only entries with
 * `isApproved: true` are published. The entries below are placeholders for
 * the design only, shown in development and never in production: no real
 * names or claims, portraits cropped from the site's licensed stock
 * photographs (models, not staff; sources in docs/website-assets.md), and
 * LinkedIn's home page as the profile link. Replace them with the real team
 * (name, role, one line of background, a photograph in
 * `public/images/team/`, and optionally a LinkedIn address), then set
 * `isApproved: true` on each.
 */
export const LEADERS: readonly Leader[] = [
  {
    name: "Name Surname",
    role: "Chief Executive Officer",
    background: "One line about their background, such as a previous role.",
    portrait: "/images/team/sample-leader-one.webp",
    linkedInAddress: "https://www.linkedin.com/",
    isApproved: false,
  },
  {
    name: "Name Surname",
    role: "Chief Technology Officer",
    background: "One line about their background, such as a previous role.",
    portrait: "/images/team/sample-leader-two.webp",
    linkedInAddress: "https://www.linkedin.com/",
    isApproved: false,
  },
  {
    name: "Name Surname",
    role: "Medical Director",
    background: "One line about their background, such as a previous role.",
    portrait: "/images/team/sample-leader-three.webp",
    linkedInAddress: "https://www.linkedin.com/",
    isApproved: false,
  },
  {
    name: "Name Surname",
    role: "Head of Partnerships",
    background: "One line about their background, such as a previous role.",
    portrait: "/images/team/sample-leader-four.webp",
    linkedInAddress: "https://www.linkedin.com/",
    isApproved: false,
  },
];
