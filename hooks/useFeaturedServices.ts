import { useGetFeaturedServices } from "@/services/public/publicService";

export const useFeaturedServices = () => {
  const { data, isLoading, error } = useGetFeaturedServices();
  return {
    featuredServices: data?.data || [],
    isFetchingFeaturedServices: isLoading,
    error,
  };
};
