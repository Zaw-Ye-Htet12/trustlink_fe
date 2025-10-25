import { AgentProfile, Category, Review, Service, Tag } from "@/interfaces";
import { Response } from "@/interfaces/api";
import { useRead } from "@/lib/reactQuery";
import { QUERY_KEYS } from "./queryKeys";

export function useGetFeaturedAgents() {
  return useRead<Response<AgentProfile[]>>({
    url: "/public/featured/agents",
    queryKey: [QUERY_KEYS.FEATURED_AGENTS],
  });
}

export function useGetFeaturedServices() {
  return useRead<Response<Service[]>>({
    url: "/public/featured/services",
    queryKey: [QUERY_KEYS.FEATURED_SERVICES],
  });
}

export function useGetTrendingServices() {
  return useRead<Response<Service[]>>({
    url: "/public/trending/services",
    queryKey: [QUERY_KEYS.TRENDING_SERVICES],
  });
}

export function useGetPlatformStatistics() {
  return useRead<Response<{ [key: string]: number }>>({
    url: "/public/platform/stats",
    queryKey: [QUERY_KEYS.PLATFORM_STATISTICS],
  });
}

export function useGetSearchAgents(params: {
  keyword?: string;
  location?: string;
}) {
  return useRead<Response<AgentProfile[]>>({
    url: "/public/search/agents",
    queryKey: [QUERY_KEYS.SEARCH_AGENTS],
    params,
  });
}

export function useGetSearchServices(params: {
  keyword?: string;
  location?: string;
}) {
  return useRead<Response<Service[]>>({
    url: "/public/search/services",
    queryKey: [QUERY_KEYS.SEARCH_SERVICES],
    params,
  });
}

export function useGetAllServices() {
  return useRead<Response<Service[]>>({
    url: "/public/services",
    queryKey: [QUERY_KEYS.ALL_SERVICES],
  });
}

export function useGetServiceById(id: number) {
  return useRead<Response<Service>>({
    url: `/public/services/${id}`,
    queryKey: [QUERY_KEYS.SERVICE_BY_ID, id],
  });
}

export function useGetAgentById(id: number) {
  return useRead<Response<AgentProfile>>({
    url: `/public/agents/${id}`,
    queryKey: [QUERY_KEYS.AGENT_BY_ID, id],
  });
}

export function useGetCategories() {
  return useRead<Response<Category[]>>({
    url: "/public/categories",
    queryKey: [QUERY_KEYS.CATEGORIES],
  });
}

export function useGetTags() {
  return useRead<Response<Tag[]>>({
    url: "/public/tags",
    queryKey: [QUERY_KEYS.TAGS],
  });
}

export function useGetRelatedServices(serviceId: number) {
  return useRead<Response<Service[]>>({
    url: `/public/services/${serviceId}/related`,
    queryKey: [QUERY_KEYS.RELATED_SERVICES, serviceId],
  });
}

export function useGetServiceReviews(serviceId: number) {
  return useRead<Response<Review[]>>({
    url: `/public/services/${serviceId}/reviews`,
    queryKey: [QUERY_KEYS.SERVICE_REVIEWS, serviceId],
  });
}

export function useGetAgentReviews(agentId: number) {
  return useRead<Response<Review[]>>({
    url: `/public/agents/${agentId}/reviews`,
    queryKey: [QUERY_KEYS.AGENT_REVIEWS, agentId],
  });
}

export function useGetTopRatedAgents(limit: number = 10) {
  return useRead<Response<AgentProfile[]>>({
    url: "/public/top/agents",
    queryKey: [QUERY_KEYS.TOP_AGENTS, limit],
    params: { limit },
  });
}

export function useFilterAgents(params?: {
  minRating?: number;
  maxPrice?: number;
  status?: string;
}) {
  return useRead<Response<AgentProfile[]>>({
    url: "/public/search/filter",
    queryKey: [QUERY_KEYS.FILTER_AGENTS],
    params,
  });
}

export function useGetAllAgents() {
  // search/agents without params returns full list (server supports it)
  return useRead<Response<AgentProfile[]>>({
    url: "/public/search/agents",
    queryKey: ["allAgents"],
  });
}
