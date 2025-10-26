"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { useAuthLogin } from "@/services/auth/authService";
import { loginSchema, LoginType } from "@/validations/common/login";
import { toast } from "sonner"; // optional, for quick feedback
import { getRedirectPath } from "@/lib/roleRedirect";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";

export const useLogin = () => {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  const loginForm = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: loginMutation, isPending: isLoginLoading } = useAuthLogin();

  const onLoginSubmit = (data: LoginType) => {
    loginMutation(data, {
      onSuccess: async (res) => {
        if (!res?.data?.user || !res?.data?.access_token) {
          toast.error("Invalid response from server.");
          return;
        }

        // Save token & user info
        setAuth(res.data.user, res.data.access_token);

        // Redirect based on role
        const redirectPath = getRedirectPath(res.data.user.role);
        router.push(redirectPath);

        toast.success("Login successful!");
      },
      onError: (err) => {
        if (err instanceof AxiosError) {
          const message =
            err?.response?.data?.message ||
            "Login failed. Please check your credentials.";
          toast.error(message);
        }
      },
    });
  };

  return { loginForm, onLoginSubmit, isLoginLoading };
};
