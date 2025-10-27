// src/hooks/useAgentVerification.ts
import {
  useGetVerificationStatus,
  useSubmitVerification,
} from "@/services/agent/agentService";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useState } from "react";
import { VerificationDocumentData } from "@/interfaces";

export const useAgentVerification = () => {
  const {
    data: verificationData,
    isLoading,
    refetch,
  } = useGetVerificationStatus();
  const { mutate: submitVerification, isPending: isSubmitting } =
    useSubmitVerification();
  const [showDocumentForm, setShowDocumentForm] = useState(false);

  const submitDocument = (data: VerificationDocumentData) => {
    submitVerification(data, {
      onSuccess: () => {
        toast.success("Document submitted successfully!");
        refetch();
        setShowDocumentForm(false);
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          const message =
            (error.response?.data as { message?: string })?.message ||
            "Failed to submit document.";
          toast.error(message);
        }
      },
    });
  };

  return {
    verificationStatus: verificationData?.data,
    isLoading,
    isSubmitting,
    submitDocument,
    refetch,
    showDocumentForm,
    setShowDocumentForm,
  };
};
