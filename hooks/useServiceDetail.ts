import { useGetServiceById } from "@/services/public/publicService";

export const useServiceDetail = (serviceId: number) => {
    const { data, isLoading, error } = useGetServiceById(serviceId);

    return {
        serviceDetail: data?.data,
        isFetchingServiceDetail: isLoading,
        fetchServiceDetailError: error,
    };
}