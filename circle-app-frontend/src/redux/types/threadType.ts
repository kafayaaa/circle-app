export interface User {
  id: number;
  username: string;
  full_name: string;
  photo_profile: string | null;
}

export interface Thread {
  id: number;
  content: string;
  image?: string;
  number_of_replies?: number | null;
  created_at: string;
  created_by?: number | null;
  updated_at: string;
  createdBy?: User | null;
}
