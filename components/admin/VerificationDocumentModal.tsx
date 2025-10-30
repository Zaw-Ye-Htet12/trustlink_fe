// src/components/admin/VerificationDocumentModal.tsx
"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  VerificationDocument,
  DocumentType,
  VerificationStatus,
} from "@/interfaces";
import {
  FileText,
  User,
  Mail,
  Calendar,
  Download,
  ExternalLink,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface VerificationDocumentModalProps {
  document: VerificationDocument | null;
  isOpen: boolean;
  onClose: () => void;
  onDownload: (documentUrl: string, fileName: string) => void;
  onViewAgent: (agentId: number) => void;
}

export function VerificationDocumentModal({
  document,
  isOpen,
  onClose,
  onDownload,
  onViewAgent,
}: VerificationDocumentModalProps) {
  if (!document) return null;

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
        icon: CheckCircle,
      },
      [VerificationStatus.REJECTED]: {
        label: "Rejected",
        color: "bg-red-100 text-red-800",
        icon: XCircle,
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

  const statusConfig = getStatusConfig(document.status);

  const handleDownload = () => {
    onDownload(
      document.document_url,
      `${document.document_type}_${
        document.agent?.user?.username || "document"
      }`
    );
  };

  const handleViewAgent = () => {
    if (document.agent) {
      onViewAgent(document.agent.id);
    }
  };

  const handleViewDocument = () => {
    window.open(document.document_url, "_blank");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Document Details
            <Badge className={statusConfig.color}>
              <statusConfig.icon className="h-3 w-3 mr-1" />
              {statusConfig.label}
            </Badge>
          </DialogTitle>
          <DialogDescription>
            Detailed view of verification document and agent information
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Document Information */}
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Document Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-sm font-medium text-gray-600">
                      Document Type
                    </span>
                    <span className="text-sm font-medium">
                      {getDocumentTypeLabel(document.document_type)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-sm font-medium text-gray-600">
                      Status
                    </span>
                    <Badge className={statusConfig.color}>
                      {statusConfig.label}
                    </Badge>
                  </div>

                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-sm font-medium text-gray-600">
                      Submitted
                    </span>
                    <span className="text-sm text-gray-600">
                      {new Date(document.created_at).toLocaleDateString()}
                    </span>
                  </div>

                  {document.admin_notes && (
                    <div className="py-2">
                      <span className="text-sm font-medium text-gray-600 block mb-1">
                        Admin Notes
                      </span>
                      <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded border">
                        {document.admin_notes}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Document Preview */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Document Preview</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-sm text-gray-600 mb-4">
                    {getDocumentTypeLabel(document.document_type)}
                  </p>
                  <div className="flex gap-3 justify-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleViewDocument}
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      View in New Tab
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={handleDownload}
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Agent Information */}
          <div className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Agent Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">
                        {document.agent?.user?.username || "Unknown Agent"}
                      </p>
                      <p className="text-xs text-gray-600">Username</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="font-medium text-sm">
                        {document.agent?.user?.email || "No email"}
                      </p>
                      <p className="text-xs text-gray-600">Email</p>
                    </div>
                  </div>

                  {document.agent?.location && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="font-medium text-sm">
                          {document.agent.location}
                        </p>
                        <p className="text-xs text-gray-600">Location</p>
                      </div>
                    </div>
                  )}

                  {document.agent?.verification_status && (
                    <div className="pt-2">
                      <span className="text-sm font-medium text-gray-600 block mb-1">
                        Agent Verification Status
                      </span>
                      <Badge
                        variant="secondary"
                        className={
                          document.agent.verification_status ===
                          VerificationStatus.APPROVED
                            ? "bg-green-100 text-green-800"
                            : document.agent.verification_status ===
                              VerificationStatus.REJECTED
                            ? "bg-red-100 text-red-800"
                            : "bg-amber-100 text-amber-800"
                        }
                      >
                        {document.agent.verification_status}
                      </Badge>
                    </div>
                  )}

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleViewAgent}
                    className="w-full mt-4"
                    disabled={!document.agent}
                  >
                    <User className="h-4 w-4 mr-2" />
                    View Agent Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex gap-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Close
          </Button>
          <Button onClick={handleDownload} className="flex-1">
            <Download className="h-4 w-4 mr-2" />
            Download Document
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
