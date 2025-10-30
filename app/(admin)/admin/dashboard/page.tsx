// app/admin/dashboard/page.tsx
"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserCheck, UserX, FileText, AlertCircle } from "lucide-react";
import { useAdminDashboard } from "@/hooks/admin/useAdminDashboard";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminDashboardPage() {
  const { dashboard, isLoading, error } = useAdminDashboard();

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50/30 py-8 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Failed to Load Dashboard
            </h3>
            <p className="text-gray-600">
              There was an error loading the dashboard data.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const stats = [
    {
      title: "Total Users",
      value: dashboard?.totalUsers || 0,
      icon: Users,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Total Agents",
      value: dashboard?.totalAgents || 0,
      icon: UserCheck,
      color: "bg-green-50 text-green-600",
    },
    {
      title: "Total Customers",
      value: dashboard?.totalCustomers || 0,
      icon: Users,
      color: "bg-purple-50 text-purple-600",
    },
    {
      title: "Pending Verifications",
      value: dashboard?.totalPendingVerifications || 0,
      icon: FileText,
      color: "bg-amber-50 text-amber-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50/30 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            Overview of platform statistics and activities
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {stat.title}
                    </p>
                    {isLoading ? (
                      <Skeleton className="h-8 w-20 mt-1" />
                    ) : (
                      <p className="text-2xl font-bold text-gray-900 mt-1">
                        {stat.value}
                      </p>
                    )}
                  </div>
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <a
                  href="/admin/agents"
                  className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <UserCheck className="h-6 w-6 text-green-600 mb-2" />
                  <h3 className="font-semibold">Manage Agents</h3>
                  <p className="text-sm text-gray-600">
                    Review and verify agent applications
                  </p>
                </a>
                <a
                  href="/admin/users"
                  className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Users className="h-6 w-6 text-blue-600 mb-2" />
                  <h3 className="font-semibold">Manage Users</h3>
                  <p className="text-sm text-gray-600">
                    View and manage all users
                  </p>
                </a>
                <a
                  href="/admin/categories"
                  className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <FileText className="h-6 w-6 text-purple-600 mb-2" />
                  <h3 className="font-semibold">Categories</h3>
                  <p className="text-sm text-gray-600">
                    Manage service categories
                  </p>
                </a>
                <a
                  href="/admin/verification-docs"
                  className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <FileText className="h-6 w-6 text-amber-600 mb-2" />
                  <h3 className="font-semibold">Verifications</h3>
                  <p className="text-sm text-gray-600">
                    Review verification documents
                  </p>
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">New agent registration</p>
                    <p className="text-sm text-gray-600">2 hours ago</p>
                  </div>
                  <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full">
                    Pending
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">User account deactivated</p>
                    <p className="text-sm text-gray-600">5 hours ago</p>
                  </div>
                  <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                    Action
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">New category added</p>
                    <p className="text-sm text-gray-600">1 day ago</p>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    Completed
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
