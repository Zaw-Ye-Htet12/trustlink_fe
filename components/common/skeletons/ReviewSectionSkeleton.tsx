// components/common/skeletons/ReviewSectionSkeleton.tsx
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ReviewSectionSkeleton() {
  return (
    <Card>
      <CardContent className="p-6">
        {/* Reviews Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-2">
            <Skeleton className="h-7 w-48 rounded" />
            <div className="flex items-center gap-4">
              <Skeleton className="h-6 w-16 rounded" />
              <Skeleton className="h-4 w-24 rounded" />
            </div>
          </div>
          <Skeleton className="w-32 h-9 rounded" />
        </div>

        {/* Rating Distribution */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="w-16 h-4 rounded" />
                <Skeleton className="flex-1 h-2 rounded-full" />
                <Skeleton className="w-8 h-4 rounded" />
              </div>
            ))}
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="pb-6 border-b last:border-b-0 last:pb-0">
              <div className="flex gap-4">
                <Skeleton className="w-10 h-10 rounded-full" />
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-5 w-32 rounded" />
                    <Skeleton className="h-4 w-20 rounded" />
                  </div>
                  <Skeleton className="h-5 w-40 rounded" />
                  <Skeleton className="h-4 w-full rounded" />
                  <Skeleton className="h-4 w-3/4 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
