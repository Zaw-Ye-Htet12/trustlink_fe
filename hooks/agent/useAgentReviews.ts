// src/hooks/agent/useAgentReviews.ts
import {
  useGetAgentReviews,
  useGetAgentReviewSummary,
} from "@/services/agent/agentService";
import { Review } from "@/interfaces";

export interface ReviewStatsInt {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    rating: number;
    count: number;
    percentage: number;
  }[];
}

export const useAgentReviews = () => {
  const {
    data: reviewsResponse,
    isLoading: reviewsLoading,
    error: reviewsError,
  } = useGetAgentReviews();
  const {
    data: summaryResponse,
    isLoading: summaryLoading,
    error: summaryError,
  } = useGetAgentReviewSummary();

  const reviews: Review[] = reviewsResponse?.data || [];
  const summary = summaryResponse?.data || {
    average_rating: 0,
    total_reviews: 0,
  };

  // Calculate rating distribution
  const ratingDistribution = [1, 2, 3, 4, 5].map((rating) => {
    const count = reviews.filter((review) => review.rating === rating).length;
    const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;

    return {
      rating,
      count,
      percentage,
    };
  });

  // Sort reviews by date (newest first)
  const sortedReviews = [...reviews].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  // Get recent reviews (last 10)
  const recentReviews = sortedReviews.slice(0, 10);

  // Calculate response rate (mock for now - you might want to add this to your backend)
  const responseRate =
    (reviews.filter((review) => review.comment).length / reviews.length) * 100;

  const stats: ReviewStatsInt = {
    averageRating: summary.average_rating || 0,
    totalReviews: summary.total_reviews || 0,
    ratingDistribution,
  };

  return {
    reviews: sortedReviews,
    recentReviews,
    stats,
    responseRate: isNaN(responseRate) ? 0 : Math.round(responseRate),
    isLoading: reviewsLoading || summaryLoading,
    error: reviewsError || summaryError,
  };
};
