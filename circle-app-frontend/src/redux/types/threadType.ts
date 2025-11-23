import type { User } from "./userType";

export interface Thread {
  id: number;
  content: string;
  image?: string;
  number_of_replies?: number | null;
  created_at: string;
  created_by?: number | null;
  updated_at: string;
  createdBy?: User | null;
  is_liked?: boolean;
  _count?: { replies: number; likes: number } | null;
}
