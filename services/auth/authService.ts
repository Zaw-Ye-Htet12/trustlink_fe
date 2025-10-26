import { AuthResponse } from "@/interfaces";
import { Response } from "@/interfaces/api";
import { useWrite } from "@/lib/reactQuery";

export const useAuthLogin = () => {
  return useWrite<Response<AuthResponse>>({
    url: "/auth/login",
    method: "POST",
  });
};

export const useAuthRegister = () => {
  return useWrite<Response<AuthResponse>>({
    url: "/auth/register",
    method: "POST",
  });
};

export const useAuthChangePassword = () => {
  return useWrite<Response<{message: string}>>({
    url: "/auth/change-password",
    method: "PATCH",
  });
}