import { useGetPlatformStatistics } from "@/services/public/publicService";

export const usePlatformStatistics = () => {
  const { data, isLoading, error } = useGetPlatformStatistics();
  return {
    platformStatistics: data?.data || {},
    isFetchingPlatformStatistics: isLoading,
    error,
  };
};
