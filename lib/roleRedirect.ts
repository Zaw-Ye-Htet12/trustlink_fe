import { UserRole } from "@/store/useAuthStore";

export const getRedirectPath = (role: UserRole): string => {
  switch (role) {
    case "admin":
      return "/admin/dashboard";
    case "agent":
      return "/agents/profile";
    case "customer":
      return "/";
    default:
      return "/";
  }
};
