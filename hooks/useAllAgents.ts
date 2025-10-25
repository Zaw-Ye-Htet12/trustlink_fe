import { useGetAllAgents } from "@/services/public/publicService";

export const useAllAgents = () => {
    const { data, isLoading, error } = useGetAllAgents();

    return {
        allAgents: data?.data || [],
        isFetchingAllAgents: isLoading,
        fetchAllAgentsError: error,
    };
}