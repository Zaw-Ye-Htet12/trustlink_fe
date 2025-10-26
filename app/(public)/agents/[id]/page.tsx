// app/(public)/agents/[id]/page.tsx
"use client";

import { use } from "react";
import { useAgentDetail } from "@/hooks/useAgentDetail";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  MapPin,
  CheckCircle,
  Users,
  Briefcase,
  Calendar,
  Award,
  MessageCircle,
  Phone,
  Mail,
  Share2,
} from "lucide-react";
import { ServiceCard } from "@/components/service/ServiceCard";
import { AgentDetailSkeleton } from "@/components/common/skeletons/AgentDetailSkeleton";
import { ReviewSection } from "@/components/common/ReviewSection";

interface AgentDetailPageProps {
  params: {
    id: string;
  };
}

export default function AgentDetailPage({ params }: AgentDetailPageProps) {
  // `params` can be a Promise in the App Router; unwrap it with React.use()
  // before accessing properties.
  const resolvedParams = use(params as unknown as Promise<{ id: string }>);
  const agentId = Number(resolvedParams.id);
  const { agentDetail, isFetchingAgentDetail } = useAgentDetail(agentId);

  if (isFetchingAgentDetail) {
    return <AgentDetailSkeleton />;
  }

  if (!agentDetail) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Agent Not Found
          </h1>
          <p className="text-gray-600">
            {`The agent you're looking for doesn't exist.`}
          </p>
        </div>
      </div>
    );
  }

  const averageRating = agentDetail.reviews?.length
    ? agentDetail.reviews.reduce((sum, review) => sum + review.rating, 0) /
      agentDetail.reviews.length
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Agent Avatar & Basic Info */}
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold border-4 border-white shadow-lg">
                  {agentDetail.user.username?.[0]?.toUpperCase()}
                </div>
                {agentDetail.verification_status === "approved" && (
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            </div>

            {/* Agent Details */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {agentDetail.user.username}
                  </h1>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge
                      variant="outline"
                      className="bg-blue-50 text-blue-700 border-blue-200"
                    >
                      {agentDetail.years_of_experience || "N/A"} years
                      experience
                    </Badge>
                    {agentDetail.verification_status === "approved" && (
                      <Badge className="bg-green-500 text-white border-0">
                        Verified Agent
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700" size="sm">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Contact
                  </Button>
                </div>
              </div>

              {agentDetail.bio && (
                <p className="text-gray-600 leading-relaxed mb-6">
                  {agentDetail.bio}
                </p>
              )}

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-lg font-bold text-gray-900">
                      {averageRating.toFixed(1)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">Rating</p>
                </div>

                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-gray-900 mb-1">
                    {agentDetail.total_reviews}
                  </div>
                  <p className="text-sm text-gray-600">Reviews</p>
                </div>

                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-gray-900 mb-1">
                    {agentDetail.services?.length || 0}
                  </div>
                  <p className="text-sm text-gray-600">Services</p>
                </div>

                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-gray-900 mb-1">
                    {agentDetail.follower_count}
                  </div>
                  <p className="text-sm text-gray-600">Followers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Services & Reviews */}
          <div className="lg:col-span-2 space-y-8">
            {/* Services Section */}
            {agentDetail.services && agentDetail.services.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Services Offered
                  </h2>
                  <Badge variant="secondary">
                    {agentDetail.services.length} services
                  </Badge>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {agentDetail.services.map((service) => (
                    console.log("Rendering service:", service),
                    <ServiceCard key={service.id} service={service} />
                  ))}
                </div>
              </div>
            )}

            {/* Reviews Section */}
            <ReviewSection
              agentId={agentId}
              agentName={agentDetail.user.username}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact & Info */}
            <div className="bg-white rounded-2xl p-6 border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Contact Information
              </h3>
              <div className="space-y-3">
                {agentDetail.user.phone_no && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Phone className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium">
                      {agentDetail.user.phone_no}
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Mail className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium">
                    {agentDetail.user.email}
                  </span>
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </div>
            </div>

            {/* Agent Details */}
            <div className="bg-white rounded-2xl p-6 border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Agent Details
              </h3>
              <div className="space-y-4">
                {agentDetail.location && (
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-gray-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Location
                      </p>
                      <p className="text-sm text-gray-600">
                        {agentDetail.location}
                      </p>
                    </div>
                  </div>
                )}

                {agentDetail.service_area && (
                  <div className="flex items-center gap-3">
                    <Briefcase className="w-4 h-4 text-gray-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Service Area
                      </p>
                      <p className="text-sm text-gray-600">
                        {agentDetail.service_area}
                      </p>
                    </div>
                  </div>
                )}

                {agentDetail.years_of_experience && (
                  <div className="flex items-center gap-3">
                    <Award className="w-4 h-4 text-gray-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Experience
                      </p>
                      <p className="text-sm text-gray-600">
                        {agentDetail.years_of_experience} years
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-gray-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Member Since
                    </p>
                    <p className="text-sm text-gray-600">
                      {new Date(agentDetail.created_at).getFullYear()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Users className="w-4 h-4 text-gray-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Status</p>
                    <Badge
                      variant={
                        agentDetail.verification_status === "approved"
                          ? "default"
                          : "secondary"
                      }
                      className={
                        agentDetail.verification_status === "approved"
                          ? "bg-green-100 text-green-800"
                          : agentDetail.verification_status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }
                    >
                      {agentDetail.verification_status}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Specializations */}
            {agentDetail.services && agentDetail.services.length > 0 && (
              <div className="bg-white rounded-2xl p-6 border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Specializations
                </h3>
                <div className="flex flex-wrap gap-2">
                  {Array.from(
                    new Set(
                      agentDetail.services
                        .map((s) => s.category?.name)
                        .filter(Boolean)
                    )
                  ).map((category, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="px-3 py-1"
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
