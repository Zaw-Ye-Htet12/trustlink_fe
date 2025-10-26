// app/agent/reviews/page.tsx
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Star,
  User,
  Calendar,
  MessageSquare,
  Filter,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";

// Mock data based on API endpoints
const reviewStats = {
  averageRating: 4.8,
  totalReviews: 47,
  ratingDistribution: {
    5: 35,
    4: 10,
    3: 2,
    2: 0,
    1: 0,
  },
};

const agentReviews = [
  {
    id: 1,
    client: {
      name: "Sarah Johnson",
      avatar: "SJ",
    },
    service: "Home Cleaning",
    rating: 5,
    comment:
      "Absolutely fantastic service! The team was professional, thorough, and left my home sparkling clean. Will definitely book again!",
    date: "2024-01-20",
    response:
      "Thank you Sarah! We're thrilled to hear you enjoyed our service. Looking forward to helping you again!",
    helpful: 12,
    isVerified: true,
  },
  {
    id: 2,
    client: {
      name: "Mike Chen",
      avatar: "MC",
    },
    service: "Office Cleaning",
    rating: 4,
    comment:
      "Good quality work, but the team arrived 15 minutes late. The cleaning itself was satisfactory.",
    date: "2024-01-18",
    response: null,
    helpful: 3,
    isVerified: true,
  },
  {
    id: 3,
    client: {
      name: "Lisa Wang",
      avatar: "LW",
    },
    service: "Move-out Cleaning",
    rating: 5,
    comment:
      "Perfect service for our move-out! The apartment was spotless and we got our full deposit back. Highly recommend!",
    date: "2024-01-15",
    response:
      "We're so glad we could help with your move, Lisa! Congratulations on the new place!",
    helpful: 8,
    isVerified: true,
  },
];

export default function AgentReviewsPage() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredReviews =
    activeTab === "all"
      ? agentReviews
      : agentReviews.filter((review) =>
          activeTab === "responded"
            ? review.response !== null
            : activeTab === "pending"
            ? review.response === null
            : true
        );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Customer Reviews</h1>
        <p className="text-gray-600">Manage and respond to customer feedback</p>
      </div>

      {/* Review Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="md:col-span-2">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Star className="h-5 w-5 text-amber-400 fill-current" />
                  <span className="text-2xl font-bold text-gray-900">
                    {reviewStats.averageRating}
                  </span>
                </div>
                <p className="text-sm text-gray-600">Average Rating</p>
                <p className="text-xs text-gray-500 mt-1">
                  {reviewStats.totalReviews} total reviews
                </p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-green-600 text-sm">
                  <TrendingUp className="h-4 w-4" />
                  <span>+0.2 this month</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {[5, 4, 3].map((stars) => (
          <Card key={stars}>
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center gap-1 mb-2">
                {[...Array(stars)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 text-amber-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {
                  reviewStats.ratingDistribution[
                    stars as keyof typeof reviewStats.ratingDistribution
                  ]
                }
              </p>
              <p className="text-sm text-gray-600">reviews</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">All Reviews</TabsTrigger>
            <TabsTrigger value="pending">Pending Response</TabsTrigger>
            <TabsTrigger value="responded">Responded</TabsTrigger>
          </TabsList>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        <TabsContent value={activeTab} className="space-y-4">
          {filteredReviews.map((review) => (
            <Card key={review.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Review Content */}
                  <div className="flex-1 space-y-4">
                    {/* Review Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-sm">
                          {review.client.avatar}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-gray-900">
                              {review.client.name}
                            </h3>
                            {review.isVerified && (
                              <Badge variant="default" className="text-xs">
                                Verified
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">
                            {review.service}
                          </p>
                        </div>
                      </div>
                      <div className="text-right text-sm text-gray-500">
                        <Calendar className="h-4 w-4 inline mr-1" />
                        {review.date}
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating
                                ? "text-amber-400 fill-amber-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        {review.rating}.0 rating
                      </span>
                    </div>

                    {/* Review Comment */}
                    <div>
                      <p className="text-gray-700 leading-relaxed">
                        {review.comment}
                      </p>
                    </div>

                    {/* Helpful Count */}
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        <span>{review.helpful} people found this helpful</span>
                      </div>
                    </div>

                    {/* Agent Response */}
                    {review.response && (
                      <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                        <div className="flex items-center gap-2 mb-2">
                          <User className="h-4 w-4 text-green-600" />
                          <span className="text-sm font-medium text-green-900">
                            Your Response
                          </span>
                        </div>
                        <p className="text-sm text-green-800">
                          {review.response}
                        </p>
                        <div className="flex justify-end gap-2 mt-3">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600"
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="lg:w-48 flex flex-col gap-2">
                    {!review.response ? (
                      <>
                        <Button size="sm" className="w-full">
                          Respond to Review
                        </Button>
                        <Button variant="outline" size="sm" className="w-full">
                          Mark as Helpful
                        </Button>
                      </>
                    ) : (
                      <Button variant="outline" size="sm" className="w-full">
                        Edit Response
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-red-600 hover:text-red-700"
                    >
                      Report Review
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {/* Empty State for Pending Responses */}
      {activeTab === "pending" && filteredReviews.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No pending reviews
            </h3>
            <p className="text-gray-600">
              {`Great job! You've responded to all customer reviews.`}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
