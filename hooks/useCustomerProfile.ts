// hooks/useCustomerProfile.ts
"use client";

import {
  useGetCustomerProfile,
  useUpdateCustomerProfile,
} from "@/services/customer/customerService";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useEffect } from "react";

import { UpdateCustomerData } from "@/interfaces";
import {
  CustomerProfileFormData,
  customerProfileSchema,
} from "@/validations/common/customerProfileUpdate";

export const useCustomerProfileForm = () => {
  const { data: profileResponse, isLoading } = useGetCustomerProfile();
  const { mutate: updateProfileMutation, isPending: isUpdating } =
    useUpdateCustomerProfile();

  const profileForm = useForm<CustomerProfileFormData>({
    resolver: zodResolver(customerProfileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone_no: "",
      address: "",
      location: "",
      bio: "",
      username: "",
      profile_photo_url: "",
    },
    mode: "onChange",
  });

  // Prefill form when data loads
  useEffect(() => {
    const profile = profileResponse?.data;
    if (profile?.user) {
      const names = profile.user.username?.split(" ") || ["", ""];
      const firstName = names[0] || "";
      const lastName = names.slice(1).join(" ") || "";

      console.log("🔄 Prefilling form with:", { firstName, lastName, profile });

      profileForm.reset({
        firstName,
        lastName,
        email: profile.user.email || "",
        phone_no: profile.user.phone_no || "",
        address: profile.location || "",
        location: profile.location || "",
        bio: profile.bio || "",
        username: profile.user.username || "",
        profile_photo_url: profile.user.profile_photo_url || "",
      });
    }
  }, [profileResponse, profileForm]);

  // Submit handler
  const onProfileSubmit = (formData: CustomerProfileFormData) => {
    console.log("📤 Form data received:", formData);

    // Check form validation state
    const isValid = profileForm.formState.isValid;
    const errors = profileForm.formState.errors;

    console.log("✅ Is form valid?", isValid);
    console.log("❌ Form errors:", errors);

    if (!isValid) {
      console.log("🚫 Form validation failed, showing errors");
      toast.error("Please fix the validation errors before submitting");
      return;
    }

    const payload: UpdateCustomerData = {
      username: `${formData.firstName} ${formData.lastName}`.trim(),
      email: formData.email,
      phone_no: formData.phone_no || undefined, // Send undefined if empty
      location: formData.address,
      bio: formData.bio || undefined,
      profile_photo_url: formData.profile_photo_url || undefined,
    };

    console.log("🚀 Sending to API:", payload);

    updateProfileMutation(payload, {
      onSuccess: (data) => {
        console.log("✅ Profile update successful:", data);
        toast.success("Profile updated successfully!");
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          const message =
            error.response?.data?.message || "Failed to update profile.";
          toast.error(`❌ ${message}`);
        } else {
          toast.error("❌ Unexpected error occurred.");
        }
      },
    });
  };

  return {
    profileForm,
    onProfileSubmit,
    isLoading,
    isUpdating,
  };
};
