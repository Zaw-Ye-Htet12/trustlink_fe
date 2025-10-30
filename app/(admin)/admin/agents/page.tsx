// app/admin/agents/page.tsx
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
  UserCheck,
  UserX,
  Clock,
  MoreHorizontal,
  Eye,
} from "lucide-react";
import {
  useAdminAgents,
  useAgentVerification,
} from "@/hooks/admin/useAdminAgents";
import { AgentProfile, VerificationStatus } from "@/interfaces";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { AgentVerificationModal } from "@/components/admin/AgentVerificationModel";

export default function AdminAgentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedAgent, setSelectedAgent] = useState<AgentProfile | null>(null);
  const [showVerificationModal, setShowVerificationModal] = useState(false);

  const { agents, isLoading, error } = useAdminAgents();
  const { approveAgent, rejectAgent, isApproving, isRejecting } =
    useAgentVerification();

  // Filter agents based on tab and search
  const filteredAgents = agents.filter((agent) => {
    const matchesSearch =
      searchTerm === "" ||
      agent.user?.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.user?.email?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "pending" &&
        agent.verification_status === VerificationStatus.PENDING) ||
      (activeTab === "approved" &&
        agent.verification_status === VerificationStatus.APPROVED) ||
      (activeTab === "rejected" &&
        agent.verification_status === VerificationStatus.REJECTED);

    return matchesSearch && matchesTab;
  });

  const handleApproveAgent = (agentId: number, adminNotes?: string) => {
    approveAgent(agentId, adminNotes, {
      onSuccess: () => {
        setShowVerificationModal(false);
        setSelectedAgent(null);
      },
    });
  };

  const handleRejectAgent = (agentId: number, adminNotes?: string) => {
    rejectAgent(agentId, adminNotes, {
      onSuccess: () => {
        setShowVerificationModal(false);
        setSelectedAgent(null);
      },
    });
  };

  const getStatusBadge = (status: VerificationStatus) => {
    const statusConfig = {
      [VerificationStatus.PENDING]: {
        label: "Pending",
        variant: "secondary" as const,
        icon: Clock,
        color: "text-amber-600 bg-amber-50",
      },
      [VerificationStatus.APPROVED]: {
        label: "Approved",
        variant: "default" as const,
        icon: UserCheck,
        color: "text-green-600 bg-green-50",
      },
      [VerificationStatus.REJECTED]: {
        label: "Rejected",
        variant: "destructive" as const,
        icon: UserX,
        color: "text-red-600 bg-red-50",
      },
    };

    const config = statusConfig[status];
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className={config.color}>
        <Icon className="h-3 w-3 mr-1" />
        {config.label}
      </Badge>
    );
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50/30 py-8 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <UserX className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Failed to Load Agents
            </h3>
            <p className="text-gray-600">
              There was an error loading agent data.
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
            Agent Management
          </h1>
          <p className="text-lg text-gray-600">
            Review and verify agent applications
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-4">
          {/* Search */}
          <div className="relative w-full lg:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search agents..."
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
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all" className="flex items-center gap-2">
              All Agents
              <Badge variant="secondary" className="ml-1">
                {agents.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="pending" className="flex items-center gap-2">
              Pending
              <Badge variant="secondary" className="ml-1">
                {
                  agents.filter(
                    (a) => a.verification_status === VerificationStatus.PENDING
                  ).length
                }
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="approved" className="flex items-center gap-2">
              Approved
              <Badge variant="secondary" className="ml-1">
                {
                  agents.filter(
                    (a) => a.verification_status === VerificationStatus.APPROVED
                  ).length
                }
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="rejected" className="flex items-center gap-2">
              Rejected
              <Badge variant="secondary" className="ml-1">
                {
                  agents.filter(
                    (a) => a.verification_status === VerificationStatus.REJECTED
                  ).length
                }
              </Badge>
            </TabsTrigger>
          </TabsList>

          {/* Agents Content */}
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
            ) : filteredAgents.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <UserX className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {searchTerm ? "No Agents Found" : "No Agents Yet"}
                  </h3>
                  <p className="text-gray-600">
                    {searchTerm
                      ? "No agents match your search criteria."
                      : "There are no agent applications to review."}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredAgents.map((agent) => (
                  <Card key={agent.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                            <UserCheck className="h-6 w-6 text-gray-500" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {agent.user?.username || "Unknown User"}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {agent.user?.email}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              {agent.location && (
                                <span className="text-xs text-gray-500">
                                  {agent.location}
                                </span>
                              )}
                              {agent.years_of_experience && (
                                <span className="text-xs text-gray-500">
                                  {agent.years_of_experience} years experience
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          {getStatusBadge(agent.verification_status)}

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedAgent(agent);
                                  setShowVerificationModal(true);
                                }}
                              >
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
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

      {/* Verification Modal */}
      <AgentVerificationModal
        agent={selectedAgent}
        isOpen={showVerificationModal}
        onClose={() => {
          setShowVerificationModal(false);
          setSelectedAgent(null);
        }}
        onApprove={handleApproveAgent}
        onReject={handleRejectAgent}
        isApproving={isApproving}
        isRejecting={isRejecting}
      />
    </div>
  );
}
