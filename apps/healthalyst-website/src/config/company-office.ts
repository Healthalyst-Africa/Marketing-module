/** The company's office, one entry per displayed line. */
export const COMPANY_OFFICE_ADDRESS = {
  label: "Office",
  lines: [
    "11 Adenubi Close, off Majekodunmi Street,",
    "off Allen Avenue, Ikeja,",
    "Lagos, Nigeria",
  ],
  /**
   * The address as a map search. The "off …" directions are left out so the
   * map service matches the street address itself.
   */
  mapQuery: "11 Adenubi Close, Ikeja, Lagos, Nigeria",
} as const;
