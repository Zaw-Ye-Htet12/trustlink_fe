export interface Review {
  id: number;
  rating: number;
  title?: string;
  comment?: string;
  created_at: string;
  customer?: {
    id: number;
    user: {
      id: number;
      username: string;
      profile_photo_url?: string;
    };
  };
  agent?: {
    id: number;
  };
  service?: {
    id: number;
    title: string;
  };
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
