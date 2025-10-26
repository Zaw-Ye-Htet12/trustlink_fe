// app/agent/services/page.tsx
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
  Plus,
  Edit,
  Trash2,
  Star,
  MapPin,
  Clock,
  Image as ImageIcon,
  Briefcase,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// Mock data based on API endpoints
const agentServices = [
  {
    id: 1,
    title: "Professional Home Cleaning",
    category: "Cleaning",
    price: 85,
    duration: "3 hours",
    description: "Comprehensive home cleaning service including all rooms",
    rating: 4.8,
    reviews: 47,
    images: 3,
    tags: ["Deep Cleaning", "Eco-friendly", "Move-in/out"],
    status: "active",
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    title: "Office Deep Cleaning",
    category: "Commercial",
    price: 150,
    duration: "4 hours",
    description: "Thorough office cleaning for businesses and workspaces",
    rating: 4.9,
    reviews: 23,
    images: 5,
    tags: ["Commercial", "Sanitization", "Weekly"],
    status: "active",
    createdAt: "2024-01-10",
  },
  {
    id: 3,
    title: "Move-out Cleaning Service",
    category: "Cleaning",
    price: 120,
    duration: "3.5 hours",
    description: "Specialized cleaning for move-out situations",
    rating: 4.7,
    reviews: 18,
    images: 2,
    tags: ["Move-out", "Rental", "Inspection Ready"],
    status: "draft",
    createdAt: "2024-01-20",
  },
];

export default function AgentServicesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredServices = agentServices.filter(
    (service) =>
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Services</h1>
          <p className="text-gray-600">
            Manage your service offerings and pricing
          </p>
        </div>
        <Button asChild>
          <Link href="/agent/services/new">
            <Plus className="h-4 w-4 mr-2" />
            Add New Service
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search services..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="whitespace-nowrap">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <Card
            key={service.id}
            className="hover:shadow-lg transition-shadow group"
          >
            <CardContent className="p-6">
              {/* Service Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-gray-900 text-lg">
                      {service.title}
                    </h3>
                    <Badge
                      variant={
                        service.status === "active" ? "default" : "secondary"
                      }
                      className="text-xs"
                    >
                      {service.status}
                    </Badge>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {service.category}
                  </Badge>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
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

              {/* Service Description */}
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {service.description}
              </p>

              {/* Service Details */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Price</span>
                  <span className="font-semibold text-gray-900">
                    ${service.price}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Duration</span>
                  <span className="text-gray-900">{service.duration}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-amber-400 fill-current" />
                    <span>{service.rating}</span>
                    <span className="text-gray-500">({service.reviews})</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Images</span>
                  <div className="flex items-center gap-1">
                    <ImageIcon className="h-3 w-3" />
                    <span>{service.images}</span>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {service.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {service.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{service.tags.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button size="sm" className="flex-1" asChild>
                  <Link href={`/agent/services/${service.id}`}>
                    Manage Service
                  </Link>
                </Button>
                <Button variant="outline" size="icon" className="h-9 w-9">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredServices.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Briefcase className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No services found
            </h3>
            <p className="text-gray-600 mb-4">
              {searchTerm
                ? "Try adjusting your search terms"
                : "Get started by creating your first service"}
            </p>
            <Button asChild>
              <Link href="/agent/services/new">Create Your First Service</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
