// app/agent/dashboard/page.tsx
"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Star,
  Briefcase,
  Users,
  DollarSign,
  TrendingUp,
  Calendar,
  MessageSquare,
  CheckCircle2,
  User,
} from "lucide-react";
import Link from "next/link";

// Mock data based on API endpoints
const dashboardStats = [
  {
    label: "Total Services",
    value: "8",
    icon: Briefcase,
    color: "text-blue-600",
    change: "+2 this month",
    description: "Active services",
  },
  {
    label: "Average Rating",
    value: "4.8",
    icon: Star,
    color: "text-amber-600",
    change: "+0.2 points",
    description: "From 47 reviews",
  },
  {
    label: "Monthly Revenue",
    value: "$2,850",
    icon: DollarSign,
    color: "text-green-600",
    change: "+12% from last month",
    description: "Estimated earnings",
  },
  {
    label: "Active Clients",
    value: "23",
    icon: Users,
    color: "text-purple-600",
    change: "+5 new clients",
    description: "Current month",
  },
];

const recentReviews = [
  {
    id: 1,
    client: "Sarah Johnson",
    service: "Home Cleaning",
    rating: 5,
    comment: "Excellent service! Very thorough and professional.",
    date: "2 hours ago",
    status: "new",
  },
  {
    id: 2,
    client: "Mike Chen",
    service: "Deep Cleaning",
    rating: 4,
    comment: "Good work, but arrived 15 minutes late.",
    date: "1 day ago",
    status: "read",
  },
];

const verificationStatus = {
  status: "verified",
  documents: 3,
  verifiedSince: "2024-01-15",
  nextReview: "2024-07-15",
};

const upcomingBookings = [
  {
    id: 1,
    service: "Office Cleaning",
    client: "Tech Corp Inc.",
    date: "Today, 2:00 PM",
    duration: "3 hours",
    price: "$150",
  },
  {
    id: 2,
    service: "Move-out Cleaning",
    client: "Lisa Wang",
    date: "Tomorrow, 10:00 AM",
    duration: "4 hours",
    price: "$200",
  },
];

export default function AgentDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Agent Dashboard</h1>
          <p className="text-gray-600">
            {`Welcome back! Here's your business overview.`}
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" asChild>
            <Link href="/agent/services/new">Add New Service</Link>
          </Button>
          <Button asChild>
            <Link href="/agent/services">Manage Services</Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.label}
              className="hover:shadow-md transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      {stat.value}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {stat.description}
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg bg-gray-50 ${stat.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-3">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-xs text-green-600">{stat.change}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Reviews */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Star className="h-5 w-5" />
              Recent Reviews
            </CardTitle>
            <CardDescription>Latest feedback from your clients</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-4 p-1">
              {recentReviews.map((review) => (
                <div
                  key={review.id}
                  className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-gray-900">
                        {review.client}
                      </p>
                      {review.status === "new" && (
                        <Badge variant="default" className="text-xs">
                          New
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {review.service}
                    </p>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < review.rating
                              ? "text-amber-400 fill-amber-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {review.comment}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">{review.date}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t p-3">
              <Button variant="ghost" size="sm" className="w-full" asChild>
                <Link href="/agent/reviews">View All Reviews</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Verification Status & Upcoming Bookings */}
        <div className="space-y-6">
          {/* Verification Status */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                Verification Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      verificationStatus.status === "verified"
                        ? "default"
                        : "secondary"
                    }
                    className="capitalize"
                  >
                    {verificationStatus.status}
                  </Badge>
                  <span className="text-sm text-gray-600">
                    {verificationStatus.documents} documents submitted
                  </span>
                </div>
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Verified since:</span>
                  <span className="font-medium">
                    {verificationStatus.verifiedSince}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Next review:</span>
                  <span className="font-medium">
                    {verificationStatus.nextReview}
                  </span>
                </div>
              </div>

              <Progress value={100} className="h-2" />
              <Button variant="outline" size="sm" className="w-full">
                Manage Documents
              </Button>
            </CardContent>
          </Card>

          {/* Upcoming Bookings */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                {`Today's Schedule`}
              </CardTitle>
              <CardDescription>Your upcoming appointments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between p-3 rounded-lg border"
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">
                      {booking.service}
                    </p>
                    <p className="text-sm text-gray-600">{booking.client}</p>
                    <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                      <span>{booking.date}</span>
                      <span>{booking.duration}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      {booking.price}
                    </p>
                    <Button variant="outline" size="sm" className="mt-1">
                      Details
                    </Button>
                  </div>
                </div>
              ))}
              <Button variant="ghost" size="sm" className="w-full">
                View Full Schedule
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Manage your business efficiently</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-16 flex-col" asChild>
              <Link href="/agent/services">
                <Briefcase className="h-5 w-5 mb-1" />
                <span className="text-sm">Services</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-16 flex-col" asChild>
              <Link href="/agent/reviews">
                <Star className="h-5 w-5 mb-1" />
                <span className="text-sm">Reviews</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-16 flex-col" asChild>
              <Link href="/agent/profile">
                <User className="h-5 w-5 mb-1" />
                <span className="text-sm">Profile</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-16 flex-col">
              <MessageSquare className="h-5 w-5 mb-1" />
              <span className="text-sm">Messages</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
