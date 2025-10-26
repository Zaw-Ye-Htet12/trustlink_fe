"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import authApi from "@/services/auth/authService";
import {
  AuthResponse,
  LoginCredentials,
  RegisterData,
  User,
} from "@/interfaces/user";

export function useAuth() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Try to load current user on mount
  useEffect(() => {
    let mounted = true;

    const check = async () => {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const resp = await authApi.me();
        if (mounted) setUser(resp.user ?? resp);
      } catch {
        // clear token if invalid
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    check();
    return () => {
      mounted = false;
    };
  }, []);

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    try {
      const data: AuthResponse = await authApi.login(credentials);
      // backend returns access_token and user
      if (data.access_token) {
        localStorage.setItem("token", data.access_token);
      }
      setUser(data.user ?? (data as unknown as User));

      // redirect based on role
      if (data.user?.role === "agent") {
        router.push("/dashboard/agent");
      } else {
        router.push("/dashboard/user");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (payload: RegisterData) => {
    setIsLoading(true);
    try {
      const data: AuthResponse = await authApi.register(payload);
      if (data.access_token) localStorage.setItem("token", data.access_token);
      setUser(data.user ?? (data as unknown as User));
      router.push("/");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch {
      // ignore
    }
    localStorage.removeItem("token");
    setUser(null);
    router.push("/auth/login");
  };

  const refresh = async () => {
    try {
      const data = await authApi.refresh();
      if (data?.access_token) localStorage.setItem("token", data.access_token);
      return data;
    } catch (err) {
      localStorage.removeItem("token");
      setUser(null);
      throw err;
    }
  };

  const changePassword = async (payload: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    return authApi.changePassword(payload);
  };

  return {
    user,
    isLoading,
    login,
    register,
    logout,
    refresh,
    changePassword,
  } as const;
}
