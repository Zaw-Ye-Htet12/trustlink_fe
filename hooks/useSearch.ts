"use client";

import { useState, useEffect, useMemo } from "react";
import { debounce } from "lodash";
import { useAllAgents } from "@/hooks/useAllAgents";
import { useAllServices } from "@/hooks/useAllServices";

export const useSearch = () => {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [activeTab, setActiveTab] = useState<"agents" | "services">("agents");
  const [searchParams, setSearchParams] = useState({
    keyword: "",
    location: "",
  });
  // Filters managed in the hook so we can apply them client-side
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [minRating, setMinRating] = useState<number>(0);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });

  // Debounce input updates
  useEffect(() => {
    const handler = debounce(() => {
      setSearchParams({ keyword, location });
    }, 500);
    handler();
    return () => handler.cancel();
  }, [keyword, location]);

  // Use full lists and filter client-side
  const {
    allAgents = [],
    isFetchingAllAgents = false,
    fetchAllAgentsError,
  } = useAllAgents();
  const {
    allServices = [],
    isFetchingAllServices = false,
    fetchAllServicesError,
  } = useAllServices();

  const filteredAgents = useMemo(() => {
    const k = (searchParams.keyword || "").trim().toLowerCase();
    const loc = (searchParams.location || "").trim().toLowerCase();

    return allAgents.filter((agent) => {
      const username = agent.user?.username?.toLowerCase() ?? "";
      const bio = agent.bio?.toLowerCase() ?? "";
      const agentLocation = (agent.location || "").toLowerCase();

      const matchesSearch =
        !k ||
        username.includes(k) ||
        bio.includes(k) ||
        agent.services?.some((s) =>
          (s.title + " " + (s.description ?? "")).toLowerCase().includes(k)
        );

      const matchesLocation = !loc || agentLocation.includes(loc);

      if (!(matchesSearch && matchesLocation)) return false;

      // Apply client-side filters by checking the agent's services
      const services = agent.services || [];

      // Category filter: if selectedCategories set, agent must have at least one service in those categories
      if (
        selectedCategories.length > 0 &&
        !services.some((s) =>
          selectedCategories.includes(s.category_id ?? s.category?.id ?? -1)
        )
      ) {
        return false;
      }

      // Tags filter: agent must have at least one service containing any of the selected tags
      if (
        selectedTags.length > 0 &&
        !services.some((s) =>
          (s.tags || []).some((t) => selectedTags.includes(t.id))
        )
      ) {
        return false;
      }

      // Min rating filter: at least one service should meet the rating threshold
      if (
        minRating > 0 &&
        !services.some((s) => (s.rating || 0) >= minRating)
      ) {
        return false;
      }

      // Price range filter: at least one service should be within the price range
      if (
        (priceRange.min > 0 || priceRange.max < 10000) &&
        !services.some((s) => {
          const p = s.price ?? 0;
          if (priceRange.min > 0 && p < priceRange.min) return false;
          if (priceRange.max < 10000 && p > priceRange.max) return false;
          return true;
        })
      ) {
        return false;
      }

      return true;
    });
  }, [
    allAgents,
    searchParams,
    selectedCategories,
    selectedTags,
    minRating,
    priceRange,
  ]);

  const filteredServices = useMemo(() => {
    const k = (searchParams.keyword || "").trim().toLowerCase();
    const loc = (searchParams.location || "").trim().toLowerCase();

    return allServices.filter((svc) => {
      const title = (svc.title || "").toLowerCase();
      const desc = (svc.description || "").toLowerCase();
      const agentName = svc.agent?.user?.username?.toLowerCase() ?? "";
      const category = svc.category?.name?.toLowerCase() ?? "";
      const serviceArea = (svc.service_area || "").toLowerCase();

      const matchesSearch =
        !k ||
        title.includes(k) ||
        desc.includes(k) ||
        agentName.includes(k) ||
        category.includes(k);

      const matchesLocation = !loc || serviceArea.includes(loc);

      if (!(matchesSearch && matchesLocation)) return false;

      // Category filter
      if (
        selectedCategories.length > 0 &&
        !selectedCategories.includes(svc.category_id ?? svc.category?.id ?? -1)
      ) {
        return false;
      }

      // Tags filter
      if (
        selectedTags.length > 0 &&
        !(svc.tags || []).some((t) => selectedTags.includes(t.id))
      ) {
        return false;
      }

      // Min rating
      if (minRating > 0 && (svc.rating || 0) < minRating) {
        return false;
      }

      // Price range
      const p = svc.price ?? 0;
      if (priceRange.min > 0 && p < priceRange.min) return false;
      if (priceRange.max < 10000 && p > priceRange.max) return false;

      return true;
    });
  }, [
    allServices,
    searchParams,
    selectedCategories,
    selectedTags,
    minRating,
    priceRange,
  ]);

  const handleSearchClick = () => {
    setSearchParams({ keyword, location });
  };

  // Return objects similar to react-query results used in UI
  const agentQuery = {
    data: { data: filteredAgents },
    isFetching: isFetchingAllAgents,
    error: fetchAllAgentsError,
  };

  const serviceQuery = {
    data: { data: filteredServices },
    isFetching: isFetchingAllServices,
    error: fetchAllServicesError,
  };
  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedTags([]);
    setMinRating(0);
    setPriceRange({ min: 0, max: 10000 });
  };

  return {
    keyword,
    location,
    activeTab,
    setKeyword,
    setLocation,
    setActiveTab,
    handleSearchClick,
    searchParams,
    // filters
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
    agentQuery,
    serviceQuery,
  };
};
