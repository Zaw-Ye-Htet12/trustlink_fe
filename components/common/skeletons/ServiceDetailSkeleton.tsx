// components/common/skeletons/ServiceDetailSkeleton.tsx
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ServiceDetailSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section Skeleton */}
      <section className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Image Gallery Skeleton */}
            <div className="space-y-4">
              <Skeleton className="aspect-square rounded-2xl" />
              <div className="flex gap-2">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="w-20 h-20 rounded-lg" />
                ))}
              </div>
            </div>

            {/* Service Info Skeleton */}
            <div className="space-y-6">
              {/* Badges */}
              <div className="flex gap-2">
                <Skeleton className="w-20 h-6 rounded-full" />
                <Skeleton className="w-24 h-6 rounded-full" />
              </div>

              {/* Title */}
              <Skeleton className="h-8 w-3/4 rounded" />
              <Skeleton className="h-4 w-full rounded" />
              <Skeleton className="h-4 w-4/5 rounded" />
              <Skeleton className="h-4 w-3/4 rounded" />

              {/* Key Features Grid */}
              <div className="grid grid-cols-2 gap-4 py-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton className="w-8 h-8 rounded-lg" />
                    <div className="space-y-1">
                      <Skeleton className="h-4 w-16 rounded" />
                      <Skeleton className="h-3 w-12 rounded" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Pricing & CTA */}
              <div className="border-t pt-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="space-y-2">
                    <Skeleton className="h-7 w-32 rounded" />
                    <Skeleton className="h-4 w-24 rounded" />
                  </div>
                  <div className="flex gap-2">
                    <Skeleton className="w-20 h-9 rounded" />
                    <Skeleton className="w-20 h-9 rounded" />
                  </div>
                </div>
                <div className="flex gap-3">
                  <Skeleton className="flex-1 h-12 rounded-lg" />
                  <Skeleton className="flex-1 h-12 rounded-lg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Details & Reviews Section Skeleton */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Service Tags Skeleton */}
            <Card>
              <CardContent className="p-6">
                <Skeleton className="h-6 w-48 mb-4 rounded" />
                <div className="flex flex-wrap gap-2">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="w-16 h-6 rounded-full" />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Service Provider Skeleton */}
            <Card>
              <CardContent className="p-6">
                <Skeleton className="h-6 w-48 mb-4 rounded" />
                <div className="flex gap-4">
                  <Skeleton className="w-16 h-16 rounded-2xl" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-32 rounded" />
                    <Skeleton className="h-4 w-24 rounded" />
                    <Skeleton className="h-4 w-full rounded" />
                    <Skeleton className="h-4 w-4/5 rounded" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reviews Section Skeleton */}
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
                    <div
                      key={i}
                      className="pb-6 border-b last:border-b-0 last:pb-0"
                    >
                      <div className="flex gap-4">
                        <Skeleton className="w-10 h-10 rounded-full" />
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <Skeleton className="h-5 w-32 rounded" />
                            <Skeleton className="h-4 w-20 rounded" />
                          </div>
                          <Skeleton className="h-4 w-24 rounded" />
                          <Skeleton className="h-4 w-full rounded" />
                          <Skeleton className="h-4 w-3/4 rounded" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Related Services Skeleton */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Skeleton className="h-6 w-32 rounded" />
                  <Skeleton className="h-6 w-16 rounded-full" />
                </div>
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="space-y-3">
                      <Skeleton className="aspect-video rounded-xl" />
                      <Skeleton className="h-4 w-3/4 rounded" />
                      <Skeleton className="h-4 w-1/2 rounded" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Service Stats Skeleton */}
            <Card>
              <CardContent className="p-6">
                <Skeleton className="h-6 w-32 mb-4 rounded" />
                <div className="space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex justify-between">
                      <Skeleton className="h-4 w-20 rounded" />
                      <Skeleton className="h-4 w-16 rounded" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
