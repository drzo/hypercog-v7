import { apiService } from '$lib/features/core/services';
class UserService {
    async getProfile() {
        return apiService.get('/user/profile');
    }
    async updateProfile(data) {
        return apiService.put('/user/profile', data);
    }
}
export const userService = new UserService();
