// app/customer/profile/page.tsx
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
  Heart,
  Camera,
} from "lucide-react";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    reminders: true,
    promotions: false,
    updates: true,
  });

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Mock user data
  const userData = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street, Apt 4B, New York, NY 10001",
    joinDate: "January 2023",
    memberSince: "1 year",
    totalBookings: 12,
    totalReviews: 8,
    favoriteServices: 5,
  };

  const paymentMethods = [
    {
      id: 1,
      type: "Visa",
      last4: "4242",
      expiry: "12/2025",
      isDefault: true,
    },
    {
      id: 2,
      type: "MasterCard",
      last4: "8888",
      expiry: "08/2024",
      isDefault: false,
    },
  ];

  const transactions = [
    {
      id: 1,
      service: "Home Cleaning",
      agent: "Sarah Johnson",
      date: "Jan 12, 2024",
      amount: "$85.00",
      status: "completed",
    },
    {
      id: 2,
      service: "Plumbing Repair",
      agent: "Mike Chen",
      date: "Jan 10, 2024",
      amount: "$120.00",
      status: "completed",
    },
    {
      id: 3,
      service: "Electrical Wiring",
      agent: "David Brown",
      date: "Jan 8, 2024",
      amount: "$150.00",
      status: "completed",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50/30 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-full bg-blue-50 text-blue-500">
              <User className="h-6 w-6" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              Profile Settings
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Manage your account information, security settings, and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - User Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                {/* User Avatar */}
                <div className="text-center mb-6">
                  <div className="relative inline-block">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-2xl mx-auto mb-3">
                      JD
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
                    {userData.firstName} {userData.lastName}
                  </h2>
                  <p className="text-gray-600 text-sm">{userData.email}</p>
                  <Badge variant="secondary" className="mt-2">
                    Customer
                  </Badge>
                </div>

                {/* User Stats */}
                <div className="space-y-4 border-t pt-6">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>Member since</span>
                    </div>
                    <span className="font-medium">{userData.joinDate}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <FileText className="h-4 w-4" />
                      <span>Total bookings</span>
                    </div>
                    <span className="font-medium">
                      {userData.totalBookings}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Star className="h-4 w-4" />
                      <span>Reviews written</span>
                    </div>
                    <span className="font-medium">{userData.totalReviews}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Heart className="h-4 w-4" />
                      <span>Favorites</span>
                    </div>
                    <span className="font-medium">
                      {userData.favoriteServices}
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
                <TabsTrigger
                  value="profile"
                  className="flex items-center gap-2"
                >
                  <User className="h-4 w-4" />
                  Profile
                </TabsTrigger>
                <TabsTrigger
                  value="security"
                  className="flex items-center gap-2"
                >
                  <Shield className="h-4 w-4" />
                  Security
                </TabsTrigger>
                <TabsTrigger
                  value="notifications"
                  className="flex items-center gap-2"
                >
                  <Bell className="h-4 w-4" />
                  Notifications
                </TabsTrigger>
                <TabsTrigger
                  value="billing"
                  className="flex items-center gap-2"
                >
                  <CreditCard className="h-4 w-4" />
                  Billing
                </TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile" className="space-y-6">
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
                          defaultValue={userData.firstName}
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" defaultValue={userData.lastName} />
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
                          defaultValue={userData.email}
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
                          defaultValue={userData.phone}
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label
                        htmlFor="address"
                        className="flex items-center gap-2"
                      >
                        <MapPin className="h-4 w-4" />
                        Address
                      </Label>
                      <Textarea
                        id="address"
                        placeholder="Enter your address"
                        defaultValue={userData.address}
                        className="min-h-[100px]"
                      />
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t">
                      <Button variant="outline">Cancel</Button>
                      <Button>Save Changes</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Security Tab */}
              <TabsContent value="security" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>
                      Manage your password and account security
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
                    <CardTitle>Login Activity</CardTitle>
                    <CardDescription>
                      Recent login activity on your account
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 rounded-lg border">
                        <div>
                          <p className="font-medium">New York, USA</p>
                          <p className="text-sm text-gray-600">
                            Chrome on Windows • Just now
                          </p>
                        </div>
                        <Badge variant="default">Current</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg border">
                        <div>
                          <p className="font-medium">New York, USA</p>
                          <p className="text-sm text-gray-600">
                            Safari on iPhone • 2 hours ago
                          </p>
                        </div>
                      </div>
                    </div>
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
                            Receive updates and important information via email
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
                            Receive text message alerts and reminders
                          </p>
                        </div>
                        <Switch
                          checked={notifications.sms}
                          onCheckedChange={() => toggleNotification("sms")}
                        />
                      </div>

                      <div className="flex items-center justify-between p-4 rounded-lg border">
                        <div className="space-y-1">
                          <p className="font-medium">Booking Reminders</p>
                          <p className="text-sm text-gray-600">
                            Get reminded before your appointments
                          </p>
                        </div>
                        <Switch
                          checked={notifications.reminders}
                          onCheckedChange={() =>
                            toggleNotification("reminders")
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between p-4 rounded-lg border">
                        <div className="space-y-1">
                          <p className="font-medium">Promotional Emails</p>
                          <p className="text-sm text-gray-600">
                            Receive special offers and updates
                          </p>
                        </div>
                        <Switch
                          checked={notifications.promotions}
                          onCheckedChange={() =>
                            toggleNotification("promotions")
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between p-4 rounded-lg border">
                        <div className="space-y-1">
                          <p className="font-medium">Service Updates</p>
                          <p className="text-sm text-gray-600">
                            Get notified about new services and features
                          </p>
                        </div>
                        <Switch
                          checked={notifications.updates}
                          onCheckedChange={() => toggleNotification("updates")}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Billing Tab */}
              <TabsContent value="billing" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Methods</CardTitle>
                    <CardDescription>
                      Manage your payment methods and billing preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      {paymentMethods.map((method) => (
                        <div
                          key={method.id}
                          className="flex items-center justify-between p-4 rounded-lg border"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-8 bg-blue-500 rounded flex items-center justify-center text-white text-sm font-bold">
                              {method.type === "Visa" ? "VISA" : "MC"}
                            </div>
                            <div>
                              <p className="font-medium">
                                {method.type} ending in {method.last4}
                              </p>
                              <p className="text-sm text-gray-600">
                                Expires {method.expiry}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            {method.isDefault && (
                              <Badge variant="default">Default</Badge>
                            )}
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-600 hover:text-red-700"
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Button variant="outline" className="w-full">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Add New Payment Method
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Transaction History</CardTitle>
                    <CardDescription>
                      Your recent service transactions and payments
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {transactions.map((transaction) => (
                        <div
                          key={transaction.id}
                          className="flex items-center justify-between p-4 rounded-lg border"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                              <FileText className="h-5 w-5" />
                            </div>
                            <div>
                              <p className="font-medium">
                                {transaction.service}
                              </p>
                              <p className="text-sm text-gray-600">
                                with {transaction.agent} • {transaction.date}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">
                              {transaction.amount}
                            </p>
                            <Badge variant="secondary" className="text-xs">
                              {transaction.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Button variant="outline" className="w-full mt-4">
                      View All Transactions
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
