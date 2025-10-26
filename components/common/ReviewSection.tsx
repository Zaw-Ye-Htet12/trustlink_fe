// components/common/ReviewSection.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Star,
  MessageCircle,
  User,
  MoreVertical,
  Edit,
  Trash2,
} from "lucide-react";
import { useServiceReviews } from "@/hooks/useServiceReviews";
import { useAgentReviews } from "@/hooks/useAgentReviews";
import { ReviewForm } from "./ReviewForm";
import { useAuthStore } from "@/store/useAuthStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteReview } from "@/hooks/useReviewActions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { Review } from "@/interfaces";

interface ReviewSectionProps {
  serviceId?: number;
  agentId?: number;
  serviceTitle?: string;
  agentName?: string;
}

export function ReviewSection({
  serviceId,
  agentId,
  serviceTitle,
  agentName,
}: ReviewSectionProps) {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [deleteReviewId, setDeleteReviewId] = useState<number | null>(null);
  const { user } = useAuthStore();

  const serviceReviews = useServiceReviews(serviceId || 0);
  const agentReviews = useAgentReviews(agentId || 0);

  const { reviews, isLoading } = serviceId
    ? serviceReviews
    : agentReviews;
  const { onDelete, isDeleteLoading } = useDeleteReview();

  const averageRating = reviews?.length
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : 0;

  const ratingDistribution = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: reviews?.filter((review) => review.rating === stars).length || 0,
    percentage: reviews?.length
      ? (reviews.filter((review) => review.rating === stars).length /
          reviews.length) *
        100
      : 0,
  }));

  const handleEditReview = (review: Review) => {
    setEditingReview(review);
    setShowReviewForm(true);
  };

  const handleDeleteReview = async () => {
    if (!deleteReviewId) return;
    onDelete(deleteReviewId, {
      onSuccess: () => {
        toast.success("Review deleted successfully");
        setDeleteReviewId(null);
      },
      onError: () => {
        toast.error("Failed to delete review");
      },
    });
  };

  const handleCloseReviewForm = () => {
    setShowReviewForm(false);
    setEditingReview(null);
  };

  const isUserReview = (review: Review) => {
    return review.customer?.user?.id === user?.id;
  };

  return (
    <div className="bg-white rounded-2xl p-6 border">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Reviews & Ratings
          </h2>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-2">
              <div className="text-3xl font-bold text-gray-900">
                {averageRating.toFixed(1)}
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="text-gray-600">
                  ({reviews?.length || 0} reviews)
                </span>
              </div>
            </div>
          </div>
        </div>

        <Button
          onClick={() => setShowReviewForm(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Write Review
        </Button>
      </div>

      {/* Rating Distribution */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-2">
          {ratingDistribution.map(({ stars, count, percentage }) => (
            <div key={stars} className="flex items-center gap-3">
              <div className="flex items-center gap-1 w-16">
                <span className="text-sm font-medium w-4">{stars}</span>
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              </div>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-yellow-400 h-2 rounded-full"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="text-sm text-gray-600 w-12">({count})</span>
            </div>
          ))}
        </div>
      </div>

      {/* Review Form Modal */}
      {showReviewForm && (
        <ReviewForm
          serviceId={serviceId}
          agentId={agentId}
          serviceTitle={serviceTitle}
          agentName={agentName}
          reviewToEdit={editingReview}
          onClose={handleCloseReviewForm}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deleteReviewId}
        onOpenChange={() => setDeleteReviewId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Review</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this review? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleteLoading}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteReview}
              disabled={isDeleteLoading}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleteLoading ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Reviews List */}
      <div className="space-y-6">
        {isLoading ? (
          // Loading skeleton
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/6"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : reviews && reviews.length > 0 ? (
          reviews.map((review) => (
            <div
              key={review.id}
              className="pb-6 border-b last:border-b-0 last:pb-0 group"
            >
              <div className="flex gap-4">
                {/* Reviewer Avatar */}
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium text-sm flex-shrink-0">
                  {review.customer?.user?.username?.[0]?.toUpperCase() || (
                    <User className="w-5 h-5" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-gray-900">
                          {review.customer?.user?.username || "Anonymous"}
                        </h4>
                        {isUserReview(review) && (
                          <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                            You
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "fill-gray-300 text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(review.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    {/* Actions Dropdown */}
                    {isUserReview(review) && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => handleEditReview(review)}
                            className="flex items-center gap-2"
                          >
                            <Edit className="h-4 w-4" />
                            Edit Review
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => setDeleteReviewId(review.id)}
                            className="flex items-center gap-2 text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete Review
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>

                  {/* Review Content */}
                  {review.title && (
                    <h5 className="font-medium text-gray-900 mb-1">
                      {review.title}
                    </h5>
                  )}
                  {review.comment && (
                    <p className="text-gray-600 leading-relaxed">
                      {review.comment}
                    </p>
                  )}

                  {/* Edited Badge */}
                  {review.updated_at !== review.created_at && (
                    <p className="text-xs text-gray-500 mt-2">
                      Edited {new Date(review.updated_at).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No Reviews Yet
            </h3>
            <p className="text-gray-600">
              Be the first to share your experience!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
