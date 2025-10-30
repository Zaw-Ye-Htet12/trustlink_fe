// src/hooks/admin/useAdminAgents.ts
import {
  useGetAllAgents,
  useGetAgentById,
  useApproveAgent,
  useRejectAgent,
} from "@/services/admin/adminService";
import { AgentProfile } from "@/interfaces";
import { toast } from "sonner";
import { AxiosError } from "axios";

export const useAdminAgents = () => {
  const { data, isLoading, error, refetch } = useGetAllAgents();

  const agents: AgentProfile[] = data?.data || [];

  return {
    agents,
    isLoading,
    error,
    refetch,
  };
};

export const useAdminAgent = (agentId: number) => {
  const { data, isLoading, error, refetch } = useGetAgentById(agentId);

  const agent = data?.data?.agent;

  return {
    agent,
    isLoading,
    error,
    refetch,
  };
};

export const useAgentVerification = () => {
  const { mutate: approveAgent, isPending: isApproving } = useApproveAgent();
  const { mutate: rejectAgent, isPending: isRejecting } = useRejectAgent();

  const approveAgentVerification = (
    agentId: number,
    adminNotes?: string,
    options?: {
      onSuccess?: () => void;
      onError?: (error: string) => void;
    }
  ) => {
    approveAgent(
      { admin_notes: adminNotes, agentId: agentId },
      {
        onSuccess: () => {
          toast.success("Agent approved successfully!");
          options?.onSuccess?.();
        },
        onError: (error) => {
          const message =
            error instanceof AxiosError
              ? error.response?.data?.message || "Failed to approve agent"
              : "Failed to approve agent";
          toast.error(message);
          options?.onError?.(message);
        },
      }
    );
  };

  const rejectAgentVerification = (
    agentId: number,
    adminNotes?: string,
    options?: {
      onSuccess?: () => void;
      onError?: (error: string) => void;
    }
  ) => {
    rejectAgent(
      { admin_notes: adminNotes, agentId: agentId },
      {
        onSuccess: () => {
          toast.success("Agent rejected successfully!");
          options?.onSuccess?.();
        },
        onError: (error) => {
          const message =
            error instanceof AxiosError
              ? error.response?.data?.message || "Failed to reject agent"
              : "Failed to reject agent";
          toast.error(message);
          options?.onError?.(message);
        },
      }
    );
  };

  return {
    approveAgent: approveAgentVerification,
    rejectAgent: rejectAgentVerification,
    isApproving,
    isRejecting,
  };
};
