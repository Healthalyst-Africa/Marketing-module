import type { Institution } from "~/shared/products/types/product";

/** Institution types the products serve, each paired with its product. */
export const INSTITUTIONS: Institution[] = [
  {
    name: "Hospitals and clinics",
    product: "HealthSchedule",
    description: "patient scheduling and clinical operations",
  },
  {
    name: "Laboratories",
    product: "LabConnect",
    description: "end-to-end digital diagnostic workflows",
  },
  {
    name: "Pharmacies",
    product: "PharmaDesk",
    description: "prescription and inventory management",
  },
  {
    name: "Dental practices",
    product: "DentaFlow",
    description: "scheduling, charting and patient management",
  },
  {
    name: "Imaging centres",
    product: "ImagingHub",
    description: "referral management and radiology reporting",
  },
  {
    name: "Equipment suppliers and institutions",
    product: "MedSupply",
    description: "digital procurement and supply chain",
  },
];
