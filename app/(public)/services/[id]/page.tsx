// app/(public)/services/[id]/page.tsx
"use client";

import { use } from "react";
import { useServiceDetail } from "@/hooks/useServiceDetail";
import { useRelatedServices } from "@/hooks/useRelatedServices";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  MapPin,
  Clock,
  CheckCircle,
  Calendar,
  Tag,
  Users,
  MessageCircle,
  Share2,
  Heart,
} from "lucide-react";
import Image from "next/image";
import { AgentCard } from "@/components/agent/AgentCard";
import { ServiceCard } from "@/components/service/ServiceCard";
import { ReviewSection } from "@/components/common/ReviewSection";
import { ServiceDetailSkeleton } from "@/components/common/skeletons/ServiceDetailSkeleton";

interface ServiceDetailPageProps {
  params: {
    id: string;
  };
}

export default function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  // `params` may be a Promise when using the App Router; unwrap it with React.use()
  const resolvedParams = use(params as unknown as Promise<{ id: string }>);
  const serviceId = parseInt(resolvedParams.id);
  const { serviceDetail, isFetchingServiceDetail } =
    useServiceDetail(serviceId);
  const { relatedServices } = useRelatedServices(serviceId);

  if (isFetchingServiceDetail) {
    return <ServiceDetailSkeleton />;
  }

  if (!serviceDetail) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Service Not Found
          </h1>
          <p className="text-gray-600">
            {`The service you're looking for doesn't exist.`}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Service Images */}
            <div className="space-y-4">
              <div className="aspect-square bg-gradient-to-br from-blue-50 to-gray-100 rounded-2xl overflow-hidden">
                {serviceDetail.images?.[0] ? (
                  <Image
                    src={serviceDetail.images[0].image_url}
                    alt={serviceDetail.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <Tag className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">No image available</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {serviceDetail.images && serviceDetail.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {serviceDetail.images.slice(1).map((image, index) => (
                    <div
                      key={image.id}
                      className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0"
                    >
                      <Image
                        src={image.image_url}
                        alt={`${serviceDetail.title} ${index + 2}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Service Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Badge
                    variant="outline"
                    className="bg-blue-50 text-blue-700 border-blue-200"
                  >
                    {serviceDetail.category?.name}
                  </Badge>
                  {serviceDetail.agent?.verification_status === "approved" && (
                    <Badge className="bg-green-500 text-white border-0">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified Agent
                    </Badge>
                  )}
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-3">
                  {serviceDetail.title}
                </h1>

                <p className="text-lg text-gray-600 leading-relaxed">
                  {serviceDetail.description}
                </p>
              </div>

              {/* Key Features */}
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Service Area</p>
                    <p className="text-gray-600">
                      {serviceDetail.service_area || "Flexible"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Service Type</p>
                    <p className="text-gray-600 capitalize">
                      {serviceDetail.location_type?.replace("_", " ") ||
                        "Flexible"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Experience</p>
                    <p className="text-gray-600">
                      {serviceDetail.agent?.years_of_experience || "N/A"} years
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Star className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Rating</p>
                    <p className="text-gray-600">
                      {serviceDetail.rating?.toFixed(1) || "New"}(
                      {serviceDetail.total_reviews} reviews)
                    </p>
                  </div>
                </div>
              </div>

              {/* Pricing & CTA */}
              <div className="border-t pt-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {serviceDetail.price ? (
                        <>
                          {serviceDetail.currency} {serviceDetail.price}
                          {serviceDetail.pricing_type === "hourly" && "/hour"}
                          {serviceDetail.pricing_type === "starting_from" &&
                            " starting from"}
                        </>
                      ) : (
                        "Price on request"
                      )}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {serviceDetail.pricing_type === "fixed"
                        ? "Fixed price"
                        : "Flexible pricing"}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <Heart className="w-4 h-4" />
                      Save
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <Share2 className="w-4 h-4" />
                      Share
                    </Button>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                    size="lg"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Contact Agent
                  </Button>
                  <Button variant="outline" className="flex-1" size="lg">
                    Book Service
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Details & Reviews Section */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Service Tags */}
            {serviceDetail.tags && serviceDetail.tags.length > 0 && (
              <div className="bg-white rounded-2xl p-6 border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Service Features
                </h3>
                <div className="flex flex-wrap gap-2">
                  {serviceDetail.tags.map((tag) => (
                    <Badge
                      key={tag.id}
                      variant="secondary"
                      className="px-3 py-1"
                    >
                      {tag.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Service Provider */}
            {serviceDetail.agent && (
              <div className="bg-white rounded-2xl p-6 border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Service Provider
                </h3>
                <AgentCard agent={serviceDetail.agent} />
              </div>
            )}

            {/* Reviews Section */}
            <ReviewSection
              serviceId={serviceId}
              agentId={serviceDetail.agent_id}
              serviceTitle={serviceDetail.title}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Related Services */}
            {relatedServices && relatedServices.length > 0 && (
              <div className="bg-white rounded-2xl p-6 border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Related Services
                </h3>
                <div className="space-y-4">
                  {relatedServices.slice(0, 3).map((service) => (
                    <ServiceCard key={service.id} service={service} />
                  ))}
                </div>
              </div>
            )}

            {/* Service Stats */}
            <div className="bg-white rounded-2xl p-6 border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Service Details
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Service ID</span>
                  <span className="font-medium">#{serviceDetail.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Category</span>
                  <span className="font-medium">
                    {serviceDetail.category?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Created</span>
                  <span className="font-medium">
                    {new Date(serviceDetail.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Updated</span>
                  <span className="font-medium">
                    {new Date(serviceDetail.updated_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status</span>
                  <Badge
                    variant={serviceDetail.is_active ? "default" : "secondary"}
                    className={
                      serviceDetail.is_active
                        ? "bg-green-100 text-green-800"
                        : ""
                    }
                  >
                    {serviceDetail.is_active ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
