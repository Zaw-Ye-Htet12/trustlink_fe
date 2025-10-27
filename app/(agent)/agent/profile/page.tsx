// app/agent/profile/page.tsx
"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  User,
  Shield,
  Bell,
  CreditCard,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Star,
  FileText,
  Briefcase,
  CheckCircle2,
  Clock,
  Settings,
  Camera,
  DollarSign,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAgentProfileForm } from "@/hooks/useAgentProfile";
import { useAgentVerification } from "@/hooks/useAgentVerification";
import { useChangePassword } from "@/hooks/useChangePassword";
import { DocumentSubmissionForm } from "@/components/common/DocumentSubmissionForm";
import { Eye, EyeOff } from "lucide-react";
import { VerificationDocument } from "@/interfaces";

export default function AgentProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");

  const {
    profileForm,
    onProfileSubmit,
    isLoading: profileLoading,
    isUpdating,
    profile,
  } = useAgentProfileForm();

  const {
    verificationStatus,
    isLoading: verificationLoading,
    isSubmitting: verificationSubmitting,
    submitDocument,
    showDocumentForm,
    setShowDocumentForm,
  } = useAgentVerification();

  const {
    form: passwordForm,
    onSubmit: onPasswordSubmit,
    isChangingPassword,
    showCurrentPassword,
    showNewPassword,
    showConfirmPassword,
    toggleCurrentPasswordVisibility,
    toggleNewPasswordVisibility,
    toggleConfirmPasswordVisibility,
  } = useChangePassword();

  const handleProfileSubmit = (data: any) => {
    console.log("🎯 Agent profile form submitted:", data);
    onProfileSubmit(data);
  };

  if (profileLoading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
        <span className="ml-2 text-gray-600">Loading profile...</span>
      </div>
    );
  }

  const getInitials = (name?: string) => {
    if (!name) return "A";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getVerificationBadgeVariant = (status: string) => {
    switch (status?.toLowerCase()) {
      case "verified":
        return "default";
      case "pending":
        return "secondary";
      case "rejected":
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Agent Profile</h1>
        <p className="text-gray-600">
          Manage your professional profile and settings
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar - Agent Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            <CardContent className="p-6">
              {/* Agent Avatar */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-semibold text-2xl mx-auto mb-3">
                    {getInitials(profile?.user?.username)}
                  </div>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute bottom-0 right-0 h-8 w-8 rounded-full"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {profileForm.getValues("firstName")}{" "}
                  {profileForm.getValues("lastName")}
                </h2>
                <p className="text-gray-600 text-sm">
                  @{profileForm.getValues("username")}
                </p>
                <Badge variant="default" className="mt-2">
                  Professional Agent
                </Badge>
              </div>

              {/* Agent Stats */}
              <div className="space-y-4 border-t pt-6">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Briefcase className="h-4 w-4" />
                    <span>Experience</span>
                  </div>
                  <span className="font-medium">
                    {profileForm.getValues("years_of_experience") || 0} years
                  </span>
                </div>

                {/* <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Star className="h-4 w-4" />
                    <span>Rating</span>
                  </div>
                  <span className="font-medium">
                    {reviewSummary.averageRating.toFixed(1)}
                  </span>
                </div> */}

                {/* <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>Reviews</span>
                  </div>
                  <span className="font-medium">
                    {reviewSummary.totalReviews}
                  </span>
                </div> */}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger
                value="verification"
                className="flex items-center gap-2"
              >
                <Shield className="h-4 w-4" />
                Verification
                {verificationStatus?.verification_status === "pending" && (
                  <Badge
                    variant="secondary"
                    className="ml-1 h-4 w-4 p-0 flex items-center justify-center"
                  >
                    !
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <Form {...profileForm}>
                <form onSubmit={profileForm.handleSubmit(handleProfileSubmit)}>
                  {/* Personal Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>
                        Update your personal details and contact information
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={profileForm.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="John"
                                  disabled={isUpdating}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={profileForm.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Last Name</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Doe"
                                  disabled={isUpdating}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={profileForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-2">
                                <Mail className="h-4 w-4" />
                                Email Address
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="email"
                                  {...field}
                                  placeholder="john@example.com"
                                  disabled={isUpdating}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={profileForm.control}
                          name="phone_no"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-2">
                                <Phone className="h-4 w-4" />
                                Phone Number
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="tel"
                                  {...field}
                                  placeholder="+1 (555) 123-4567"
                                  disabled={isUpdating}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={profileForm.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                              <Input {...field} disabled={isUpdating} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>

                  {/* Professional Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Professional Information</CardTitle>
                      <CardDescription>
                        Update your professional details and service information
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <FormField
                        control={profileForm.control}
                        name="bio"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Professional Bio</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Tell clients about your experience and expertise..."
                                className="min-h-[120px]"
                                disabled={isUpdating}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={profileForm.control}
                          name="years_of_experience"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                Years of Experience
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  {...field}
                                  onChange={(e) =>
                                    field.onChange(
                                      parseInt(e.target.value) || 0
                                    )
                                  }
                                  disabled={isUpdating}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={profileForm.control}
                          name="location"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                Location
                              </FormLabel>
                              <FormControl>
                                <Input {...field} disabled={isUpdating} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={profileForm.control}
                        name="service_area"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Service Area</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g., Manhattan, Brooklyn, Queens"
                                disabled={isUpdating}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex justify-end gap-3 pt-4 border-t">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => profileForm.reset()}
                          disabled={isUpdating}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          disabled={
                            isUpdating || !profileForm.formState.isDirty
                          }
                        >
                          {isUpdating ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin mr-2" />
                              Saving...
                            </>
                          ) : (
                            "Save Changes"
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </form>
              </Form>
            </TabsContent>

            {/* Verification Tab */}
            <TabsContent value="verification" className="space-y-6">
              {verificationLoading ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-gray-500" />
                    <p className="text-gray-600">
                      Loading verification status...
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <>
                  {showDocumentForm ? (
                    <DocumentSubmissionForm
                      onSubmit={submitDocument}
                      onCancel={() => setShowDocumentForm(false)}
                      isSubmitting={verificationSubmitting}
                    />
                  ) : (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Shield className="h-5 w-5" />
                          Verification Status
                        </CardTitle>
                        <CardDescription>
                          Your verification status and document submissions
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {/* Status Overview */}
                        <div className="flex items-center justify-between p-4 rounded-lg border">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <Badge
                                variant={getVerificationBadgeVariant(
                                  verificationStatus?.verification_status
                                )}
                                className="capitalize"
                              >
                                {verificationStatus?.verification_status ||
                                  "not_started"}
                              </Badge>
                              {verificationStatus?.documents?.[0] && (
                                <span className="text-sm text-gray-600">
                                  Since{" "}
                                  {formatDate(
                                    verificationStatus.documents[0].created_at
                                  )}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">
                              {verificationStatus?.verification_status ===
                              "verified"
                                ? "Your account is fully verified and visible to clients."
                                : verificationStatus?.verification_status ===
                                  "pending"
                                ? "Your documents are under review. This usually takes 1-2 business days."
                                : "Complete verification to start receiving booking requests."}
                            </p>
                          </div>
                          {verificationStatus?.verification_status ===
                          "verified" ? (
                            <CheckCircle2 className="h-8 w-8 text-green-500" />
                          ) : (
                            <AlertCircle className="h-8 w-8 text-amber-500" />
                          )}
                        </div>
                        {/* Documents List */}
                        {verificationStatus?.documents &&
                          verificationStatus.documents.length > 0 && (
                            <div className="space-y-3">
                              <h4 className="font-medium text-gray-900">
                                Submitted Documents
                              </h4>
                              {verificationStatus.documents.map(
                                (doc: VerificationDocument, index: number) => (
                                  <div
                                    key={doc.id}
                                    className="flex items-center justify-between p-3 rounded-lg border"
                                  >
                                    <div className="flex items-center gap-3">
                                      <FileText className="h-5 w-5 text-gray-400" />
                                      <div>
                                        <p className="font-medium text-gray-900 capitalize">
                                          {doc.document_type.replace(/_/g, " ")}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                          Submitted on{" "}
                                          {formatDate(doc.created_at)}
                                        </p>
                                        {doc.admin_notes && (
                                          <p className="text-sm text-gray-600 mt-1">
                                            Notes: {doc.admin_notes}
                                          </p>
                                        )}
                                        {/* Add a link to view the document */}
                                        <a
                                          href={doc.document_url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-sm text-blue-600 hover:text-blue-800 mt-1 inline-block"
                                        >
                                          View Document
                                        </a>
                                      </div>
                                    </div>
                                    <Badge
                                      variant={getVerificationBadgeVariant(
                                        doc.status
                                      )}
                                      className="capitalize"
                                    >
                                      {doc.status}
                                    </Badge>
                                  </div>
                                )
                              )}
                            </div>
                          )}
                        <Button
                          className="w-full"
                          onClick={() => setShowDocumentForm(true)}
                          disabled={verificationSubmitting}
                        >
                          <FileText className="h-4 w-4 mr-2" />
                          Submit New Document
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </>
              )}
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                  <CardDescription>
                    Update your password to keep your account secure
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...passwordForm}>
                    <form
                      onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
                      className="space-y-4"
                    >
                      <FormField
                        control={passwordForm.control}
                        name="currentPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Current Password</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  type={
                                    showCurrentPassword ? "text" : "password"
                                  }
                                  placeholder="Enter current password"
                                  disabled={isChangingPassword}
                                  {...field}
                                />
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                  onClick={toggleCurrentPasswordVisibility}
                                >
                                  {showCurrentPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                  ) : (
                                    <Eye className="h-4 w-4" />
                                  )}
                                </Button>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={passwordForm.control}
                        name="newPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>New Password</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  type={showNewPassword ? "text" : "password"}
                                  placeholder="Enter new password"
                                  disabled={isChangingPassword}
                                  {...field}
                                />
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                  onClick={toggleNewPasswordVisibility}
                                >
                                  {showNewPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                  ) : (
                                    <Eye className="h-4 w-4" />
                                  )}
                                </Button>
                              </div>
                            </FormControl>
                            <FormMessage />
                            <div className="text-sm text-gray-500 mt-1">
                              Password must be at least 8 characters and contain
                              uppercase, lowercase, and number/special
                              character.
                            </div>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={passwordForm.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirm New Password</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  type={
                                    showConfirmPassword ? "text" : "password"
                                  }
                                  placeholder="Confirm new password"
                                  disabled={isChangingPassword}
                                  {...field}
                                />
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                  onClick={toggleConfirmPasswordVisibility}
                                >
                                  {showConfirmPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                  ) : (
                                    <Eye className="h-4 w-4" />
                                  )}
                                </Button>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex justify-end gap-3 pt-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => passwordForm.reset()}
                          disabled={isChangingPassword}
                        >
                          Cancel
                        </Button>
                        <Button type="submit" disabled={isChangingPassword}>
                          {isChangingPassword ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin mr-2" />
                              Updating...
                            </>
                          ) : (
                            "Update Password"
                          )}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
