// components/common/LoginPrompt.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { LogIn, UserPlus } from "lucide-react";
import Link from "next/link";

interface LoginPromptProps {
  title: string;
  description: string;
  onClose: () => void;
}

export function LoginPrompt({ title, description, onClose }: LoginPromptProps) {
  return (
    <>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>

      <div className="space-y-4">
        <div className="text-center py-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <LogIn className="w-8 h-8 text-blue-600" />
          </div>
          <p className="text-sm text-gray-600">
            Join our community to share your experiences and help others
          </p>
        </div>

        <div className="space-y-3">
          <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
            <Link href="/auth/login" onClick={onClose}>
              <LogIn className="w-4 h-4 mr-2" />
              Sign In
            </Link>
          </Button>

          <Button asChild variant="outline" className="w-full">
            <Link href="/auth/register" onClick={onClose}>
              <UserPlus className="w-4 h-4 mr-2" />
              Create Account
            </Link>
          </Button>
        </div>

        <div className="text-center">
          <Button variant="ghost" onClick={onClose} className="text-sm">
            Maybe Later
          </Button>
        </div>
      </div>
    </>
  );
}
