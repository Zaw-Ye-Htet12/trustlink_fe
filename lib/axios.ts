// src/lib/axios.ts
import axios from "axios";
import { useAuthStore } from "@/store/useAuthStore";

const axiosApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3001",
  timeout: 60000,
  withCredentials: true,
});

// ✅ Request Interceptor – attach token dynamically
axiosApi.interceptors.request.use(
  (config) => {
    // Get the latest access token directly from the Zustand store (not localStorage)
    const token = useAuthStore.getState().accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response Interceptor – handle token expiration gracefully
axiosApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Prevent infinite retry loops
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Clear auth state if the token is invalid or expired
      const { clearAuth } = useAuthStore.getState();
      clearAuth();

      // Optionally redirect user to login page
      if (typeof window !== "undefined") {
        window.location.href = "/auth/login";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosApi;
