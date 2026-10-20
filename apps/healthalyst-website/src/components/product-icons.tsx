import type { ReactNode } from "react";
import {
  DentalIcon,
  ImagingIcon,
  LaboratoryIcon,
  PharmacyIcon,
  SchedulingIcon,
  SupplyIcon,
} from "@healthalyst/icons";

/** The icon for each product, keyed by product name. */
export const PRODUCT_ICONS_BY_NAME: Readonly<Record<string, ReactNode>> = {
  HealthSchedule: <SchedulingIcon />,
  LabConnect: <LaboratoryIcon />,
  PharmaDesk: <PharmacyIcon />,
  DentaFlow: <DentalIcon />,
  ImagingHub: <ImagingIcon />,
  MedSupply: <SupplyIcon />,
};
