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
} from "lucide-react";
import { useState } from "react";

// Mock data based on API endpoints
const agentProfile = {
  personal: {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    username: "johndoe_pro",
    profilePhoto: "JD",
    joinDate: "January 2023",
  },
  professional: {
    bio: "Professional cleaning specialist with over 5 years of experience. Committed to providing exceptional service with attention to detail and eco-friendly products.",
    yearsOfExperience: 5,
    location: "New York, NY",
    serviceArea: "Manhattan, Brooklyn, Queens",
    specialties: [
      "Home Cleaning",
      "Office Cleaning",
      "Move-in/Move-out",
      "Deep Cleaning",
    ],
    hourlyRate: 85,
  },
  verification: {
    status: "verified",
    documents: [
      { type: "ID Verification", status: "approved", date: "2024-01-15" },
      { type: "Business License", status: "approved", date: "2024-01-15" },
      { type: "Insurance Certificate", status: "approved", date: "2024-01-15" },
    ],
    nextReview: "2024-07-15",
  },
  stats: {
    totalServices: 8,
    completedJobs: 156,
    averageRating: 4.8,
    responseRate: "98%",
    responseTime: "2 hours",
  },
};

export default function AgentProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    bookingAlerts: true,
    reviewAlerts: true,
    promotions: false,
  });

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
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
                    {agentProfile.personal.profilePhoto}
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
                  {agentProfile.personal.firstName}{" "}
                  {agentProfile.personal.lastName}
                </h2>
                <p className="text-gray-600 text-sm">
                  @{agentProfile.personal.username}
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
                    <span>Services</span>
                  </div>
                  <span className="font-medium">
                    {agentProfile.stats.totalServices}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Completed Jobs</span>
                  </div>
                  <span className="font-medium">
                    {agentProfile.stats.completedJobs}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Star className="h-4 w-4" />
                    <span>Rating</span>
                  </div>
                  <span className="font-medium">
                    {agentProfile.stats.averageRating}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>Response Time</span>
                  </div>
                  <span className="font-medium">
                    {agentProfile.stats.responseTime}
                  </span>
                </div>
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
            <TabsList className="grid w-full grid-cols-4">
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
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                className="flex items-center gap-2"
              >
                <Bell className="h-4 w-4" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
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
                    <div className="space-y-3">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        defaultValue={agentProfile.personal.firstName}
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        defaultValue={agentProfile.personal.lastName}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label
                        htmlFor="email"
                        className="flex items-center gap-2"
                      >
                        <Mail className="h-4 w-4" />
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        defaultValue={agentProfile.personal.email}
                      />
                    </div>
                    <div className="space-y-3">
                      <Label
                        htmlFor="phone"
                        className="flex items-center gap-2"
                      >
                        <Phone className="h-4 w-4" />
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        defaultValue={agentProfile.personal.phone}
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      defaultValue={agentProfile.personal.username}
                    />
                  </div>
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
                  <div className="space-y-3">
                    <Label htmlFor="bio">Professional Bio</Label>
                    <Textarea
                      id="bio"
                      placeholder="Tell clients about your experience and expertise..."
                      defaultValue={agentProfile.professional.bio}
                      className="min-h-[120px]"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label
                        htmlFor="experience"
                        className="flex items-center gap-2"
                      >
                        <Calendar className="h-4 w-4" />
                        Years of Experience
                      </Label>
                      <Input
                        id="experience"
                        type="number"
                        defaultValue={
                          agentProfile.professional.yearsOfExperience
                        }
                      />
                    </div>
                    <div className="space-y-3">
                      <Label
                        htmlFor="hourlyRate"
                        className="flex items-center gap-2"
                      >
                        <DollarSign className="h-4 w-4" />
                        Hourly Rate ($)
                      </Label>
                      <Input
                        id="hourlyRate"
                        type="number"
                        defaultValue={agentProfile.professional.hourlyRate}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label
                        htmlFor="location"
                        className="flex items-center gap-2"
                      >
                        <MapPin className="h-4 w-4" />
                        Location
                      </Label>
                      <Input
                        id="location"
                        defaultValue={agentProfile.professional.location}
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="serviceArea">Service Area</Label>
                      <Input
                        id="serviceArea"
                        defaultValue={agentProfile.professional.serviceArea}
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>Specialties</Label>
                    <div className="flex flex-wrap gap-2">
                      {agentProfile.professional.specialties.map(
                        (specialty, index) => (
                          <Badge key={index} variant="secondary">
                            {specialty}
                          </Badge>
                        )
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t">
                    <Button variant="outline">Cancel</Button>
                    <Button>Save Changes</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Verification Tab */}
            <TabsContent value="verification" className="space-y-6">
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
                          variant={
                            agentProfile.verification.status === "verified"
                              ? "default"
                              : "secondary"
                          }
                          className="capitalize"
                        >
                          {agentProfile.verification.status}
                        </Badge>
                        <span className="text-sm text-gray-600">
                          Verified since{" "}
                          {agentProfile.verification.documents[0].date}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Next review: {agentProfile.verification.nextReview}
                      </p>
                    </div>
                    <CheckCircle2 className="h-8 w-8 text-green-500" />
                  </div>

                  {/* Documents List */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">
                      Submitted Documents
                    </h4>
                    {agentProfile.verification.documents.map((doc, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-lg border"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-gray-400" />
                          <div>
                            <p className="font-medium text-gray-900">
                              {doc.type}
                            </p>
                            <p className="text-sm text-gray-600">
                              Submitted on {doc.date}
                            </p>
                          </div>
                        </div>
                        <Badge variant="default" className="capitalize">
                          {doc.status}
                        </Badge>
                      </div>
                    ))}
                  </div>

                  <Button className="w-full">
                    <FileText className="h-4 w-4 mr-2" />
                    Submit New Document
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>
                    Choose how you want to receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg border">
                      <div className="space-y-1">
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-gray-600">
                          Receive booking updates and important information
                        </p>
                      </div>
                      <Switch
                        checked={notifications.email}
                        onCheckedChange={() => toggleNotification("email")}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg border">
                      <div className="space-y-1">
                        <p className="font-medium">SMS Notifications</p>
                        <p className="text-sm text-gray-600">
                          Receive text message alerts for urgent matters
                        </p>
                      </div>
                      <Switch
                        checked={notifications.sms}
                        onCheckedChange={() => toggleNotification("sms")}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg border">
                      <div className="space-y-1">
                        <p className="font-medium">Booking Alerts</p>
                        <p className="text-sm text-gray-600">
                          Get notified about new booking requests
                        </p>
                      </div>
                      <Switch
                        checked={notifications.bookingAlerts}
                        onCheckedChange={() =>
                          toggleNotification("bookingAlerts")
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg border">
                      <div className="space-y-1">
                        <p className="font-medium">Review Alerts</p>
                        <p className="text-sm text-gray-600">
                          Get notified when you receive new reviews
                        </p>
                      </div>
                      <Switch
                        checked={notifications.reviewAlerts}
                        onCheckedChange={() =>
                          toggleNotification("reviewAlerts")
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg border">
                      <div className="space-y-1">
                        <p className="font-medium">Promotional Emails</p>
                        <p className="text-sm text-gray-600">
                          Receive platform updates and promotional offers
                        </p>
                      </div>
                      <Switch
                        checked={notifications.promotions}
                        onCheckedChange={() => toggleNotification("promotions")}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>
                    Manage your account preferences and security
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">
                      Change Password
                    </h4>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-3">
                        <Label htmlFor="currentPassword">
                          Current Password
                        </Label>
                        <Input
                          id="currentPassword"
                          type="password"
                          placeholder="Enter current password"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input
                          id="newPassword"
                          type="password"
                          placeholder="Enter new password"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="confirmPassword">
                          Confirm New Password
                        </Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="Confirm new password"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t">
                    <Button variant="outline">Cancel</Button>
                    <Button>Update Password</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Privacy Settings</CardTitle>
                  <CardDescription>
                    Control your privacy and data preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="space-y-1">
                      <p className="font-medium">Profile Visibility</p>
                      <p className="text-sm text-gray-600">
                        Make your profile visible to potential clients
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="space-y-1">
                      <p className="font-medium">Data Analytics</p>
                      <p className="text-sm text-gray-600">
                        Share anonymous data to help improve our platform
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
