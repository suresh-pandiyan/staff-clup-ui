import { apiHelpers, handleApiError, handleApiSuccess } from '../helpers/axiosConfig';

export const dashboardService = {
    // Get dashboard stats
    async getStats() {
        try {
            const response = await apiHelpers.get('/dashboard/stats');
            return handleApiSuccess(response);
        } catch (error) {
            throw handleApiError(error);
        }
    },

    // Get recent activities
    async getRecentActivities(limit = 10) {
        try {
            const response = await apiHelpers.get('/dashboard/recent-activities', {
                params: { limit }
            });
            return handleApiSuccess(response);
        } catch (error) {
            throw handleApiError(error);
        }
    },

    // Get charts data
    async getChartsData(period = 'month') {
        try {
            const response = await apiHelpers.get('/dashboard/charts', {
                params: { period }
            });
            return handleApiSuccess(response);
        } catch (error) {
            throw handleApiError(error);
        }
    },

    // Get financial summary
    async getFinancialSummary() {
        try {
            const response = await apiHelpers.get('/dashboard/financial-summary');
            return handleApiSuccess(response);
        } catch (error) {
            throw handleApiError(error);
        }
    },

    // Get user activity
    async getUserActivity(userId) {
        try {
            const response = await apiHelpers.get(`/dashboard/user-activity/${userId}`);
            return handleApiSuccess(response);
        } catch (error) {
            throw handleApiError(error);
        }
    },

    // Get notifications
    async getNotifications(limit = 20) {
        try {
            const response = await apiHelpers.get('/dashboard/notifications', {
                params: { limit }
            });
            return handleApiSuccess(response);
        } catch (error) {
            throw handleApiError(error);
        }
    },

    // Mark notification as read
    async markNotificationAsRead(notificationId) {
        try {
            const response = await apiHelpers.patch(`/dashboard/notifications/${notificationId}/read`);
            return handleApiSuccess(response);
        } catch (error) {
            throw handleApiError(error);
        }
    },

    // Get system health
    async getSystemHealth() {
        try {
            const response = await apiHelpers.get('/dashboard/system-health');
            return handleApiSuccess(response);
        } catch (error) {
            throw handleApiError(error);
        }
    },
}; 