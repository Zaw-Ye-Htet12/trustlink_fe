// components/common/skeletons/AgentsGridSkeleton.tsx
"use client";
import React from "react";
import Skeleton from "@/components/ui/skeleton";

export function AgentsGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-xl border border-gray-200 overflow-hidden animate-pulse"
        >
          {/* Header with Gradient */}
          <div className="bg-gradient-to-r from-gray-300 to-gray-400 p-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
            </div>

            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {/* Agent Avatar */}
                  <div className="relative">
                    <Skeleton className="w-16 h-16 rounded-full border-2 border-white/30" />
                    <Skeleton className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Skeleton className="w-24 h-6 rounded" />
                      <Skeleton className="w-4 h-4 rounded" />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Skeleton className="w-16 h-6 rounded-full" />
                      <Skeleton className="w-20 h-6 rounded-full" />
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="text-right">
                  <div className="flex items-center gap-1 mb-1">
                    <Skeleton className="w-4 h-4 rounded" />
                    <Skeleton className="w-8 h-4 rounded" />
                    <Skeleton className="w-12 h-4 rounded" />
                  </div>
                  <Skeleton className="w-16 h-3 rounded" />
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            {/* Bio and Specialization */}
            <div className="space-y-3">
              <div className="space-y-2">
                <Skeleton className="w-full h-4 rounded" />
                <Skeleton className="w-4/5 h-4 rounded" />
              </div>

              {/* Specialization Tags */}
              <div className="flex flex-wrap gap-1.5">
                <Skeleton className="w-20 h-6 rounded-full" />
                <Skeleton className="w-16 h-6 rounded-full" />
                <Skeleton className="w-24 h-6 rounded-full" />
                <Skeleton className="w-14 h-6 rounded-full" />
              </div>
            </div>

            {/* Detailed Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
              <Skeleton className="h-16 rounded-lg" />
              <Skeleton className="h-16 rounded-lg" />
              <Skeleton className="h-16 rounded-lg" />
              <Skeleton className="h-16 rounded-lg" />
            </div>

            {/* Location and Contact Info */}
            <div className="space-y-2">
              <Skeleton className="w-32 h-4 rounded" />
              <Skeleton className="w-40 h-4 rounded" />
              <Skeleton className="w-28 h-4 rounded" />
            </div>

            {/* Recent Activity */}
            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <Skeleton className="w-24 h-3 rounded" />
              <Skeleton className="w-20 h-6 rounded-full" />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-3">
              <Skeleton className="flex-1 h-9 rounded" />
              <Skeleton className="flex-1 h-9 rounded" />
            </div>

            {/* Quick Preview of Services */}
            <div className="pt-3 border-t border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <Skeleton className="w-20 h-3 rounded" />
                <Skeleton className="w-16 h-3 rounded" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Skeleton className="w-32 h-4 rounded" />
                  <Skeleton className="w-16 h-4 rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <Skeleton className="w-28 h-4 rounded" />
                  <Skeleton className="w-12 h-4 rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AgentsGridSkeleton;
