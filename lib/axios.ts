import axios from "axios";

const axiosApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3001",
  timeout: 60000,
  withCredentials: true,
});

axiosApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check for 401 Unauthorized and token refresh conditions
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry &&
      error.response.data === "Unauthorized"
    ) {
      originalRequest._retry = true;

      // Ensure the token is still present before attempting refresh
      const token = localStorage.getItem("token");
      if (!token) {
        // Prevent refresh if the token is already removed (e.g., during logout)
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosApi;
