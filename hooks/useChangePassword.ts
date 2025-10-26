// hooks/useChangePassword.ts
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ChangePasswordFormData,
  changePasswordSchema,
} from "@/validations/common/changePassword";
import { useAuthChangePassword } from "@/services/auth/authService";
import { toast } from "sonner";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { useState } from "react";

export function useChangePassword() {
  const router = useRouter();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { clearAuth } = useAuthStore();

  const form = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    mode: "onChange", // Add this for real-time validation
  });

  const { mutate: changePasswordMutation, isPending: isChangingPassword } =
    useAuthChangePassword();

  const onSubmit = (data: ChangePasswordFormData) => {
    console.log("🔐 Password change submitted:", data);

    changePasswordMutation(data, {
      onSuccess: (res) => {
        if (res?.data?.message) {
          toast.success(res.data.message);
          form.reset();

          // Optional: Force re-login after password change for security
          clearAuth();
          router.push("/auth/login");
          toast.info("Please login again with your new password");
        }
      },
      onError: (err) => {
        if (err instanceof AxiosError) {
          const message =
            err?.response?.data?.message || "Failed to change password";
          toast.error(message);
        }
      },
    });
  };

  const toggleCurrentPasswordVisibility = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return {
    form,
    onSubmit,
    isChangingPassword,
    showCurrentPassword,
    showNewPassword,
    showConfirmPassword,
    toggleCurrentPasswordVisibility,
    toggleNewPasswordVisibility,
    toggleConfirmPasswordVisibility,
  };
}
