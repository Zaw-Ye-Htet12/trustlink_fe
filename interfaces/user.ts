export enum UserRole {
  ADMIN = "admin",
  AGENT = "agent",
  CUSTOMER = "customer",
}

export interface User {
  id: number;
  email: string;
  username: string;
  role: UserRole;
  phone_no?: string;
  is_active: boolean;
  profile_photo_url?: string;
  created_at: string;
  updated_at: string;
}

export interface CustomerProfile {
  id: number;
  user_id: number;
  location?: string;
  bio?: string;
  created_at: string;
  user?: User;
}

export interface AuthResponse {
  user: User;
  access_token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  username: string;
  phone?: string;
  role: UserRole.AGENT | UserRole.CUSTOMER;
}
