// components/common/ServiceCard.tsx
"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Star,
  MapPin,
  User,
  Clock,
  CheckCircle,
  Sparkles,
  Tag,
  Eye,
  ThumbsUp,
  Calendar,
} from "lucide-react";
import { Service } from "@/interfaces/service";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

interface ServiceCardProps {
  service: Service;
  className?: string;
}

export function ServiceCard({ service, className }: ServiceCardProps) {
  const isVerified = service.agent?.verification_status === "approved";
  const hasImages = service.images && service.images.length > 0;
  const primaryImage =
    service.images?.find((img) => img.is_primary) || service.images?.[0];
  const serviceRating = service.rating || 0;
  const reviewCount = service.reviewCount || service.total_reviews || 0;

  // Calculate if service is new (less than 7 days old)
  const isNewService = () => {
    const createdDate = new Date(service.created_at);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - createdDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  };

  const formatPrice = () => {
    if (!service.price) return "Price on request";

    const price = new Intl.NumberFormat("en-US").format(service.price);

    switch (service.pricing_type) {
      case "hourly":
        return `${service.currency} ${price}/hour`;
      case "starting_from":
        return `From ${service.currency} ${price}`;
      case "fixed":
      default:
        return `${service.currency} ${price}`;
    }
  };

  const getLocationText = () => {
    if (service.location_type === "online") return "Online Service";
    if (service.location_type === "flexible") return "Flexible Location";
    if (service.service_area) return service.service_area;
    return "Location not specified";
  };

  return (
    <Card
      className={cn(
        "group hover:shadow-xl transition-all duration-300 border border-gray-200/70 overflow-hidden bg-white",
        "hover:scale-[1.02] active:scale-[1.01] transform-gpu cursor-pointer",
        className
      )}
    >
      {/* Header with image and badges */}
      <div className="relative">
        {/* Service Image */}
        <div className="aspect-video relative bg-gradient-to-br from-blue-50 to-gray-100 overflow-hidden">
          {primaryImage ? (
            <Image
              src={primaryImage.image_url}
              alt={service.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
              <Sparkles className="w-12 h-12 text-blue-300" />
            </div>
          )}

          {/* Overlay badges */}
          <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
            <div className="flex flex-wrap gap-2">
              {isNewService() && (
                <Badge className="bg-green-500 text-white border-0 shadow-lg text-xs">
                  New
                </Badge>
              )}
              {service.category && (
                <Badge
                  variant="secondary"
                  className="bg-white/90 backdrop-blur-sm text-gray-700 shadow-sm text-xs"
                >
                  {service.category.name}
                </Badge>
              )}
            </div>

            {!service.is_active && (
              <Badge
                variant="destructive"
                className="bg-red-500/95 backdrop-blur-sm text-white text-xs"
              >
                Unavailable
              </Badge>
            )}
          </div>
        </div>
      </div>

      <CardHeader className="pb-3 px-5 pt-4">
        <div className="space-y-3">
          {/* Title and verification */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-lg leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors flex-1">
              {service.title}
            </h3>
            {isVerified && (
              <Badge
                variant="outline"
                className="bg-blue-50 text-blue-700 border-blue-200 text-xs whitespace-nowrap"
              >
                <CheckCircle className="w-3 h-3 mr-1" />
                Verified
              </Badge>
            )}
          </div>

          {/* Agent info */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-xs font-medium text-white">
                {service.agent.user.username.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm font-medium text-gray-700">
                {service.agent.user.username}
              </span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 px-5 pb-5">
        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
          {service.description}
        </p>

        {/* Stats row */}
        <div className="flex items-center justify-between text-sm">
          {/* Rating */}
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-0.5">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold text-gray-900">
                {serviceRating.toFixed(1)}
              </span>
            </div>
            <span className="text-gray-500">({reviewCount})</span>
          </div>

          {/* Experience */}
          {service.agent.years_of_experience && (
            <div className="flex items-center gap-1 text-gray-500">
              <Calendar className="w-4 h-4" />
              <span>{service.agent.years_of_experience}+ years</span>
            </div>
          )}

          {/* Location type */}
          <div className="flex items-center gap-1 text-gray-500">
            <MapPin className="w-4 h-4" />
            <span className="capitalize text-xs">
              {service.location_type?.replace("_", " ") || "Flexible"}
            </span>
          </div>
        </div>

        {/* Location and service area */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-sm text-gray-600">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span className="line-clamp-1">{getLocationText()}</span>
          </div>

          {/* Tags */}
          {service.tags && service.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {service.tags.slice(0, 3).map((tag) => (
                <Badge
                  key={tag.id}
                  variant="outline"
                  className="text-xs bg-gray-50 text-gray-600 border-gray-200"
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {tag.name}
                </Badge>
              ))}
              {service.tags.length > 3 && (
                <Badge
                  variant="outline"
                  className="text-xs bg-gray-50 text-gray-500 border-gray-200"
                >
                  +{service.tags.length - 3} more
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Additional agent info */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-4">
            {service.agent.follower_count > 0 && (
              <div className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                <span>{service.agent.follower_count} followers</span>
              </div>
            )}

            {service.agent.total_reviews > 0 && (
              <div className="flex items-center gap-1">
                <ThumbsUp className="w-3 h-3" />
                <span>{service.agent.total_reviews} reviews</span>
              </div>
            )}
          </div>

          {/* Service age */}
          {isNewService() && (
            <div className="flex items-center gap-1 text-green-600">
              <Clock className="w-3 h-3" />
              <span>Recently added</span>
            </div>
          )}
        </div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="space-y-1">
            <div className="font-bold text-xl text-gray-900">
              {formatPrice()}
            </div>

            {/* Service status */}
            <div className="flex items-center gap-2 text-xs">
              <div
                className={`w-2 h-2 rounded-full ${
                  service.is_active ? "bg-green-500" : "bg-red-500"
                }`}
              />
              <span
                className={
                  service.is_active ? "text-green-600" : "text-red-600"
                }
              >
                {service.is_active ? "Available now" : "Currently unavailable"}
              </span>
            </div>
          </div>

          <Button
            size="sm"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200 border-0 font-semibold"
            asChild
          >
            <Link href={`/services/${service.id}`}>View Details</Link>
          </Button>
        </div>

        {/* Quick actions footer */}
        <div className="flex items-center justify-between text-xs text-gray-500 pt-2">
          <span>ID: #{service.id}</span>
          <span>
            Updated {new Date(service.updated_at).toLocaleDateString()}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
