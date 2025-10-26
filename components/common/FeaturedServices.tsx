// components/common/FeaturedServices.tsx
"use client";
import { Card, CardContent } from "@/components/ui/card";
import { useFeaturedServices } from "@/hooks/useFeaturedServices";
import { Skeleton } from "@/components/ui/skeleton";
import { Briefcase, TrendingUp } from "lucide-react";
import { ServiceCard } from "../service/ServiceCard";
import { Button } from "../ui/button";
import Link from "next/link";

export function FeaturedServices() {
  const { featuredServices, isFetchingFeaturedServices } =
    useFeaturedServices();

  return (
    <section className="py-20 bg-linear-to-b from-gray-50 to-white">
      <div className="max-w-7xl container mx-auto px-6">
        {/* Enhanced header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <TrendingUp className="w-4 h-4" />
            Popular Services
          </div>
          <h2 className="text-4xl font-bold mb-4 bg-linear-to-b from-gray-900 to-blue-600 bg-clip-text text-transparent">
            Featured Services
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover handpicked quality services from our most trusted and
            verified professionals
          </p>
        </div>

        {isFetchingFeaturedServices ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-48 rounded-xl" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredServices.map((service, index) => (
              <div
                key={service.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
        )}

        {!isFetchingFeaturedServices && featuredServices.length === 0 && (
          <div className="text-center py-16 animate-fade-in">
            <Card className="border-dashed border-2 max-w-md mx-auto bg-gray-50/50">
              <CardContent className="py-16">
                <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <Briefcase className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-700">
                  No Featured Services Available
                </h3>
                <p className="text-gray-500 mb-6">
                  We are curating the best services for you. Check back soon for
                  amazing offers.
                </p>
                <Button variant="outline" asChild>
                  <Link href="/services">Browse All Services</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* View all CTA */}
        {featuredServices.length > 0 && (
          <div className="text-center mt-12 animate-fade-in">
            <Button variant="outline" size="lg" asChild>
              <Link href="/services" className="gap-2">
                View All Services
                <TrendingUp className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
