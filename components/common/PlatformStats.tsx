"use client";

import { usePlatformStatistics } from "@/hooks/usePlatformStatics";
import { PlatformStatsSkeleton } from "@/components/common/skeletons/PlatformStatsSkeleton";

export function PlatformStats() {
  const { platformStatistics, isFetchingPlatformStatistics } =
    usePlatformStatistics();

  if (isFetchingPlatformStatistics) return <PlatformStatsSkeleton />;

  return (
    <section className="bg-indigo-50 py-20 text-center">
      <h2 className="text-2xl font-semibold">Platform Overview</h2>
      <div className="flex flex-wrap justify-center gap-10 mt-10">
        <Stat label="Total Agents" value={platformStatistics?.totalAgents} />
        <Stat
          label="Verified Agents"
          value={platformStatistics?.verifiedAgents}
        />
        <Stat label="Services" value={platformStatistics?.totalServices} />
        <Stat label="Reviews" value={platformStatistics?.totalReviews} />
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value?: number }) {
  return (
    <div>
      <p className="text-3xl font-bold text-indigo-700">{value ?? "-"}</p>
      <p className="text-gray-500">{label}</p>
    </div>
  );
}
