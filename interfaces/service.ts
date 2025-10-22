export enum PricingType {
  FIXED = "fixed",
  STARTING_FROM = "starting_from",
  HOURLY = "hourly",
}

export enum LocationType {
  ONLINE = "online",
  CUSTOMER_LOCATION = "customer_location",
  AGENT_LOCATION = "agent_location",
  FLEXIBLE = "flexible",
}

export interface Service {
  id: number;
  agent_id: number;
  category_id?: number;
  title: string;
  description: string;
  pricing_type: PricingType;
  price?: number;
  currency: string;
  location_type?: LocationType;
  service_area?: string;
  is_active: boolean;
  total_reviews: number;
  created_at: string;
  updated_at: string;
  category?: Category;
  tags?: Tag[];
  images?: ServiceImage[];
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  is_active: boolean;
}

export interface Tag {
  id: number;
  name: string;
  slug?: string;
}

export interface ServiceImage {
  id: number;
  service_id: number;
  image_url: string;
  is_primary: boolean;
  created_at: string;
}

export interface CreateServiceDto {
  title: string;
  description: string;
  category_id: number;
  pricing_type: PricingType;
  price?: number;
  currency?: string;
  location_type: LocationType;
  service_area?: string;
}
