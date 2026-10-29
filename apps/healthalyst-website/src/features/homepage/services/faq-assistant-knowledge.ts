import { COMPANY_OFFICE_ADDRESS } from "~/config/company-office";
import { ABOUT_PAGE_CONTENT } from "~/features/about/config/about-page-content";
import { CONTACT_DETAILS } from "~/features/contact-enquiry/config/contact-page-content";
import { FAQS } from "~/features/homepage/config/faqs";
import { HOMEPAGE_CONDITIONS } from "~/features/homepage/config/homepage-content";
import { PRODUCTS } from "~/shared/products/config/products";

/**
 * The published facts the FAQ assistant may answer from, as plain text. It
 * reads the site's own copy so the assistant never knows more than the site
 * says. The placeholder phone number and the unapproved sample testimonials
 * are left out on purpose.
 */
export function createFaqAssistantReference(): string {
  const sections = [
    ["About the company", ...ABOUT_PAGE_CONTENT.whatWeDoParagraphs],
    ["How we work with institutions", ABOUT_PAGE_CONTENT.approachSummary],
    [
      "Products",
      ...PRODUCTS.map((product) =>
        [
          `${product.name} (${product.category}): ${product.description}`,
          `Built for: ${product.builtFor}.`,
          `Capabilities: ${product.capabilities.join("; ")}.`,
        ].join(" ")
      ),
    ],
    [
      "Operating conditions",
      ...HOMEPAGE_CONDITIONS.map(
        (condition) => `${condition.title}: ${condition.description}`
      ),
    ],
    [
      "Frequently asked questions",
      ...FAQS.map((faq) => `Q: ${faq.question}\nA: ${faq.answer}`),
    ],
    [
      "Contact",
      "Enquiries go through the contact form at /contact. The team aims to respond within two business days.",
      ...(CONTACT_DETAILS.email ? [`Email: ${CONTACT_DETAILS.email}`] : []),
      `Office: ${COMPANY_OFFICE_ADDRESS.lines.join(" ")}`,
    ],
  ];

  return sections
    .map(([heading, ...entries]) => `## ${heading}\n${entries.join("\n")}`)
    .join("\n\n");
}
