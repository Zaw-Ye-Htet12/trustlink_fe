import { useGetTrendingServices } from "@/services/public/publicService";

export const useTrendingServices = () => {
  const { data, isLoading, error } = useGetTrendingServices();
  return {
    trendingServices: data?.data || [],
    isFetchingTrendingServices: isLoading,
    error,
  };
};
