// src/services/agent/agentService.ts
import { useRead, useWrite } from "@/lib/reactQuery";
import { Response } from "@/interfaces/api";
import { AgentProfile, Review, VerificationDocument, Service } from "@/interfaces";
import { QUERY_KEYS as AGENT_QUERY_KEYS } from "./queryKeys";

/**
 * ✅ Get Agent Profile
 */
export const useGetAgentProfile = () => {
  return useRead<Response<AgentProfile>>({
    url: "/agent/profile",
    queryKey: [AGENT_QUERY_KEYS.AGENT_PROFILE],
  });
};

/**
 * ✅ Update Agent Profile
 */
export const useUpdateAgentProfile = () => {
  return useWrite<Response<AgentProfile>>({
    url: "/agent/profile",
    method: "PATCH",
    queryKey: [AGENT_QUERY_KEYS.AGENT_PROFILE],
  });
};

/**
 * ✅ Submit Verification Document
 */
export const useSubmitVerification = () => {
  return useWrite<Response<VerificationDocument>>({
    url: "/agent/verification",
    method: "POST",
    queryKey: [
      [AGENT_QUERY_KEYS.VERIFICATION_STATUS],
      [AGENT_QUERY_KEYS.AGENT_PROFILE],
    ],
  });
};

/**
 * ✅ Get Verification Status
 */
export const useGetVerificationStatus = () => {
  return useRead<Response<any>>({
    url: "/agent/verification/status",
    queryKey: [AGENT_QUERY_KEYS.VERIFICATION_STATUS],
  });
};

/**
 * ✅ Get Agent’s Own Reviews
 */
export const useGetAgentReviews = () => {
  return useRead<Response<Review[]>>({
    url: "/agent/reviews",
    queryKey: [AGENT_QUERY_KEYS.AGENT_REVIEWS],
  });
};

/**
 * ✅ Get Agent’s Review Summary
 */
export const useGetAgentReviewSummary = () => {
  return useRead<Response<{ average_rating: number; total_reviews: number }>>({
    url: "/agent/reviews/summary",
    queryKey: [AGENT_QUERY_KEYS.AGENT_REVIEW_SUMMARY],
  });
};

/**
 * ✅ Get all Services by this Agent
 */
export const useGetAgentServices = () => {
  return useRead<Response<Service[]>>({
    url: "/agent/services",
    queryKey: [AGENT_QUERY_KEYS.AGENT_SERVICES],
  });
};

/**
 * ✅ Create a new Service
 */
export const useCreateAgentService = () => {
  return useWrite<Response<Service>>({
    url: "/agent/services",
    method: "POST",
    queryKey: [AGENT_QUERY_KEYS.AGENT_SERVICES],
  });
};

/**
 * ✅ Update an existing Service
 */
export const useUpdateAgentService = (id: number) => {
  return useWrite<Response<Service>>({
    url: `/agent/services/${id}`,
    method: "PATCH",
    queryKey: [
      [AGENT_QUERY_KEYS.AGENT_SERVICES],
      [AGENT_QUERY_KEYS.SERVICE_BY_ID, id],
    ],
  });
};

/**
 * ✅ Delete a Service
 */
export const useDeleteAgentService = () => {
  return useWrite<Response<{ message: string }>>({
    url: `/agent/services`,
    method: "DELETE",
    queryKey: [AGENT_QUERY_KEYS.AGENT_SERVICES],
  });
};
