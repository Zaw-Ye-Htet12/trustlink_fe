// components/common/ServiceCard.tsx
"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, User } from "lucide-react";
import { Service } from "@/interfaces/service";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ServiceCardProps {
  service: Service;
  className?: string;
}

export function ServiceCard({ service, className }: ServiceCardProps) {
  return (
    <Card
      className={cn(
        "group hover:shadow-lg transition-all duration-300 border",
        className
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
              {service.title}
            </h3>
            {service.category && (
              <Badge variant="secondary" className="text-xs">
                {service.category.name}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {service.description}
        </p>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">
                {service.average_rating?.toFixed(1) || "New"}
              </span>
              <span className="text-muted-foreground">
                ({service.total_reviews})
              </span>
            </div>

            <div className="flex items-center gap-1">
              <User className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground line-clamp-1">
                {service.agent.user.username}
              </span>
            </div>
          </div>
        </div>

        {service.location_type && (
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span className="capitalize">
              {service.location_type.replace("_", " ")}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between pt-2">
          <div className="font-semibold text-lg">
            {service.price ? (
              <>
                {service.currency} {service.price}
                {service.pricing_type === "hourly" && "/hr"}
              </>
            ) : (
              "Price on request"
            )}
          </div>
          <Button size="sm" asChild>
            <Link href={`/services/${service.id}`}>View Details</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
