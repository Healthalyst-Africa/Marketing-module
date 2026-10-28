/**
 * Products grouped by need, as product names; used by the Solutions menu and
 * the homepage product suite. Drafted; awaiting approval.
 */
export const SOLUTION_GROUPS = [
  { label: "Care delivery", productNames: ["HealthSchedule", "DentaFlow"] },
  { label: "Diagnostics", productNames: ["LabConnect", "ImagingHub"] },
  { label: "Medicines and supply", productNames: ["PharmaDesk", "MedSupply"] },
] as const;
