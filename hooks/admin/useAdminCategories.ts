// src/hooks/admin/useAdminCategories.ts
import {
    useCategoryCreate,
  useCategoryDelete,
  useCategoryUpdate,
  useGetAllCategories,
} from "@/services/admin/adminService";
import { Category } from "@/interfaces";
import { toast } from "sonner";
import { AxiosError } from "axios";

export const useAdminCategories = () => {
  const { data, isLoading, error, refetch } = useGetAllCategories();

  const categories: Category[] = data?.data || [];

  return {
    categories,
    isLoading,
    error,
    refetch,
  };
};

export const useCreateCategory = () => {
  const { mutate: createCategory, isPending: isCreating } = useCategoryCreate();

  const createNewCategory = (
    data: {
      name: string;
      description?: string;
      slug: string;
      is_active?: boolean;
    },
    options?: {
      onSuccess?: () => void;
      onError?: (error: string) => void;
    }
  ) => {
    createCategory(data, {
      onSuccess: () => {
        toast.success("Category created successfully!");
        options?.onSuccess?.();
      },
      onError: (error) => {
        const message =
          error instanceof AxiosError
            ? error.response?.data?.message || "Failed to create category"
            : "Failed to create category";
        toast.error(message);
        options?.onError?.(message);
      },
    });
  };

  return {
    createCategory: createNewCategory,
    isCreating,
  };
};

export const useUpdateCategory = (categoryId: number) => {
  const { mutate: updateCategory, isPending: isUpdating } =
    useCategoryUpdate(categoryId);

  const updateExistingCategory = (
    data: Partial<{
      name: string;
      description?: string;
      slug: string;
      is_active?: boolean;
    }>,
    options?: {
      onSuccess?: () => void;
      onError?: (error: string) => void;
    }
  ) => {
    updateCategory(data, {
      onSuccess: () => {
        toast.success("Category updated successfully!");
        options?.onSuccess?.();
      },
      onError: (error) => {
        const message =
          error instanceof AxiosError
            ? error.response?.data?.message || "Failed to update category"
            : "Failed to update category";
        toast.error(message);
        options?.onError?.(message);
      },
    });
  };

  return {
    updateCategory: updateExistingCategory,
    isUpdating,
  };
};

export const useDeleteCategory = () => {
  const { mutate: deleteCategory, isPending: isDeleting } = useCategoryDelete();

  const removeCategory = (
    categoryId: number,
    options?: {
      onSuccess?: () => void;
      onError?: (error: string) => void;
    }
  ) => {
    deleteCategory(
      { categoryId },
      {
        onSuccess: () => {
          toast.success("Category deleted successfully!");
          options?.onSuccess?.();
        },
        onError: (error) => {
          const message =
            error instanceof AxiosError
              ? error.response?.data?.message || "Failed to delete category"
              : "Failed to delete category";
          toast.error(message);
          options?.onError?.(message);
        },
      }
    );
  };

  return {
    deleteCategory: removeCategory,
    isDeleting,
  };
};
