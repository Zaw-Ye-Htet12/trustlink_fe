"use client";
import React from "react";
import Skeleton from "@/components/ui/skeleton";

export function ServicesGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="p-4 bg-white rounded-lg shadow-sm">
          <Skeleton className="w-full h-36 mb-3" />
          <Skeleton className="w-3/4 h-5 mb-2" variant="text" />
          <Skeleton className="w-1/3 h-4" variant="text" />
        </div>
      ))}
    </div>
  );
}

export default ServicesGridSkeleton;
