// app/customer/favorites/page.tsx
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Heart,
  Star,
  MapPin,
  Phone,
  MessageCircle,
  Trash2,
  Users,
  Briefcase,
  Calendar,
  Clock,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

// Mock data for favorite agents and services
const favoriteAgents = [
  {
    id: 1,
    name: "Sarah Johnson",
    service: "Home Cleaning Specialist",
    rating: 4.8,
    reviews: 127,
    location: "New York, NY",
    price: "$85",
    image: "SJ",
    isOnline: true,
    experience: "5 years",
    responseTime: "Within 2 hours",
    languages: ["English", "Spanish"],
    specialties: ["Deep Cleaning", "Move-in/Move-out", "Eco-friendly"],
    completedJobs: 450,
  },
  {
    id: 2,
    name: "Mike Chen",
    service: "Plumbing & Repair",
    rating: 4.9,
    reviews: 89,
    location: "Brooklyn, NY",
    price: "$120",
    image: "MC",
    isOnline: false,
    experience: "8 years",
    responseTime: "Within 1 hour",
    languages: ["English", "Mandarin"],
    specialties: ["Emergency Repair", "Pipe Installation", "Water Heater"],
    completedJobs: 320,
  },
  {
    id: 3,
    name: "David Brown",
    service: "Electrical Services",
    rating: 4.7,
    reviews: 156,
    location: "Manhattan, NY",
    price: "$150",
    image: "DB",
    isOnline: true,
    experience: "6 years",
    responseTime: "Within 3 hours",
    languages: ["English"],
    specialties: ["Wiring", "Panel Upgrade", "Lighting Installation"],
    completedJobs: 520,
  },
];

const favoriteServices = [
  {
    id: 1,
    title: "Deep Home Cleaning",
    category: "Cleaning",
    price: "$85",
    duration: "3 hours",
    rating: 4.8,
    saves: 234,
    image: "🧹",
    description: "Comprehensive cleaning service for your entire home",
    features: [
      "Dusting & Vacuuming",
      "Bathroom Sanitization",
      "Kitchen Deep Clean",
      "Floor Mopping",
    ],
    availability: "Mon-Sun, 8AM-8PM",
    popularTimes: ["Weekends", "Evenings"],
  },
  {
    id: 2,
    title: "Emergency Plumbing Repair",
    category: "Plumbing",
    price: "$120",
    duration: "2 hours",
    rating: 4.9,
    saves: 189,
    image: "🔧",
    description: "24/7 emergency plumbing services for urgent repairs",
    features: [
      "Leak Repair",
      "Drain Cleaning",
      "Fixture Installation",
      "Pipe Repair",
    ],
    availability: "24/7",
    popularTimes: ["Emergency calls"],
  },
  {
    id: 3,
    title: "Electrical Wiring Installation",
    category: "Electrical",
    price: "$150",
    duration: "4 hours",
    rating: 4.7,
    saves: 156,
    image: "⚡",
    description: "Professional electrical wiring and installation services",
    features: [
      "Wiring Installation",
      "Outlet Replacement",
      "Circuit Breaker",
      "Safety Inspection",
    ],
    availability: "Mon-Fri, 9AM-6PM",
    popularTimes: ["Weekdays"],
  },
];

export default function FavoritesPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [favorites, setFavorites] = useState({
    agents: favoriteAgents,
    services: favoriteServices,
  });

  const removeFavorite = (type: "agents" | "services", id: number) => {
    setFavorites((prev) => ({
      ...prev,
      [type]: prev[type].filter((item) => item.id !== id),
    }));
  };

  const totalFavorites = favorites.agents.length + favorites.services.length;

  return (
    <div className="min-h-screen bg-gray-50/30 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-full bg-red-50 text-red-500">
              <Heart className="h-6 w-6 fill-current" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">My Favorites</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your saved agents and services - easily access your preferred
            professionals
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white border-l-4 border-l-red-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Favorites
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {totalFavorites}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-red-50 text-red-600">
                  <Heart className="h-6 w-6 fill-current" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-l-4 border-l-blue-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Favorite Agents
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {favorites.agents.length}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
                  <Users className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-l-4 border-l-green-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Favorite Services
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {favorites.services.length}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-green-50 text-green-600">
                  <Briefcase className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-l-4 border-l-amber-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Average Rating
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">4.8</p>
                </div>
                <div className="p-3 rounded-lg bg-amber-50 text-amber-600">
                  <Star className="h-6 w-6 fill-current" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="agents" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Favorite Agents ({favorites.agents.length})
            </TabsTrigger>
            <TabsTrigger value="services" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              Favorite Services ({favorites.services.length})
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            {/* Recent Favorites */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Recently Added
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  ...favorites.agents.slice(0, 3),
                  ...favorites.services.slice(0, 3),
                ].map((item) => (
                  <Card
                    key={`${item.id}-${
                      "service" in item ? "service" : "agent"
                    }`}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          {"image" in item ? (
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-sm">
                              {item.image}
                            </div>
                          ) : (
                            <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-2xl">
                              {/* {item.image} */}
                            </div>
                          )}
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {"title" in item ? item.title : item.name}
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                              {"service" in item ? item.service : item.category}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                          onClick={() =>
                            removeFavorite(
                              "service" in item ? "services" : "agents",
                              item.id
                            )
                          }
                        >
                          <Heart className="h-4 w-4 fill-current" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-amber-400 fill-current" />
                          <span>{item.rating}</span>
                        </div>
                        <span className="font-semibold text-gray-900">
                          {item.price}
                        </span>
                      </div>

                      <Button size="sm" className="w-full">
                        {"service" in item ? "Book Service" : "View Profile"}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Favorite Agents Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Top Agents
                  </CardTitle>
                  <CardDescription>
                    Your most saved service providers
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {favorites.agents.slice(0, 3).map((agent) => (
                    <div
                      key={agent.id}
                      className="flex items-center justify-between p-3 rounded-lg border"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-xs">
                          {agent.image}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {agent.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            {agent.service}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 justify-end">
                          <Star className="h-3 w-3 text-amber-400 fill-current" />
                          <span className="text-sm font-medium">
                            {agent.rating}
                          </span>
                        </div>
                        <Badge
                          variant={agent.isOnline ? "default" : "secondary"}
                          className="text-xs mt-1"
                        >
                          {agent.isOnline ? "Online" : "Offline"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Favorite Services Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5" />
                    Popular Services
                  </CardTitle>
                  <CardDescription>
                    Your most saved service categories
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {favorites.services.slice(0, 3).map((service) => (
                    <div
                      key={service.id}
                      className="flex items-center justify-between p-3 rounded-lg border"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-xl">
                          {service.image}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {service.title}
                          </p>
                          <p className="text-sm text-gray-600">
                            {service.category}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          {service.price}
                        </p>
                        <p className="text-sm text-gray-600">
                          {service.duration}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Agents Tab */}
          <TabsContent value="agents" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.agents.map((agent) => (
                <Card
                  key={agent.id}
                  className="hover:shadow-lg transition-shadow group"
                >
                  <CardContent className="p-6">
                    {/* Agent Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-sm">
                          {agent.image}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {agent.name}
                          </h3>
                          <div className="flex items-center gap-1 mt-1">
                            <Star className="h-3 w-3 text-amber-400 fill-current" />
                            <span className="text-sm text-gray-600">
                              {agent.rating} ({agent.reviews} reviews)
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={() => removeFavorite("agents", agent.id)}
                      >
                        <Heart className="h-4 w-4 fill-current" />
                      </Button>
                    </div>

                    {/* Agent Details */}
                    <div className="space-y-3 mb-4">
                      <p className="text-sm text-gray-600">{agent.service}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4" />
                        {agent.location}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        {agent.experience} experience
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        {agent.responseTime}
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={agent.isOnline ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {agent.isOnline ? "Online" : "Offline"}
                        </Badge>
                        <span className="text-sm font-semibold text-gray-900">
                          {agent.price}
                        </span>
                      </div>
                    </div>

                    {/* Specialties */}
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">
                        Specialties:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {agent.specialties
                          .slice(0, 3)
                          .map((specialty, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs"
                            >
                              {specialty}
                            </Badge>
                          ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        Book Now
                      </Button>
                      <Button variant="outline" size="icon" className="h-9 w-9">
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="h-9 w-9">
                        <Phone className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.services.map((service) => (
                <Card
                  key={service.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-2xl">
                          {service.image}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {service.title}
                          </h3>
                          <Badge variant="secondary" className="mt-1 text-xs">
                            {service.category}
                          </Badge>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={() => removeFavorite("services", service.id)}
                      >
                        <Heart className="h-4 w-4 fill-current" />
                      </Button>
                    </div>

                    <div className="space-y-3 mb-4">
                      <p className="text-sm text-gray-600">
                        {service.description}
                      </p>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Price</span>
                        <span className="font-semibold text-gray-900">
                          {service.price}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Duration</span>
                        <span className="text-gray-900">
                          {service.duration}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Rating</span>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-amber-400 fill-current" />
                          <span>{service.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Saved by</span>
                        <span className="text-gray-900">
                          {service.saves} people
                        </span>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">
                        Includes:
                      </p>
                      <div className="space-y-1">
                        {service.features.slice(0, 2).map((feature, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 text-sm text-gray-600"
                          >
                            <div className="w-1 h-1 rounded-full bg-blue-500"></div>
                            {feature}
                          </div>
                        ))}
                        {service.features.length > 2 && (
                          <p className="text-xs text-gray-500">
                            +{service.features.length - 2} more features
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        Book Service
                      </Button>
                      <Button variant="outline" size="icon" className="h-9 w-9">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Empty State */}
        {totalFavorites === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No favorites yet
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Start exploring services and save your favorite agents to build
                your personalized list of trusted professionals.
              </p>
              <div className="flex gap-3 justify-center">
                <Button asChild>
                  <Link href="/services">Explore Services</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/agents">Browse Agents</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
