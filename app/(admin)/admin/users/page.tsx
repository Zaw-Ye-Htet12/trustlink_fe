// app/admin/users/page.tsx
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
  Users,
  UserCheck,
  UserX,
  MoreHorizontal,
  Mail,
  Calendar,
} from "lucide-react";
import {
  useAdminUsers,
  useUpdateUser,
  useDeleteUser,
} from "@/hooks/admin/useAdminUsers";
import { User, UserRole } from "@/interfaces";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { UserStatusModal } from "@/components/admin/UserStatusModal";

export default function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showStatusModal, setShowStatusModal] = useState(false);

  const { users, isLoading, error } = useAdminUsers();
  const { updateUser, isUpdating } = useUpdateUser();
  const { deleteUser, isDeleting } = useDeleteUser();

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      searchTerm === "" ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "active" && user.is_active) ||
      (activeTab === "inactive" && !user.is_active) ||
      (activeTab === "agents" && user.role === UserRole.AGENT) ||
      (activeTab === "customers" && user.role === UserRole.CUSTOMER);

    return matchesSearch && matchesTab;
  });

  const handleUpdateStatus = (isActive: boolean) => {
    if (!selectedUser) return;

    updateUser(
      selectedUser.id,
      { is_active: isActive, userId: selectedUser.id },
      {
        onSuccess: () => {
          setShowStatusModal(false);
          setSelectedUser(null);
        },
      }
    );
  };

  const handleDeleteUser = (userId: number) => {
    if (
      confirm(
        "Are you sure you want to delete this user? This action cannot be undone."
      )
    ) {
      deleteUser(userId, {
        onSuccess: () => {
          // Success handled in hook with toast
        },
      });
    }
  };

  const getRoleBadge = (role: UserRole) => {
    const config = {
      [UserRole.AGENT]: {
        label: "Agent",
        variant: "default" as const,
        color: "bg-blue-100 text-blue-800",
      },
      [UserRole.CUSTOMER]: {
        label: "Customer",
        variant: "secondary" as const,
        color: "bg-green-100 text-green-800",
      },
      [UserRole.ADMIN]: {
        label: "Admin",
        variant: "destructive" as const,
        color: "bg-purple-100 text-purple-800",
      },
    };

    return (
      <Badge variant={config[role].variant} className={config[role].color}>
        {config[role].label}
      </Badge>
    );
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50/30 py-8 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <Users className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Failed to Load Users
            </h3>
            <p className="text-gray-600">
              There was an error loading user data.
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
            User Management
          </h1>
          <p className="text-lg text-gray-600">
            Manage all users and their accounts
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-4">
          <div className="relative w-full lg:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all" className="flex items-center gap-2">
              All Users
              <Badge variant="secondary">{users.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="active" className="flex items-center gap-2">
              Active
              <Badge variant="secondary">
                {users.filter((u) => u.is_active).length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="inactive" className="flex items-center gap-2">
              Inactive
              <Badge variant="secondary">
                {users.filter((u) => !u.is_active).length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="agents" className="flex items-center gap-2">
              Agents
              <Badge variant="secondary">
                {users.filter((u) => u.role === UserRole.AGENT).length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="customers" className="flex items-center gap-2">
              Customers
              <Badge variant="secondary">
                {users.filter((u) => u.role === UserRole.CUSTOMER).length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          {/* Users Content */}
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
            ) : filteredUsers.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {searchTerm ? "No Users Found" : "No Users"}
                  </h3>
                  <p className="text-gray-600">
                    {searchTerm
                      ? "No users match your search criteria."
                      : "There are no users in the system."}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUsers.map((user) => (
                  <Card key={user.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <Users className="h-5 w-5 text-gray-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{user.username}</h3>
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                              <Mail className="h-3 w-3" />
                              {user.email}
                            </div>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedUser(user);
                                setShowStatusModal(true);
                              }}
                            >
                              {user.is_active ? (
                                <UserX className="h-4 w-4 mr-2" />
                              ) : (
                                <UserCheck className="h-4 w-4 mr-2" />
                              )}
                              {user.is_active ? "Deactivate" : "Activate"}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleDeleteUser(user.id)}
                              className="text-red-600"
                            >
                              <UserX className="h-4 w-4 mr-2" />
                              Delete User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Status</span>
                          <Badge
                            variant={user.is_active ? "default" : "secondary"}
                            className={
                              user.is_active
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }
                          >
                            {user.is_active ? "Active" : "Inactive"}
                          </Badge>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Role</span>
                          {getRoleBadge(user.role)}
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Joined</span>
                          <span className="text-sm text-gray-600">
                            {new Date(user.created_at).toLocaleDateString()}
                          </span>
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

      {/* User Status Modal */}
      <UserStatusModal
        user={selectedUser}
        isOpen={showStatusModal}
        onClose={() => {
          setShowStatusModal(false);
          setSelectedUser(null);
        }}
        onUpdateStatus={handleUpdateStatus}
        isUpdating={isUpdating}
      />
    </div>
  );
}
