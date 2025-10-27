// app/agent/reviews/page.tsx
"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  Search,
  Filter,
  Download,
  MessageCircle,
  Calendar,
  User,
  Loader2,
} from "lucide-react";
import { useAgentReviews } from "@/hooks/agent/useAgentReviews";
import { ReviewStats } from "@/components/common/ReviewStats";
import { ReviewCard } from "@/components/common/ReviewCard";

export default function AgentReviewsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [dateFilter, setDateFilter] = useState<string>("all");

  const { reviews, recentReviews, stats, responseRate, isLoading, error } =
    useAgentReviews();

  // Filter reviews based on search and filters
  const filteredReviews = reviews.filter((review) => {
    // Search filter
    const matchesSearch =
      searchTerm === "" ||
      review.customer?.user?.username
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      review.comment?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.service?.title?.toLowerCase().includes(searchTerm.toLowerCase());

    // Rating filter
    const matchesRating =
      ratingFilter === null || review.rating === ratingFilter;

    // Date filter (simplified - you might want to implement more sophisticated date filtering)
    const matchesDate = dateFilter === "all" || true; // Implement date filtering logic

    return matchesSearch && matchesRating && matchesDate;
  });

  // Get reviews for each tab
  const getTabReviews = () => {
    switch (activeTab) {
      case "recent":
        return recentReviews;
      case "5star":
        return filteredReviews.filter((review) => review.rating === 5);
      case "4star":
        return filteredReviews.filter((review) => review.rating === 4);
      case "3star":
        return filteredReviews.filter((review) => review.rating === 3);
      case "1-2star":
        return filteredReviews.filter((review) => review.rating <= 2);
      default:
        return filteredReviews;
    }
  };

  const tabReviews = getTabReviews();

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50/30 py-8 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <MessageCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Failed to Load Reviews
            </h3>
            <p className="text-gray-600 mb-4">
              There was an error loading your reviews. Please try again.
            </p>
            <Button onClick={() => window.location.reload()}>Retry</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50/30 py-8 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
          <span className="text-gray-600">Loading reviews...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/30 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Customer Reviews
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Manage and respond to customer feedback to build trust and improve
            your services
          </p>
        </div>

        {/* Stats Overview */}
        <div className="mb-8">
          <ReviewStats stats={stats} responseRate={responseRate} />
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Filters and Search */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                {/* Search */}
                <div className="relative w-full lg:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search reviews..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-2">
                  <select
                    value={
                      ratingFilter === null ? "all" : ratingFilter.toString()
                    }
                    onChange={(e) =>
                      setRatingFilter(
                        e.target.value === "all"
                          ? null
                          : parseInt(e.target.value)
                      )
                    }
                    className="border rounded-md px-3 py-2 text-sm"
                  >
                    <option value="all">All Ratings</option>
                    <option value="5">5 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="2">1-2 Stars</option>
                  </select>

                  <select
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="border rounded-md px-3 py-2 text-sm"
                  >
                    <option value="all">All Time</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                    <option value="quarter">This Quarter</option>
                  </select>

                  <Button variant="outline" size="sm" className="gap-2">
                    <Filter className="h-4 w-4" />
                    More Filters
                  </Button>

                  <Button variant="outline" size="sm" className="gap-2">
                    <Download className="h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6">
              <TabsTrigger value="all" className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                All Reviews
                <Badge variant="secondary" className="ml-1">
                  {reviews.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="recent" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Recent
              </TabsTrigger>
              <TabsTrigger value="5star" className="flex items-center gap-2">
                <Star className="h-4 w-4 text-amber-400 fill-amber-400" />5
                Stars
                <Badge variant="secondary" className="ml-1">
                  {reviews.filter((r) => r.rating === 5).length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="4star" className="flex items-center gap-2">
                <Star className="h-4 w-4 text-amber-400 fill-amber-400" />4
                Stars
                <Badge variant="secondary" className="ml-1">
                  {reviews.filter((r) => r.rating === 4).length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="3star" className="flex items-center gap-2">
                <Star className="h-4 w-4 text-amber-400 fill-amber-400" />3
                Stars
                <Badge variant="secondary" className="ml-1">
                  {reviews.filter((r) => r.rating === 3).length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="1-2star" className="flex items-center gap-2">
                <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                1-2 Stars
                <Badge variant="secondary" className="ml-1">
                  {reviews.filter((r) => r.rating <= 2).length}
                </Badge>
              </TabsTrigger>
            </TabsList>

            {/* Reviews Content */}
            <TabsContent value={activeTab} className="space-y-6">
              {tabReviews.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No Reviews Found
                    </h3>
                    <p className="text-gray-600">
                      {searchTerm || ratingFilter || dateFilter !== "all"
                        ? "No reviews match your current filters. Try adjusting your search criteria."
                        : "You haven't received any reviews yet. Complete services to get feedback from customers."}
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-6">
                  {/* Results Count */}
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">
                      Showing {tabReviews.length} of {reviews.length} reviews
                    </p>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>Sort by:</span>
                      <select className="border-none bg-transparent text-gray-900 font-medium">
                        <option>Newest First</option>
                        <option>Oldest First</option>
                        <option>Highest Rating</option>
                        <option>Lowest Rating</option>
                      </select>
                    </div>
                  </div>

                  {/* Reviews List */}
                  <div className="space-y-4">
                    {tabReviews.map((review) => (
                      <ReviewCard
                        key={review.id}
                        review={review}
                        onReply={(reviewId) => {
                          // Implement reply functionality
                          console.log("Reply to review:", reviewId);
                        }}
                      />
                    ))}
                  </div>

                  {/* Load More (if needed) */}
                  {tabReviews.length < filteredReviews.length && (
                    <div className="text-center">
                      <Button variant="outline">Load More Reviews</Button>
                    </div>
                  )}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
