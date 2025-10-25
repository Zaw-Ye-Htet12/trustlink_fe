"use client";
import React from "react";
import Skeleton from "@/components/ui/skeleton";

export function FeaturedServicesSkeleton() {
  return (
    <section className="py-12">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Featured Services
      </h2>
      <div className="grid md:grid-cols-3 gap-6 container mx-auto px-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="p-4 bg-white rounded-lg shadow-sm">
            <Skeleton className="w-full h-36 mb-3" />
            <Skeleton className="w-3/4 h-5 mb-2" variant="text" />
            <Skeleton className="w-1/2 h-4" variant="text" />
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeaturedServicesSkeleton;
