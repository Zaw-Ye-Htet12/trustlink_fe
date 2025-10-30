// app/agent/services/page.tsx
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
  Plus,
  Search,
  Filter,
  Grid3X3,
  List,
  Loader2,
  Briefcase,
} from "lucide-react";
import {
  useAgentServices,
  useDeleteService,
  useCreateService,
} from "@/hooks/agent/useAgentServices";
import { ServiceFormData, useServiceForm } from "@/hooks/agent/useServiceForm";
import { Service, CreateServiceDto } from "@/interfaces";
import { ServiceForm } from "@/components/common/ServiceForm";
import { ServiceCard } from "@/components/agent/AgentServiceCard";
import { useRouter } from "next/navigation";

export default function AgentServicesPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const router = useRouter();

  const { services, isLoading, error } = useAgentServices();
  const { createService, isCreating } = useCreateService();
  const { deleteService, isDeleting } = useDeleteService();

  const serviceForm = useServiceForm({
    service: editingService || undefined,
  });

  // Filter services based on tab and search
  const filteredServices = services.filter((service) => {
    const matchesSearch =
      searchTerm === "" ||
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "active" && service.is_active) ||
      (activeTab === "inactive" && !service.is_active);

    return matchesSearch && matchesTab;
  });

  const handleCreateService = (data: ServiceFormData) => {
    const createData: CreateServiceDto = {
      title: data.title,
      description: data.description,
      category_id: data.category_id,
      pricing_type: data.pricing_type,
      price: data.price,
      currency: data.currency,
      location_type: data.location_type,
      service_area: data.service_area,
    };

    createService(createData, {
      onSuccess: () => {
        setShowCreateForm(false);
        serviceForm.form.reset();
      },
    });
  };

  const handleUpdateService = (data: ServiceFormData) => {
    // You would implement update logic here
    console.log("Update service:", data);
    setEditingService(null);
  };

  const handleDeleteService = (serviceId: number) => {
    if (
      confirm(
        "Are you sure you want to delete this service? This action cannot be undone."
      )
    ) {
      deleteService(serviceId);
    }
  };

  const handleEditService = (service: Service) => {
    setEditingService(service);
  };

  const handleViewService = (service: Service) => {
    // Navigate to service detail page or show modal
    router.push(`/services/${service.id}`);
  };

  const handleCancelForm = () => {
    setShowCreateForm(false);
    setEditingService(null);
    serviceForm.form.reset();
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50/30 py-8 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <Briefcase className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Failed to Load Services
            </h3>
            <p className="text-gray-600 mb-4">
              There was an error loading your services. Please try again.
            </p>
            <Button onClick={() => window.location.reload()}>Retry</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/30 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              My Services
            </h1>
            <p className="text-lg text-gray-600">
              Manage and create services to offer to customers
            </p>
          </div>

          <Button
            onClick={() => setShowCreateForm(true)}
            className="mt-4 lg:mt-0"
            disabled={isCreating}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Service
          </Button>
        </div>

        {/* Create/Edit Form */}
        {(showCreateForm || editingService) && (
          <div className="mb-8">
            <ServiceForm
              form={serviceForm.form}
              onSubmit={
                editingService ? handleUpdateService : handleCreateService
              }
              onCancel={handleCancelForm}
              isSubmitting={isCreating}
              title={editingService ? "Edit Service" : "Create New Service"}
              description={
                editingService
                  ? "Update your service details"
                  : "Add a new service to your portfolio"
              }
            />
          </div>
        )}

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Services
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {services.length}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
                  <Briefcase className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Active Services
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {services.filter((s) => s.is_active).length}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-green-50 text-green-600">
                  <Briefcase className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Reviews
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {services.reduce(
                      (sum, service) => sum + (service.total_reviews || 0),
                      0
                    )}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-amber-50 text-amber-600">
                  <Briefcase className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Categories
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {new Set(services.map((s) => s.category?.name)).size}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-purple-50 text-purple-600">
                  <Briefcase className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Filters and Search */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                {/* Search */}
                <div className="relative w-full lg:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search services..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* View Controls */}
                <div className="flex items-center gap-4">
                  {/* View Mode Toggle */}
                  <div className="flex items-center gap-1 border rounded-lg p-1">
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className="h-8 w-8 p-0"
                    >
                      <Grid3X3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                      className="h-8 w-8 p-0"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* More Filters */}
                 
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all" className="flex items-center gap-2">
                All Services
                <Badge variant="secondary" className="ml-1">
                  {services.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="active" className="flex items-center gap-2">
                Active
                <Badge variant="secondary" className="ml-1">
                  {services.filter((s) => s.is_active).length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="inactive" className="flex items-center gap-2">
                Inactive
                <Badge variant="secondary" className="ml-1">
                  {services.filter((s) => !s.is_active).length}
                </Badge>
              </TabsTrigger>
            </TabsList>

            {/* Services Content */}
            <TabsContent value={activeTab} className="space-y-6">
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
                  <span className="ml-2 text-gray-600">
                    Loading services...
                  </span>
                </div>
              ) : filteredServices.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {searchTerm ? "No Services Found" : "No Services Yet"}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {searchTerm
                        ? "No services match your search criteria. Try adjusting your search."
                        : "Get started by creating your first service to offer to customers."}
                    </p>
                    {!searchTerm && (
                      <Button onClick={() => setShowCreateForm(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Create Your First Service
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-6">
                  {/* Results Count */}
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">
                      Showing {filteredServices.length} of {services.length}{" "}
                      services
                    </p>
                  </div>

                  {/* Services Grid/List */}
                  <div
                    className={
                      viewMode === "grid"
                        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        : "space-y-4"
                    }
                  >
                    {filteredServices.map((service) => (
                      <ServiceCard
                        key={service.id}
                        service={service}
                        onEdit={handleEditService}
                        onDelete={handleDeleteService}
                        onView={handleViewService}
                      />
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
