// components/common/AgentCard.tsx
"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Star,
  MapPin,
  CheckCircle,
  Users,
  Briefcase,
  Clock,
  Award,
  MessageCircle,
  Eye,
  ThumbsUp,
  Sparkles,
  Phone,
  Calendar,
  Building,
  Target,
  Heart,
} from "lucide-react";
import { AgentProfile } from "@/interfaces/agent";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { useSavedStore } from "@/store/useSavedStore";

interface AgentCardProps {
  agent: AgentProfile;
  className?: string;
}

export function AgentCard({ agent, className }: AgentCardProps) {
  const isVerified = agent.verification_status === "approved";
  const isPro = agent.years_of_experience && agent.years_of_experience >= 3;
  const totalServices = agent.services?.length || 0;
  const averageRating = agent.reviews?.length
    ? agent.reviews.reduce((sum, review) => sum + review.rating, 0) /
      agent.reviews.length
    : 0;
  const { isAgentSaved, toggleSaveAgent } = useSavedStore();
  const saved = isAgentSaved(agent.id);

  // Calculate response rate (mock data for now)
  const responseRate = 95;
  const completionRate = 98;

  // Check if agent is active recently (within last 7 days)
  const isActiveRecently = () => {
    if (!agent.updated_at) return false;
    const updatedDate = new Date(agent.updated_at);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - updatedDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  };

  const getVerificationBadge = () => {
    if (isVerified) {
      return (
        <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 text-xs font-medium">
          <CheckCircle className="w-3 h-3 mr-1" />
          Verified
        </Badge>
      );
    }
    return (
      <Badge
        variant="outline"
        className="text-amber-600 border-amber-300 bg-amber-50 text-xs"
      >
        Pending Verification
      </Badge>
    );
  };

  const getExperienceLevel = () => {
    if (!agent.years_of_experience) return null;
    if (agent.years_of_experience >= 5) return "Expert";
    if (agent.years_of_experience >= 3) return "Professional";
    if (agent.years_of_experience >= 1) return "Experienced";
    return "Beginner";
  };

  return (
    <Card
      className={cn(
        "group hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden bg-white",
        "hover:border-gray-300 cursor-pointer",
        className
      )}
    >
      {/* Header with subtle background */}
      <div className="bg-gradient-to-r from-slate-50 to-gray-50 p-6 border-b border-gray-100 relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gray-400 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gray-400 rounded-full translate-y-12 -translate-x-12"></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              {/* Agent Avatar */}
              <div className="relative">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center border border-gray-200 shadow-sm">
                  {agent.user.profile_photo_url ? (
                    <Image
                      src={agent.user.profile_photo_url}
                      alt={agent.user.username}
                      width={64}
                      height={64}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gradient-to-br from-slate-500 to-gray-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-lg">
                        {agent.user.username?.[0]?.toUpperCase() ?? "U"}
                      </span>
                    </div>
                  )}
                </div>
                {isActiveRecently() && (
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-400 rounded-full border-2 border-white shadow-sm"></div>
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-gray-900 text-lg">
                    {agent.user.username}
                  </h3>
                  {isPro && <Sparkles className="w-4 h-4 text-amber-500" />}
                </div>
                <div className="flex flex-wrap gap-2">
                  {getVerificationBadge()}
                  {getExperienceLevel() && (
                    <Badge
                      variant="outline"
                      className="bg-slate-100 text-slate-700 border-slate-300 text-xs"
                    >
                      {getExperienceLevel()}
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="text-right">
              <div className="flex items-center gap-1 text-gray-700 text-sm mb-1 justify-end">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-semibold">
                  {averageRating.toFixed(1)}
                </span>
                <span className="text-gray-500">({agent.total_reviews})</span>
              </div>
              <div className="text-xs text-gray-500">
                {totalServices} services
              </div>
            </div>
          </div>
        </div>
      </div>

      <CardContent className="p-6 space-y-4">
        {/* Bio and Specialization */}
        <div className="space-y-3">
          {agent.bio && (
            <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
              {agent.bio}
            </p>
          )}

          {/* Specialization Tags */}
          {agent.services && agent.services.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {agent.services.slice(0, 3).map((service) => (
                <Badge
                  key={service.id}
                  variant="outline"
                  className="text-xs bg-blue-50 text-blue-700 border-blue-200 font-medium"
                >
                  <Briefcase className="w-3 h-3 mr-1" />
                  {service.category?.name || "Service"}
                </Badge>
              ))}
              {agent.services.length > 3 && (
                <Badge
                  variant="outline"
                  className="text-xs bg-gray-50 text-gray-500 border-gray-200"
                >
                  +{agent.services.length - 3} more
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Detailed Stats Grid */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          {/* Experience */}
          {agent.years_of_experience && (
            <div className="flex items-center gap-2 p-2 bg-amber-50 rounded-lg border border-amber-100">
              <Award className="w-4 h-4 text-amber-600" />
              <div>
                <div className="font-semibold text-gray-900">
                  {agent.years_of_experience}+ years
                </div>
                <div className="text-xs text-gray-500">Experience</div>
              </div>
            </div>
          )}

          {/* Followers */}
          <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg border border-blue-100">
            <Users className="w-4 h-4 text-blue-600" />
            <div>
              <div className="font-semibold text-gray-900">
                {agent.follower_count}
              </div>
              <div className="text-xs text-gray-500">Followers</div>
            </div>
          </div>

          {/* Response Rate */}
          <div className="flex items-center gap-2 p-2 bg-emerald-50 rounded-lg border border-emerald-100">
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <div>
              <div className="font-semibold text-gray-900">{responseRate}%</div>
              <div className="text-xs text-gray-500">Response Rate</div>
            </div>
          </div>

          {/* Completion Rate */}
          <div className="flex items-center gap-2 p-2 bg-violet-50 rounded-lg border border-violet-100">
            <ThumbsUp className="w-4 h-4 text-violet-600" />
            <div>
              <div className="font-semibold text-gray-900">
                {completionRate}%
              </div>
              <div className="text-xs text-gray-500">Completion</div>
            </div>
          </div>
        </div>

        {/* Location and Contact Info */}
        <div className="space-y-2">
          {agent.location && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span className="line-clamp-1">{agent.location}</span>
            </div>
          )}

          {agent.service_area && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Target className="w-4 h-4 text-gray-400" />
              <span>Serves: {agent.service_area}</span>
            </div>
          )}

          {agent.user.phone_no && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Phone className="w-4 h-4 text-gray-400" />
              <span>{agent.user.phone_no}</span>
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>Member since {new Date(agent.created_at).getFullYear()}</span>
          </div>
          {isActiveRecently() && (
            <Badge
              variant="outline"
              className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs"
            >
              Active recently
            </Badge>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-3">
          <Button
            variant="outline"
            className="flex-1 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 text-gray-700"
            size="sm"
            asChild
          >
            <Link href={`/agents/${agent.id}`}>
              <Eye className="w-4 h-4 mr-2" />
              View Profile
            </Link>
          </Button>
          <Button
            onClick={() => toggleSaveAgent(agent.id)}
            variant={saved ? "default" : "outline"}
            className={`flex-1 ${
              saved
                ? "bg-red-500 hover:bg-red-600 text-white border-red-500"
                : "border-gray-300 hover:border-gray-400 text-gray-700"
            } transition-all duration-200`}
            size="sm"
          >
            <Heart className={`w-4 h-4 mr-2 ${saved ? "fill-current" : ""}`} />
            {saved ? "Saved" : "Save"}
          </Button>
          <Button
            className="flex-1 bg-gray-900 hover:bg-gray-800 text-white shadow-sm hover:shadow transition-all duration-200 border-0"
            size="sm"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Contact
          </Button>
        </div>

        {/* Quick Preview of Services */}
        {agent.services && agent.services.length > 0 && (
          <div className="pt-3 border-t border-gray-100">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
              <span>Popular Services</span>
              <span className="font-medium">{totalServices} total</span>
            </div>
            <div className="space-y-1">
              {agent.services.slice(0, 2).map((service) => (
                <div
                  key={service.id}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-gray-700 line-clamp-1">
                    {service.title}
                  </span>
                  <span className="font-semibold text-gray-900">
                    {service.price
                      ? `${service.currency} ${service.price}`
                      : "Custom"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
