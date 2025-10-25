"use client";
import React from "react";
import Skeleton from "@/components/ui/skeleton";

export function FeaturedAgentsSkeleton() {
  return (
    <section className="py-12 bg-gray-50">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Featured Agents
      </h2>
      <div className="grid md:grid-cols-3 gap-6 container mx-auto px-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="p-4 bg-white rounded-lg shadow-sm">
            <div className="flex items-center gap-4 mb-3">
              <Skeleton variant="circle" className="w-12 h-12" />
              <div className="flex-1">
                <Skeleton className="w-3/4 h-4 mb-2" variant="text" />
                <Skeleton className="w-1/2 h-3" variant="text" />
              </div>
            </div>
            <Skeleton className="w-full h-12" />
            <div className="mt-3 flex items-center gap-2">
              <Skeleton className="w-16 h-5" />
              <Skeleton className="w-10 h-5" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeaturedAgentsSkeleton;
