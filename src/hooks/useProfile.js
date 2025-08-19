import { useCallback } from 'react';
import { useApp } from '../contexts/AppContext';

export const useProfile = () => {
    const {
        profile,
        isLoading,
        error,
        isInitialized,
        profileLastFetched,
        fetchProfile,
        updateProfile,
        clearProfile,
        isAuthenticated
    } = useApp();

    const refreshProfile = useCallback(async (forceRefresh = true) => {
        try {
            await fetchProfile(forceRefresh);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }, [fetchProfile]);

    const updateProfileData = useCallback(async (newData) => {
        try {
            updateProfile(newData);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }, [updateProfile]);

    // Check if profile data is stale (older than 5 minutes)
    const isProfileStale = useCallback(() => {
        if (!profileLastFetched) return true;
        const now = Date.now();
        const fiveMinutes = 5 * 60 * 1000;
        return (now - profileLastFetched) > fiveMinutes;
    }, [profileLastFetched]);

    return {
        profile,
        isLoading,
        error,
        isInitialized,
        isAuthenticated: isAuthenticated(),
        refreshProfile,
        updateProfile: updateProfileData,
        clearProfile,
        hasProfile: !!profile,
        isProfileStale: isProfileStale(),
        profileLastFetched,
    };
};
