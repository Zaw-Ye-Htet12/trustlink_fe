import { useGetAllServices } from "@/services/public/publicService";

export const useAllServices = () => {
    const { data, isLoading, error } = useGetAllServices();

    return {
        allServices: data?.data || [],
        isFetchingAllServices: isLoading,
        fetchAllServicesError: error,
    };
}