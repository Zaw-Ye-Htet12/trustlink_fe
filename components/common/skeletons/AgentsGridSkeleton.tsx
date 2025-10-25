"use client";
import React from "react";
import Skeleton from "@/components/ui/skeleton";

export function AgentsGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="p-6 bg-white rounded-lg shadow-sm">
          <div className="flex items-center gap-4 mb-3">
            <Skeleton variant="circle" className="w-12 h-12" />
            <div className="flex-1">
              <Skeleton className="w-2/3 h-4 mb-2" variant="text" />
              <Skeleton className="w-1/3 h-3" variant="text" />
            </div>
          </div>
          <Skeleton className="w-full h-4 mb-2" variant="text" />
          <Skeleton className="w-1/2 h-4" variant="text" />
        </div>
      ))}
    </div>
  );
}

export default AgentsGridSkeleton;
