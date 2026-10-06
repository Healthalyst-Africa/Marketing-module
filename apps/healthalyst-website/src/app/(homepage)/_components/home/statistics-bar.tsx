import { STATISTICS } from "~/data/site";
import { cn } from "~/lib/utilities";

export default function StatisticsBar() {
  return (
    <div className="bg-forest-deep">
      <div className="mx-auto grid max-w-[1200px] grid-cols-2 smallScreen:grid-cols-4">
        {STATISTICS.map((statistic, index) => (
          <div
            key={statistic.label}
            className={cn(
              "border-b border-white/[0.08] px-9 py-11 smallScreen:border-b-0",
              index < 3 &&
                "smallScreen:border-r smallScreen:border-white/[0.08]"
            )}
          >
            <div className="font-serif text-[clamp(2.4rem,4vw,3.4rem)] font-light leading-none text-accent-on-primary">
              {statistic.number}
            </div>
            <div className="mt-2.5 text-[14px] font-semibold text-white">
              {statistic.label}
            </div>
            <div className="mt-1 text-[12px] font-light text-primary-foreground/85">
              {statistic.supportingText}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
