// app/(admin)/admin/agents/page.tsx
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
  MapPin,
  Star,
  CheckCircle2,
  XCircle,
  Clock,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

// Mock data based on API endpoints
const agentsData = [
  {
    id: 1,
    username: "sarah_cleaner",
    email: "sarah.johnson@example.com",
    verificationStatus: "approved",
    location: "New York, NY",
    yearsOfExperience: 5,
    rating: 4.8,
    totalReviews: 47,
    services: ["Home Cleaning", "Office Cleaning"],
    joinedDate: "2024-01-10",
    documents: 3,
  },
  {
    id: 2,
    username: "mike_plumber",
    email: "mike.chen@example.com",
    verificationStatus: "pending",
    location: "Brooklyn, NY",
    yearsOfExperience: 8,
    rating: 4.9,
    totalReviews: 23,
    services: ["Plumbing", "Emergency Repair"],
    joinedDate: "2024-01-15",
    documents: 2,
  },
  {
    id: 3,
    username: "david_electric",
    email: "david.brown@example.com",
    verificationStatus: "rejected",
    location: "Manhattan, NY",
    yearsOfExperience: 6,
    rating: 4.7,
    totalReviews: 34,
    services: ["Electrical", "Wiring"],
    joinedDate: "2024-01-08",
    documents: 3,
  },
];

export default function AgentsManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredAgents = agentsData
    .filter(
      (agent) =>
        agent.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.location.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((agent) =>
      statusFilter === "all" ? true : agent.verificationStatus === statusFilter
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Agents Management
          </h1>
          <p className="text-gray-600">
            Manage agent verifications and profiles
          </p>
        </div>
        <Button variant="outline">View Pending Verifications</Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search agents by name, email, or location..."
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
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
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

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAgents.map((agent) => (
          <Card key={agent.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              {/* Agent Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-semibold text-sm">
                    {agent.username[0].toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {agent.username}
                    </h3>
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      {agent.email}
                    </p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Profile</DropdownMenuItem>
                    <DropdownMenuItem>View Documents</DropdownMenuItem>
                    {agent.verificationStatus === "pending" && (
                      <>
                        <DropdownMenuItem className="text-green-600">
                          Approve Agent
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          Reject Agent
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuItem className="text-red-600">
                      Suspend Agent
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Verification Status */}
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    agent.verificationStatus
                  )}`}
                >
                  {getStatusIcon(agent.verificationStatus)}
                  {agent.verificationStatus.charAt(0).toUpperCase() +
                    agent.verificationStatus.slice(1)}
                </div>
                <div className="text-sm text-gray-600">
                  {agent.documents} docs
                </div>
              </div>

              {/* Agent Details */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  {agent.location}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <User className="h-4 w-4" />
                  {agent.yearsOfExperience} years experience
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Star className="h-4 w-4 text-amber-400 fill-current" />
                  {agent.rating} ({agent.totalReviews} reviews)
                </div>
              </div>

              {/* Services */}
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Services:
                </p>
                <div className="flex flex-wrap gap-1">
                  {agent.services.slice(0, 3).map((service, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {service}
                    </Badge>
                  ))}
                  {agent.services.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{agent.services.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                {agent.verificationStatus === "pending" ? (
                  <>
                    <Button size="sm" className="flex-1" variant="default">
                      <CheckCircle2 className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                    <Button size="sm" className="flex-1" variant="destructive">
                      <XCircle className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                  </>
                ) : (
                  <Button size="sm" className="w-full" variant="outline">
                    View Details
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredAgents.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <User className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No agents found
            </h3>
            <p className="text-gray-600">
              {searchTerm
                ? "Try adjusting your search terms"
                : "No agents match the current filters"}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">67</p>
            <p className="text-sm text-gray-600">Approved Agents</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock className="h-6 w-6 text-amber-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">23</p>
            <p className="text-sm text-gray-600">Pending Review</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">12</p>
            <p className="text-sm text-gray-600">Rejected</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <User className="h-6 w-6 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">102</p>
            <p className="text-sm text-gray-600">Total Agents</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
