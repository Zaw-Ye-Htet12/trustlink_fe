// app/(admin)/admin/verification-docs/page.tsx
"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search,
  Filter,
  FileText,
  Download,
  Eye,
  CheckCircle2,
  XCircle,
  Clock,
  User,
} from "lucide-react";
import { useState } from "react";

// Mock data based on API endpoints
const verificationDocs = [
  {
    id: 1,
    agentName: "Sarah Johnson",
    agentEmail: "sarah.johnson@example.com",
    documentType: "ID Verification",
    documentUrl: "https://example.com/doc1.pdf",
    status: "pending",
    submittedDate: "2024-01-20",
    agentSince: "2024-01-10",
    services: ["Home Cleaning", "Office Cleaning"],
  },
  {
    id: 2,
    agentName: "Mike Chen",
    agentEmail: "mike.chen@example.com",
    documentType: "Business License",
    documentUrl: "https://example.com/doc2.pdf",
    status: "pending",
    submittedDate: "2024-01-19",
    agentSince: "2024-01-15",
    services: ["Plumbing", "Emergency Repair"],
  },
  {
    id: 3,
    agentName: "David Brown",
    agentEmail: "david.brown@example.com",
    documentType: "Insurance Certificate",
    documentUrl: "https://example.com/doc3.pdf",
    status: "approved",
    submittedDate: "2024-01-18",
    agentSince: "2024-01-08",
    services: ["Electrical", "Wiring"],
  },
  {
    id: 4,
    agentName: "Lisa Wang",
    agentEmail: "lisa.wang@example.com",
    documentType: "ID Verification",
    documentUrl: "https://example.com/doc4.pdf",
    status: "rejected",
    submittedDate: "2024-01-17",
    agentSince: "2024-01-12",
    services: ["AC Maintenance", "Heating"],
  },
];

export default function VerificationDocumentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredDocs = verificationDocs
    .filter(
      (doc) =>
        doc.agentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.agentEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.documentType.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((doc) =>
      statusFilter === "all" ? true : doc.status === statusFilter
    );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "pending":
        return <Clock className="h-4 w-4 text-amber-500" />;
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-amber-100 text-amber-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const pendingCount = verificationDocs.filter(
    (doc) => doc.status === "pending"
  ).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Verification Documents
          </h1>
          <p className="text-gray-600">
            Review and manage agent verification documents
          </p>
        </div>
        {pendingCount > 0 && (
          <Badge variant="destructive" className="text-sm px-3 py-1">
            {pendingCount} Pending Review
          </Badge>
        )}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search by agent name, email, or document type..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <select
                className="px-3 py-2 border rounded-lg text-sm"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
              <Button variant="outline" className="whitespace-nowrap">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documents List */}
      <div className="space-y-4">
        {filteredDocs.map((doc) => (
          <Card key={doc.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                {/* Document Info */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-sm">
                        {doc.agentName[0].toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {doc.agentName}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {doc.agentEmail}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        doc.status
                      )}`}
                    >
                      {getStatusIcon(doc.status)}
                      {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-gray-700">Document Type</p>
                      <p className="text-gray-600">{doc.documentType}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Submitted</p>
                      <p className="text-gray-600">{doc.submittedDate}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Agent Since</p>
                      <p className="text-gray-600">{doc.agentSince}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Services</p>
                      <div className="flex flex-wrap gap-1">
                        {doc.services.map((service, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs"
                          >
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row lg:flex-col gap-2 lg:w-48">
                  <Button size="sm" className="flex-1" variant="outline">
                    <Eye className="h-4 w-4 mr-2" />
                    View Document
                  </Button>
                  <Button size="sm" className="flex-1" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  {doc.status === "pending" && (
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1" variant="default">
                        <CheckCircle2 className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1"
                        variant="destructive"
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredDocs.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No documents found
            </h3>
            <p className="text-gray-600">
              {searchTerm
                ? "Try adjusting your search terms"
                : "No documents match the current filters"}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Pending Review
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {
                    verificationDocs.filter((doc) => doc.status === "pending")
                      .length
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
                    verificationDocs.filter((doc) => doc.status === "approved")
                      .length
                  }
                </p>
              </div>
              <div className="p-3 rounded-lg bg-green-50 text-green-600">
                <CheckCircle2 className="h-6 w-6" />
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
                    verificationDocs.filter((doc) => doc.status === "rejected")
                      .length
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
    </div>
  );
}
