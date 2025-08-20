import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AppContext = createContext();

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
};

export const AppProvider = ({ children }) => {
    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isInitialized, setIsInitialized] = useState(false);
    const [profileLastFetched, setProfileLastFetched] = useState(null);

    // Initialize authentication state on mount
    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const token = localStorage.getItem('authToken');
                if (token) {
                    // Try to fetch fresh profile data from API
                    await fetchProfile();
                } else {
                    // Clear any stale data
                    clearProfile();
                }
            } catch (error) {
                console.error('Auth initialization error:', error);
                // Clear stale data on error
                clearProfile();
            } finally {
                setIsInitialized(true);
            }
        };

        initializeAuth();
    }, []);

    // Fetch profile from API
    const fetchProfile = async (forceRefresh = false) => {
        // Check if we have a recent profile (within 5 minutes) and not forcing refresh
        const now = Date.now();
        const fiveMinutes = 5 * 60 * 1000;

        if (!forceRefresh && profile && profileLastFetched && (now - profileLastFetched < fiveMinutes)) {
            console.log('Using cached profile data');
            return { data: profile };
        }

        setIsLoading(true);
        setError(null);

        try {
            const result = await authService.getCurrentUser();
            if (result.data) {
                setProfile(result.data);
                setProfileLastFetched(now);
            }
            return result;
        } catch (error) {
            setError(error.message || 'Failed to fetch profile');
            console.error('Profile fetch error:', error);

            // Handle authentication errors
            if (error.status === 401 || error.status === 403) {
                localStorage.removeItem('authToken');
                setProfile(null);
                setProfileLastFetched(null);
                window.location.href = '/login';
            }
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    // Update profile data
    const updateProfile = (newProfileData) => {
        setProfile(newProfileData);
    };

    // Clear profile data (for logout)
    const clearProfile = () => {
        setProfile(null);
        setError(null);
        setProfileLastFetched(null);
    };

    // Check if user is authenticated
    const isAuthenticated = () => {
        return !!localStorage.getItem('authToken');
    };

    const value = {
        profile,
        isLoading,
        error,
        isInitialized,
        profileLastFetched,
        fetchProfile,
        updateProfile,
        clearProfile,
        isAuthenticated,
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}; 