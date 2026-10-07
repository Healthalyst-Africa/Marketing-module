import { MarketingStatistics } from "@healthalyst/ui/components/marketing-hero";
import { STATISTICS } from "~/data/site";

export default function StatisticsBar() {
  return <MarketingStatistics statistics={STATISTICS} />;
}
