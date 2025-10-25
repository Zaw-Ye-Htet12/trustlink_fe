import { useGetAgentReviews } from "@/services/public/publicService";
export const useAgentReviews = (agentId: number) => {
  const { data, isLoading, error } = useGetAgentReviews(agentId);
  return { reviews: data?.data || [], isLoading, error };
};
