import { useGetFeaturedAgents } from "@/services/public/publicService";

export const useFeaturedAgents = () => {
    const { data, isLoading, error } = useGetFeaturedAgents();
    console.log("Featured Agents Data:", data);
    return {
        featuredAgents: data?.data || [],
        isFetchingFeaturedAgents: isLoading,
        error,
    };
}