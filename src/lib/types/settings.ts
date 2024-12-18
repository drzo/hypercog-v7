export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  emailNotifications: boolean;
  language: string;
}

export interface ProfileUpdateData {
  name?: string;
  email?: string;
  avatar?: File;
}

export interface SettingsState {
  preferences: UserPreferences;
  loading: boolean;
  error: string | null;
}