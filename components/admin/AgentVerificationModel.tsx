// src/components/admin/AgentVerificationModal.tsx
"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { AgentProfile, VerificationStatus } from "@/interfaces";
import {
  UserCheck,
  UserX,
  Clock,
  FileText,
  MapPin,
  Briefcase,
  Mail,
  Calendar,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { DocumentType } from "@/interfaces/service";

interface AgentVerificationModalProps {
  agent: AgentProfile | null;
  isOpen: boolean;
  onClose: () => void;
  onApprove: (agentId: number, adminNotes?: string) => void;
  onReject: (agentId: number, adminNotes?: string) => void;
  isApproving: boolean;
  isRejecting: boolean;
}

export function AgentVerificationModal({
  agent,
  isOpen,
  onClose,
  onApprove,
  onReject,
  isApproving,
  isRejecting,
}: AgentVerificationModalProps) {
  const [adminNotes, setAdminNotes] = useState("");

  if (!agent) return null;

  const getStatusConfig = (status: VerificationStatus) => {
    const configs = {
      [VerificationStatus.PENDING]: {
        label: "Pending Review",
        color: "bg-amber-100 text-amber-800",
        icon: Clock,
      },
      [VerificationStatus.APPROVED]: {
        label: "Approved",
        color: "bg-green-100 text-green-800",
        icon: UserCheck,
      },
      [VerificationStatus.REJECTED]: {
        label: "Rejected",
        color: "bg-red-100 text-red-800",
        icon: UserX,
      },
    };
    return configs[status];
  };

  const getDocumentTypeLabel = (type: DocumentType) => {
    const labels = {
      [DocumentType.ID_CARD]: "National ID Card",
      [DocumentType.BUSINESS_LICENSE]: "Business License",
      [DocumentType.CERTIFICATE]: "Professional Certification",
      [DocumentType.OTHER]: "Other Document",
    };
    return labels[type] || type;
  };

  const statusConfig = getStatusConfig(agent.verification_status);

  const handleSubmit = (action: "approve" | "reject") => {
    if (action === "approve") {
      onApprove(agent.id, adminNotes);
    } else {
      onReject(agent.id, adminNotes);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Agent Verification
            <Badge className={statusConfig.color}>
              <statusConfig.icon className="h-3 w-3 mr-1" />
              {statusConfig.label}
            </Badge>
          </DialogTitle>
          <DialogDescription>
            Review agent details and verification documents
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Agent Information */}
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Agent Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <Briefcase className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">
                        {agent.user?.username}
                      </p>
                      <p className="text-xs text-gray-600">Username</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="font-medium text-sm">{agent.user?.email}</p>
                      <p className="text-xs text-gray-600">Email</p>
                    </div>
                  </div>

                  {agent.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="font-medium text-sm">{agent.location}</p>
                        <p className="text-xs text-gray-600">Location</p>
                      </div>
                    </div>
                  )}

                  {agent.years_of_experience && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="font-medium text-sm">
                          {agent.years_of_experience} years
                        </p>
                        <p className="text-xs text-gray-600">Experience</p>
                      </div>
                    </div>
                  )}

                  {agent.service_area && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="font-medium text-sm">
                          {agent.service_area}
                        </p>
                        <p className="text-xs text-gray-600">Service Area</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {agent.bio && (
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">Bio</h3>
                  <p className="text-sm text-gray-600">{agent.bio}</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Documents and Actions */}
          <div className="lg:col-span-2 space-y-4">
            {/* Verification Documents */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Verification Documents</h3>
                <div className="space-y-3">
                  {agent.verificationDocuments && agent.verificationDocuments?.length > 0 ? (
                    agent.verificationDocuments.map((doc) => (
                      <div
                        key={doc.id}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-blue-600" />
                          <div>
                            <p className="font-medium text-sm">
                              {getDocumentTypeLabel(doc.document_type)}
                            </p>
                            <p className="text-xs text-gray-600">
                              Status:{" "}
                              <Badge
                                variant="secondary"
                                className={
                                  doc.status === VerificationStatus.APPROVED
                                    ? "bg-green-100 text-green-800"
                                    : doc.status === VerificationStatus.REJECTED
                                    ? "bg-red-100 text-red-800"
                                    : "bg-amber-100 text-amber-800"
                                }
                              >
                                {doc.status}
                              </Badge>
                            </p>
                            {doc.admin_notes && (
                              <p className="text-xs text-gray-600 mt-1">
                                Notes: {doc.admin_notes}
                              </p>
                            )}
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            window.open(doc.document_url, "_blank")
                          }
                        >
                          View Document
                        </Button>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-600 text-center py-4">
                      No verification documents submitted
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Admin Actions */}
            {agent.verification_status === VerificationStatus.PENDING && (
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3">Admin Actions</h3>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="admin-notes">
                        Admin Notes (Optional)
                      </Label>
                      <Textarea
                        id="admin-notes"
                        placeholder="Add any notes or comments about this verification..."
                        value={adminNotes}
                        onChange={(e) => setAdminNotes(e.target.value)}
                        className="mt-1"
                        rows={3}
                      />
                    </div>

                    <div className="flex gap-3 pt-2">
                      <Button
                        variant="outline"
                        onClick={onClose}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => handleSubmit("reject")}
                        disabled={isRejecting}
                        className="flex-1"
                      >
                        {isRejecting ? "Rejecting..." : "Reject"}
                      </Button>
                      <Button
                        onClick={() => handleSubmit("approve")}
                        disabled={isApproving}
                        className="flex-1"
                      >
                        {isApproving ? "Approving..." : "Approve"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
