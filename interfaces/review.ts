import { AgentProfile } from "./agent";
import { Service } from "./service";
import { CustomerProfile } from "./user";

export interface Review {
  id: number;
  rating: number;
  title?: string;
  comment?: string;
  created_at: string;
  customer?: CustomerProfile;
  agent?: AgentProfile;
  service?: Service;
}

export interface CreateReviewDto {
  agentId: number;
  serviceId?: number;
  rating: number;
  title?: string;
  comment?: string;
}

export interface UpdateReviewDto {
  rating?: number;
  comment?: string;
}
