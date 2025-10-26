// app/(admin)/admin/categories/page.tsx
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
import { Textarea } from "@/components/ui/textarea";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  FolderOpen,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import { useState } from "react";

// Mock data based on API endpoints
const categoriesData = [
  {
    id: 1,
    name: "Home Cleaning",
    slug: "home-cleaning",
    description: "Professional home cleaning and maintenance services",
    isActive: true,
    servicesCount: 45,
    createdAt: "2024-01-01",
  },
  {
    id: 2,
    name: "Plumbing",
    slug: "plumbing",
    description: "Plumbing repair, installation, and maintenance services",
    isActive: true,
    servicesCount: 28,
    createdAt: "2024-01-02",
  },
  {
    id: 3,
    name: "Electrical",
    slug: "electrical",
    description: "Electrical wiring, repair, and installation services",
    isActive: false,
    servicesCount: 32,
    createdAt: "2024-01-03",
  },
  {
    id: 4,
    name: "Moving Services",
    slug: "moving-services",
    description: "Professional moving and relocation assistance",
    isActive: true,
    servicesCount: 18,
    createdAt: "2024-01-05",
  },
];

export default function CategoriesManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: "",
    slug: "",
    description: "",
    isActive: true,
  });

  const filteredCategories = categoriesData.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateCategory = () => {
    // In real implementation, this would call the API
    console.log("Creating category:", newCategory);
    setIsCreating(false);
    setNewCategory({ name: "", slug: "", description: "", isActive: true });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Categories Management
          </h1>
          <p className="text-gray-600">
            Manage service categories and their properties
          </p>
        </div>
        <Button onClick={() => setIsCreating(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </div>

      {/* Create Category Form */}
      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Category</CardTitle>
            <CardDescription>
              Add a new service category to the platform
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Category Name
                </label>
                <Input
                  placeholder="e.g., Home Cleaning"
                  value={newCategory.name}
                  onChange={(e) =>
                    setNewCategory({ ...newCategory, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Slug
                </label>
                <Input
                  placeholder="e.g., home-cleaning"
                  value={newCategory.slug}
                  onChange={(e) =>
                    setNewCategory({ ...newCategory, slug: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Description
              </label>
              <Textarea
                placeholder="Describe this category..."
                value={newCategory.description}
                onChange={(e) =>
                  setNewCategory({
                    ...newCategory,
                    description: e.target.value,
                  })
                }
                rows={3}
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">
                Status
              </label>
              <button
                onClick={() =>
                  setNewCategory({
                    ...newCategory,
                    isActive: !newCategory.isActive,
                  })
                }
                className="flex items-center gap-2"
              >
                {newCategory.isActive ? (
                  <ToggleRight className="h-6 w-6 text-green-600" />
                ) : (
                  <ToggleLeft className="h-6 w-6 text-gray-400" />
                )}
                <span className="text-sm">
                  {newCategory.isActive ? "Active" : "Inactive"}
                </span>
              </button>
            </div>
            <div className="flex gap-3 pt-4 border-t">
              <Button variant="outline" onClick={() => setIsCreating(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateCategory}>Create Category</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search categories..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => (
          <Card key={category.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                    <FolderOpen className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-600">{category.slug}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-red-600"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {category.description}
              </p>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Services</span>
                  <Badge variant="secondary">
                    {category.servicesCount} services
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Status</span>
                  <Badge variant={category.isActive ? "default" : "secondary"}>
                    {category.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Created</span>
                  <span className="text-gray-900">{category.createdAt}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="sm" className="flex-1" variant="outline">
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant={category.isActive ? "outline" : "default"}
                >
                  {category.isActive ? "Deactivate" : "Activate"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredCategories.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <FolderOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No categories found
            </h3>
            <p className="text-gray-600">
              {searchTerm
                ? "Try adjusting your search terms"
                : "Get started by creating your first category"}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <FolderOpen className="h-6 w-6 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {categoriesData.length}
            </p>
            <p className="text-sm text-gray-600">Total Categories</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <ToggleRight className="h-6 w-6 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {categoriesData.filter((c) => c.isActive).length}
            </p>
            <p className="text-sm text-gray-600">Active Categories</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <ToggleLeft className="h-6 w-6 text-gray-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {categoriesData.filter((c) => !c.isActive).length}
            </p>
            <p className="text-sm text-gray-600">Inactive Categories</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <FolderOpen className="h-6 w-6 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {categoriesData.reduce((sum, cat) => sum + cat.servicesCount, 0)}
            </p>
            <p className="text-sm text-gray-600">Total Services</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
