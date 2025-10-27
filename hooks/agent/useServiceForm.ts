// src/hooks/agent/useServiceForm.ts
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Service, PricingType, LocationType } from "@/interfaces";

// Validation schema for service form
const serviceFormSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title too long"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(1000, "Description too long"),
  category_id: z.number().min(1, "Category is required"),
  pricing_type: z.nativeEnum(PricingType),
  price: z.number().min(0, "Price must be positive").optional(),
  currency: z.string().min(1, "Currency is required"), // Make it required
  location_type: z.nativeEnum(LocationType),
  service_area: z.string().optional(),
});

export type ServiceFormData = z.infer<typeof serviceFormSchema>;

interface UseServiceFormProps {
  defaultValues?: Partial<ServiceFormData>;
  service?: Service;
}

export const useServiceForm = ({
  defaultValues,
  service,
}: UseServiceFormProps = {}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If editing a service, prefill with existing data
  const initialValues: Partial<ServiceFormData> = service
    ? {
        title: service.title,
        description: service.description,
        category_id: service.category_id || 0,
        pricing_type: service.pricing_type,
        price: service.price,
        currency: service.currency || "THB", // Ensure currency is always provided
        location_type: service.location_type || LocationType.CUSTOMER_LOCATION,
        service_area: service.service_area,
      }
    : {};

  const form = useForm<ServiceFormData>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues: {
      title: "",
      description: "",
      category_id: 0,
      pricing_type: PricingType.FIXED,
      price: undefined,
      currency: "THB", // This will always be provided
      location_type: LocationType.CUSTOMER_LOCATION,
      service_area: "",
      ...initialValues,
      ...defaultValues,
    },
    mode: "onChange",
  });

  return {
    form,
    isSubmitting,
    setIsSubmitting,
  };
};
