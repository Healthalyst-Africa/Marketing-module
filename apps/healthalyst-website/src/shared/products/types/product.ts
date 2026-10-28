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

/** An institution type listed in the Contact section. */
export interface Institution {
  name: string;
  product: string;
  description: string;
}
