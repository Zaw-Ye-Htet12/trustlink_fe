// src/components/admin/UserStatusModal.tsx
"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { User } from "@/interfaces";
import { UserCheck, UserX, AlertTriangle } from "lucide-react";

interface UserStatusModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus: (isActive: boolean) => void;
  isUpdating: boolean;
}

export function UserStatusModal({
  user,
  isOpen,
  onClose,
  onUpdateStatus,
  isUpdating,
}: UserStatusModalProps) {
  if (!user) return null;

  const isActivating = !user.is_active;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {isActivating ? (
              <>
                <UserCheck className="h-5 w-5 text-green-600" />
                Activate User
              </>
            ) : (
              <>
                <UserX className="h-5 w-5 text-red-600" />
                Deactivate User
              </>
            )}
          </DialogTitle>
          <DialogDescription>
            {isActivating
              ? "This will allow the user to access their account and use the platform."
              : "This will prevent the user from accessing their account and using the platform."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-amber-800">Are you sure?</h4>
                <p className="text-sm text-amber-700 mt-1">
                  You are about to {isActivating ? "activate" : "deactivate"}{" "}
                  <strong>{user.username}</strong>&apos;s account. This action
                  will{" "}
                  {isActivating
                    ? "grant them access to the platform."
                    : "immediately revoke their access to the platform."}
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isUpdating}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              variant={isActivating ? "default" : "destructive"}
              onClick={() => onUpdateStatus(isActivating)}
              disabled={isUpdating}
              className="flex-1"
            >
              {isUpdating
                ? isActivating
                  ? "Activating..."
                  : "Deactivating..."
                : isActivating
                ? "Activate User"
                : "Deactivate User"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
