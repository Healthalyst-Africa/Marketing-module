import { STATS } from "~/data/site";
import { cn } from "~/lib/utils";

export default function StatsBar() {
  return (
    <div className="bg-forest-deep">
      <div className="mx-auto grid max-w-[1200px] grid-cols-2 xs:grid-cols-4">
        {STATS.map((stat, index) => (
          <div
            key={stat.label}
            className={cn(
              "border-b border-white/[0.08] px-9 py-11 xs:border-b-0",
              index < 3 && "xs:border-r xs:border-white/[0.08]"
            )}
          >
            <div className="font-serif text-[clamp(2.4rem,4vw,3.4rem)] font-light leading-none text-gold">
              {stat.number}
            </div>
            <div className="mt-2.5 text-[14px] font-semibold text-white">
              {stat.label}
            </div>
            <div className="mt-1 text-[12px] font-light text-white/[0.35]">
              {stat.sub}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
