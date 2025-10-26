// components/common/skeletons/AgentDetailSkeleton.tsx
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function AgentDetailSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section Skeleton */}
      <section className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Agent Avatar Skeleton */}
            <div className="flex-shrink-0">
              <div className="relative">
                <Skeleton className="w-24 h-24 rounded-2xl" />
                <Skeleton className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full" />
              </div>
            </div>

            {/* Agent Details Skeleton */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                <div className="space-y-2">
                  <Skeleton className="h-8 w-48 rounded" />
                  <div className="flex flex-wrap gap-2">
                    <Skeleton className="h-6 w-32 rounded-full" />
                    <Skeleton className="h-6 w-24 rounded-full" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Skeleton className="w-20 h-9 rounded" />
                  <Skeleton className="w-24 h-9 rounded" />
                </div>
              </div>

              {/* Bio Skeleton */}
              <div className="space-y-2 mb-6">
                <Skeleton className="h-4 w-full rounded" />
                <Skeleton className="h-4 w-4/5 rounded" />
                <Skeleton className="h-4 w-3/4 rounded" />
              </div>

              {/* Stats Grid Skeleton */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="text-center p-4 bg-gray-50 rounded-lg"
                  >
                    <Skeleton className="h-6 w-12 mx-auto mb-1 rounded" />
                    <Skeleton className="h-4 w-16 mx-auto rounded" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Skeleton */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Services & Reviews */}
          <div className="lg:col-span-2 space-y-8">
            {/* Services Section Skeleton */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <Skeleton className="h-7 w-48 rounded" />
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {[...Array(4)].map((_, i) => (
                  <Card key={i}>
                    <CardContent className="p-0">
                      <Skeleton className="aspect-video rounded-t-xl" />
                      <div className="p-4 space-y-2">
                        <Skeleton className="h-5 w-3/4 rounded" />
                        <Skeleton className="h-4 w-1/2 rounded" />
                        <Skeleton className="h-4 w-full rounded" />
                        <Skeleton className="h-4 w-4/5 rounded" />
                        <div className="flex justify-between pt-2">
                          <Skeleton className="h-6 w-20 rounded" />
                          <Skeleton className="h-9 w-24 rounded" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

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
          </div>

          {/* Sidebar Skeleton */}
          <div className="space-y-6">
            {/* Contact & Info Skeleton */}
            <Card>
              <CardContent className="p-6">
                <Skeleton className="h-6 w-48 mb-4 rounded" />
                <div className="space-y-3">
                  {[...Array(2)].map((_, i) => (
                    <Skeleton key={i} className="w-full h-12 rounded-lg" />
                  ))}
                  <Skeleton className="w-full h-10 rounded-lg" />
                </div>
              </CardContent>
            </Card>

            {/* Agent Details Skeleton */}
            <Card>
              <CardContent className="p-6">
                <Skeleton className="h-6 w-32 mb-4 rounded" />
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Skeleton className="w-4 h-4 rounded" />
                      <div className="space-y-1 flex-1">
                        <Skeleton className="h-4 w-20 rounded" />
                        <Skeleton className="h-3 w-16 rounded" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Specializations Skeleton */}
            <Card>
              <CardContent className="p-6">
                <Skeleton className="h-6 w-32 mb-4 rounded" />
                <div className="flex flex-wrap gap-2">
                  {[...Array(4)].map((_, i) => (
                    <Skeleton key={i} className="w-16 h-6 rounded-full" />
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
