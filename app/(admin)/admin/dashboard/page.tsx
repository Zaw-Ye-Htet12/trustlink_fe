// app/(admin)/admin/dashboard/page.tsx
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
import {
  Users,
  UserCheck,
  FileText,
  TrendingUp,
  AlertTriangle,
  Shield,
  Calendar,
  FolderOpen,
  Tags,
} from "lucide-react";
import Link from "next/link";

// Mock data based on API endpoints
const dashboardStats = [
  {
    label: "Total Users",
    value: "1,247",
    icon: Users,
    color: "text-blue-600",
    change: "+12% this month",
    description: "Registered users",
  },
  {
    label: "Total Agents",
    value: "89",
    icon: UserCheck,
    color: "text-green-600",
    change: "+5 new agents",
    description: "Verified professionals",
  },
  {
    label: "Pending Verifications",
    value: "23",
    icon: FileText,
    color: "text-amber-600",
    change: "Requires attention",
    description: "Documents to review",
  },
  {
    label: "Active Categories",
    value: "15",
    icon: Shield,
    color: "text-purple-600",
    change: "All categories active",
    description: "Service categories",
  },
];

const recentActivities = [
  {
    id: 1,
    type: "agent_verification",
    title: "New agent registration",
    description: "Sarah Johnson submitted verification documents",
    time: "2 hours ago",
    priority: "high",
  },
  {
    id: 2,
    type: "user_registration",
    title: "New customer joined",
    description: "Mike Chen registered as customer",
    time: "4 hours ago",
    priority: "medium",
  },
  {
    id: 3,
    type: "verification_approved",
    title: "Agent verified",
    description: "David Brown's documents approved",
    time: "1 day ago",
    priority: "low",
  },
];

const quickStats = {
  users: {
    total: 1247,
    active: 1189,
    inactive: 58,
  },
  agents: {
    verified: 67,
    pending: 23,
    rejected: 12,
  },
  verifications: {
    approved: 145,
    rejected: 28,
    pending: 23,
  },
};

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Platform overview and quick insights</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.label}
              className="hover:shadow-md transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      {stat.value}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {stat.description}
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg bg-gray-50 ${stat.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
                <div
                  className={`flex items-center gap-1 mt-3 ${
                    stat.label === "Pending Verifications"
                      ? "text-amber-600"
                      : "text-green-600"
                  }`}
                >
                  <TrendingUp className="h-3 w-3" />
                  <span className="text-xs">{stat.change}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Recent Activities
            </CardTitle>
            <CardDescription>
              Latest platform activities requiring attention
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-4 p-1">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      activity.priority === "high"
                        ? "bg-red-500"
                        : activity.priority === "medium"
                        ? "bg-amber-500"
                        : "bg-green-500"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-gray-900">
                        {activity.title}
                      </p>
                      <Badge
                        variant={
                          activity.priority === "high"
                            ? "destructive"
                            : activity.priority === "medium"
                            ? "default"
                            : "secondary"
                        }
                        className="text-xs"
                      >
                        {activity.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {activity.description}
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t p-3">
              <Button variant="ghost" size="sm" className="w-full">
                View All Activities
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="space-y-6">
          {/* Users Overview */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-5 w-5" />
                Users Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {quickStats.users.total}
                  </p>
                  <p className="text-xs text-gray-600">Total</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">
                    {quickStats.users.active}
                  </p>
                  <p className="text-xs text-gray-600">Active</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-red-600">
                    {quickStats.users.inactive}
                  </p>
                  <p className="text-xs text-gray-600">Inactive</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link href="/admin/users">Manage Users</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Agents Overview */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <UserCheck className="h-5 w-5" />
                Agents Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-green-600">
                    {quickStats.agents.verified}
                  </p>
                  <p className="text-xs text-gray-600">Verified</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-amber-600">
                    {quickStats.agents.pending}
                  </p>
                  <p className="text-xs text-gray-600">Pending</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-red-600">
                    {quickStats.agents.rejected}
                  </p>
                  <p className="text-xs text-gray-600">Rejected</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link href="/admin/agents">Manage Agents</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Frequently used administrative tasks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-16 flex-col" asChild>
              <Link href="/admin/verification-docs">
                <FileText className="h-5 w-5 mb-1" />
                <span className="text-sm">Review Docs</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-16 flex-col" asChild>
              <Link href="/admin/users">
                <Users className="h-5 w-5 mb-1" />
                <span className="text-sm">Manage Users</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-16 flex-col" asChild>
              <Link href="/admin/categories">
                <FolderOpen className="h-5 w-5 mb-1" />
                <span className="text-sm">Categories</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-16 flex-col" asChild>
              <Link href="/admin/tags">
                <Tags className="h-5 w-5 mb-1" />
                <span className="text-sm">Manage Tags</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
