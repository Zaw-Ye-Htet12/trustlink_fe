"use client";

import { create } from "zustand";

export type UserRole = "admin" | "agent" | "customer";

interface AuthUser {
  id: number;
  email: string;
  username: string;
  role: UserRole;
  phone_no?: string;
  is_active?: boolean;
}

interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;

  setAuth: (user: AuthUser, token: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("authUser") || "null")
      : null,
  accessToken:
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null,
  isAuthenticated:
    typeof window !== "undefined" && !!localStorage.getItem("accessToken"),

  setAuth: (user, token) => {
    localStorage.setItem("authUser", JSON.stringify(user));
    localStorage.setItem("accessToken", token);
    set({ user, accessToken: token, isAuthenticated: true });
  },

  clearAuth: () => {
    localStorage.removeItem("authUser");
    localStorage.removeItem("accessToken");
    set({ user: null, accessToken: null, isAuthenticated: false });
  },
}));
