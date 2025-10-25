// components/common/AgentCard.tsx
"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, CheckCircle, Users } from "lucide-react";
import { AgentProfile } from "@/interfaces/agent";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface AgentCardProps {
  agent: AgentProfile;
  className?: string;
}

export function AgentCard({ agent, className }: AgentCardProps) {
  const isVerified = agent.verification_status === "approved";

  return (
    <Card
      className={cn(
        "group hover:shadow-lg transition-all duration-300 border",
        className
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-lg">
                {agent.user.username?.[0]?.toUpperCase() ?? "U"}
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold group-hover:text-primary transition-colors">
                  {agent.user.username}
                </h3>
                {isVerified && (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                )}
              </div>
              <p className="text-sm text-muted-foreground line-clamp-1">
                {agent.bio || "Trusted service provider"}
              </p>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">
                {agent.total_reviews
                  ? (
                      agent.total_reviews / (agent.reviews?.length || 1)
                    ).toFixed(1)
                  : "-"}
              </span>
              <span className="text-muted-foreground">
                ({agent.total_reviews})
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4 text-muted-foreground" />
              <span>{agent.follower_count}</span>
            </div>
          </div>
        </div>

        {agent.location && (
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span className="line-clamp-1">{agent.location}</span>
          </div>
        )}

        {agent.years_of_experience && (
          <div className="text-sm text-muted-foreground">
            <span className="font-medium">
              {agent.years_of_experience} years
            </span>{" "}
            of experience
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <Button variant="outline" className="flex-1" size="sm" asChild>
            <Link href={`/agents/${agent.id}`}>View Profile</Link>
          </Button>
          <Button className="flex-1" size="sm">
            Contact
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
