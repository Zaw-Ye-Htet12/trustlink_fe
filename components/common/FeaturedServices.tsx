// components/common/FeaturedServices.tsx
"use client";
import { Card, CardContent } from "@/components/ui/card";
import { useFeaturedServices } from "@/hooks/useFeaturedServices";
import { Skeleton } from "@/components/ui/skeleton";
import { Briefcase } from "lucide-react";
import { ServiceCard } from "../service/ServiceCard";

export function FeaturedServices() {
  const { featuredServices, isFetchingFeaturedServices } =
    useFeaturedServices();

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl container mx-auto px-6">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl font-bold mb-4">Featured Services</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Handpicked quality services from our most trusted agents
          </p>
        </div>

        {isFetchingFeaturedServices ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-80 rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          <div className="text-center py-12 animate-fade-in">
            <Card className="border-dashed max-w-md mx-auto">
              <CardContent className="py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                  <Briefcase className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  No Featured Services
                </h3>
                <p className="text-muted-foreground">
                  Check back later for featured services
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
}
