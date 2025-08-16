import { BaseService } from './baseService';

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
}

export const userService = new UserService(); 