/** One open role on the careers page. */
export interface JobOpening {
  /** Address segment, such as `product-designer` in `/careers/product-designer`. */
  slug: string;
  title: string;
  team: string;
  location: string;
  employmentType: string;
  /** One sentence for the careers page and the role's description. */
  summary: string;
  /** A short paragraph introducing the role. */
  introduction: string;
  responsibilities: readonly string[];
  requirements: readonly string[];
  /** Strengths that help but are not required. */
  niceToHave: readonly string[];
  /** Whether applicants must link to a portfolio. */
  isPortfolioRequired: boolean;
}
