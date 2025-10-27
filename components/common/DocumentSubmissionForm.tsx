// src/components/common/DocumentSubmissionForm.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, X, Upload } from "lucide-react";
import { DocumentType, VerificationDocumentData } from "@/interfaces";

interface DocumentSubmissionFormProps {
  onSubmit: (data: VerificationDocumentData) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

export function DocumentSubmissionForm({
  onSubmit,
  onCancel,
  isSubmitting,
}: DocumentSubmissionFormProps) {
  const [formData, setFormData] = useState<VerificationDocumentData>({
    document_type: DocumentType.ID_CARD,
    document_url: "",
    admin_notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.document_type || !formData.document_url) {
      alert("Please fill in all required fields");
      return;
    }
    onSubmit(formData);
  };

  const documentTypes = [
    { value: DocumentType.BUSINESS_LICENSE, label: "Business License" },
    { value: DocumentType.ID_CARD, label: "ID Card" },
    { value: DocumentType.CERTIFICATE, label: "Certificate" },
    { value: DocumentType.OTHER, label: "Other" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Submit Verification Document
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <X className="h-4 w-4" />
          </Button>
        </CardTitle>
        <CardDescription>
          Upload your verification documents to complete your profile
          verification
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="document_type">Document Type *</Label>
            <select
              id="document_type"
              value={formData.document_type}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  document_type: e.target.value as DocumentType,
                }))
              }
              className="w-full p-2 border rounded-md"
              required
            >
              {documentTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="document_url">Document URL *</Label>
            <Input
              id="document_url"
              type="url"
              placeholder="https://example.com/document.pdf"
              value={formData.document_url}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  document_url: e.target.value,
                }))
              }
              required
            />
            <p className="text-sm text-gray-500">
              Provide a secure link to your document (PDF, JPG, PNG)
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="admin_notes">Additional Notes</Label>
            <Textarea
              id="admin_notes"
              placeholder="Any additional information about this document..."
              value={formData.admin_notes}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  admin_notes: e.target.value,
                }))
              }
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="flex-1">
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Submitting...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Submit Document
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
