"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFeaturedAgents } from "@/hooks/useFeaturedAgents";
import { FeaturedAgentsSkeleton } from "@/components/common/skeletons/FeaturedAgentsSkeleton";

export function FeaturedAgents() {
  const { featuredAgents, isFetchingFeaturedAgents } = useFeaturedAgents();

  if (isFetchingFeaturedAgents) return <FeaturedAgentsSkeleton />;

  return (
    <section className="py-12 bg-gray-50">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Featured Agents
      </h2>
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 container mx-auto px-4">
        {featuredAgents?.map((agent) => (
          <Card key={agent.id} className="hover:shadow-md transition">
            <CardHeader>
              <CardTitle>{agent.user?.username}</CardTitle>
              <p className="text-sm text-gray-500 capitalize">
                {agent.verification_status}
              </p>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{agent.bio ?? "No bio available"}</p>
              <p className="text-sm mt-2 text-gray-400">
                Services: {agent.services?.length || 0}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
