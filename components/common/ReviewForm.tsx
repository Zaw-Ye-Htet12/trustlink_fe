// components/common/ReviewForm.tsx
"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { ReviewFormData, reviewFormSchema } from "@/validations/common/review";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Star, X, Send, Save } from "lucide-react";
import { toast } from "sonner";
import { LoginPrompt } from "./LoginPrompt";
import { useCreateReview, useUpdateReview } from "@/hooks/useReviewActions";
import { useEffect } from "react";
import { Review } from "@/interfaces";

interface ReviewFormProps {
  serviceId?: number;
  agentId?: number;
  serviceTitle?: string;
  agentName?: string;
  reviewToEdit?: Review | null;
  onClose: () => void;
}

export function ReviewForm({
  serviceId,
  agentId,
  serviceTitle,
  agentName,
  reviewToEdit,
  onClose,
}: ReviewFormProps) {
  const { isAuthenticated } = useAuthStore();
  const {
    reviewForm: createForm,
    onCreateSubmit,
    isCreateLoading,
  } = useCreateReview(serviceId, agentId);

  const {
    reviewForm: updateForm,
    onUpdateSubmit,
    isUpdateLoading,
  } = useUpdateReview(reviewToEdit?.id, serviceId, agentId);

  // Use the appropriate form based on whether we're editing
  const form = reviewToEdit ? updateForm : createForm;
  const isLoading = reviewToEdit ? isUpdateLoading : isCreateLoading;
  const isEditing = !!reviewToEdit;

  // Pre-fill form when editing
  useEffect(() => {
    if (reviewToEdit) {
      updateForm.reset({
        rating: reviewToEdit.rating,
        title: reviewToEdit.title || "",
        comment: reviewToEdit.comment,
      });
    }
  }, [reviewToEdit, updateForm]);

  // Handle unauthenticated users
  if (!isAuthenticated) {
    return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <LoginPrompt
            title="Sign in to leave a review"
            description="Please sign in to share your experience and help others make better decisions."
            onClose={onClose}
          />
        </DialogContent>
      </Dialog>
    );
  }

  // Rating field interaction
  const handleRatingChange = (rating: number) => {
    form.setValue("rating", rating, { shouldValidate: true });
  };

  // Form submission
  const onSubmit = async (data: ReviewFormData) => {
    if (!agentId && !serviceId) {
      toast.error("Missing agent or service ID for review.");
      return;
    }

    if (isEditing) {
      onUpdateSubmit(data, {
        onSuccess: () => {
          toast.success("✅ Review updated successfully!");
          onClose();
        },
      });
    } else {
      onCreateSubmit(
        { ...data, agentId: agentId!, serviceId },
        {
          onSuccess: () => {
            toast.success("✅ Review submitted successfully!");
            onClose();
          },
        }
      );
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-xl">
                {isEditing ? "Edit Review" : "Write a Review"}
              </DialogTitle>
              <DialogDescription className="mt-2">
                {isEditing
                  ? "Update your review for " + (serviceTitle || agentName)
                  : "Share your experience with " + (serviceTitle || agentName)}
              </DialogDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
            noValidate
          >
            {/* ⭐ Rating Field */}
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Overall Rating *</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => handleRatingChange(star)}
                          disabled={isLoading}
                          className={`p-1 transition-all duration-200 hover:scale-110 ${
                            field.value >= star
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        >
                          <Star
                            className={`h-8 w-8 ${
                              field.value >= star ? "fill-current" : ""
                            }`}
                          />
                        </button>
                      ))}
                      <span className="ml-2 text-sm text-gray-600">
                        {field.value > 0 && `${field.value}.0`}
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 🏷️ Title Field */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Review Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Summarize your experience..."
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormDescription>
                    Optional — helps others understand your review quickly.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 💬 Comment Field */}
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Detailed Review *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="What did you like or dislike?"
                      className="min-h-[120px] resize-none"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormDescription>
                    Minimum 10 characters. Be honest and specific.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 🧭 Guidelines */}
            <div className="rounded-lg bg-blue-50 p-4 border border-blue-200">
              <h4 className="font-medium text-blue-900 mb-2">
                Review Guidelines
              </h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Be honest and specific about your experience</li>
                <li>• Focus on service quality and professionalism</li>
                <li>• Avoid offensive or personal remarks</li>
                <li>• Your review will be publicly visible</li>
              </ul>
            </div>

            {/* 🚀 Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isLoading}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading || !form.formState.isValid}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    {isEditing ? "Updating..." : "Submitting..."}
                  </>
                ) : (
                  <>
                    {isEditing ? (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Update Review
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Submit Review
                      </>
                    )}
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
