// components/common/PlatformStats.tsx
"use client";
import { usePlatformStatistics } from "@/hooks/usePlatformStatics";
import { PlatformStatsSkeleton } from "@/components/common/skeletons/PlatformStatsSkeleton";
import {
  Users,
  CheckCircle,
  Briefcase,
  Star,
  TrendingUp,
  Shield,
} from "lucide-react";

export function PlatformStats() {
  const { platformStatistics, isFetchingPlatformStatistics } =
    usePlatformStatistics();

  if (isFetchingPlatformStatistics) return <PlatformStatsSkeleton />;

  const stats = [
    {
      label: "Total Agents",
      value: platformStatistics?.totalAgents,
      icon: Users,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700",
    },
    {
      label: "Verified Agents",
      value: platformStatistics?.verifiedAgents,
      icon: CheckCircle,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      textColor: "text-green-700",
    },
    {
      label: "Services",
      value: platformStatistics?.totalServices,
      icon: Briefcase,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      textColor: "text-purple-700",
    },
    {
      label: "Reviews",
      value: platformStatistics?.totalReviews,
      icon: Star,
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-amber-50",
      textColor: "text-amber-700",
    },
    {
      label: "Success Rate",
      value: "98%",
      icon: TrendingUp,
      color: "from-teal-500 to-green-500",
      bgColor: "bg-teal-50",
      textColor: "text-teal-700",
    },
    {
      label: "Satisfaction",
      value: "4.8/5",
      icon: Shield,
      color: "from-indigo-500 to-purple-500",
      bgColor: "bg-indigo-50",
      textColor: "text-indigo-700",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full"></div>
        <div className="absolute top-32 right-20 w-24 h-24 bg-white rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-white rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-28 h-28 bg-white rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm font-medium mb-4 backdrop-blur-sm">
            <TrendingUp className="w-4 h-4" />
            TrustLink in Numbers
          </div>
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Building Trust Together
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Join our growing community of trusted service providers and
            satisfied customers
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="group p-6 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`p-3 rounded-xl ${stat.bgColor} group-hover:scale-110 transition-transform duration-300`}
                >
                  <stat.icon className={`w-6 h-6 ${stat.textColor}`} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white mb-1">
                    {stat.value ?? "0"}
                  </div>
                  <div className="text-sm text-gray-300 font-medium">
                    {stat.label}
                  </div>
                </div>
              </div>

              {/* Animated progress bar for some stats */}
              {(stat.label === "Success Rate" ||
                stat.label === "Satisfaction") && (
                <div className="mt-3">
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full bg-gradient-to-r ${stat.color}`}
                      style={{
                        width: stat.label === "Success Rate" ? "98%" : "96%",
                      }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12">
          <div className="inline-flex flex-wrap justify-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Live Updates</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span>Real-time Data</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span>Community Driven</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
