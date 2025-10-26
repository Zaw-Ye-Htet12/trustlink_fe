// src/hooks/customer/useCustomerReviews.ts
import { Review } from "@/interfaces";
import { useCustomerGetReviews } from "@/services/customer/customerService";

export const useCustomerReviews = () => {
  const { data, isLoading, error, refetch } = useCustomerGetReviews();

  const reviews = data?.data || [];

  // Separate reviews by type
  const serviceReviews = reviews.filter((review: Review) => review.service);
  const agentReviews = reviews.filter((review: Review) => !review.service);

  // Calculate statistics
  const totalReviews = reviews.length;
  const averageRating =
    reviews.length > 0
      ? reviews.reduce(
          (sum: number, review: Review) => sum + review.rating,
          0
        ) / reviews.length
      : 0;

  return {
    reviews,
    serviceReviews,
    agentReviews,
    totalReviews,
    averageRating,
    isLoading,
    error,
    refetch,
  };
};
