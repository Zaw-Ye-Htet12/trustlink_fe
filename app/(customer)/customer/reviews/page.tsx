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
  MessageCircle,
  Loader2,
} from "lucide-react";
import { useState } from "react";
import { Review } from "@/interfaces";
import { useCustomerReviews } from "@/hooks/useCustomerReviews";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useCustomerUpdateReview } from "@/services/customer/customerService";
import { useDeleteReview } from "@/hooks/useReviewActions";
import Link from "next/link";

export default function ReviewsPage() {
  const [activeTab, setActiveTab] = useState("services");

  const {
    serviceReviews,
    agentReviews,
    totalReviews,
    averageRating,
    isLoading: reviewsLoading,
    refetch, // ✅ we’ll use this after update/delete
  } = useCustomerReviews();

  const { isDeleteLoading, onDelete } = useDeleteReview();

  const handleDeleteReview = (reviewId: number) => {
    if (confirm("Are you sure you want to delete this review?")) {
      onDelete(reviewId, {
        onSuccess: () => {
          refetch(); // ✅ Refresh after delete
        },
      });
    }
  };

  if (reviewsLoading) {
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">My Reviews</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Share your experiences and help the community make better choices
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-white border-l-4 border-l-blue-500">
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Reviews
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {totalReviews}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
                <MessageCircle className="h-6 w-6" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-l-4 border-l-green-500">
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Average Rating
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {averageRating.toFixed(1)}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-green-50 text-green-600">
                <Star className="h-6 w-6" />
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
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="services" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Service Reviews ({serviceReviews.length})
            </TabsTrigger>
            <TabsTrigger value="agents" className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              Agent Reviews ({agentReviews.length})
            </TabsTrigger>
          </TabsList>

          {/* Service Reviews Tab */}
          <TabsContent value="services" className="space-y-6">
            {serviceReviews.length === 0 ? (
              <EmptyState type="service" />
            ) : (
              serviceReviews.map((review: Review) => (
                <ReviewCard
                  key={review.id}
                  review={review}
                  onDelete={handleDeleteReview}
                  type="service"
                  refetch={refetch}
                />
              ))
            )}
          </TabsContent>

          {/* Agent Reviews Tab */}
          <TabsContent value="agents" className="space-y-6">
            {agentReviews.length === 0 ? (
              <EmptyState type="agent" />
            ) : (
              agentReviews.map((review: Review) => (
                <ReviewCard
                  key={review.id}
                  review={review}
                  onDelete={handleDeleteReview}
                  type="agent"
                  refetch={refetch}
                />
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

/* ---------------------------- ReviewCard ---------------------------- */
interface ReviewCardProps {
  review: Review;
  onDelete: (id: number) => void;
  type: "service" | "agent";
  refetch: () => void; // ✅ added refetch
}

const ReviewCard = ({ review, onDelete, type, refetch }: ReviewCardProps) => {
  const { mutate: updateReview, isPending: isUpdating } =
    useCustomerUpdateReview(review.id);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: review.title || "",
    rating: review.rating,
    comment: review.comment || "",
  });

  const handleSave = () => {
    updateReview(editData, {
      onSuccess: () => {
        toast.success("✅ Review updated successfully!");
        setIsEditing(false);
        refetch(); // ✅ refresh the updated list
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          const message =
            (error.response?.data as { message?: string })?.message ||
            "Failed to update review";
          toast.error(message);
        }
      },
    });
  };

  const handleCancel = () => {
    setEditData({
      title: review.title || "",
      rating: review.rating,
      comment: review.comment || "",
    });
    setIsEditing(false);
  };

  const getInitials = (name?: string) =>
    name
      ? name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
      : "A";

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-start gap-6">
          <div className="flex-1 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.title}
                    onChange={(e) =>
                      setEditData((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    className="text-xl font-semibold text-gray-900 mb-2 border rounded px-2 py-1 w-full"
                    placeholder="Review title"
                  />
                ) : (
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {review.title ||
                      `Review for ${
                        type === "service"
                          ? review.service?.title
                          : review.agent?.user?.username
                      }`}
                  </h3>
                )}
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span className="font-medium">
                      {review.agent?.user?.username || "Unknown Agent"}
                    </span>
                  </div>
                  {type === "service" && review.service && (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{review.service.title}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(review.created_at)}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">
                  {review.rating}.0
                </div>
                <div className="flex items-center gap-1 justify-end">
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
              </div>
            </div>

            {/* Comment Section */}
            <div>
              {isEditing ? (
                <Textarea
                  value={editData.comment}
                  onChange={(e) =>
                    setEditData((prev) => ({
                      ...prev,
                      comment: e.target.value,
                    }))
                  }
                  className="min-h-[100px]"
                  placeholder="Share your experience..."
                />
              ) : (
                <p className="text-gray-700 leading-relaxed">
                  {review.comment || "No comment provided."}
                </p>
              )}
            </div>

            {/* Rating Edit */}
            {isEditing && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating
                </label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Button
                      key={star}
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        setEditData((prev) => ({ ...prev, rating: star }))
                      }
                      className={`p-2 h-10 w-10 hover:bg-amber-50 transition-colors ${
                        editData.rating === star ? "bg-amber-50" : ""
                      }`}
                    >
                      <Star
                        className={`h-5 w-5 ${
                          star <= editData.rating
                            ? "text-amber-400 fill-amber-400"
                            : "text-gray-300"
                        }`}
                      />
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Agent Info Sidebar */}
          <Card className="lg:w-64 bg-gray-50 border-0">
            <CardContent className="p-4 text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-lg mx-auto mb-3">
                {getInitials(review.agent?.user?.username)}
              </div>
              <h4 className="font-semibold text-gray-900">
                {review.agent?.user?.username || "Unknown Agent"}
              </h4>
              <div className="flex items-center justify-center gap-1 mt-1 mb-2">
                <Star className="h-4 w-4 text-amber-400 fill-current" />
                <span className="text-sm text-gray-600">
                  ({review.agent?.total_reviews || 0} reviews)
                </span>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                <Link href={`/agents/${review.agent?.id}`}>View Profile</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 mt-6 pt-6 border-t">
          {isEditing ? (
            <>
              <Button variant="outline" size="sm" onClick={handleCancel}>
                Cancel
              </Button>
              <Button size="sm" onClick={handleSave} disabled={isUpdating}>
                {isUpdating ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Save"
                )}
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
              >
                Edit Review
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-red-600 hover:text-red-700"
                onClick={() => onDelete(review.id)}
                disabled={isUpdating}
              >
                Delete Review
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

/* -------------------------- Empty State Card -------------------------- */
const EmptyState = ({ type }: { type: "service" | "agent" }) => (
  <Card>
    <CardContent className="p-8 text-center">
      <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {type === "service" ? "No Service Reviews Yet" : "No Agent Reviews Yet"}
      </h3>
      <p className="text-gray-600">
        {type === "service"
          ? "You have not reviewed any services yet. Complete a service and share your experience!"
          : "You have not reviewed any agents yet. Work with an agent and share your feedback!"}
      </p>
    </CardContent>
  </Card>
);
