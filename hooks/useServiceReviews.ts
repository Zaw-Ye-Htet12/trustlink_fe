import { useGetServiceReviews } from "@/services/public/publicService";
export const useServiceReviews = (serviceId: number) => {
  const { data, isLoading, error } = useGetServiceReviews(serviceId);
  return { reviews: data?.data || [], isLoading, error };
};
