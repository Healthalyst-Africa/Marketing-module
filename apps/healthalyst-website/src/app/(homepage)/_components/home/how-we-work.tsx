"use client";

import Link from "next/link";
import { useState } from "react";
import { MarketingProcess } from "@healthalyst/ui/components/marketing-process";
import { PROCESS_CONTENT } from "~/data/homepage-content";
import { SITE_ROUTES } from "~/data/site";
import { STEPS } from "~/data/steps";

export default function HowWeWork() {
  const [activeStep, setActiveStep] = useState(0);
  return (
    <MarketingProcess
      content={PROCESS_CONTENT}
      steps={STEPS}
      selectedIndex={activeStep}
      onSelect={setActiveStep}
      conversationAction={
        <Link href={SITE_ROUTES.contact}>Start a conversation</Link>
      }
    />
  );
}
