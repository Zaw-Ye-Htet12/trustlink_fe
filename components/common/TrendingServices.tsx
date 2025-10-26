// components/common/TrendingServices.tsx
"use client";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTrendingServices } from "@/hooks/useTrendingServices";
import { TrendingServicesSkeleton } from "@/components/common/skeletons/TrendingServicesSkeleton";
import { Star, TrendingUp, ArrowRight, Eye, ThumbsUp } from "lucide-react";
import Link from "next/link";
import { ServiceCard } from "../service/ServiceCard";

export function TrendingServices() {
  const { trendingServices, isFetchingTrendingServices } =
    useTrendingServices();

  if (isFetchingTrendingServices) return <TrendingServicesSkeleton />;

  return (
    <section className="py-20 bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <TrendingUp className="w-4 h-4" />
            Trending Now
          </div>
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
            Most Popular Services
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover services that are currently trending in our community
          </p>
        </div>

        {/* Services Grid */}
        {trendingServices && trendingServices.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trendingServices.map((service, index) => (
              <div
                key={service.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-20 h-20 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
              <TrendingUp className="w-10 h-10 text-orange-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Trending Services
            </h3>
            <p className="text-gray-500 mb-6">
              Check back later to see popular services
            </p>
          </div>
        )}

        {/* View All CTA */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="border-orange-200 text-orange-700 hover:bg-orange-50 hover:border-orange-300"
            asChild
          >
            <Link href="/services" className="gap-2">
              View All Trending Services
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
