import type { ReactNode } from "react";
import { DentalIllustration } from "@healthalyst/ui/illustrations/dental-illustration";
import { HospitalIllustration } from "@healthalyst/ui/illustrations/hospital-illustration";
import { ImagingIllustration } from "@healthalyst/ui/illustrations/imaging-illustration";
import { LaboratoryIllustration } from "@healthalyst/ui/illustrations/laboratory-illustration";
import { MedicalSupplyIllustration } from "@healthalyst/ui/illustrations/medical-supply-illustration";
import { PharmacyIllustration } from "@healthalyst/ui/illustrations/pharmacy-illustration";

/** The illustration of the institution each product serves, keyed by product name. */
export const PRODUCT_ILLUSTRATIONS_BY_NAME: Readonly<
  Record<string, ReactNode>
> = {
  HealthSchedule: <HospitalIllustration />,
  LabConnect: <LaboratoryIllustration />,
  PharmaDesk: <PharmacyIllustration />,
  DentaFlow: <DentalIllustration />,
  ImagingHub: <ImagingIllustration />,
  MedSupply: <MedicalSupplyIllustration />,
};
