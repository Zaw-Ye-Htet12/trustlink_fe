import { User } from "./user";

export enum VerificationStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
}

export interface AgentProfile {
  id: number;
  user: User;
  bio?: string;
  years_of_experience?: number;
  location?: string;
  service_area?: string;
  verification_status: VerificationStatus;
  total_reviews: number;
  follower_count: number;
  created_at: string;
  updated_at: string;
}

export interface UpdateAgentDto {
  bio?: string;
  years_of_experience?: number;
  location?: string;
  service_area?: string;
  email?: string;
  username?: string;
  phone_no?: string;
  profile_photo_url?: string;
}
