// src/services/customer/customerService.ts
import { useWrite } from "@/lib/reactQuery";
import { Response } from "@/interfaces/api";
import { Review } from "@/interfaces";
import { QUERY_KEYS } from "../public/queryKeys";

export const useCustomerCreateReview = (
  serviceId?: number,
  agentId?: number
) => {
  const invalidateKeys = serviceId
    ? [[QUERY_KEYS.SERVICE_REVIEWS, serviceId]]
    : [[QUERY_KEYS.AGENT_REVIEWS, agentId!]];

  return useWrite<Response<Review>>({
    url: "/customer/reviews",
    method: "POST",
    queryKey: invalidateKeys,
  });
};

export const useCustomerUpdateReview = (
  reviewId?: number,
  serviceId?: number,
  agentId?: number
) => {
  const invalidateKeys = serviceId
    ? [[QUERY_KEYS.SERVICE_REVIEWS, serviceId]]
    : [[QUERY_KEYS.AGENT_REVIEWS, agentId!]];

  return useWrite<Response<Review>>({
    url: `/customer/reviews/${reviewId}`,
    method: "PATCH",
    queryKey: invalidateKeys,
  });
};

export const useCustomerDeleteReview = () => {
  return useWrite<Response<void>>({
    url: `/customer/reviews`,
    method: "DELETE",
    queryKey: [[QUERY_KEYS.SERVICE_REVIEWS], [QUERY_KEYS.AGENT_REVIEWS]], // Invalidate both to be safe
  });
};
