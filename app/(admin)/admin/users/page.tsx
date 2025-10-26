// app/(admin)/admin/users/page.tsx
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
  MoreHorizontal,
  User,
  Mail,
  Calendar,
  Shield,
  Ban,
  Edit,
  Users,
  UserCheck,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

// Mock data based on API endpoints
const usersData = [
  {
    id: 1,
    username: "john_doe",
    email: "john.doe@example.com",
    role: "customer",
    isActive: true,
    createdAt: "2024-01-15",
    lastLogin: "2024-01-20",
    profilePhoto: "JD",
  },
  {
    id: 2,
    username: "sarah_agent",
    email: "sarah.johnson@example.com",
    role: "agent",
    isActive: true,
    createdAt: "2024-01-10",
    lastLogin: "2024-01-19",
    profilePhoto: "SJ",
  },
  {
    id: 3,
    username: "mike_chen",
    email: "mike.chen@example.com",
    role: "customer",
    isActive: false,
    createdAt: "2024-01-08",
    lastLogin: "2024-01-12",
    profilePhoto: "MC",
  },
  {
    id: 4,
    username: "admin_user",
    email: "admin@trustlink.com",
    role: "admin",
    isActive: true,
    createdAt: "2024-01-01",
    lastLogin: "2024-01-20",
    profilePhoto: "AU",
  },
];

export default function UsersManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredUsers = usersData
    .filter(
      (user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((user) =>
      statusFilter === "all"
        ? true
        : statusFilter === "active"
        ? user.isActive
        : statusFilter === "inactive"
        ? !user.isActive
        : true
    );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users Management</h1>
          <p className="text-gray-600">
            Manage all platform users and their accounts
          </p>
        </div>
        <Button>Export Users</Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search users by name or email..."
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
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <Button variant="outline" className="whitespace-nowrap">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Users ({filteredUsers.length})</CardTitle>
          <CardDescription>
            Manage user accounts, status, and permissions
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50/50">
                  <th className="text-left p-4 font-medium text-gray-900">
                    User
                  </th>
                  <th className="text-left p-4 font-medium text-gray-900">
                    Role
                  </th>
                  <th className="text-left p-4 font-medium text-gray-900">
                    Status
                  </th>
                  <th className="text-left p-4 font-medium text-gray-900">
                    Joined
                  </th>
                  <th className="text-left p-4 font-medium text-gray-900">
                    Last Login
                  </th>
                  <th className="text-right p-4 font-medium text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-sm">
                          {user.profilePhoto}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {user.username}
                          </p>
                          <p className="text-sm text-gray-600 flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge
                        variant={
                          user.role === "admin"
                            ? "destructive"
                            : user.role === "agent"
                            ? "default"
                            : "secondary"
                        }
                        className="capitalize"
                      >
                        {user.role}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <Badge
                        variant={user.isActive ? "default" : "secondary"}
                        className="capitalize"
                      >
                        {user.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </td>
                    <td className="p-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {user.createdAt}
                      </div>
                    </td>
                    <td className="p-4 text-sm text-gray-600">
                      {user.lastLogin}
                    </td>
                    <td className="p-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <User className="h-4 w-4 mr-2" />
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit User
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className={
                              user.isActive ? "text-red-600" : "text-green-600"
                            }
                          >
                            <Ban className="h-4 w-4 mr-2" />
                            {user.isActive ? "Deactivate" : "Activate"}
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Shield className="h-4 w-4 mr-2" />
                            Delete User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredUsers.length === 0 && (
            <div className="p-12 text-center">
              <User className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No users found
              </h3>
              <p className="text-gray-600">
                {searchTerm
                  ? "Try adjusting your search terms"
                  : "No users match the current filters"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* User Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">1,247</p>
            <p className="text-sm text-gray-600">Total Users</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <UserCheck className="h-6 w-6 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">89</p>
            <p className="text-sm text-gray-600">Active Agents</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Shield className="h-6 w-6 text-amber-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">3</p>
            <p className="text-sm text-gray-600">Administrators</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
