import type { UserProfile } from '../types';
import { apiService } from '$lib/features/core/services';

class UserService {
  async getProfile(): Promise<UserProfile> {
    return apiService.get('/user/profile');
  }

  async updateProfile(data: Partial<UserProfile>): Promise<UserProfile> {
    return apiService.put('/user/profile', data);
  }
}

export const userService = new UserService();