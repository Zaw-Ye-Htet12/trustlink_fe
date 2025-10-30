// src/hooks/admin/useAdminDashboard.ts
import { useGetAdminDashboard } from "@/services/admin/adminService";
import { toast } from "sonner";

export const useAdminDashboard = () => {
  const { data, isLoading, error, refetch } = useGetAdminDashboard();

  if (error) {
    toast.error("Failed to load dashboard data");
  }

  return {
    dashboard: data?.data,
    isLoading,
    error,
    refetch,
  };
};
