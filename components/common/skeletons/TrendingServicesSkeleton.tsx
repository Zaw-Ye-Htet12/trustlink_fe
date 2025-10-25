"use client";
import React from "react";
import Skeleton from "@/components/ui/skeleton";

export function TrendingServicesSkeleton() {
  return (
    <section className="py-12 bg-gray-50">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Trending Services
      </h2>
      <div className="grid md:grid-cols-3 gap-6 container mx-auto px-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="p-4 bg-white rounded-lg shadow-sm">
            <Skeleton className="w-full h-28 mb-3" />
            <Skeleton className="w-2/3 h-5 mb-2" variant="text" />
            <div className="mt-2 flex items-center gap-2">
              <Skeleton className="w-16 h-4" />
              <Skeleton className="w-10 h-4" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TrendingServicesSkeleton;
