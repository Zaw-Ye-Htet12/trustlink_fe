// app/(admin)/admin/tags/page.tsx
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
import { Search, Plus, Edit, Trash2, Tags, Hash } from "lucide-react";
import { useState } from "react";

// Mock data based on API endpoints
const tagsData = [
  {
    id: 1,
    name: "Eco-friendly",
    slug: "eco-friendly",
    servicesCount: 23,
    createdAt: "2024-01-10",
  },
  {
    id: 2,
    name: "Emergency",
    slug: "emergency",
    servicesCount: 15,
    createdAt: "2024-01-12",
  },
  {
    id: 3,
    name: "24/7",
    slug: "24-7",
    servicesCount: 18,
    createdAt: "2024-01-08",
  },
  {
    id: 4,
    name: "Deep Cleaning",
    slug: "deep-cleaning",
    servicesCount: 32,
    createdAt: "2024-01-15",
  },
  {
    id: 5,
    name: "Move-in/out",
    slug: "move-in-out",
    servicesCount: 12,
    createdAt: "2024-01-18",
  },
  {
    id: 6,
    name: "Commercial",
    slug: "commercial",
    servicesCount: 8,
    createdAt: "2024-01-20",
  },
];

export default function TagsManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [newTag, setNewTag] = useState({
    name: "",
    slug: "",
  });

  const filteredTags = tagsData.filter(
    (tag) =>
      tag.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tag.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateTag = () => {
    // In real implementation, this would call the API
    console.log("Creating tag:", newTag);
    setIsCreating(false);
    setNewTag({ name: "", slug: "" });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tags Management</h1>
          <p className="text-gray-600">Manage service tags and labels</p>
        </div>
        <Button onClick={() => setIsCreating(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Tag
        </Button>
      </div>

      {/* Create Tag Form */}
      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Tag</CardTitle>
            <CardDescription>
              Add a new tag for categorizing services
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Tag Name
                </label>
                <Input
                  placeholder="e.g., Eco-friendly"
                  value={newTag.name}
                  onChange={(e) =>
                    setNewTag({ ...newTag, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Slug
                </label>
                <Input
                  placeholder="e.g., eco-friendly"
                  value={newTag.slug}
                  onChange={(e) =>
                    setNewTag({ ...newTag, slug: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="flex gap-3 pt-4">
              <Button variant="outline" onClick={() => setIsCreating(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateTag}>Create Tag</Button>
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
              placeholder="Search tags..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Tags Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTags.map((tag) => (
          <Card key={tag.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">
                    <Hash className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{tag.name}</h3>
                    <p className="text-sm text-gray-600">#{tag.slug}</p>
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

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Services</span>
                  <Badge variant="secondary">
                    {tag.servicesCount} services
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Created</span>
                  <span className="text-gray-900">{tag.createdAt}</span>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button size="sm" className="flex-1" variant="outline">
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-red-600 hover:text-red-700"
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredTags.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Tags className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No tags found
            </h3>
            <p className="text-gray-600">
              {searchTerm
                ? "Try adjusting your search terms"
                : "Get started by creating your first tag"}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Tags className="h-6 w-6 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {tagsData.length}
            </p>
            <p className="text-sm text-gray-600">Total Tags</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Hash className="h-6 w-6 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {tagsData.reduce((sum, tag) => sum + tag.servicesCount, 0)}
            </p>
            <p className="text-sm text-gray-600">Total Tagged Services</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Tags className="h-6 w-6 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {Math.round(
                tagsData.reduce((sum, tag) => sum + tag.servicesCount, 0) /
                  tagsData.length
              )}
            </p>
            <p className="text-sm text-gray-600">Avg Services per Tag</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
