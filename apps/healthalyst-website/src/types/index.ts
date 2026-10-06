/** A single Healthalyst Africa product line. */
export interface Product {
  /** Zero-padded display index, for example `01`. */
  number: string;
  name: string;
  category: string;
  tagline: string;
  headline: string;
  supportingHeadline: string;
  description: string;
  /** Human-readable list of the institution types this product serves. */
  builtFor: string;
  capabilities: string[];
}

/** One stage of the implementation process. */
export interface Step {
  number: string;
  title: string;
  tag: string;
  headline: string;
  body: string;
}

/** A frequently asked question and its answer. */
export interface FAQ {
  question: string;
  answer: string;
}

/** A headline figure shown in the statistics bar. */
export interface Statistic {
  number: string;
  label: string;
  supportingText: string;
}

/** A supporting principle shown in the About section. */
export interface Pillar {
  icon: string;
  title: string;
  body: string;
}

/** An institution type listed in the Contact section. */
export interface Institution {
  name: string;
  product: string;
  description: string;
}

/** A navigation entry that scrolls to an in-page section anchor. */
export interface NavigationLink {
  label: string;
  identifier: string;
}
