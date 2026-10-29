import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JobOpeningPage from "~/features/careers/components/job-opening-page";
import {
  JOB_OPENINGS,
  findJobOpening,
} from "~/features/careers/config/job-openings";
import { createJobOpeningDestination } from "~/features/careers/utilities/job-opening-destination";

/** Every open role is built ahead of time; other addresses are not found. */
export const dynamicParams = false;

export function generateStaticParams() {
  return JOB_OPENINGS.map((jobOpening) => ({ slug: jobOpening.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const jobOpening = findJobOpening((await params).slug);

  if (!jobOpening) {
    return {};
  }

  const destination = createJobOpeningDestination(jobOpening.slug);

  return {
    title: `${jobOpening.title} · Careers`,
    description: jobOpening.summary,
    alternates: { canonical: destination },
    openGraph: {
      title: `${jobOpening.title} | Healthalyst Africa careers`,
      description: jobOpening.summary,
      url: destination,
    },
  };
}

export default async function JobOpeningRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const jobOpening = findJobOpening((await params).slug);

  if (!jobOpening) {
    notFound();
  }

  return <JobOpeningPage jobOpening={jobOpening} />;
}
