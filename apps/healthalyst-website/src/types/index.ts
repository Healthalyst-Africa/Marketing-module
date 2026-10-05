/** A single Healthalyst Africa product line. */
export interface Product {
  /** Zero-padded display index, e.g. `01`. */
  number: string;
  name: string;
  category: string;
  tagline: string;
  headline: string;
  subHeadline: string;
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
  q: string;
  a: string;
}

/** A headline figure shown in the stats bar. */
export interface Stat {
  number: string;
  label: string;
  sub: string;
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
  desc: string;
}

/** A navigation entry that scrolls to an in-page section anchor. */
export interface NavLink {
  label: string;
  id: string;
}
