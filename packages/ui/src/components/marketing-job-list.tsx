import { cloneElement, type ReactElement, type ReactNode } from "react";
import { ArrowRightIcon } from "@healthalyst/icons";

/** One open role in a job list. */
export interface MarketingJob {
  title: string;
  location: string;
  employmentType: string;
  /** A link element without children to the role's page; the row supplies its content. */
  link: ReactElement<{ className?: string; children?: ReactNode }>;
}

/** Roles that share a team, listed under its name. */
export interface MarketingJobGroup {
  heading: string;
  jobs: readonly MarketingJob[];
}

/**
 * Open roles as a job board: a count, then each team's roles as rows with the
 * title, location and contract type in aligned columns and an arrow. The whole
 * row is the link; it shades on hover and its arrow moves. On phones each row
 * stacks the title over a line of details.
 */
export function MarketingJobList({
  groups,
  countLabel,
}: {
  groups: readonly MarketingJobGroup[];
  /** The number of open roles in words, such as "2 open roles". */
  countLabel: string;
}) {
  return (
    <div>
      <p className="text-sm text-muted-foreground">{countLabel}</p>
      <div className="mt-6 flex flex-col gap-10">
        {groups.map((group) => (
          <section key={group.heading} aria-label={group.heading}>
            <h3 className="text-xs font-semibold text-muted-foreground">
              {group.heading}
            </h3>
            <ul className="mt-3 border-t border-primary/10">
              {group.jobs.map((job) => (
                <li key={job.title} className="border-b border-primary/10">
                  {cloneElement(job.link, {
                    className:
                      "group/job -mx-3 grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-1 rounded-lg px-3 py-4 transition-colors duration-150 hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none sm:grid-cols-[1fr_10rem_7rem_auto] sm:py-5",
                    children: (
                      <>
                        <span className="text-[15px] font-semibold text-foreground sm:text-base">
                          {job.title}
                        </span>
                        <span className="col-start-1 row-start-2 text-[13px] text-muted-foreground sm:col-start-auto sm:row-start-auto sm:text-sm">
                          {job.location}
                          <span className="sm:hidden">
                            {" · "}
                            {job.employmentType}
                          </span>
                        </span>
                        <span className="hidden text-sm text-muted-foreground sm:block">
                          {job.employmentType}
                        </span>
                        <ArrowRightIcon
                          aria-hidden="true"
                          className="col-start-2 row-span-2 row-start-1 size-4 text-accent transition-transform duration-200 group-hover/job:translate-x-1 motion-reduce:transition-none sm:col-start-auto sm:row-span-1 sm:row-start-auto"
                        />
                      </>
                    ),
                  })}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
