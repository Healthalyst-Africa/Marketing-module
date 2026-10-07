"use client";

import { useState } from "react";
import { MarketingProcess } from "@healthalyst/ui/components/marketing-process";
import { PROCESS_CONTENT } from "~/data/homepage-content";
import { STEPS } from "~/data/steps";

export default function HowWeWork() {
  const [activeStep, setActiveStep] = useState(0);
  return (
    <MarketingProcess
      content={PROCESS_CONTENT}
      steps={STEPS}
      selectedIndex={activeStep}
      onSelect={setActiveStep}
    />
  );
}
