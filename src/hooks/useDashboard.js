import { useApiQuery, useApiMutation } from './index';
import { dashboardService } from '../services';

// Dashboard-related hooks
export const useDashboardStats = () => {
    return useApiQuery(
        ['dashboard', 'stats'],
        () => dashboardService.getStats(),
        {
            staleTime: 2 * 60 * 1000, // 2 minutes
        }
    );
};

export const useRecentActivities = (limit = 10) => {
    return useApiQuery(
        ['dashboard', 'recent-activities', limit],
        () => dashboardService.getRecentActivities(limit),
        {
            staleTime: 1 * 60 * 1000, // 1 minute
        }
    );
};

export const useChartsData = (period = 'month') => {
    return useApiQuery(
        ['dashboard', 'charts', period],
        () => dashboardService.getChartsData(period),
        {
            staleTime: 5 * 60 * 1000, // 5 minutes
        }
    );
};

export const useFinancialSummary = () => {
    return useApiQuery(
        ['dashboard', 'financial-summary'],
        () => dashboardService.getFinancialSummary(),
        {
            staleTime: 5 * 60 * 1000, // 5 minutes
        }
    );
};

export const useUserActivity = (userId) => {
    return useApiQuery(
        ['dashboard', 'user-activity', userId],
        () => dashboardService.getUserActivity(userId),
        {
            enabled: !!userId,
            staleTime: 2 * 60 * 1000, // 2 minutes
        }
    );
};

export const useNotifications = (limit = 20) => {
    return useApiQuery(
        ['dashboard', 'notifications', limit],
        () => dashboardService.getNotifications(limit),
        {
            staleTime: 1 * 60 * 1000, // 1 minute
        }
    );
};

export const useMarkNotificationAsRead = () => {
    return useApiMutation(
        (notificationId) => dashboardService.markNotificationAsRead(notificationId),
        {
            invalidateQueries: [['dashboard', 'notifications']],
            onSuccess: (data) => {
                console.log('Notification marked as read:', data);
            },
        }
    );
};

export const useSystemHealth = () => {
    return useApiQuery(
        ['dashboard', 'system-health'],
        () => dashboardService.getSystemHealth(),
        {
            staleTime: 1 * 60 * 1000, // 1 minute
        }
    );
}; 