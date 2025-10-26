// components/common/FeaturedAgents.tsx
"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useFeaturedAgents } from "@/hooks/useFeaturedAgents";
import { FeaturedAgentsSkeleton } from "@/components/common/skeletons/FeaturedAgentsSkeleton";
import {
  Star,
  Award,
  CheckCircle,
  Users,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { AgentCard } from "../agent/AgentCard";

export function FeaturedAgents() {
  const { featuredAgents, isFetchingFeaturedAgents } = useFeaturedAgents();

  if (isFetchingFeaturedAgents) return <FeaturedAgentsSkeleton />;

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Award className="w-4 h-4" />
            Top Rated
          </div>
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Featured Trusted Agents
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Meet our most reliable and highly-rated service providers
          </p>
        </div>

        {/* Agents Grid */}
        {featuredAgents && featuredAgents.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredAgents.map((agent, index) => (
              <div
                key={agent.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <AgentCard agent={agent} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-20 h-20 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
              <Users className="w-10 h-10 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Featured Agents
            </h3>
            <p className="text-gray-500 mb-6">
              Our top agents will appear here soon
            </p>
          </div>
        )}

        {/* View All CTA */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300"
            asChild
          >
            <Link href="/agents" className="gap-2">
              Browse All Agents
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
