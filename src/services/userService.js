import { BaseService } from './baseService';
import { apiHelpers } from '../helpers/axiosConfig';

export class UserService extends BaseService {
    constructor() {
        super('users');
    }

    // Additional user-specific methods can be added here
    async getByEmail(email) {
        try {
            const response = await this.getAll({ email });
            return response;
        } catch (error) {
            throw error;
        }
    }

    async updateProfile(userId, profileData) {
        try {
            const response = await this.patch(userId, profileData);
            return response;
        } catch (error) {
            throw error;
        }
    }

    async changePassword(userId, passwordData) {
        try {
            const response = await this.patch(userId, { password: passwordData });
            return response;
        } catch (error) {
            throw error;
        }
    }

    async createUser(userData) {
        try {
            const response = await apiHelpers.post(`/users/create-member`, userData);
            return response;
        } catch (error) {
            throw error;
        }
    }

    async updateUser(userId, userData) {
        try {
            const response = await apiHelpers.put(`/users/update-member/${userId}`, userData);
            return response;
        } catch (error) {
            throw error;
        }
    }
}

export const userService = new UserService(); 