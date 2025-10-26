"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { useAuthRegister } from "@/services/auth/authService";
import { toast } from "sonner";
import { getRedirectPath } from "@/lib/roleRedirect";
import { useForm } from "react-hook-form";
import {
  RegisterFormData,
  registerSchema,
} from "@/validations/common/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";

export const useRegister = () => {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  const searchParams = useSearchParams();
  const initialRole =
    (searchParams.get("role") as "customer" | "agent") || "customer";
  
  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      phone: "",
      role: initialRole,
    },
  });

  const { mutate: registerMutation, isPending: isRegisterLoading } =
    useAuthRegister();

  const onRegisterSubmit = (data: RegisterFormData) => {
    registerMutation(data, {
      onSuccess: async (res) => {
        if (!res?.data?.user || !res?.data?.access_token) {
          toast.error("Invalid response from server.");
          return;
        }
        setAuth(res.data.user, res.data.access_token);
        const redirectPath = getRedirectPath(res.data.user.role);
        router.push(redirectPath);
        toast.success("Account created successfully!");
      },
      onError: (err) => {
        if (err instanceof AxiosError && err.response) {
          // Handle AxiosError specifically if needed
          const message =
            err?.response?.data?.message ||
            "Registration failed. Please check your inputs.";
          toast.error(message);
        }
      },
    });
  };

  return { registerForm, onRegisterSubmit, isRegisterLoading };
};
