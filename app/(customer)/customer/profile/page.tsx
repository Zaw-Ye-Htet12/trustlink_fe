// app/customer/profile/page.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Camera,
  Calendar,
  FileText,
  Heart,
  Loader2,
  Shield,
  Star,
  User,
  EyeOff,
  Eye,
} from "lucide-react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useCustomerProfileForm } from "@/hooks/useCustomerProfile";
import { useChangePassword } from "@/hooks/useChangePassword";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");

  const {
    profileForm: form,
    onProfileSubmit,
    isLoading,
    isUpdating,
  } = useCustomerProfileForm();

  const {
    form: passwordForm,
    isChangingPassword,
    onSubmit: handlePasswordSubmit,
    showConfirmPassword,
    showCurrentPassword,
    showNewPassword,
    toggleConfirmPasswordVisibility,
    toggleCurrentPasswordVisibility,
    toggleNewPasswordVisibility,
  } = useChangePassword();

  // Remove debug logs in production
  const isProfileFormValid = form.formState.isValid;
  const isProfileFormDirty = form.formState.isDirty;

  const handleFormSubmit = (data: any) => {
    onProfileSubmit(data);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
        <span className="ml-2 text-gray-600">Loading profile...</span>
      </div>
    );
  }

  const userStats = {
    firstName: form.getValues("firstName") || "John",
    lastName: form.getValues("lastName") || "Doe",
    email: form.getValues("email") || "john.doe@example.com",
    joinDate: "January 2023",
    totalBookings: 12,
    totalReviews: 8,
    favoriteServices: 5,
  };

  return (
    <div className="min-h-screen bg-gray-50/30 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
            Manage your account and personal details
          </p>
        </div>

        {/* Show validation banner only for profile tab */}
        {activeTab === "profile" &&
          !isProfileFormValid &&
          isProfileFormDirty && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center">
                <div className="text-red-600 text-sm">
                  <strong>Form has validation errors:</strong> Please fix the
                  errors below before submitting.
                </div>
              </div>
            </div>
          )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="relative inline-block">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-2xl mx-auto mb-3">
                      {userStats.firstName.charAt(0)}
                      {userStats.lastName.charAt(0)}
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
                    {userStats.firstName} {userStats.lastName}
                  </h2>
                  <p className="text-gray-600 text-sm">{userStats.email}</p>
                  <Badge variant="secondary" className="mt-2">
                    Customer
                  </Badge>
                </div>

                <div className="space-y-4 border-t pt-6">
                  <Stat
                    icon={Calendar}
                    label="Member since"
                    value={userStats.joinDate}
                  />
                  <Stat
                    icon={FileText}
                    label="Total bookings"
                    value={userStats.totalBookings}
                  />
                  <Stat
                    icon={Star}
                    label="Reviews written"
                    value={userStats.totalReviews}
                  />
                  <Stat
                    icon={Heart}
                    label="Favorites"
                    value={userStats.favoriteServices}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
              </TabsList>

              {/* Profile Form */}
              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>
                      Update your personal details
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(handleFormSubmit)}
                        className="space-y-6"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>First Name *</FormLabel>
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
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Last Name *</FormLabel>
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
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email *</FormLabel>
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
                            control={form.control}
                            name="phone_no"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone Number</FormLabel>
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
                          control={form.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Address *</FormLabel>
                              <FormControl>
                                <Textarea
                                  {...field}
                                  placeholder="123 Main Street, City, State, ZIP"
                                  disabled={isUpdating}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="bio"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Bio</FormLabel>
                              <FormControl>
                                <Textarea
                                  {...field}
                                  placeholder="Tell us about yourself..."
                                  disabled={isUpdating}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="profile_photo_url"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Profile Photo URL</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="https://example.com/photo.jpg"
                                  disabled={isUpdating}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="flex justify-end gap-3 border-t pt-6">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => form.reset()}
                            disabled={isUpdating}
                          >
                            Cancel
                          </Button>
                          <Button
                            type="submit"
                            disabled={isUpdating || !isProfileFormValid}
                            className="min-w-[140px]"
                          >
                            {isUpdating ? (
                              <>
                                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                Saving...
                              </>
                            ) : (
                              <>
                                Save Changes
                                {!isProfileFormValid && " (Fix Errors)"}
                              </>
                            )}
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-blue-500" />
                      <CardTitle>Security Settings</CardTitle>
                    </div>
                    <CardDescription>
                      Change your password and manage security preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...passwordForm}>
                      <form
                        onSubmit={passwordForm.handleSubmit(
                          handlePasswordSubmit
                        )}
                        className="space-y-6"
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
                                    {...field}
                                    placeholder="Enter your current password"
                                    className="pr-10"
                                    disabled={isChangingPassword}
                                  />
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                    onClick={toggleCurrentPasswordVisibility}
                                    disabled={isChangingPassword}
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
                                    {...field}
                                    placeholder="Enter your new password"
                                    className="pr-10"
                                    disabled={isChangingPassword}
                                  />
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                    onClick={toggleNewPasswordVisibility}
                                    disabled={isChangingPassword}
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
                                Password must be at least 8 characters and
                                contain uppercase, lowercase, and number/special
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
                                    {...field}
                                    placeholder="Confirm your new password"
                                    className="pr-10"
                                    disabled={isChangingPassword}
                                  />
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                    onClick={toggleConfirmPasswordVisibility}
                                    disabled={isChangingPassword}
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

                        <div className="flex justify-end border-t pt-6">
                          <Button
                            type="submit"
                            disabled={isChangingPassword}
                            className="min-w-[140px]"
                          >
                            {isChangingPassword ? (
                              <>
                                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                Changing...
                              </>
                            ) : (
                              "Change Password"
                            )}
                          </Button>
                        </div>
                      </form>
                    </Form>

                    {/* Additional Security Features */}
                    <div className="mt-8 pt-6 border-t">
                      <h3 className="text-lg font-semibold mb-4">
                        Additional Security
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h4 className="font-medium">
                              Two-Factor Authentication
                            </h4>
                            <p className="text-sm text-gray-600">
                              Add an extra layer of security to your account
                            </p>
                          </div>
                          <Button variant="outline" disabled>
                            Coming Soon
                          </Button>
                        </div>

                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h4 className="font-medium">Login Activity</h4>
                            <p className="text-sm text-gray-600">
                              View your recent login history
                            </p>
                          </div>
                          <Button variant="outline" disabled>
                            Coming Soon
                          </Button>
                        </div>
                      </div>
                    </div>
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

const Stat = ({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
}) => (
  <div className="flex items-center justify-between text-sm">
    <div className="flex items-center gap-2 text-gray-600">
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </div>
    <span className="font-medium">{value}</span>
  </div>
);
