import { Review } from "./review";
import { Service } from "./service";
import { User } from "./user";

export enum VerificationStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
}

export enum DocumentType {
  BUSINESS_LICENSE = "business_license",
  ID_CARD = "id_card",
  CERTIFICATE = "certificate",
  OTHER = "other",
}

export interface AgentProfile {
  id: number;
  user: User;
  bio?: string;
  years_of_experience?: number;
  location?: string;
  service_area?: string;
  verification_status: VerificationStatus;
  verificationDocuments?: VerificationDocument[];
  total_reviews: number;
  follower_count: number;
  created_at: string;
  updated_at: string;
  services?: Service[];
  reviews?: Review[];
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
  businessName?: string;
}

export interface VerificationDocument {
  id: number;
  agent_id: number;
  agent: AgentProfile;
  document_type: DocumentType;
  document_url: string;
  status: VerificationStatus;
  admin_notes?: string;
  created_at: string;
}
