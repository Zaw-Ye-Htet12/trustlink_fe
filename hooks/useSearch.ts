"use client";

import { useState, useEffect } from "react";
import { debounce } from "lodash";
import {
  useGetSearchAgents,
  useGetSearchServices,
} from "@/services/public/publicService";

export const useSearch = () => {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [activeTab, setActiveTab] = useState<"agents" | "services">("agents");
  const [searchParams, setSearchParams] = useState({
    keyword: "",
    location: "",
  });

  // Debounce input updates
  useEffect(() => {
    const handler = debounce(() => {
      setSearchParams({ keyword, location });
    }, 500);
    handler();
    return () => handler.cancel();
  }, [keyword, location]);

  // Call API hooks (enabled based on tab and input)
  const agentQuery = useGetSearchAgents(searchParams);
  const serviceQuery = useGetSearchServices(searchParams);

  const handleSearchClick = () => {
    setSearchParams({ keyword, location });
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
    agentQuery,
    serviceQuery,
  };
};
