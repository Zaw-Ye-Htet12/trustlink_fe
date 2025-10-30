// app/admin/categories/page.tsx
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
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Tag,
  CheckCircle,
  XCircle,
} from "lucide-react";
import {
  useAdminCategories,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
} from "@/hooks/admin/useAdminCategories";
import { Category } from "@/interfaces";
import { Skeleton } from "@/components/ui/skeleton";
import { CategoryFormModal } from "@/components/admin/CategoryFormModal";

export default function AdminCategoriesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const { categories, isLoading, error } = useAdminCategories();
  const { createCategory, isCreating } = useCreateCategory();
  const { updateCategory, isUpdating } = useUpdateCategory(
    editingCategory?.id || 0
  );
  const { deleteCategory, isDeleting } = useDeleteCategory();

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateCategory = (data: {
    name: string;
    description?: string;
    slug: string;
    is_active?: boolean;
  }) => {
    createCategory(data, {
      onSuccess: () => {
        setShowCreateModal(false);
      },
    });
  };

  const handleUpdateCategory = (data: {
    name: string;
    description?: string;
    slug: string;
    is_active?: boolean;
  }) => {
    if (!editingCategory) return;

    updateCategory(data, {
      onSuccess: () => {
        setEditingCategory(null);
      },
    });
  };

  const handleDeleteCategory = (categoryId: number) => {
    if (
      confirm(
        "Are you sure you want to delete this category? This action cannot be undone."
      )
    ) {
      deleteCategory(categoryId);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50/30 py-8 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <Tag className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Failed to Load Categories
            </h3>
            <p className="text-gray-600">
              There was an error loading categories.
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
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Categories Management
            </h1>
            <p className="text-lg text-gray-600">
              Manage service categories and their visibility
            </p>
          </div>

          <Button
            onClick={() => setShowCreateModal(true)}
            className="mt-4 lg:mt-0"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Category
          </Button>
        </div>

        {/* Search and Stats */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              <div className="relative w-full lg:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>
                  Total:{" "}
                  <strong className="text-gray-900">{categories.length}</strong>
                </span>
                <span>
                  Active:{" "}
                  <strong className="text-green-600">
                    {categories.filter((c) => c.is_active).length}
                  </strong>
                </span>
                <span>
                  Inactive:{" "}
                  <strong className="text-red-600">
                    {categories.filter((c) => !c.is_active).length}
                  </strong>
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Categories Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                    <div className="flex gap-2 pt-2">
                      <Skeleton className="h-8 w-20" />
                      <Skeleton className="h-8 w-20" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredCategories.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Tag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {searchTerm ? "No Categories Found" : "No Categories"}
              </h3>
              <p className="text-gray-600 mb-4">
                {searchTerm
                  ? "No categories match your search criteria."
                  : "Get started by creating your first category."}
              </p>
              {!searchTerm && (
                <Button onClick={() => setShowCreateModal(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Category
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((category) => (
              <Card key={category.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-lg">{category.name}</h3>
                    <Badge
                      variant={category.is_active ? "default" : "secondary"}
                      className={
                        category.is_active
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }
                    >
                      {category.is_active ? (
                        <CheckCircle className="h-3 w-3 mr-1" />
                      ) : (
                        <XCircle className="h-3 w-3 mr-1" />
                      )}
                      {category.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </div>

                  {category.description && (
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {category.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Slug: {category.slug}</span>
                    <span>
                      {new Date(category.created_at!).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingCategory(category)}
                      className="flex-1"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteCategory(category.id)}
                      disabled={isDeleting}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Category Form Modals */}
      <CategoryFormModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateCategory}
        isSubmitting={isCreating}
        title="Create Category"
        description="Add a new service category to the platform"
      />

      <CategoryFormModal
        isOpen={!!editingCategory}
        onClose={() => setEditingCategory(null)}
        onSubmit={handleUpdateCategory}
        isSubmitting={isUpdating}
        category={editingCategory || undefined}
        title="Edit Category"
        description="Update category details"
      />
    </div>
  );
}
