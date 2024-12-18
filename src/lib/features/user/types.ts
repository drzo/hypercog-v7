export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'user' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile {
  bio?: string;
  location?: string;
  website?: string;
  socialLinks?: {
    twitter?: string;
    github?: string;
    linkedin?: string;
  };
}

export interface UserState {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
}