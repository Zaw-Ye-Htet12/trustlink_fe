// app/customer/reviews/page.tsx
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
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Star,
  Calendar,
  User,
  MapPin,
  Clock,
  MessageCircle,
} from "lucide-react";
import { useState } from "react";

// Mock data for reviewed services and agents
const reviewedServices = [
  {
    id: 1,
    service: "Deep Home Cleaning",
    agent: "Sarah Johnson",
    date: "2024-01-12",
    rating: 5,
    comment:
      "Excellent service! Sarah was very thorough and professional. The house has never been cleaner!",
    price: "$85",
    duration: "3 hours",
    location: "New York, NY",
    reviewDate: "2024-01-13",
    agentRating: 4.8,
    agentReviews: 127,
  },
  {
    id: 2,
    service: "Emergency Plumbing Repair",
    agent: "Mike Chen",
    date: "2024-01-10",
    rating: 4,
    comment:
      "Good work but arrived 15 minutes late. Fixed the issue quickly once here.",
    price: "$120",
    duration: "2 hours",
    location: "Brooklyn, NY",
    reviewDate: "2024-01-11",
    agentRating: 4.9,
    agentReviews: 89,
  },
];

const reviewedAgents = [
  {
    id: 1,
    agent: "David Brown",
    service: "Electrical Services",
    overallRating: 5,
    review:
      "David is amazing! Very knowledgeable and professional. Will definitely hire again.",
    date: "2024-01-08",
    response:
      "Thank you for the kind words! It was a pleasure working with you.",
    agentSince: "2022",
    completedJobs: 156,
    responseTime: "2 hours",
  },
  {
    id: 2,
    agent: "Lisa Wang",
    service: "AC Maintenance",
    overallRating: 4,
    review: "Good service quality but communication could be better.",
    date: "2023-12-21",
    response:
      "Thank you for your feedback. We're working on improving our communication process.",
    agentSince: "2021",
    completedJobs: 203,
    responseTime: "4 hours",
  },
];

const pendingReviews = [
  {
    id: 1,
    service: "Carpet Cleaning",
    agent: "Alex Rodriguez",
    date: "2024-01-14",
    price: "$95",
    duration: "2 hours",
    location: "Manhattan, NY",
    agentRating: 4.7,
  },
  {
    id: 2,
    service: "Furniture Assembly",
    agent: "Maria Garcia",
    date: "2024-01-13",
    price: "$75",
    duration: "1.5 hours",
    location: "Queens, NY",
    agentRating: 4.9,
  },
];

export default function ReviewsPage() {
  const [activeTab, setActiveTab] = useState("services");
  const [ratings, setRatings] = useState<{ [key: number]: number }>({});
  const [comments, setComments] = useState<{ [key: number]: string }>({});

  const handleRatingClick = (reviewId: number, rating: number) => {
    setRatings((prev) => ({ ...prev, [reviewId]: rating }));
  };

  const handleCommentChange = (reviewId: number, comment: string) => {
    setComments((prev) => ({ ...prev, [reviewId]: comment }));
  };

  const handleSubmitReview = (reviewId: number) => {
    console.log("Submitting review:", {
      reviewId,
      rating: ratings[reviewId],
      comment: comments[reviewId],
    });
    // Here you would typically make an API call
  };

  return (
    <div className="min-h-screen bg-gray-50/30 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">My Reviews</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Share your experiences and help the community make better choices
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white border-l-4 border-l-blue-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Total Reviews
                    </p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      {reviewedServices.length + reviewedAgents.length}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
                    <MessageCircle className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-l-4 border-l-amber-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Pending Reviews
                    </p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      {pendingReviews.length}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-amber-50 text-amber-600">
                    <Star className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-l-4 border-l-green-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Average Rating
                    </p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">4.7</p>
                  </div>
                  <div className="p-3 rounded-lg bg-green-50 text-green-600">
                    <User className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs Navigation */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="services" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Service Reviews
              </TabsTrigger>
              <TabsTrigger value="agents" className="flex items-center gap-2">
                <Star className="h-4 w-4" />
                Agent Reviews
              </TabsTrigger>
              <TabsTrigger value="pending" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Pending Reviews
                {pendingReviews.length > 0 && (
                  <Badge variant="secondary" className="ml-1">
                    {pendingReviews.length}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>

            {/* Service Reviews Tab */}
            <TabsContent value="services" className="space-y-6">
              {reviewedServices.map((review) => (
                <Card
                  key={review.id}
                  className="hover:shadow-lg transition-shadow duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                      {/* Service Info */}
                      <div className="flex-1 space-y-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                              {review.service}
                            </h3>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                              <div className="flex items-center gap-1">
                                <User className="h-4 w-4" />
                                <span className="font-medium">
                                  {review.agent}
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                <span>{review.location}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>{review.duration}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-gray-900">
                              {review.price}
                            </p>
                            <p className="text-sm text-gray-500">Total</p>
                          </div>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-5 w-5 ${
                                  i < review.rating
                                    ? "text-amber-400 fill-amber-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">
                            Reviewed on {review.reviewDate}
                          </span>
                        </div>

                        {/* Review Comment */}
                        <div>
                          <p className="text-gray-700 leading-relaxed">
                            {review.comment}
                          </p>
                        </div>
                      </div>

                      {/* Agent Info Sidebar */}
                      <Card className="lg:w-64 bg-gray-50 border-0">
                        <CardContent className="p-4">
                          <div className="text-center">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-lg mx-auto mb-3">
                              {review.agent
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </div>
                            <h4 className="font-semibold text-gray-900">
                              {review.agent}
                            </h4>
                            <div className="flex items-center justify-center gap-1 mt-1 mb-2">
                              <Star className="h-4 w-4 text-amber-400 fill-current" />
                              <span className="text-sm text-gray-600">
                                {review.agentRating} ({review.agentReviews}{" "}
                                reviews)
                              </span>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full"
                            >
                              View Profile
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-2 mt-6 pt-6 border-t">
                      <Button variant="outline" size="sm">
                        Edit Review
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                      >
                        Delete Review
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* Agent Reviews Tab */}
            <TabsContent value="agents" className="space-y-6">
              {reviewedAgents.map((review) => (
                <Card
                  key={review.id}
                  className="hover:shadow-lg transition-shadow duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-6">
                      {/* Agent Avatar */}
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-xl flex-shrink-0">
                        {review.agent
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>

                      {/* Review Content */}
                      <div className="flex-1 space-y-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900">
                              {review.agent}
                            </h3>
                            <p className="text-gray-600 mt-1">
                              {review.service}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1 mb-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-5 w-5 ${
                                    i < review.overallRating
                                      ? "text-amber-400 fill-amber-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <p className="text-sm text-gray-500">
                              {review.date}
                            </p>
                          </div>
                        </div>

                        {/* Review Text */}
                        <div className="space-y-3">
                          <div>
                            <p className="text-gray-700 leading-relaxed">
                              {review.review}
                            </p>
                          </div>

                          {/* Agent Response */}
                          {review.response && (
                            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                              <p className="text-sm font-medium text-blue-900 mb-1">
                                Response from {review.agent}
                              </p>
                              <p className="text-sm text-blue-800">
                                {review.response}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Agent Stats */}
                        <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                          <div className="text-center">
                            <p className="text-sm font-medium text-gray-900">
                              {review.completedJobs}
                            </p>
                            <p className="text-xs text-gray-600">Jobs Done</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm font-medium text-gray-900">
                              {review.agentSince}
                            </p>
                            <p className="text-xs text-gray-600">Agent Since</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm font-medium text-gray-900">
                              {review.responseTime}
                            </p>
                            <p className="text-xs text-gray-600">
                              Avg. Response
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* Pending Reviews Tab */}
            <TabsContent value="pending" className="space-y-6">
              {pendingReviews.map((review) => (
                <Card
                  key={review.id}
                  className="hover:shadow-lg transition-shadow duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Service Info */}
                      <div className="flex-1 space-y-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                              {review.service}
                            </h3>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <User className="h-4 w-4" />
                                <span className="font-medium">
                                  {review.agent}
                                </span>
                                <Badge variant="secondary" className="text-xs">
                                  ⭐ {review.agentRating}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                <span>{review.location}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>{review.date}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xl font-bold text-gray-900">
                              {review.price}
                            </p>
                            <p className="text-sm text-gray-500">
                              {review.duration}
                            </p>
                          </div>
                        </div>

                        {/* Rating Input */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-3">
                            How would you rate this service?
                          </label>
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Button
                                key={star}
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  handleRatingClick(review.id, star)
                                }
                                className={`p-2 h-12 w-12 hover:bg-amber-50 transition-colors ${
                                  ratings[review.id] === star
                                    ? "bg-amber-50"
                                    : ""
                                }`}
                              >
                                <Star
                                  className={`h-6 w-6 ${
                                    star <= (ratings[review.id] || 0)
                                      ? "text-amber-400 fill-amber-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              </Button>
                            ))}
                          </div>
                        </div>

                        {/* Comment Input */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Share your experience
                          </label>
                          <Textarea
                            placeholder="What did you like or dislike about the service? Your review will help others make better choices..."
                            value={comments[review.id] || ""}
                            onChange={(e) =>
                              handleCommentChange(review.id, e.target.value)
                            }
                            className="min-h-[120px] resize-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Submit Actions */}
                    <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
                      <Button variant="outline" size="sm">
                        Skip Review
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleSubmitReview(review.id)}
                        disabled={
                          !ratings[review.id] || !comments[review.id]?.trim()
                        }
                      >
                        Submit Review
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
