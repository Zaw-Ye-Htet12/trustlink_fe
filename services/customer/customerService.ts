// src/services/customer/customerService.ts
import { useRead, useWrite } from "@/lib/reactQuery";
import { Response } from "@/interfaces/api";
import { CustomerProfile, Review } from "@/interfaces";
import { QUERY_KEYS as PUBLIC_QUERY_KEYS } from "../public/queryKeys";
import { QUERY_KEYS as CUSTOMER_QUERY_KEYS } from "./queryKeys";

export const useCustomerCreateReview = (
  serviceId?: number,
  agentId?: number
) => {
  const invalidateKeys = [
    [CUSTOMER_QUERY_KEYS.CUSTOMER_REVIEWS], // ✅ Always refresh customer reviews
    serviceId
      ? [PUBLIC_QUERY_KEYS.SERVICE_REVIEWS, serviceId]
      : [PUBLIC_QUERY_KEYS.AGENT_REVIEWS, agentId!],
  ];

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
  const invalidateKeys = [
    [CUSTOMER_QUERY_KEYS.CUSTOMER_REVIEWS], // ✅ Refresh list after update
    serviceId
      ? [PUBLIC_QUERY_KEYS.SERVICE_REVIEWS, serviceId]
      : [PUBLIC_QUERY_KEYS.AGENT_REVIEWS, agentId!],
  ];

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
    queryKey: [
      [CUSTOMER_QUERY_KEYS.CUSTOMER_REVIEWS],
      [PUBLIC_QUERY_KEYS.SERVICE_REVIEWS],
      [PUBLIC_QUERY_KEYS.AGENT_REVIEWS],
    ], // Invalidate both to be safe
  });
};

export const useCustomerGetReviews = () => {
  return useRead<Response<Review[]>>({
    url: `/customer/reviews`,
    queryKey: [CUSTOMER_QUERY_KEYS.CUSTOMER_REVIEWS],
  });
};

export const useUpdateCustomerProfile = () => {
  return useWrite<Response<CustomerProfile>>({
    url: "/customer/profile",
    method: "PATCH",
    queryKey: [CUSTOMER_QUERY_KEYS.CUSTOMER_PROFILE],
  });
};

export const useGetCustomerProfile = () => {
  return useRead<Response<CustomerProfile>>({
    url: "/customer/profile",
    queryKey: [CUSTOMER_QUERY_KEYS.CUSTOMER_PROFILE],
  });
};
