import { apiHelpers, handleApiError, handleApiSuccess } from '../helpers/axiosConfig';

export const authService = {
    // Login
    async login(credentials) {
        try {
            const response = await apiHelpers.post('/auth/login', credentials);
            const result = handleApiSuccess(response);

            // Store token if login successful
            if (result.data?.token) {
                localStorage.setItem('authToken', result.data.token);
            }

            return result;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    // Register
    async register(userData) {
        try {
            const response = await apiHelpers.post('/auth/register', userData);
            return handleApiSuccess(response);
        } catch (error) {
            throw handleApiError(error);
        }
    },

    // Logout
    async logout() {
        try {
            const response = await apiHelpers.post('/logout');
            localStorage.removeItem('authToken');
            return handleApiSuccess(response);
        } catch (error) {
            localStorage.removeItem('authToken'); // Remove token even if API call fails
            throw handleApiError(error);
        }
    },

    // Refresh token
    async refreshToken() {
        try {
            const response = await apiHelpers.post('/auth/refresh');
            const result = handleApiSuccess(response);

            if (result.data?.token) {
                localStorage.setItem('authToken', result.data.token);
            }

            return result;
        } catch (error) {
            throw handleApiError(error);
        }
    },

        // Get current user
    async getCurrentUser() {
        try {
            const response = await apiHelpers.get('/auth/me');
            const result = handleApiSuccess(response);
            return result;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    // Change password
    async changePassword(data) {
        try {
            const response = await apiHelpers.post('/auth/change-password', data);
            return handleApiSuccess(response);
        } catch (error) {
            throw handleApiError(error);
        }
    },

    // Forgot password
    async forgotPassword(email) {
        try {
            const response = await apiHelpers.post('/auth/forgot-password', { email });
            return handleApiSuccess(response);
        } catch (error) {
            throw handleApiError(error);
        }
    },

    // Reset password
    async resetPassword(token, password) {
        try {
            const response = await apiHelpers.post('/auth/reset-password', { token, password });
            return handleApiSuccess(response);
        } catch (error) {
            throw handleApiError(error);
        }
    },

    // Verify email
    async verifyEmail(token) {
        try {
            const response = await apiHelpers.post('/auth/verify-email', { token });
            return handleApiSuccess(response);
        } catch (error) {
            throw handleApiError(error);
        }
    },

    // Resend verification email
    async resendVerificationEmail(email) {
        try {
            const response = await apiHelpers.post('/auth/resend-verification', { email });
            return handleApiSuccess(response);
        } catch (error) {
            throw handleApiError(error);
        }
    },
}; 