// src/hooks/admin/useAdminUsers.ts
import {
  useGetAllUsers,
  useUpdateUserStatus,
  useUserDelete,
} from "@/services/admin/adminService";
import { User } from "@/interfaces";
import { toast } from "sonner";
import { AxiosError } from "axios";

export const useAdminUsers = () => {
  const { data, isLoading, error, refetch } = useGetAllUsers();

  const users: User[] = data?.data || [];

  return {
    users,
    isLoading,
    error,
    refetch,
  };
};

export const useUpdateUser = () => {
  const { mutate: updateUserStatus, isPending: isUpdating } =
    useUpdateUserStatus();

  const updateUser = (
    userId: number,
    data: { userId: number; is_active: boolean },
    options?: {
      onSuccess?: () => void;
      onError?: (error: string) => void;
    }
  ) => {
    updateUserStatus(data, {
      onSuccess: () => {
        toast.success("User status updated successfully!");
        options?.onSuccess?.();
      },
      onError: (error) => {
        const message =
          error instanceof AxiosError
            ? error.response?.data?.message || "Failed to update user status"
            : "Failed to update user status";
        toast.error(message);
        options?.onError?.(message);
      },
    });
  };

  return {
    updateUser,
    isUpdating,
  };
};

export const useDeleteUser = () => {
  const { mutate: deleteUser, isPending: isDeleting } = useUserDelete();

  const removeUser = (
    userId: number,
    options?: {
      onSuccess?: () => void;
      onError?: (error: string) => void;
    }
  ) => {
    deleteUser(
      { userId },
      {
        onSuccess: () => {
          toast.success("User deleted successfully!");
          options?.onSuccess?.();
        },
        onError: (error) => {
          const message =
            error instanceof AxiosError
              ? error.response?.data?.message || "Failed to delete user"
              : "Failed to delete user";
          toast.error(message);
          options?.onError?.(message);
        },
      }
    );
  };

  return {
    deleteUser: removeUser,
    isDeleting,
  };
};
