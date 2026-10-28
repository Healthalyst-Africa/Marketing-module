/**
 * Whether animation controls (pause and play buttons) are shown. At the
 * user's request they appear only in development; production builds loop
 * their animations without a control. This does not meet WCAG 2.2.2
 * (pause, stop, hide); see `docs/website-revamp.md`. Hover and focus holds
 * and reduced motion still apply everywhere.
 */
export const SHOW_MOTION_CONTROLS = process.env.NODE_ENV === "development";
