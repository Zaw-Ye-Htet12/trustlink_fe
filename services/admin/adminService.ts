// src/services/admin/adminService.ts
import { useRead, useWrite } from "@/lib/reactQuery";
import { Response } from "@/interfaces/api";
import {
  User,
  AgentProfile,
  VerificationDocument,
  Category,
  Tag,
} from "@/interfaces";
import { QUERY_KEYS as ADMIN_QUERY_KEYS } from "./queryKeys";

// Dashboard
export const useGetAdminDashboard = () => {
  return useRead<
    Response<{
      totalUsers: number;
      totalAgents: number;
      totalCustomers: number;
      totalPendingVerifications: number;
    }>
  >({
    url: "/admin/dashboard",
    queryKey: [ADMIN_QUERY_KEYS.ADMIN_DASHBOARD],
  });
};

// Users
export const useGetAllUsers = () => {
  return useRead<Response<User[]>>({
    url: "/admin/users",
    queryKey: [ADMIN_QUERY_KEYS.USERS],
  });
};

export const useUpdateUserStatus = () => {
  return useWrite<Response<User>>({
    url: "/admin/users/status",
    method: "PATCH",
    queryKey: [ADMIN_QUERY_KEYS.USERS],
  });
};

export const useUserDelete = () => {
  return useWrite<Response<{ message: string }>>({
    url: "/admin/users/status",
    method: "DELETE",
    queryKey: [ADMIN_QUERY_KEYS.USERS],
  });
};

// Agents
export const useGetAllAgents = () => {
  return useRead<Response<AgentProfile[]>>({
    url: "/admin/agents",
    queryKey: [ADMIN_QUERY_KEYS.AGENTS],
  });
};

export const useGetAgentById = (agentId: number) => {
  return useRead<Response<{ agent: AgentProfile }>>({
    url: `/admin/agents/${agentId}`,
    queryKey: [ADMIN_QUERY_KEYS.AGENT_BY_ID, agentId],
  });
};

export const useApproveAgent = () => {
  return useWrite<Response<AgentProfile>>({
    url: `/admin/agents/approve`,
    method: "PATCH",
    queryKey: [
      [ADMIN_QUERY_KEYS.AGENTS],
      [ADMIN_QUERY_KEYS.AGENT_BY_ID],
      [ADMIN_QUERY_KEYS.VERIFICATION_DOCS],
    ],
  });
};

export const useRejectAgent = () => {
  return useWrite<Response<AgentProfile>>({
    url: `/admin/agents/reject`,
    method: "PATCH",
    queryKey: [
      [ADMIN_QUERY_KEYS.AGENTS],
      [ADMIN_QUERY_KEYS.AGENT_BY_ID],
      [ADMIN_QUERY_KEYS.VERIFICATION_DOCS],
    ],
  });
};

// Verification Documents
export const useGetAllVerificationDocs = () => {
  return useRead<Response<VerificationDocument[]>>({
    url: "/admin/verification-docs",
    queryKey: [ADMIN_QUERY_KEYS.VERIFICATION_DOCS],
  });
};

export const useGetVerificationDocById = (docId: number) => {
  return useRead<Response<VerificationDocument>>({
    url: `/admin/verification-docs/${docId}`,
    queryKey: [ADMIN_QUERY_KEYS.VERIFICATION_DOC_BY_ID, docId],
  });
};

// Categories
export const useGetAllCategories = () => {
  return useRead<Response<Category[]>>({
    url: "/admin/categories",
    queryKey: [ADMIN_QUERY_KEYS.CATEGORIES],
  });
};

export const useCategoryCreate = () => {
  return useWrite<
    Response<Category>,
    { name: string; description?: string; slug: string; is_active?: boolean }
  >({
    url: "/admin/categories",
    method: "POST",
    queryKey: [ADMIN_QUERY_KEYS.CATEGORIES],
  });
};

export const useCategoryUpdate = (categoryId: number) => {
  return useWrite<
    Response<Category>,
    Partial<{
      name: string;
      description?: string;
      slug: string;
      is_active?: boolean;
    }>
  >({
    url: `/admin/categories/${categoryId}`,
    method: "PATCH",
    queryKey: [ADMIN_QUERY_KEYS.CATEGORIES],
  });
};

export const useCategoryDelete = () => {
  return useWrite<Response<{ message: string }>>({
    url: "/admin/categories",
    method: "DELETE",
    queryKey: [ADMIN_QUERY_KEYS.CATEGORIES],
  });
};

// Tags
export const useGetAllTags = () => {
  return useRead<Response<Tag[]>>({
    url: "/admin/tags",
    queryKey: [ADMIN_QUERY_KEYS.TAGS],
  });
};

export const useCreateTag = () => {
  return useWrite<Response<Tag>, { name: string; slug?: string }>({
    url: "/admin/tags",
    method: "POST",
    queryKey: [ADMIN_QUERY_KEYS.TAGS],
  });
};

export const useDeleteTag = () => {
  return useWrite<Response<{ message: string }>>({
    url: "/admin/tags",
    method: "DELETE",
    queryKey: [ADMIN_QUERY_KEYS.TAGS],
  });
};
