import { useGetRelatedServices } from "@/services/public/publicService";

export const useRelatedServices = (serviceId: number) => {
    const { data, isLoading, error } = useGetRelatedServices(serviceId);

    return {
        relatedServices: data?.data || [],
        isFetchingRelatedServices: isLoading,
        fetchRelatedServicesError: error,
    };
};
