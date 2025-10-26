// app/(public)/services/page.tsx
"use client";

import { useState, useMemo } from "react";
import { useAllServices } from "@/hooks/useAllServices";
import { HeroSection } from "@/components/common/Hero";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Briefcase, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { ServiceCard } from "@/components/service/ServiceCard";
import { FilterDialog, ServiceFilters } from "@/components/common/FilterDialog";
import Link from "next/link";

const defaultFilters: ServiceFilters = {
  categories: [],
  tags: [],
  minPrice: 0,
  maxPrice: 10000,
  minRating: 0,
  locationType: [],
  verifiedOnly: false,
  pricingType: [],
};

export default function ServicesPage() {
  const { allServices, isFetchingAllServices } = useAllServices();
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [filters, setFilters] = useState<ServiceFilters>(defaultFilters);

  const filteredServices = useMemo(() => {
    return allServices.filter((service) => {
      // Search query filter
      const matchesSearch =
        searchQuery === "" ||
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.agent.user.username
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        service.category?.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      // Location filter
      const matchesLocation =
        !locationFilter ||
        service.service_area
          ?.toLowerCase()
          .includes(locationFilter.toLowerCase()) ||
        service.location_type
          ?.toLowerCase()
          .includes(locationFilter.toLowerCase());

      // Category filter
      const matchesCategory =
        filters.categories.length === 0 ||
        (service.category && filters.categories.includes(service.category.id));

      // Price filter
      const servicePrice = service.price || 0;
      const matchesPrice =
        servicePrice >= filters.minPrice && servicePrice <= filters.maxPrice;

      // Rating filter
      const serviceRating = service.rating || 0;
      const matchesRating = serviceRating >= filters.minRating;

      // Location type filter
      const matchesLocationType =
        filters.locationType.length === 0 ||
        (service.location_type &&
          filters.locationType.includes(service.location_type));

      // Verified agent filter
      const matchesVerified =
        !filters.verifiedOnly ||
        service.agent.verification_status === "approved";

      // Pricing type filter
      const matchesPricingType =
        filters.pricingType.length === 0 ||
        (service.pricing_type &&
          filters.pricingType.includes(service.pricing_type));

      // Tags filter
      const matchesTags =
        filters.tags.length === 0 ||
        (service.tags &&
          service.tags.some((tag) => filters.tags.includes(tag.id)));

      return (
        matchesSearch &&
        matchesLocation &&
        matchesCategory &&
        matchesPrice &&
        matchesRating &&
        matchesLocationType &&
        matchesVerified &&
        matchesPricingType &&
        matchesTags
      );
    });
  }, [allServices, searchQuery, locationFilter, filters]);

  // Get unique service areas for filter
  const serviceAreas = [
    ...new Set(
      allServices
        .map((service) => service.service_area)
        .filter(Boolean)
        .concat(
          allServices
            .map((service) => service.location_type?.replace("_", " "))
            .filter(Boolean)
        )
    ),
  ];

  const activeFilterCount =
    filters.categories.length +
    filters.tags.length +
    (filters.minPrice > 0 ? 1 : 0) +
    (filters.maxPrice < 10000 ? 1 : 0) +
    (filters.minRating > 0 ? 1 : 0) +
    filters.locationType.length +
    (filters.verifiedOnly ? 1 : 0) +
    filters.pricingType.length;

  const clearAllFilters = () => {
    setSearchQuery("");
    setLocationFilter("");
    setFilters(defaultFilters);
  };

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
        <div className="max-w-7xl container mx-auto px-6">
          {/* Search and Filter Bar */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8 animate-fade-in">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search services, agents, or categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Filter by location or area..."
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
            </div>
            <FilterDialog
              isOpen={isFilterDialogOpen}
              onOpenChange={setIsFilterDialogOpen}
              filters={filters}
              onFiltersChange={setFilters}
            />
          </div>

          {/* Active Filters Display */}
          {(searchQuery || locationFilter || activeFilterCount > 0) && (
            <div className="flex flex-wrap items-center gap-3 mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <span className="text-sm font-medium text-blue-900">
                Active filters:
              </span>

              {searchQuery && (
                <Badge variant="secondary" className="pl-2 pr-1 py-1">
                  {`Search: "${searchQuery}"`}
                  <X
                    className="w-3 h-3 ml-1 cursor-pointer"
                    onClick={() => setSearchQuery("")}
                  />
                </Badge>
              )}

              {locationFilter && (
                <Badge variant="secondary" className="pl-2 pr-1 py-1">
                  {`Location: "${locationFilter}"`}
                  <X
                    className="w-3 h-3 ml-1 cursor-pointer"
                    onClick={() => setLocationFilter("")}
                  />
                </Badge>
              )}

              {activeFilterCount > 0 && (
                <Badge variant="secondary" className="pl-2 pr-1 py-1">
                  {activeFilterCount} filter{activeFilterCount > 1 ? "s" : ""}
                  <X
                    className="w-3 h-3 ml-1 cursor-pointer"
                    onClick={() => setFilters(defaultFilters)}
                  />
                </Badge>
              )}

              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-blue-700 hover:text-blue-800 hover:bg-blue-100 ml-auto"
              >
                Clear all
              </Button>
            </div>
          )}

          {/* Quick Service Area Filters */}
          {serviceAreas.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6 animate-fade-in">
              <Badge
                variant={!locationFilter ? "default" : "outline"}
                className="cursor-pointer transition-all hover:scale-105 px-3 py-1.5"
                onClick={() => setLocationFilter("")}
              >
                All Areas
              </Badge>
              {serviceAreas.slice(0, 8).map((area) => (
                <Badge
                  key={area}
                  variant={locationFilter === area ? "default" : "outline"}
                  className="cursor-pointer transition-all hover:scale-105 px-3 py-1.5"
                  onClick={() => setLocationFilter(area || "")}
                >
                  {area}
                </Badge>
              ))}
            </div>
          )}

          {/* Results Count */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 animate-fade-in">
            <div>
              <h2 className="text-3xl font-bold mb-2">Available Services</h2>
              <p className="text-muted-foreground">
                Showing {filteredServices.length} of {allServices.length}{" "}
                verified services
                {searchQuery && ` for "${searchQuery}"`}
                {locationFilter && ` in ${locationFilter}`}
              </p>
            </div>

            {(searchQuery || locationFilter || activeFilterCount > 0) && (
              <Button
                variant="outline"
                onClick={clearAllFilters}
                className="sm:w-auto"
              >
                Clear All Filters
              </Button>
            )}
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
            <div className="text-center py-16 animate-fade-in">
              <Card className="border-dashed border-2 max-w-2xl mx-auto bg-gray-50/50">
                <CardContent className="py-16">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                    <Briefcase className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-3 text-gray-700">
                    No services found
                  </h3>
                  <p className="text-gray-500 mb-6 text-lg">
                    {`We couldn't find any services matching your criteria. Try
                    adjusting your search filters.
                  `}</p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button onClick={clearAllFilters} size="lg">
                      Clear All Filters
                    </Button>
                    <Button variant="outline" size="lg" asChild>
                      <Link href="/services">Browse All Services</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
