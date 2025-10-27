// src/components/agent/AgentServiceCard.tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Service, PricingType, LocationType } from "@/interfaces";
import {
  MapPin,
  DollarSign,
  Star,
  Edit,
  Trash2,
  Eye,
  Image as ImageIcon,
} from "lucide-react";

interface ServiceCardProps {
  service: Service;
  onEdit: (service: Service) => void;
  onDelete: (serviceId: number) => void;
  onView: (service: Service) => void;
}

export function ServiceCard({
  service,
  onEdit,
  onDelete,
  onView,
}: ServiceCardProps) {
  const formatPrice = (
    price?: number,
    pricingType?: PricingType,
    currency: string = "THB"
  ) => {
    if (!price) return "Negotiable";

    const symbol = currency === "THB" ? "฿" : "$";
    const typeSuffix = pricingType === PricingType.HOURLY ? "/hour" : "";

    return `${symbol}${price}${typeSuffix}`;
  };

  const getPricingTypeBadge = (pricingType: PricingType) => {
    const variants = {
      [PricingType.FIXED]: "default",
      [PricingType.HOURLY]: "secondary",
      [PricingType.STARTING_FROM]: "outline",
    } as const;

    const labels = {
      [PricingType.FIXED]: "Fixed Price",
      [PricingType.HOURLY]: "Hourly",
      [PricingType.STARTING_FROM]: "Starting From",
    };

    return <Badge variant={variants[pricingType]}>{labels[pricingType]}</Badge>;
  };

  const getLocationTypeBadge = (locationType?: LocationType) => {
    if (!locationType) return null;

    const variants = {
      [LocationType.ONLINE]: "secondary",
      [LocationType.CUSTOMER_LOCATION]: "default",
      [LocationType.AGENT_LOCATION]: "outline",
      [LocationType.FLEXIBLE]: "default",
    } as const;

    const labels = {
      [LocationType.ONLINE]: "Online",
      [LocationType.CUSTOMER_LOCATION]: "Customer Location",
      [LocationType.AGENT_LOCATION]: "Agent Location",
      [LocationType.FLEXIBLE]: "Flexible",
    };

    return (
      <Badge variant={variants[locationType]}>{labels[locationType]}</Badge>
    );
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg truncate">{service.title}</CardTitle>
            <CardDescription className="line-clamp-2 mt-1">
              {service.description}
            </CardDescription>
          </div>
          <div className="flex items-center gap-1 ml-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onView(service)}
              className="h-8 w-8"
            >
              <Eye className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(service)}
              className="h-8 w-8"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(service.id)}
              className="h-8 w-8 text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Service Details */}
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <DollarSign className="h-4 w-4" />
            <span className="font-medium">
              {formatPrice(
                service.price,
                service.pricing_type,
                service.currency
              )}
            </span>
          </div>

          {service.location_type && (
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{getLocationTypeBadge(service.location_type)}</span>
            </div>
          )}

          {service.service_area && (
            <div className="flex items-center gap-1">
              <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                {service.service_area}
              </span>
            </div>
          )}
        </div>

        {/* Category and Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {service.category && (
              <Badge variant="outline" className="text-xs">
                {service.category.name}
              </Badge>
            )}
            {getPricingTypeBadge(service.pricing_type)}
          </div>

          <div className="flex items-center gap-2">
            {service.is_active ? (
              <Badge variant="default" className="text-xs">
                Active
              </Badge>
            ) : (
              <Badge variant="secondary" className="text-xs">
                Inactive
              </Badge>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-xs text-gray-500 border-t pt-2">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <ImageIcon className="h-3 w-3" />
              <span>{service.images?.length || 0} images</span>
            </div>

            <div className="flex items-center gap-1">
              <Star className="h-3 w-3" />
              <span>{service.total_reviews || 0} reviews</span>
            </div>
          </div>

          <div className="text-xs text-gray-400">
            Created {new Date(service.created_at).toLocaleDateString()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
