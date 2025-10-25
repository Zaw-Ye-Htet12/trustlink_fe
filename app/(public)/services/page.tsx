// app/(public)/services/page.tsx
"use client";

import { useState } from "react";
import { useAllServices } from "@/hooks/useAllServices";
import { HeroSection } from "@/components/common/Hero";
import { Input } from "@/components/ui/input";
import { Search, Filter, MapPin, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { ServiceCard } from "@/components/service/ServiceCard";

export default function ServicesPage() {
  const { allServices, isFetchingAllServices } = useAllServices();
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  const filteredServices = allServices.filter((service) => {
    const matchesSearch =
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.agent.user.username
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    const matchesLocation =
      !locationFilter ||
      service.service_area
        ?.toLowerCase()
        .includes(locationFilter.toLowerCase());
    return matchesSearch && matchesLocation;
  });

  // Get unique service areas for filter
  const serviceAreas = [
    ...new Set(
      allServices.map((service) => service.service_area).filter(Boolean)
    ),
  ];

  return (
    <div className="min-h-screen bg-background">
      <HeroSection
        title="Find Trusted Services"
        description="Browse verified services from trusted agents in the Myanmar community across Thailand"
        primaryAction={{
          label: "Browse All Services",
          href: "#services",
        }}
      />

      <section id="services" className="py-16">
        <div className="max-w-6xl container mx-auto px-6">
          {/* Search and Filter Bar */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8 animate-fade-in">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search services, agents, or categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Filter by service area..."
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Button variant="outline" className="lg:w-auto">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>

          {/* Quick Service Area Filters */}
          {serviceAreas.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6 animate-fade-in">
              <Badge
                variant={!locationFilter ? "default" : "outline"}
                className="cursor-pointer transition-all hover:scale-105"
                onClick={() => setLocationFilter("")}
              >
                All Areas
              </Badge>
              {serviceAreas.slice(0, 8).map((area) => (
                <Badge
                  key={area}
                  variant={locationFilter === area ? "default" : "outline"}
                  className="cursor-pointer transition-all hover:scale-105"
                  onClick={() => setLocationFilter(area || "")}
                >
                  {area}
                </Badge>
              ))}
            </div>
          )}

          {/* Results Count */}
          <div className="mb-8 animate-fade-in">
            <h2 className="text-3xl font-bold mb-2">Available Services</h2>
            <p className="text-muted-foreground">
              Showing {filteredServices.length} verified services
            </p>
          </div>

          {/* Services Grid */}
          {isFetchingAllServices ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(9)].map((_, i) => (
                <Skeleton key={i} className="h-80 rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service, index) => (
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

          {/* Empty State */}
          {!isFetchingAllServices && filteredServices.length === 0 && (
            <div className="text-center py-12 animate-fade-in">
              <Card className="border-dashed max-w-md mx-auto">
                <CardContent className="py-12">
                  <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                    <Briefcase className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    No services found
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search criteria
                  </p>
                  <Button
                    onClick={() => {
                      setSearchQuery("");
                      setLocationFilter("");
                    }}
                  >
                    Clear Filters
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
