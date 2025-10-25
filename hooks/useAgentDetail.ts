import { useGetAgentById } from "@/services/public/publicService";

export const useAgentDetail = (agentId: number) => {
    const { data, isLoading, error } = useGetAgentById(agentId);
    
    return {
        agentDetail: data?.data,
        isFetchingAgentDetail: isLoading,
        fetchAgentDetailError: error,
    };
}
