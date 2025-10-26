// src/hooks/useReviewActions.ts
import {
  useCustomerCreateReview,
  useCustomerDeleteReview,
  useCustomerUpdateReview,
} from "@/services/customer/customerService";
import { ReviewFormData, reviewFormSchema } from "@/validations/common/review";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface MutationOptions {
  onSuccess?: () => void;
  onError?: (error: AxiosError) => void;
}

export const useCreateReview = (serviceId?: number, agentId?: number) => {
  const reviewForm = useForm<ReviewFormData>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      rating: 0,
      title: "",
      comment: "",
    },
  });

  const { mutate: createReview, isPending: isCreateLoading } =
    useCustomerCreateReview(serviceId, agentId);

  const onCreateSubmit = (
    data: ReviewFormData & { agentId: number; serviceId?: number },
    options?: MutationOptions
  ) => {
    createReview(data, {
      onSuccess: () => {
        toast.success("✅ Review submitted successfully!");
        reviewForm.reset();
        options?.onSuccess?.();
      },
      onError: (error) => {
        if (error instanceof AxiosError && error.response) {
          const apiMessage =
            error.response.data.message ||
            "Failed to submit your review. Please try again.";
          toast.error(`❌ ${apiMessage}`);
        } else {
          toast.error("❌ Failed to submit review. Please try again.");
        }
      },
    });
  };

  return { reviewForm, onCreateSubmit, isCreateLoading };
};

export const useUpdateReview = (
  reviewId?: number,
  serviceId?: number,
  agentId?: number
) => {
  const reviewForm = useForm<ReviewFormData>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      rating: 0,
      title: "",
      comment: "",
    },
  });

  const { mutate: updateReview, isPending: isUpdateLoading } =
    useCustomerUpdateReview(reviewId, serviceId, agentId);

  const onUpdateSubmit = (data: ReviewFormData, options?: MutationOptions) => {
    if (!reviewId) {
      toast.error("Review ID is required for update");
      return;
    }

    updateReview(data, {
      onSuccess: () => {
        toast.success("✅ Review updated successfully!");
        options?.onSuccess?.();
      },
      onError: (error) => {
        if (error instanceof AxiosError && error.response) {
          const apiMessage =
            error.response.data.message ||
            "Failed to update your review. Please try again.";
          toast.error(`❌ ${apiMessage}`);
        } else {
          toast.error("❌ Failed to update review. Please try again.");
        }
      },
    });
  };

  return { reviewForm, onUpdateSubmit, isUpdateLoading };
};

export const useDeleteReview = () => {
  const { mutate: deleteReview, isPending: isDeleteLoading } =
    useCustomerDeleteReview();

  const onDelete = (reviewId: number, options?: MutationOptions) => {
    deleteReview({ reviewId }, {
      onSuccess: () => {
        toast.success("✅ Review deleted successfully!");
        options?.onSuccess?.();
      },
      onError: (error) => {
        if (error instanceof AxiosError && error.response) {
          const apiMessage =
            error.response.data.message ||
            "Failed to delete your review. Please try again.";
          toast.error(`❌ ${apiMessage}`);
        } else {
          toast.error("❌ Failed to delete review. Please try again.");
        }
      },
    });
  };

  return { onDelete, isDeleteLoading };
};
