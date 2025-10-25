// components/common/SearchBar.tsx
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Search, MapPin, Users, Briefcase } from "lucide-react";
import { useSearch } from "@/hooks/useSearch";
import { Skeleton } from "@/components/ui/skeleton";
import { AgentCard } from "../agent/AgentCard";
import { ServiceCard } from "../service/ServiceCard";

export function SearchSection() {
  const {
    keyword,
    location,
    activeTab,
    setKeyword,
    setLocation,
    setActiveTab,
    handleSearchClick,
    agentQuery,
    serviceQuery,
  } = useSearch();

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-3">
                  Find Trusted Services & Agents
                </h2>
                <p className="text-muted-foreground text-lg">
                  Search through verified agents and services in your area
                </p>
              </div>

              {/* Search Controls */}
              <div className="space-y-6">
                <Tabs
                  value={activeTab}
                  onValueChange={(v) =>
                    setActiveTab(v as "agents" | "services")
                  }
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger
                      value="agents"
                      className="flex items-center gap-2"
                    >
                      <Users className="w-4 h-4" />
                      Agents
                    </TabsTrigger>
                    <TabsTrigger
                      value="services"
                      className="flex items-center gap-2"
                    >
                      <Briefcase className="w-4 h-4" />
                      Services
                    </TabsTrigger>
                  </TabsList>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input
                        placeholder={`Search ${activeTab} by name or specialty...`}
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        className="pl-10 h-12 text-base"
                      />
                    </div>

                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input
                        placeholder="Enter location..."
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="pl-10 h-12 text-base"
                      />
                    </div>
                  </div>

                  <Button
                    onClick={handleSearchClick}
                    className="w-full h-12 text-base font-semibold"
                    size="lg"
                    disabled={agentQuery.isFetching || serviceQuery.isFetching}
                  >
                    {agentQuery.isFetching || serviceQuery.isFetching
                      ? "Searching..."
                      : `Search ${
                          activeTab === "agents" ? "Agents" : "Services"
                        }`}
                  </Button>

                  {/* Results */}
                  <TabsContent value="agents" className="space-y-6 mt-6">
                    {agentQuery.isFetching ? (
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                          <Skeleton key={i} className="h-64 rounded-xl" />
                        ))}
                      </div>
                    ) : agentQuery.data?.data &&
                      agentQuery.data.data.length > 0 ? (
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {agentQuery.data.data.map((agent) => (
                          <AgentCard key={agent.id} agent={agent} />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">
                          No agents found
                        </h3>
                        <p className="text-muted-foreground">
                          Try adjusting your search criteria
                        </p>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="services" className="space-y-6 mt-6">
                    {serviceQuery.isFetching ? (
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                          <Skeleton key={i} className="h-64 rounded-xl" />
                        ))}
                      </div>
                    ) : serviceQuery.data?.data &&
                      serviceQuery.data.data.length > 0 ? (
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {serviceQuery.data.data.map((service) => (
                          <ServiceCard key={service.id} service={service} />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <Briefcase className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">
                          No services found
                        </h3>
                        <p className="text-muted-foreground">
                          Try adjusting your search criteria
                        </p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
