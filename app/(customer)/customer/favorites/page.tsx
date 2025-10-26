// app/(main)/favorites/page.tsx
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  Users,
  Briefcase,
  Trash2,
  Eye,
} from "lucide-react";
import { useSavedStore } from "@/store/useSavedStore";
import {
  useGetAllAgents,
  useGetAllServices,
} from "@/services/public/publicService";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { AgentCard } from "@/components/agent/AgentCard";
import { ServiceCard } from "@/components/service/ServiceCard";

export default function FavoritesPage() {
  const { savedAgents, savedServices, clearAllSaved } = useSavedStore();

  const [activeTab, setActiveTab] = useState<"agents" | "services">("agents");

  // Fetch all agents and services to filter saved ones
  const { data: agentsData, isLoading: agentsLoading } = useGetAllAgents();
  const { data: servicesData, isLoading: servicesLoading } =
    useGetAllServices();

  // Filter saved agents and services
  const savedAgentsList =
    agentsData?.data?.filter((agent) => savedAgents.includes(agent.id)) || [];

  const savedServicesList =
    servicesData?.data?.filter((service) =>
      savedServices.includes(service.id)
    ) || [];

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to remove all saved items?")) {
      clearAllSaved();
    }
  };

  if (agentsLoading || servicesLoading) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="space-y-6">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-12 w-full" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-96 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Favorites</h1>
          <p className="text-gray-600 mt-2">
            Your saved agents and services for quick access
          </p>
        </div>

        {(savedAgents.length > 0 || savedServices.length > 0) && (
          <Button
            variant="outline"
            onClick={handleClearAll}
            className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear All
          </Button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Heart className="h-6 w-6 text-red-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {savedAgents.length + savedServices.length}
            </p>
            <p className="text-sm text-gray-600">Total Saved</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {savedAgents.length}
            </p>
            <p className="text-sm text-gray-600">Saved Agents</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Briefcase className="h-6 w-6 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {savedServices.length}
            </p>
            <p className="text-sm text-gray-600">Saved Services</p>
          </CardContent>
        </Card>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={(v) => setActiveTab(v as "agents" | "services")}
      >
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="agents" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Agents
            <Badge variant="secondary" className="ml-2">
              {savedAgents.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="services" className="flex items-center gap-2">
            <Briefcase className="w-4 h-4" />
            Services
            <Badge variant="secondary" className="ml-2">
              {savedServices.length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="agents" className="space-y-6">
          {savedAgents.length > 0 ? (
            <>
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Saved Agents ({savedAgents.length})
                </h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedAgentsList.map((agent) => (
                  <AgentCard key={agent.id} agent={agent} />
                ))}
              </div>
            </>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  No saved agents yet
                </h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                  Start exploring agents and save your favorites for quick
                  access later.
                </p>
                <Button asChild>
                  <a href="/search">Explore Agents</a>
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="services" className="space-y-6">
          {savedServices.length > 0 ? (
            <>
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Saved Services ({savedServices.length})
                </h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedServicesList.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            </>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <Briefcase className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  No saved services yet
                </h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                  {`Browse services and save the ones you're interested in for
                  later.`}
                </p>
                <Button asChild>
                  <a href="/search">Explore Services</a>
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      {(savedAgents.length > 0 || savedServices.length > 0) && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Manage your saved items efficiently
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button variant="outline" asChild>
                <a href="/search">
                  <Eye className="w-4 h-4 mr-2" />
                  Continue Exploring
                </a>
              </Button>
              <Button variant="outline" onClick={handleClearAll}>
                <Trash2 className="w-4 h-4 mr-2" />
                Clear All Saved Items
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
