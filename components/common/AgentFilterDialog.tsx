// components/common/AgentFilterDialog.tsx
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
  Star,
  CheckCircle,
  MapPin,
  Users,
  Award,
  Briefcase,
} from "lucide-react";
import { useGetCategories } from "@/services/public/publicService";
import { Skeleton } from "@/components/ui/skeleton";

interface AgentFilterDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  filters: AgentFilters;
  onFiltersChange: (filters: AgentFilters) => void;
}

export interface AgentFilters {
  categories: number[];
  minRating: number;
  experience: string[];
  verificationStatus: string[];
  location: string[];
  serviceCount: string[];
  followerCount: string[];
}

const experienceLevels = [
  { value: "beginner", label: "Beginner (0-2 years)", min: 0, max: 2 },
  { value: "experienced", label: "Experienced (3-5 years)", min: 3, max: 5 },
  {
    value: "professional",
    label: "Professional (6-10 years)",
    min: 6,
    max: 10,
  },
  { value: "expert", label: "Expert (10+ years)", min: 10, max: 99 },
];

const verificationStatuses = [
  { value: "verified", label: "Verified Only" },
  { value: "pending", label: "Include Pending" },
];

const serviceCountRanges = [
  { value: "1-3", label: "1-3 Services" },
  { value: "4-7", label: "4-7 Services" },
  { value: "8+", label: "8+ Services" },
];

const followerCountRanges = [
  { value: "0-50", label: "0-50 Followers" },
  { value: "51-200", label: "51-200 Followers" },
  { value: "201+", label: "201+ Followers" },
];

const popularLocations = [
  "Bangkok",
  "Chiang Mai",
  "Phuket",
  "Pattaya",
  "Hua Hin",
  "Samut Prakan",
  "Online",
  "Nationwide",
];

export function AgentFilterDialog({
  isOpen,
  onOpenChange,
  filters,
  onFiltersChange,
}: AgentFilterDialogProps) {
  const { data: categoriesData, isLoading: categoriesLoading } =
    useGetCategories();
  const [rating, setRating] = useState(filters.minRating);

  const handleCategoryToggle = (categoryId: number) => {
    const newCategories = filters.categories.includes(categoryId)
      ? filters.categories.filter((id) => id !== categoryId)
      : [...filters.categories, categoryId];
    onFiltersChange({ ...filters, categories: newCategories });
  };

  const handleExperienceToggle = (experience: string) => {
    const newExperience = filters.experience.includes(experience)
      ? filters.experience.filter((exp) => exp !== experience)
      : [...filters.experience, experience];
    onFiltersChange({ ...filters, experience: newExperience });
  };

  const handleVerificationToggle = (status: string) => {
    const newStatus = filters.verificationStatus.includes(status)
      ? filters.verificationStatus.filter((s) => s !== status)
      : [...filters.verificationStatus, status];
    onFiltersChange({ ...filters, verificationStatus: newStatus });
  };

  const handleLocationToggle = (location: string) => {
    const newLocations = filters.location.includes(location)
      ? filters.location.filter((loc) => loc !== location)
      : [...filters.location, location];
    onFiltersChange({ ...filters, location: newLocations });
  };

  const handleServiceCountToggle = (range: string) => {
    const newRanges = filters.serviceCount.includes(range)
      ? filters.serviceCount.filter((r) => r !== range)
      : [...filters.serviceCount, range];
    onFiltersChange({ ...filters, serviceCount: newRanges });
  };

  const handleFollowerCountToggle = (range: string) => {
    const newRanges = filters.followerCount.includes(range)
      ? filters.followerCount.filter((r) => r !== range)
      : [...filters.followerCount, range];
    onFiltersChange({ ...filters, followerCount: newRanges });
  };

  const handleRatingChange = (value: number[]) => {
    setRating(value[0]);
  };

  const handleRatingCommit = (value: number[]) => {
    onFiltersChange({ ...filters, minRating: value[0] });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      categories: [],
      minRating: 0,
      experience: [],
      verificationStatus: [],
      location: [],
      serviceCount: [],
      followerCount: [],
    });
    setRating(0);
  };

  const activeFilterCount =
    filters.categories.length +
    (filters.minRating > 0 ? 1 : 0) +
    filters.experience.length +
    filters.verificationStatus.length +
    filters.location.length +
    filters.serviceCount.length +
    filters.followerCount.length;

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
            <DialogTitle className="text-xl">Filter Agents</DialogTitle>
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
                <Briefcase className="w-4 h-4 inline mr-2" />
                Service Categories
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
                        id={`agent-category-${category.id}`}
                        checked={filters.categories.includes(category.id)}
                        onCheckedChange={() =>
                          handleCategoryToggle(category.id)
                        }
                      />
                      <Label
                        htmlFor={`agent-category-${category.id}`}
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

            {/* Rating */}
            <div>
              <Label className="text-base font-semibold mb-3 block">
                <Star className="w-4 h-4 inline mr-2" />
                Minimum Rating
              </Label>
              <div className="space-y-4">
                <Slider
                  value={[rating]}
                  onValueChange={handleRatingChange}
                  onValueCommit={handleRatingCommit}
                  max={5}
                  step={0.5}
                  className="my-6"
                />
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Any rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{rating.toFixed(1)}+ Stars</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Experience Level */}
            <div>
              <Label className="text-base font-semibold mb-3 block">
                <Award className="w-4 h-4 inline mr-2" />
                Experience Level
              </Label>
              <div className="space-y-2">
                {experienceLevels.map((level) => (
                  <div
                    key={level.value}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={`experience-${level.value}`}
                      checked={filters.experience.includes(level.value)}
                      onCheckedChange={() =>
                        handleExperienceToggle(level.value)
                      }
                    />
                    <Label
                      htmlFor={`experience-${level.value}`}
                      className="text-sm font-normal cursor-pointer flex-1"
                    >
                      {level.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Verification Status */}
            <div>
              <Label className="text-base font-semibold mb-3 block">
                <CheckCircle className="w-4 h-4 inline mr-2" />
                Verification Status
              </Label>
              <div className="space-y-2">
                {verificationStatuses.map((status) => (
                  <div
                    key={status.value}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={`verification-${status.value}`}
                      checked={filters.verificationStatus.includes(
                        status.value
                      )}
                      onCheckedChange={() =>
                        handleVerificationToggle(status.value)
                      }
                    />
                    <Label
                      htmlFor={`verification-${status.value}`}
                      className="text-sm font-normal cursor-pointer flex-1"
                    >
                      {status.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Location */}
            <div>
              <Label className="text-base font-semibold mb-3 block">
                <MapPin className="w-4 h-4 inline mr-2" />
                Location
              </Label>
              <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                {popularLocations.map((location) => (
                  <Badge
                    key={location}
                    variant={
                      filters.location.includes(location)
                        ? "default"
                        : "outline"
                    }
                    className="cursor-pointer transition-all hover:scale-105"
                    onClick={() => handleLocationToggle(location)}
                  >
                    {location}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Service Count */}
            <div>
              <Label className="text-base font-semibold mb-3 block">
                <Briefcase className="w-4 h-4 inline mr-2" />
                Number of Services
              </Label>
              <div className="space-y-2">
                {serviceCountRanges.map((range) => (
                  <div
                    key={range.value}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={`services-${range.value}`}
                      checked={filters.serviceCount.includes(range.value)}
                      onCheckedChange={() =>
                        handleServiceCountToggle(range.value)
                      }
                    />
                    <Label
                      htmlFor={`services-${range.value}`}
                      className="text-sm font-normal cursor-pointer flex-1"
                    >
                      {range.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Follower Count */}
            <div>
              <Label className="text-base font-semibold mb-3 block">
                <Users className="w-4 h-4 inline mr-2" />
                Follower Count
              </Label>
              <div className="space-y-2">
                {followerCountRanges.map((range) => (
                  <div
                    key={range.value}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={`followers-${range.value}`}
                      checked={filters.followerCount.includes(range.value)}
                      onCheckedChange={() =>
                        handleFollowerCountToggle(range.value)
                      }
                    />
                    <Label
                      htmlFor={`followers-${range.value}`}
                      className="text-sm font-normal cursor-pointer flex-1"
                    >
                      {range.label}
                    </Label>
                  </div>
                ))}
              </div>
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

              {filters.minRating > 0 && (
                <Badge variant="secondary" className="pl-2 pr-1 py-1">
                  <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                  {filters.minRating}+ Rating
                  <X
                    className="w-3 h-3 ml-1 cursor-pointer"
                    onClick={() => {
                      onFiltersChange({ ...filters, minRating: 0 });
                      setRating(0);
                    }}
                  />
                </Badge>
              )}

              {filters.experience.map((exp) => {
                const experience = experienceLevels.find(
                  (e) => e.value === exp
                );
                return experience ? (
                  <Badge
                    key={exp}
                    variant="secondary"
                    className="pl-2 pr-1 py-1"
                  >
                    {experience.label}
                    <X
                      className="w-3 h-3 ml-1 cursor-pointer"
                      onClick={() => handleExperienceToggle(exp)}
                    />
                  </Badge>
                ) : null;
              })}

              {filters.verificationStatus.map((status) => {
                const verification = verificationStatuses.find(
                  (v) => v.value === status
                );
                return verification ? (
                  <Badge
                    key={status}
                    variant="secondary"
                    className="pl-2 pr-1 py-1"
                  >
                    {verification.label}
                    <X
                      className="w-3 h-3 ml-1 cursor-pointer"
                      onClick={() => handleVerificationToggle(status)}
                    />
                  </Badge>
                ) : null;
              })}

              {filters.location.map((location) => (
                <Badge
                  key={location}
                  variant="secondary"
                  className="pl-2 pr-1 py-1"
                >
                  {location}
                  <X
                    className="w-3 h-3 ml-1 cursor-pointer"
                    onClick={() => handleLocationToggle(location)}
                  />
                </Badge>
              ))}

              {filters.serviceCount.map((range) => {
                const serviceRange = serviceCountRanges.find(
                  (r) => r.value === range
                );
                return serviceRange ? (
                  <Badge
                    key={range}
                    variant="secondary"
                    className="pl-2 pr-1 py-1"
                  >
                    {serviceRange.label}
                    <X
                      className="w-3 h-3 ml-1 cursor-pointer"
                      onClick={() => handleServiceCountToggle(range)}
                    />
                  </Badge>
                ) : null;
              })}

              {filters.followerCount.map((range) => {
                const followerRange = followerCountRanges.find(
                  (r) => r.value === range
                );
                return followerRange ? (
                  <Badge
                    key={range}
                    variant="secondary"
                    className="pl-2 pr-1 py-1"
                  >
                    {followerRange.label}
                    <X
                      className="w-3 h-3 ml-1 cursor-pointer"
                      onClick={() => handleFollowerCountToggle(range)}
                    />
                  </Badge>
                ) : null;
              })}
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
