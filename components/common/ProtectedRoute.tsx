"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function ProtectedRoute({
  allowedRoles,
  children,
}: {
  allowedRoles: ("admin" | "agent" | "customer")[];
  children: React.ReactNode;
}) {
  const { user, isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login");
    } else if (user && !allowedRoles.includes(user.role)) {
      router.push("/");
    }
  }, [isAuthenticated, user, router, allowedRoles]);

  return <>{children}</>;
}
