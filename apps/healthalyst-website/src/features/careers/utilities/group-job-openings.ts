import type { JobOpening } from "~/features/careers/types/job-opening";

/** Open roles grouped by team, keeping the order the roles are listed in. */
export function groupJobOpeningsByTeam(
  jobOpenings: readonly JobOpening[]
): { team: string; jobOpenings: JobOpening[] }[] {
  const groups = new Map<string, JobOpening[]>();

  for (const jobOpening of jobOpenings) {
    groups.set(jobOpening.team, [
      ...(groups.get(jobOpening.team) ?? []),
      jobOpening,
    ]);
  }

  return [...groups].map(([team, teamOpenings]) => ({
    team,
    jobOpenings: teamOpenings,
  }));
}
