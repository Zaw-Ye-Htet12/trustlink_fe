// components/common/SearchSection.tsx
"use client";

// react hooks are used inside hooks; no local state needed here
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Search,
  MapPin,
  Users,
  Briefcase,
  Filter,
  X,
  Star,
  Tag,
  Check,
  Sparkles,
  Loader2,
} from "lucide-react";
import { useSearch } from "@/hooks/useSearch";
import { AgentCard } from "../agent/AgentCard";
import { ServiceCard } from "../service/ServiceCard";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetCategories, useGetTags } from "@/services/public/publicService";
import { Category, Tag as TagType } from "@/interfaces";
import ServicesGridSkeleton from "./skeletons/ServicesGridSkeleton";
import AgentsGridSkeleton from "./skeletons/AgentsGridSkeleton";

export function SearchSection() {
  const {
    keyword,
    location,
    activeTab,
    setKeyword,
    setLocation,
    setActiveTab,
    handleSearchClick,
    // filters from hook
    selectedCategories,
    setSelectedCategories,
    selectedTags,
    setSelectedTags,
    minRating,
    setMinRating,
    priceRange,
    setPriceRange,
    clearAllFilters,
    // queries
    agentQuery, // <-- frontend-filtered agents
    serviceQuery, // <-- frontend-filtered services
  } = useSearch();

  // Fetch categories and tags from API
  const categoriesQuery = useGetCategories();
  const tagsQuery = useGetTags();

  // filter state is managed in `useSearch`

  const activeFiltersCount =
    selectedCategories.length +
    selectedTags.length +
    (minRating > 0 ? 1 : 0) +
    (priceRange.min > 0 || priceRange.max < 10000 ? 1 : 0);

  // Get category name by ID
  const getCategoryName = (id: number) => {
    return (
      categoriesQuery.data?.data?.find((cat) => cat.id === id)?.name ||
      `Category ${id}`
    );
  };

  // Get tag name by ID
  const getTagName = (id: number) => {
    return (
      tagsQuery.data?.data?.find((tag) => tag.id === id)?.name || `Tag ${id}`
    );
  };

  return (
    <section className="py-16 bg-linear-to-b from-blue-50/30 to-white">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              Find Your Perfect Match
            </div>
            <h2 className="text-4xl font-bold mb-4 bg-linear-to-b from-gray-900 to-blue-600 bg-clip-text text-transparent">
              Discover Trusted Services & Agents
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Search through verified Myanmar agents and services across
              Thailand
            </p>
          </div>

          <Card className="border-0 shadow-xl rounded-2xl overflow-hidden">
            <CardContent className="p-0">
              <Tabs
                value={activeTab}
                onValueChange={(v) => setActiveTab(v as "agents" | "services")}
                className="w-full"
              >
                {/* Search Header */}
                <div className="p-8">
                  <TabsList className="grid w-full grid-cols-2 mb-6 p-1 rounded-xl">
                    <TabsTrigger
                      value="agents"
                      className="flex items-center gap-3 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg py-3"
                    >
                      <Users className="w-5 h-5" />
                      <span className="font-semibold">Agents</span>
                      {agentQuery.data?.data && (
                        <Badge
                          variant="secondary"
                          className="ml-1 bg-blue-100 text-blue-700"
                        >
                          {agentQuery.data.data.length}
                        </Badge>
                      )}
                    </TabsTrigger>
                    <TabsTrigger
                      value="services"
                      className="flex items-center gap-3 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg py-3"
                    >
                      <Briefcase className="w-5 h-5" />
                      <span className="font-semibold">Services</span>
                      {serviceQuery.data?.data && (
                        <Badge
                          variant="secondary"
                          className="ml-1 bg-green-100 text-green-700"
                        >
                          {serviceQuery.data.data.length}
                        </Badge>
                      )}
                    </TabsTrigger>
                  </TabsList>

                  {/* Search Inputs */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        placeholder={`Search ${activeTab}...`}
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        className="pl-12 h-14 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                      />
                    </div>

                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        placeholder="Location..."
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="pl-12 h-14 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                      />
                    </div>

                    <div className="flex gap-3">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            className="h-14 flex-1 border-2 border-gray-200 rounded-xl justify-start"
                            disabled={
                              categoriesQuery.isLoading || tagsQuery.isLoading
                            }
                          >
                            {categoriesQuery.isLoading ||
                            tagsQuery.isLoading ? (
                              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            ) : (
                              <Filter className="w-5 h-5 mr-2" />
                            )}
                            Filters
                            {activeFiltersCount > 0 && (
                              <Badge className="ml-2 bg-blue-500 text-white">
                                {activeFiltersCount}
                              </Badge>
                            )}
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-80 p-4">
                          <DropdownMenuLabel className="flex items-center justify-between">
                            <span>Filters</span>
                            {activeFiltersCount > 0 && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={clearAllFilters}
                                className="text-xs text-blue-600 hover:text-blue-700"
                              >
                                Clear all
                              </Button>
                            )}
                          </DropdownMenuLabel>

                          <DropdownMenuSeparator className="my-3" />

                          <ScrollArea className="h-64">
                            {/* Categories */}
                            <div className="space-y-3 mb-6">
                              <h4 className="font-semibold text-sm flex items-center gap-2">
                                <Briefcase className="w-4 h-4" />
                                Categories
                                {categoriesQuery.isLoading && (
                                  <Loader2 className="w-3 h-3 animate-spin" />
                                )}
                              </h4>
                              {categoriesQuery.data?.data &&
                              categoriesQuery.data.data.length > 0 ? (
                                <div className="space-y-2">
                                  {categoriesQuery.data.data.map(
                                    (category: Category) => (
                                      <div
                                        key={category.id}
                                        className="flex items-center"
                                      >
                                        <DropdownMenuCheckboxItem
                                          checked={selectedCategories.includes(
                                            category.id
                                          )}
                                          onCheckedChange={(checked) => {
                                            if (checked) {
                                              setSelectedCategories((prev) => [
                                                ...prev,
                                                category.id,
                                              ]);
                                            } else {
                                              setSelectedCategories((prev) =>
                                                prev.filter(
                                                  (id) => id !== category.id
                                                )
                                              );
                                            }
                                          }}
                                          className="flex-1"
                                        >
                                          <span>{category.name}</span>
                                        </DropdownMenuCheckboxItem>
                                      </div>
                                    )
                                  )}
                                </div>
                              ) : (
                                <p className="text-sm text-gray-500">
                                  No categories available
                                </p>
                              )}
                            </div>

                            {/* Tags */}
                            <div className="space-y-3 mb-6">
                              <h4 className="font-semibold text-sm flex items-center gap-2">
                                <Tag className="w-4 h-4" />
                                Popular Tags
                                {tagsQuery.isLoading && (
                                  <Loader2 className="w-3 h-3 animate-spin" />
                                )}
                              </h4>
                              {tagsQuery.data?.data &&
                              tagsQuery.data.data.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                  {tagsQuery.data.data
                                    .map((tag: TagType) => (
                                      <Badge
                                        key={tag.id}
                                        variant={
                                          selectedTags.includes(tag.id)
                                            ? "default"
                                            : "outline"
                                        }
                                        className="cursor-pointer transition-all hover:scale-105 text-xs"
                                        onClick={() => {
                                          if (selectedTags.includes(tag.id)) {
                                            setSelectedTags((prev) =>
                                              prev.filter((t) => t !== tag.id)
                                            );
                                          } else {
                                            setSelectedTags((prev) => [
                                              ...prev,
                                              tag.id,
                                            ]);
                                          }
                                        }}
                                      >
                                        {tag.name}
                                        {selectedTags.includes(tag.id) && (
                                          <Check className="w-3 h-3 ml-1" />
                                        )}
                                      </Badge>
                                    ))}
                                </div>
                              ) : (
                                <p className="text-sm text-gray-500">
                                  No tags available
                                </p>
                              )}
                            </div>

                            {/* Rating Filter */}
                            <div className="space-y-3 mb-6">
                              <h4 className="font-semibold text-sm flex items-center gap-2">
                                <Star className="w-4 h-4" />
                                Minimum Rating
                              </h4>
                              <div className="space-y-2">
                                {[4.5, 4.0, 3.5, 3.0].map((rating) => (
                                  <div
                                    key={rating}
                                    className="flex items-center"
                                  >
                                    <DropdownMenuCheckboxItem
                                      checked={minRating === rating}
                                      onCheckedChange={(checked) => {
                                        setMinRating(checked ? rating : 0);
                                      }}
                                      className="flex-1"
                                    >
                                      <div className="flex items-center gap-2">
                                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                        <span>{rating}+ Stars</span>
                                      </div>
                                    </DropdownMenuCheckboxItem>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Price Range */}
                            <div className="space-y-3">
                              <h4 className="font-semibold text-sm">
                                Price Range (THB)
                              </h4>
                              <div className="space-y-3">
                                <div className="flex gap-2">
                                  <Input
                                    placeholder="Min"
                                    type="number"
                                    value={priceRange.min || ""}
                                    onChange={(e) =>
                                      setPriceRange((prev) => ({
                                        ...prev,
                                        min: parseInt(e.target.value) || 0,
                                      }))
                                    }
                                    className="h-8 text-sm"
                                  />
                                  <Input
                                    placeholder="Max"
                                    type="number"
                                    value={
                                      priceRange.max === 10000
                                        ? ""
                                        : priceRange.max
                                    }
                                    onChange={(e) =>
                                      setPriceRange((prev) => ({
                                        ...prev,
                                        max: parseInt(e.target.value) || 10000,
                                      }))
                                    }
                                    className="h-8 text-sm"
                                  />
                                </div>
                              </div>
                            </div>
                          </ScrollArea>
                        </DropdownMenuContent>
                      </DropdownMenu>

                      <Button
                        onClick={handleSearchClick}
                        className="h-14 px-8 bg-linear-to-b from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold text-lg"
                        size="lg"
                        disabled={
                          agentQuery.isFetching || serviceQuery.isFetching
                        }
                      >
                        {agentQuery.isFetching || serviceQuery.isFetching ? (
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        ) : (
                          <Search className="w-5 h-5 mr-2" />
                        )}
                        {agentQuery.isFetching || serviceQuery.isFetching
                          ? "Searching..."
                          : "Search"}
                      </Button>
                    </div>
                  </div>

                  {/* Active Filters Display */}
                  {(selectedCategories.length > 0 ||
                    selectedTags.length > 0 ||
                    minRating > 0 ||
                    priceRange.min > 0 ||
                    priceRange.max < 10000) && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="text-sm text-gray-500 mr-2">
                        Active filters:
                      </span>

                      {selectedCategories.map((categoryId) => (
                        <Badge
                          key={categoryId}
                          variant="secondary"
                          className="pl-2 pr-1 py-1"
                        >
                          {getCategoryName(categoryId)}
                          <X
                            className="w-3 h-3 ml-1 cursor-pointer"
                            onClick={() =>
                              setSelectedCategories((prev) =>
                                prev.filter((id) => id !== categoryId)
                              )
                            }
                          />
                        </Badge>
                      ))}

                      {selectedTags.map((tagId) => (
                        <Badge
                          key={tagId}
                          variant="secondary"
                          className="pl-2 pr-1 py-1"
                        >
                          {getTagName(tagId)}
                          <X
                            className="w-3 h-3 ml-1 cursor-pointer"
                            onClick={() =>
                              setSelectedTags((prev) =>
                                prev.filter((t) => t !== tagId)
                              )
                            }
                          />
                        </Badge>
                      ))}

                      {minRating > 0 && (
                        <Badge variant="secondary" className="pl-2 pr-1 py-1">
                          <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                          {minRating}+ Rating
                          <X
                            className="w-3 h-3 ml-1 cursor-pointer"
                            onClick={() => setMinRating(0)}
                          />
                        </Badge>
                      )}

                      {(priceRange.min > 0 || priceRange.max < 10000) && (
                        <Badge variant="secondary" className="pl-2 pr-1 py-1">
                          {priceRange.min > 0 ? `THB ${priceRange.min}` : "Any"}{" "}
                          -{" "}
                          {priceRange.max < 10000
                            ? `THB ${priceRange.max}`
                            : "Any"}
                          <X
                            className="w-3 h-3 ml-1 cursor-pointer"
                            onClick={() =>
                              setPriceRange({ min: 0, max: 10000 })
                            }
                          />
                        </Badge>
                      )}

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearAllFilters}
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 text-sm"
                      >
                        Clear all
                      </Button>
                    </div>
                  )}
                </div>

                {/* Results Section */}
                <div className="p-8 bg-gray-50/50">
                  <TabsContent value="agents" className="m-0 space-y-6">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-2xl font-bold text-gray-900">
                        Verified Agents
                        {agentQuery.data?.data && (
                          <span className="text-gray-500 text-lg ml-2">
                            ({agentQuery.data.data.length} found)
                          </span>
                        )}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>Sorted by: Relevance</span>
                      </div>
                    </div>

                    {agentQuery.isFetching ? (
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <AgentsGridSkeleton />
                      </div>
                    ) : agentQuery.data?.data &&
                      agentQuery.data.data.length > 0 ? (
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {agentQuery.data.data.map((agent) => (
                          <AgentCard key={agent.id} agent={agent} />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-16">
                        <Users className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-2xl font-semibold text-gray-600 mb-3">
                          No agents found
                        </h3>
                        <p className="text-gray-500 mb-6 max-w-md mx-auto">
                          Try adjusting your search criteria or filters to find
                          what you are looking for.
                        </p>
                        <Button onClick={clearAllFilters} variant="outline">
                          Clear All Filters
                        </Button>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="services" className="m-0 space-y-6">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-2xl font-bold text-gray-900">
                        Available Services
                        {serviceQuery.data?.data && (
                          <span className="text-gray-500 text-lg ml-2">
                            ({serviceQuery.data.data.length} found)
                          </span>
                        )}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>Sorted by: Relevance</span>
                      </div>
                    </div>

                    {serviceQuery.isFetching ? (
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <ServicesGridSkeleton />
                      </div>
                    ) : serviceQuery.data?.data &&
                      serviceQuery.data.data.length > 0 ? (
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {serviceQuery.data.data.map((service) => (
                          <ServiceCard key={service.id} service={service} />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-16">
                        <Briefcase className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-2xl font-semibold text-gray-600 mb-3">
                          No services found
                        </h3>
                        <p className="text-gray-500 mb-6 max-w-md mx-auto">
                          No services match your current search criteria. Try
                          different filters or keywords.
                        </p>
                        <Button onClick={clearAllFilters} variant="outline">
                          Clear All Filters
                        </Button>
                      </div>
                    )}
                  </TabsContent>
                </div>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
