"use client";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { useTrendingServices } from "@/hooks/useTrendingServices";
import { TrendingServicesSkeleton } from "@/components/common/skeletons/TrendingServicesSkeleton";

export function TrendingServices() {
  const { trendingServices, isFetchingTrendingServices } =
    useTrendingServices();

  if (isFetchingTrendingServices) return <TrendingServicesSkeleton />;

  return (
    <section className="py-12 bg-gray-50">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Trending Services
      </h2>
      <div className="max-w-6xl grid md:grid-cols-3 gap-6 container mx-auto px-4">
        {trendingServices?.map((svc) => (
          <Card key={svc.id}>
            <CardHeader>
              <CardTitle>{svc.title}</CardTitle>
              <p className="text-sm text-gray-500">{svc.category?.name}</p>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 line-clamp-3">{svc.description}</p>
              <p className="text-sm mt-2 text-gray-400">
                Reviews: {svc.total_reviews}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
