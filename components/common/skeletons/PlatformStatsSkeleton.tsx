"use client";
import React from "react";
import Skeleton from "@/components/ui/skeleton";

export function PlatformStatsSkeleton() {
  return (
    <section className="bg-indigo-50 py-10 text-center">
      <h2 className="text-2xl font-semibold mb-6">Platform Overview</h2>
      <div className="flex flex-wrap justify-center gap-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="w-32">
            <Skeleton className="w-full h-10 mb-2" />
            <Skeleton className="w-3/4 h-4 mx-auto" variant="text" />
          </div>
        ))}
      </div>
    </section>
  );
}

export default PlatformStatsSkeleton;
