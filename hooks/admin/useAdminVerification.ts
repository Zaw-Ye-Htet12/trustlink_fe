// src/hooks/admin/useAdminVerifications.ts
import {
  useGetAllVerificationDocs,
  useGetVerificationDocById,
} from "@/services/admin/adminService";
import { VerificationDocument } from "@/interfaces";
import { toast } from "sonner";

export const useAdminVerifications = () => {
  const { data, isLoading, error, refetch } = useGetAllVerificationDocs();

  const documents: VerificationDocument[] = data?.data || [];

  if (error) {
    toast.error("Failed to load verification documents");
  }

  return {
    documents,
    isLoading,
    error,
    refetch,
  };
};

export const useAdminVerification = (docId: number) => {
  const { data, isLoading, error, refetch } = useGetVerificationDocById(docId);

  const document = data?.data;

  if (error) {
    toast.error("Failed to load verification document");
  }

  return {
    document,
    isLoading,
    error,
    refetch,
  };
};
