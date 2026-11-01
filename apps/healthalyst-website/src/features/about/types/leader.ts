/** A member of the leadership team on the About page. */
export interface Leader {
  name: string;
  role: string;
  /** One line of background, such as a previous role. */
  background?: string;
  /** A public path to their photograph, such as `/images/team/name.webp`. */
  portrait?: string;
  /** Their LinkedIn profile address. */
  linkedInAddress?: string;
  /**
   * Published only when true: the person is real, agreed to appear, and an
   * accountable company owner confirmed their photograph and wording.
   */
  isApproved: boolean;
}
