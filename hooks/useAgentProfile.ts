// src/hooks/useAgentProfile.ts
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useGetAgentProfile,
  useUpdateAgentProfile,
} from "@/services/agent/agentService";
import { AgentProfile } from "@/interfaces";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { z } from "zod";

// Validation schema for agent profile
const agentProfileSchema = z.object({
  // Personal Information
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone_no: z.string().optional(),
  username: z.string().min(1, "Username is required"),

  // Professional Information
  bio: z.string().optional(),
  years_of_experience: z.number().min(0).optional(),
  location: z.string().optional(),
  service_area: z.string().optional(),
  profile_photo_url: z.string().optional(),
});

export type AgentProfileFormData = z.infer<typeof agentProfileSchema>;

export const useAgentProfileForm = () => {
  const { data: profileResponse, isLoading } = useGetAgentProfile();
  const { mutate: updateProfileMutation, isPending: isUpdating } =
    useUpdateAgentProfile();

  const profileForm = useForm<AgentProfileFormData>({
    resolver: zodResolver(agentProfileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone_no: "",
      username: "",
      bio: "",
      years_of_experience: 0,
      location: "",
      service_area: "",
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

      console.log("🔄 Prefilling agent form with:", {
        firstName,
        lastName,
        profile,
      });

      profileForm.reset({
        firstName,
        lastName,
        email: profile.user.email || "",
        phone_no: profile.user.phone_no || "",
        username: profile.user.username || "",
        bio: profile.bio || "",
        years_of_experience: profile.years_of_experience || 0,
        location: profile.location || "",
        service_area: profile.service_area || "",
        profile_photo_url: profile.user.profile_photo_url || "",
      });
    }
  }, [profileResponse, profileForm]);

  // Submit handler
  const onProfileSubmit = (formData: AgentProfileFormData) => {
    // Check if form is dirty to avoid unnecessary updates
    if (!profileForm.formState.isDirty) {
      toast.info("No changes detected");
      return;
    }

    const payload = {
      email: formData.email,
      username: `${formData.firstName} ${formData.lastName}`.trim(),
      phone_no: formData.phone_no || undefined,
      bio: formData.bio || undefined,
      years_of_experience: formData.years_of_experience || undefined,
      location: formData.location || undefined,
      service_area: formData.service_area || undefined,
      profile_photo_url: formData.profile_photo_url || undefined,
    };

    console.log("🚀 Sending agent profile update:", payload);

    updateProfileMutation(payload, {
      onSuccess: (data) => {
        toast.success("Profile updated successfully!");
        // Update form with new data to clear dirty state
        const updatedProfile = data.data;
        const names = updatedProfile.user.username?.split(" ") || ["", ""];
        profileForm.reset({
          firstName: names[0] || "",
          lastName: names.slice(1).join(" ") || "",
          email: updatedProfile.user.email || "",
          phone_no: updatedProfile.user.phone_no || "",
          username: updatedProfile.user.username || "",
          bio: updatedProfile.bio || "",
          years_of_experience: updatedProfile.years_of_experience || 0,
          location: updatedProfile.location || "",
          service_area: updatedProfile.service_area || "",
          profile_photo_url: updatedProfile.user.profile_photo_url || "",
        });
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          const message =
            (error.response?.data as { message?: string })?.message ||
            "Failed to update profile.";
          toast.error(message);
        }
      },
    });
  };

  return {
    profileForm,
    onProfileSubmit,
    isLoading,
    isUpdating,
    profile: profileResponse?.data,
  };
};
