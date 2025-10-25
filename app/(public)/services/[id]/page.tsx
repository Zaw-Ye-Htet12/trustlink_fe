// app/(public)/services/[id]/page.tsx
"use client";

import { useParams } from "next/navigation";
import { useServiceDetail } from "@/hooks/useServiceDetail";
import { useServiceReviews } from "@/hooks/useServiceReviews";
import { useRelatedServices } from "@/hooks/useRelatedServices";
import { HeroSection } from "@/components/common/Hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Star,
  MapPin,
  User,
  Clock,
  Shield,
  Phone,
  MessageCircle,
  Share2,
} from "lucide-react";
import Link from "next/link";
import { ServiceCard } from "@/components/service/ServiceCard";

export default function ServiceDetailPage() {
  const params = useParams();
  const serviceId = Number(params.id);

  const { serviceDetail, isFetchingServiceDetail } =
    useServiceDetail(serviceId);
  const { reviews } = useServiceReviews(serviceId);
  const { relatedServices } = useRelatedServices(serviceId);

  if (isFetchingServiceDetail) {
    return (
      <div className="min-h-screen bg-background py-16">
        <div className="container mx-auto px-6">
          <Skeleton className="h-96 w-full rounded-xl mb-8" />
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="h-8 w-2/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!serviceDetail) {
    return (
      <div className="min-h-screen bg-background py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-2xl font-bold mb-4">Service Not Found</h1>
          <p className="text-muted-foreground mb-8">
            {`The service you're looking for doesn't exist or has been removed.`}
          </p>
          <Button asChild>
            <Link href="/services">Browse All Services</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Service Header */}
      <section className="border-b">
        <div className="container mx-auto px-6 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Service Info */}
            <div className="lg:col-span-2 space-y-6 animate-fade-in">
              <div>
                <Badge variant="secondary" className="mb-4">
                  {serviceDetail.category?.name || "Uncategorized"}
                </Badge>
                <h1 className="text-4xl font-bold mb-4">
                  {serviceDetail.title}
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {serviceDetail.description}
                </p>
              </div>

              {/* Service Meta */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in delay-200">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-muted-foreground" />
                  <span>By {serviceDetail.agent.user.username}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-muted-foreground" />
                  <span>
                    {serviceDetail.service_area || "Various Locations"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                  <span>{serviceDetail.pricing_type.replace("_", " ")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-muted-foreground" />
                  <span>Verified Agent</span>
                </div>
              </div>

              {/* Rating */}
              {serviceDetail.average_rating && (
                <div className="flex items-center gap-4 animate-fade-in delay-300">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">
                      {serviceDetail.average_rating.toFixed(1)}
                    </span>
                    <span className="text-muted-foreground">
                      ({serviceDetail.total_reviews} reviews)
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Action Panel */}
            <div className="animate-fade-in delay-400">
              <Card className="sticky top-24">
                <CardContent className="p-6 space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">
                      {serviceDetail.price ? (
                        <>
                          {serviceDetail.currency} {serviceDetail.price}
                          {serviceDetail.pricing_type === "hourly" && "/hr"}
                        </>
                      ) : (
                        "Price on request"
                      )}
                    </div>
                    <Badge variant="outline">
                      {serviceDetail.location_type?.replace("_", " ") ||
                        "Flexible"}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <Button className="w-full" size="lg">
                      <Phone className="w-4 h-4 mr-2" />
                      Contact Agent
                    </Button>
                    <Button variant="outline" className="w-full" size="lg">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                    <Button variant="ghost" className="w-full">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share Service
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="animate-fade-in">
              <h2 className="text-3xl font-bold mb-8">Related Services</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedServices.map((service, index) => (
                  <div
                    key={service.id}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <ServiceCard service={service} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
