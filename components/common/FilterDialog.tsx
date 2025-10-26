// components/common/FilterDialog.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Filter,
  X,
  DollarSign,
  Star,
  CheckCircle,
  MapPin,
} from "lucide-react";
import { useGetCategories, useGetTags } from "@/services/public/publicService";
import { Skeleton } from "@/components/ui/skeleton";

interface FilterDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  filters: ServiceFilters;
  onFiltersChange: (filters: ServiceFilters) => void;
}

export interface ServiceFilters {
  categories: number[];
  tags: number[];
  minPrice: number;
  maxPrice: number;
  minRating: number;
  locationType: string[];
  verifiedOnly: boolean;
  pricingType: string[];
}

const locationTypes = [
  { value: "online", label: "Online" },
  { value: "customer_location", label: "At Customer Location" },
  { value: "agent_location", label: "At Agent Location" },
  { value: "flexible", label: "Flexible" },
];

const pricingTypes = [
  { value: "fixed", label: "Fixed Price" },
  { value: "hourly", label: "Hourly Rate" },
  { value: "starting_from", label: "Starting From" },
];

export function FilterDialog({
  isOpen,
  onOpenChange,
  filters,
  onFiltersChange,
}: FilterDialogProps) {
  const { data: categoriesData, isLoading: categoriesLoading } =
    useGetCategories();
  const { data: tagsData, isLoading: tagsLoading } = useGetTags();
  const [priceRange, setPriceRange] = useState([
    filters.minPrice,
    filters.maxPrice,
  ]);

  const handleCategoryToggle = (categoryId: number) => {
    const newCategories = filters.categories.includes(categoryId)
      ? filters.categories.filter((id) => id !== categoryId)
      : [...filters.categories, categoryId];
    onFiltersChange({ ...filters, categories: newCategories });
  };

  const handleTagToggle = (tagId: number) => {
    const newTags = filters.tags.includes(tagId)
      ? filters.tags.filter((id) => id !== tagId)
      : [...filters.tags, tagId];
    onFiltersChange({ ...filters, tags: newTags });
  };

  const handleLocationTypeToggle = (type: string) => {
    const newLocationTypes = filters.locationType.includes(type)
      ? filters.locationType.filter((t) => t !== type)
      : [...filters.locationType, type];
    onFiltersChange({ ...filters, locationType: newLocationTypes });
  };

  const handlePricingTypeToggle = (type: string) => {
    const newPricingTypes = filters.pricingType.includes(type)
      ? filters.pricingType.filter((t) => t !== type)
      : [...filters.pricingType, type];
    onFiltersChange({ ...filters, pricingType: newPricingTypes });
  };

  const handlePriceRangeChange = (value: number[]) => {
    setPriceRange(value);
  };

  const handlePriceRangeCommit = (value: number[]) => {
    onFiltersChange({
      ...filters,
      minPrice: value[0],
      maxPrice: value[1],
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      categories: [],
      tags: [],
      minPrice: 0,
      maxPrice: 10000,
      minRating: 0,
      locationType: [],
      verifiedOnly: false,
      pricingType: [],
    });
    setPriceRange([0, 10000]);
  };

  const activeFilterCount =
    filters.categories.length +
    filters.tags.length +
    (filters.minPrice > 0 ? 1 : 0) +
    (filters.maxPrice < 10000 ? 1 : 0) +
    (filters.minRating > 0 ? 1 : 0) +
    filters.locationType.length +
    (filters.verifiedOnly ? 1 : 0) +
    filters.pricingType.length;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" className="lg:w-auto">
          <Filter className="w-4 h-4 mr-2" />
          Filters
          {activeFilterCount > 0 && (
            <Badge className="ml-2 bg-blue-500 text-white">
              {activeFilterCount}
            </Badge>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl">Filter Services</DialogTitle>
            <div className="flex items-center gap-2">
              {activeFilterCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="text-blue-600 hover:text-blue-700"
                >
                  Clear all
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onOpenChange(false)}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Categories */}
            <div>
              <Label className="text-base font-semibold mb-3 block">
                Categories
              </Label>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {categoriesLoading ? (
                  [...Array(6)].map((_, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <Skeleton className="w-4 h-4 rounded" />
                      <Skeleton className="h-4 flex-1 rounded" />
                    </div>
                  ))
                ) : categoriesData?.data && categoriesData.data.length > 0 ? (
                  categoriesData.data.map((category) => (
                    <div
                      key={category.id}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={`category-${category.id}`}
                        checked={filters.categories.includes(category.id)}
                        onCheckedChange={() =>
                          handleCategoryToggle(category.id)
                        }
                      />
                      <Label
                        htmlFor={`category-${category.id}`}
                        className="text-sm font-normal cursor-pointer flex-1"
                      >
                        {category.name}
                      </Label>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">
                    No categories available
                  </p>
                )}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <Label className="text-base font-semibold mb-3 block">
                <DollarSign className="w-4 h-4 inline mr-2" />
                Price Range (THB)
              </Label>
              <div className="space-y-4">
                <Slider
                  value={priceRange}
                  onValueChange={handlePriceRangeChange}
                  onValueCommit={handlePriceRangeCommit}
                  max={10000}
                  step={100}
                  className="my-6"
                />
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>THB {priceRange[0].toLocaleString()}</span>
                  <span>THB {priceRange[1].toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Location Type */}
            <div>
              <Label className="text-base font-semibold mb-3 block">
                <MapPin className="w-4 h-4 inline mr-2" />
                Location Type
              </Label>
              <div className="space-y-2">
                {locationTypes.map((type) => (
                  <div key={type.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`location-${type.value}`}
                      checked={filters.locationType.includes(type.value)}
                      onCheckedChange={() =>
                        handleLocationTypeToggle(type.value)
                      }
                    />
                    <Label
                      htmlFor={`location-${type.value}`}
                      className="text-sm font-normal cursor-pointer flex-1"
                    >
                      {type.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Rating */}
            <div>
              <Label className="text-base font-semibold mb-3 block">
                <Star className="w-4 h-4 inline mr-2" />
                Minimum Rating
              </Label>
              <div className="space-y-2">
                {[4.5, 4.0, 3.5, 3.0, 2.0].map((rating) => (
                  <div key={rating} className="flex items-center space-x-2">
                    <Checkbox
                      id={`rating-${rating}`}
                      checked={filters.minRating === rating}
                      onCheckedChange={(checked) => {
                        onFiltersChange({
                          ...filters,
                          minRating: checked ? rating : 0,
                        });
                      }}
                    />
                    <Label
                      htmlFor={`rating-${rating}`}
                      className="text-sm font-normal cursor-pointer flex-1"
                    >
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{rating}+ Stars</span>
                      </div>
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing Type */}
            <div>
              <Label className="text-base font-semibold mb-3 block">
                Pricing Type
              </Label>
              <div className="space-y-2">
                {pricingTypes.map((type) => (
                  <div key={type.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`pricing-${type.value}`}
                      checked={filters.pricingType.includes(type.value)}
                      onCheckedChange={() =>
                        handlePricingTypeToggle(type.value)
                      }
                    />
                    <Label
                      htmlFor={`pricing-${type.value}`}
                      className="text-sm font-normal cursor-pointer flex-1"
                    >
                      {type.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <Label className="text-base font-semibold mb-3 block">
                Service Features
              </Label>
              <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                {tagsLoading ? (
                  [...Array(8)].map((_, i) => (
                    <Skeleton key={i} className="w-20 h-6 rounded-full" />
                  ))
                ) : tagsData?.data && tagsData.data.length > 0 ? (
                  tagsData.data.slice(0, 15).map((tag) => (
                    <Badge
                      key={tag.id}
                      variant={
                        filters.tags.includes(tag.id) ? "default" : "outline"
                      }
                      className="cursor-pointer transition-all hover:scale-105"
                      onClick={() => handleTagToggle(tag.id)}
                    >
                      {tag.name}
                    </Badge>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No tags available</p>
                )}
              </div>
            </div>

            {/* Verified Agents Only */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="verified-only"
                checked={filters.verifiedOnly}
                onCheckedChange={(checked) => {
                  onFiltersChange({
                    ...filters,
                    verifiedOnly: checked as boolean,
                  });
                }}
              />
              <Label
                htmlFor="verified-only"
                className="text-sm font-normal cursor-pointer flex items-center gap-2"
              >
                <CheckCircle className="w-4 h-4 text-green-500" />
                Verified Agents Only
              </Label>
            </div>
          </div>
        </div>

        {/* Active Filters Display */}
        {activeFilterCount > 0 && (
          <div className="border-t pt-4 mt-4">
            <Label className="text-sm font-medium mb-2 block">
              Active Filters:
            </Label>
            <div className="flex flex-wrap gap-2">
              {filters.categories.map((categoryId) => {
                const category = categoriesData?.data?.find(
                  (c) => c.id === categoryId
                );
                return category ? (
                  <Badge
                    key={category.id}
                    variant="secondary"
                    className="pl-2 pr-1 py-1"
                  >
                    {category.name}
                    <X
                      className="w-3 h-3 ml-1 cursor-pointer"
                      onClick={() => handleCategoryToggle(category.id)}
                    />
                  </Badge>
                ) : null;
              })}

              {filters.tags.map((tagId) => {
                const tag = tagsData?.data?.find((t) => t.id === tagId);
                return tag ? (
                  <Badge
                    key={tag.id}
                    variant="secondary"
                    className="pl-2 pr-1 py-1"
                  >
                    {tag.name}
                    <X
                      className="w-3 h-3 ml-1 cursor-pointer"
                      onClick={() => handleTagToggle(tag.id)}
                    />
                  </Badge>
                ) : null;
              })}

              {(filters.minPrice > 0 || filters.maxPrice < 10000) && (
                <Badge variant="secondary" className="pl-2 pr-1 py-1">
                  THB {filters.minPrice} - {filters.maxPrice}
                  <X
                    className="w-3 h-3 ml-1 cursor-pointer"
                    onClick={() => {
                      onFiltersChange({
                        ...filters,
                        minPrice: 0,
                        maxPrice: 10000,
                      });
                      setPriceRange([0, 10000]);
                    }}
                  />
                </Badge>
              )}

              {filters.minRating > 0 && (
                <Badge variant="secondary" className="pl-2 pr-1 py-1">
                  <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                  {filters.minRating}+ Rating
                  <X
                    className="w-3 h-3 ml-1 cursor-pointer"
                    onClick={() =>
                      onFiltersChange({ ...filters, minRating: 0 })
                    }
                  />
                </Badge>
              )}

              {filters.locationType.map((type) => {
                const locationType = locationTypes.find(
                  (t) => t.value === type
                );
                return locationType ? (
                  <Badge
                    key={type}
                    variant="secondary"
                    className="pl-2 pr-1 py-1"
                  >
                    {locationType.label}
                    <X
                      className="w-3 h-3 ml-1 cursor-pointer"
                      onClick={() => handleLocationTypeToggle(type)}
                    />
                  </Badge>
                ) : null;
              })}

              {filters.pricingType.map((type) => {
                const pricingType = pricingTypes.find((t) => t.value === type);
                return pricingType ? (
                  <Badge
                    key={type}
                    variant="secondary"
                    className="pl-2 pr-1 py-1"
                  >
                    {pricingType.label}
                    <X
                      className="w-3 h-3 ml-1 cursor-pointer"
                      onClick={() => handlePricingTypeToggle(type)}
                    />
                  </Badge>
                ) : null;
              })}

              {filters.verifiedOnly && (
                <Badge variant="secondary" className="pl-2 pr-1 py-1">
                  Verified Only
                  <X
                    className="w-3 h-3 ml-1 cursor-pointer"
                    onClick={() =>
                      onFiltersChange({ ...filters, verifiedOnly: false })
                    }
                  />
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t">
          <Button
            variant="outline"
            onClick={clearAllFilters}
            className="flex-1"
            disabled={activeFilterCount === 0}
          >
            Clear All
          </Button>
          <Button
            onClick={() => onOpenChange(false)}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
          >
            Apply Filters
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
