// app/admin/verifications/page.tsx
"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Filter,
  FileText,
  Eye,
  User,
  Calendar,
  Download,
  Clock,
  CheckCircle,
  XCircle,
  MoreHorizontal,
} from "lucide-react";
import {
  VerificationDocument,
  VerificationStatus,
  DocumentType,
} from "@/interfaces";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { useAdminVerifications } from "@/hooks/admin/useAdminVerification";
import { VerificationDocumentModal } from "@/components/admin/VerificationDocumentModal";

export default function AdminVerificationsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedDocument, setSelectedDocument] =
    useState<VerificationDocument | null>(null);
  const [showDocumentModal, setShowDocumentModal] = useState(false);

  const { documents, isLoading, error } = useAdminVerifications();

  // Filter documents based on tab and search
  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      searchTerm === "" ||
      doc.agent?.user?.username
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      doc.agent?.user?.email
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      doc.document_type.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "pending" && doc.status === VerificationStatus.PENDING) ||
      (activeTab === "approved" &&
        doc.status === VerificationStatus.APPROVED) ||
      (activeTab === "rejected" && doc.status === VerificationStatus.REJECTED);

    return matchesSearch && matchesTab;
  });

  const getStatusBadge = (status: VerificationStatus) => {
    const config = {
      [VerificationStatus.PENDING]: {
        label: "Pending Review",
        variant: "secondary" as const,
        icon: Clock,
        color: "bg-amber-100 text-amber-800",
      },
      [VerificationStatus.APPROVED]: {
        label: "Approved",
        variant: "default" as const,
        icon: CheckCircle,
        color: "bg-green-100 text-green-800",
      },
      [VerificationStatus.REJECTED]: {
        label: "Rejected",
        variant: "destructive" as const,
        icon: XCircle,
        color: "bg-red-100 text-red-800",
      },
    };

    const statusConfig = config[status];
    const Icon = statusConfig.icon;

    return (
      <Badge variant={statusConfig.variant} className={statusConfig.color}>
        <Icon className="h-3 w-3 mr-1" />
        {statusConfig.label}
      </Badge>
    );
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

  const handleDownloadDocument = (documentUrl: string, fileName: string) => {
    // Create a temporary anchor element to trigger download
    const link = document.createElement("a");
    link.href = documentUrl;
    link.download = fileName || "document";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleViewAgent = (agentId: number) => {
    // Navigate to agent details page or open in new tab
    window.open(`/agents/${agentId}`, "_blank");
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50/30 py-8 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <FileText className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Failed to Load Documents
            </h3>
            <p className="text-gray-600">
              There was an error loading verification documents.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/30 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Verification Documents
          </h1>
          <p className="text-lg text-gray-600">
            Review and manage agent verification documents
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Documents
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {documents.length}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
                  <FileText className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Pending Review
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {
                      documents.filter(
                        (d) => d.status === VerificationStatus.PENDING
                      ).length
                    }
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-amber-50 text-amber-600">
                  <Clock className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Approved</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {
                      documents.filter(
                        (d) => d.status === VerificationStatus.APPROVED
                      ).length
                    }
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-green-50 text-green-600">
                  <CheckCircle className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Rejected</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {
                      documents.filter(
                        (d) => d.status === VerificationStatus.REJECTED
                      ).length
                    }
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-red-50 text-red-600">
                  <XCircle className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              {/* Search */}
              <div className="relative w-full lg:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search documents or agents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Filters */}
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all" className="flex items-center gap-2">
              All Documents
              <Badge variant="secondary">{documents.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="pending" className="flex items-center gap-2">
              Pending
              <Badge variant="secondary">
                {
                  documents.filter(
                    (d) => d.status === VerificationStatus.PENDING
                  ).length
                }
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="approved" className="flex items-center gap-2">
              Approved
              <Badge variant="secondary">
                {
                  documents.filter(
                    (d) => d.status === VerificationStatus.APPROVED
                  ).length
                }
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="rejected" className="flex items-center gap-2">
              Rejected
              <Badge variant="secondary">
                {
                  documents.filter(
                    (d) => d.status === VerificationStatus.REJECTED
                  ).length
                }
              </Badge>
            </TabsTrigger>
          </TabsList>

          {/* Documents Content */}
          <TabsContent value={activeTab} className="space-y-6">
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <Card key={i}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Skeleton className="h-12 w-12 rounded-full" />
                          <div className="space-y-2">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-3 w-24" />
                          </div>
                        </div>
                        <Skeleton className="h-8 w-24" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredDocuments.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {searchTerm
                      ? "No Documents Found"
                      : "No Verification Documents"}
                  </h3>
                  <p className="text-gray-600">
                    {searchTerm
                      ? "No documents match your search criteria."
                      : "There are no verification documents to review."}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredDocuments.map((document) => (
                  <Card key={document.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 flex-1">
                          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                            <FileText className="h-6 w-6 text-blue-600" />
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-gray-900">
                                {getDocumentTypeLabel(document.document_type)}
                              </h3>
                              {getStatusBadge(document.status)}
                            </div>

                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <User className="h-4 w-4" />
                                <span>
                                  {document.agent?.user?.username ||
                                    "Unknown Agent"}
                                </span>
                              </div>

                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>
                                  {new Date(
                                    document.created_at
                                  ).toLocaleDateString()}
                                </span>
                              </div>

                              {document.admin_notes && (
                                <div className="flex items-center gap-1">
                                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                                    Note: {document.admin_notes}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleDownloadDocument(
                                document.document_url,
                                `${document.document_type}_${
                                  document.agent?.user?.username || "document"
                                }`
                              )
                            }
                          >
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedDocument(document);
                                  setShowDocumentModal(true);
                                }}
                              >
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>

                              <DropdownMenuSeparator />

                              <DropdownMenuItem
                                onClick={() =>
                                  document.agent &&
                                  handleViewAgent(document.agent.id)
                                }
                              >
                                <User className="h-4 w-4 mr-2" />
                                View Agent Profile
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Document Detail Modal */}
      <VerificationDocumentModal
        document={selectedDocument}
        isOpen={showDocumentModal}
        onClose={() => {
          setShowDocumentModal(false);
          setSelectedDocument(null);
        }}
        onDownload={handleDownloadDocument}
        onViewAgent={handleViewAgent}
      />
    </div>
  );
}
