// app/(public)/agents/page.tsx
"use client";

import { useState } from "react";
import { useAllAgents } from "@/hooks/useAllAgents";
import { HeroSection } from "@/components/common/Hero";
import { Input } from "@/components/ui/input";
import { Search, Filter, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { AgentCard } from "@/components/agent/AgentCard";

export default function AgentsPage() {
  const { allAgents, isFetchingAllAgents } = useAllAgents();
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  const filteredAgents = allAgents.filter((agent) => {
    const matchesSearch =
      agent.user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.bio?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation =
      !locationFilter ||
      agent.location?.toLowerCase().includes(locationFilter.toLowerCase());
    return matchesSearch && matchesLocation;
  });

  // Get unique locations for filter
  const locations = [
    ...new Set(allAgents.map((agent) => agent.location).filter(Boolean)),
  ];

  return (
    <div className="min-h-screen bg-background">
      <HeroSection
        title="Verified Service Agents"
        description="Connect with trusted and verified service providers from our community across Thailand"
        primaryAction={{
          label: "Browse All Agents",
          href: "#agents",
        }}
      />

      <section id="agents" className="py-16">
        <div className="max-w-6xl container mx-auto px-6">
          {/* Search and Filter Bar */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8 animate-fade-in">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search agents by name or specialty..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Filter by location..."
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

          {/* Quick Location Filters */}
          {locations.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6 animate-fade-in">
              <Badge
                variant={!locationFilter ? "default" : "outline"}
                className="cursor-pointer transition-all hover:scale-105"
                onClick={() => setLocationFilter("")}
              >
                All Locations
              </Badge>
              {locations.slice(0, 8).map((location) => (
                <Badge
                  key={location}
                  variant={locationFilter === location ? "default" : "outline"}
                  className="cursor-pointer transition-all hover:scale-105"
                  onClick={() => setLocationFilter(location || "")}
                >
                  {location}
                </Badge>
              ))}
            </div>
          )}

          {/* Results Count */}
          <div className="mb-8 animate-fade-in">
            <h2 className="text-3xl font-bold mb-2">Trusted Agents</h2>
            <p className="text-muted-foreground">
              Showing {filteredAgents.length} verified agents
            </p>
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
            <div className="text-center py-12 animate-fade-in">
              <Card className="border-dashed max-w-md mx-auto">
                <CardContent className="py-12">
                  <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                    <Users className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    No agents found
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
