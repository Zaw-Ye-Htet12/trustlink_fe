// components/common/skeletons/ServicesGridSkeleton.tsx
"use client";
import React from "react";
import Skeleton from "@/components/ui/skeleton";

export function ServicesGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-xl border border-gray-200 overflow-hidden animate-pulse"
        >
          {/* Image Skeleton */}
          <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 relative">
            <div className="absolute top-3 left-3 flex gap-2">
              <Skeleton className="w-16 h-6 rounded-full" />
              <Skeleton className="w-20 h-6 rounded-full" />
            </div>
          </div>

          {/* Content Skeleton */}
          <div className="p-5 space-y-4">
            {/* Title and Verification */}
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <Skeleton className="h-6 flex-1 rounded" />
                <Skeleton className="w-20 h-6 rounded-full" />
              </div>

              {/* Agent Info */}
              <div className="flex items-center gap-2">
                <Skeleton className="w-6 h-6 rounded-full" />
                <Skeleton className="w-24 h-4 rounded" />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Skeleton className="w-full h-4 rounded" />
              <Skeleton className="w-4/5 h-4 rounded" />
              <Skeleton className="w-3/5 h-4 rounded" />
            </div>

            {/* Stats Row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <Skeleton className="w-4 h-4 rounded" />
                  <Skeleton className="w-8 h-4 rounded" />
                  <Skeleton className="w-12 h-4 rounded" />
                </div>
                <Skeleton className="w-16 h-4 rounded" />
              </div>
              <Skeleton className="w-20 h-4 rounded" />
            </div>

            {/* Location and Tags */}
            <div className="space-y-2">
              <Skeleton className="w-32 h-4 rounded" />
              <div className="flex flex-wrap gap-1.5">
                <Skeleton className="w-16 h-6 rounded-full" />
                <Skeleton className="w-20 h-6 rounded-full" />
                <Skeleton className="w-14 h-6 rounded-full" />
              </div>
            </div>

            {/* Additional Info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Skeleton className="w-20 h-3 rounded" />
                <Skeleton className="w-16 h-3 rounded" />
              </div>
              <Skeleton className="w-24 h-3 rounded" />
            </div>

            {/* Price and CTA */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div className="space-y-1">
                <Skeleton className="w-24 h-7 rounded" />
                <div className="flex items-center gap-2">
                  <Skeleton className="w-2 h-2 rounded-full" />
                  <Skeleton className="w-20 h-3 rounded" />
                </div>
              </div>
              <Skeleton className="w-28 h-9 rounded-lg" />
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-2">
              <Skeleton className="w-16 h-3 rounded" />
              <Skeleton className="w-20 h-3 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ServicesGridSkeleton;
