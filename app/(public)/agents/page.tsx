// app/(public)/agents/page.tsx
"use client";

import { useState, useMemo } from "react";
import { useAllAgents } from "@/hooks/useAllAgents";
import { HeroSection } from "@/components/common/Hero";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Users, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { AgentCard } from "@/components/agent/AgentCard";
import {
  AgentFilterDialog,
  AgentFilters,
} from "@/components/common/AgentFilterDialog";
import Link from "next/link";

const defaultFilters: AgentFilters = {
  categories: [],
  minRating: 0,
  experience: [],
  verificationStatus: [],
  location: [],
  serviceCount: [],
  followerCount: [],
};

// Helper for experience levels
const experienceLevels = [
  { value: "beginner", label: "Beginner (0-2 years)", min: 0, max: 2 },
  { value: "experienced", label: "Experienced (3-5 years)", min: 3, max: 5 },
  {
    value: "professional",
    label: "Professional (6-10 years)",
    min: 6,
    max: 10,
  },
  { value: "expert", label: "Expert (10+ years)", min: 10, max: 99 },
];

export default function AgentsPage() {
  const { allAgents, isFetchingAllAgents } = useAllAgents();
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [filters, setFilters] = useState<AgentFilters>(defaultFilters);

  const filteredAgents = useMemo(() => {
    return allAgents.filter((agent) => {
      // Search query filter
      const matchesSearch =
        searchQuery === "" ||
        agent.user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.bio?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.services?.some(
          (service) =>
            service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            service.category?.name
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
        );

      // Location filter
      const matchesLocation =
        !locationFilter ||
        agent.location?.toLowerCase().includes(locationFilter.toLowerCase()) ||
        agent.service_area
          ?.toLowerCase()
          .includes(locationFilter.toLowerCase());

      // Category filter
      const matchesCategory =
        filters.categories.length === 0 ||
        agent.services?.some(
          (service) =>
            service.category && filters.categories.includes(service.category.id)
        );

      // Rating filter
      const agentRating = agent.reviews?.length
        ? agent.reviews.reduce((sum, review) => sum + review.rating, 0) /
          agent.reviews.length
        : 0;
      const matchesRating = agentRating >= filters.minRating;

      // Experience filter - FIXED: Handle undefined years_of_experience
      const matchesExperience =
        filters.experience.length === 0 ||
        (agent.years_of_experience !== undefined &&
          agent.years_of_experience !== null &&
          filters.experience.some((exp) => {
            const level = experienceLevels.find((e) => e.value === exp);
            return (
              level &&
              agent.years_of_experience! >= level.min &&
              agent.years_of_experience! <= level.max
            );
          }));

      // Verification status filter
      const matchesVerification =
        filters.verificationStatus.length === 0 ||
        (filters.verificationStatus.includes("verified") &&
          agent.verification_status === "approved") ||
        (filters.verificationStatus.includes("pending") &&
          agent.verification_status === "pending");

      // Location filter (from dialog)
      const matchesLocationFilter =
        filters.location.length === 0 ||
        (agent.location &&
          filters.location.some((loc) =>
            agent.location?.toLowerCase().includes(loc.toLowerCase())
          )) ||
        (agent.service_area &&
          filters.location.some((loc) =>
            agent.service_area?.toLowerCase().includes(loc.toLowerCase())
          ));

      // Service count filter
      const serviceCount = agent.services?.length || 0;
      const matchesServiceCount =
        filters.serviceCount.length === 0 ||
        filters.serviceCount.some((range) => {
          if (range === "1-3") return serviceCount >= 1 && serviceCount <= 3;
          if (range === "4-7") return serviceCount >= 4 && serviceCount <= 7;
          if (range === "8+") return serviceCount >= 8;
          return false;
        });

      // Follower count filter
      const matchesFollowerCount =
        filters.followerCount.length === 0 ||
        filters.followerCount.some((range) => {
          if (range === "0-50")
            return agent.follower_count >= 0 && agent.follower_count <= 50;
          if (range === "51-200")
            return agent.follower_count >= 51 && agent.follower_count <= 200;
          if (range === "201+") return agent.follower_count >= 201;
          return false;
        });

      return (
        matchesSearch &&
        matchesLocation &&
        matchesCategory &&
        matchesRating &&
        matchesExperience &&
        matchesVerification &&
        matchesLocationFilter &&
        matchesServiceCount &&
        matchesFollowerCount
      );
    });
  }, [allAgents, searchQuery, locationFilter, filters]);

  // Get unique locations for quick filter
  const agentLocations = [
    ...new Set(
      allAgents
        .map((agent) => agent.location)
        .filter(Boolean)
        .concat(allAgents.map((agent) => agent.service_area).filter(Boolean))
    ),
  ];

  const activeFilterCount =
    filters.categories.length +
    (filters.minRating > 0 ? 1 : 0) +
    filters.experience.length +
    filters.verificationStatus.length +
    filters.location.length +
    filters.serviceCount.length +
    filters.followerCount.length;

  const clearAllFilters = () => {
    setSearchQuery("");
    setLocationFilter("");
    setFilters(defaultFilters);
  };

  return (
    <div className="min-h-screen bg-background">
      <HeroSection
        title="Find Trusted Agents"
        description="Connect with verified service providers from the Myanmar community across Thailand"
        primaryAction={{
          label: "Browse All Agents",
          href: "#agents",
        }}
      />

      <section id="agents" className="py-16">
        <div className="max-w-7xl container mx-auto px-6">
          {/* Search and Filter Bar */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8 animate-fade-in">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search agents, skills, or services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Filter by location or service area..."
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
            </div>
            <AgentFilterDialog
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

          {/* Quick Location Filters */}
          {agentLocations.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6 animate-fade-in">
              <Badge
                variant={!locationFilter ? "default" : "outline"}
                className="cursor-pointer transition-all hover:scale-105 px-3 py-1.5"
                onClick={() => setLocationFilter("")}
              >
                All Locations
              </Badge>
              {agentLocations.slice(0, 8).map((location) => (
                <Badge
                  key={location}
                  variant={locationFilter === location ? "default" : "outline"}
                  className="cursor-pointer transition-all hover:scale-105 px-3 py-1.5"
                  onClick={() => setLocationFilter(location || "")}
                >
                  {location}
                </Badge>
              ))}
            </div>
          )}

          {/* Results Count */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 animate-fade-in">
            <div>
              <h2 className="text-3xl font-bold mb-2">Verified Agents</h2>
              <p className="text-muted-foreground">
                Showing {filteredAgents.length} of {allAgents.length} trusted
                agents
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

          {/* Agents Grid */}
          {isFetchingAllAgents ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(9)].map((_, i) => (
                <Skeleton key={i} className="h-80 rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAgents.map((agent, index) => (
                <div
                  key={agent.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <AgentCard agent={agent} />
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isFetchingAllAgents && filteredAgents.length === 0 && (
            <div className="text-center py-16 animate-fade-in">
              <Card className="border-dashed border-2 max-w-2xl mx-auto bg-gray-50/50">
                <CardContent className="py-16">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                    <Users className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-3 text-gray-700">
                    No agents found
                  </h3>
                  <p className="text-gray-500 mb-6 text-lg">
                    {`We couldn't find any agents matching your criteria. Try
                    adjusting your search filters.`}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button onClick={clearAllFilters} size="lg">
                      Clear All Filters
                    </Button>
                    <Button variant="outline" size="lg" asChild>
                      <Link href="/agents">Browse All Agents</Link>
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
