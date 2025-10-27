// src/hooks/agent/useAgentServices.ts
import {
  useGetAgentServices,
  useCreateAgentService,
  useUpdateAgentService,
  useDeleteAgentService,
} from "@/services/agent/agentService";
import { Service, CreateServiceDto } from "@/interfaces";
import { toast } from "sonner";
import { AxiosError } from "axios";

export const useAgentServices = () => {
  const {
    data: servicesResponse,
    isLoading,
    error,
    refetch,
  } = useGetAgentServices();

  const services: Service[] = servicesResponse?.data || [];

  return {
    services,
    isLoading,
    error,
    refetch,
  };
};

export const useCreateService = () => {
  const { mutate: createService, isPending: isCreating } =
    useCreateAgentService();

  const createNewService = (
    data: CreateServiceDto,
    options?: {
      onSuccess?: () => void;
      onError?: (error: string) => void;
    }
  ) => {
    createService(data, {
      onSuccess: () => {
        toast.success("Service created successfully!");
        options?.onSuccess?.();
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          const message =
            (error.response?.data as { message?: string })?.message ||
            "Failed to create service.";
          toast.error(message);
        }
      },
    });
  };

  return {
    createService: createNewService,
    isCreating,
  };
};

export const useUpdateService = (serviceId: number) => {
  const { mutate: updateService, isPending: isUpdating } =
    useUpdateAgentService(serviceId);

  const updateExistingService = (
    data: CreateServiceDto,
    options?: {
      onSuccess?: () => void;
      onError?: (error: string) => void;
    }
  ) => {
    updateService(data, {
      onSuccess: () => {
        toast.success("Service updated successfully!");
        options?.onSuccess?.();
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          const message =
            (error.response?.data as { message?: string })?.message ||
            "Failed to update service.";
          toast.error(message);
        }
      },
    });
  };

  return {
    updateService: updateExistingService,
    isUpdating,
  };
};

export const useDeleteService = () => {
  const { mutate: deleteService, isPending: isDeleting } =
    useDeleteAgentService();

  const deleteExistingService = (
    serviceId: number,
    options?: {
      onSuccess?: () => void;
      onError?: (error: string) => void;
    }
  ) => {
    deleteService({serviceId}, {
      onSuccess: () => {
        toast.success("Service deleted successfully!");
        options?.onSuccess?.();
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          const message =
            (error.response?.data as { message?: string })?.message ||
            "Failed to delete service.";
          toast.error(message);
        }
      },
    });
  };

  return {
    deleteService: deleteExistingService,
    isDeleting,
  };
};
