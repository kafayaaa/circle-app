export interface User {
  id: number;
  username: string;
  full_name: string;
  email: string;
  password: string;
  photo_profile: string | null;
  bio: string | null;
  threads_count: number;
  replies_count: number;
  likes_count: number;
  following_count: number;
  followers_count: number;
  token?: string;
  _count?: unknown;
}
