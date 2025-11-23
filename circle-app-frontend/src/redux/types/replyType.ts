import type { User } from "./userType";

export interface Reply {
  id: number;
  user_id: number;
  thread_id: number;
  image?: string;
  content: string;
  created_at: string;
  created_by: number;
  updated_at: string;
  user: User;
}
