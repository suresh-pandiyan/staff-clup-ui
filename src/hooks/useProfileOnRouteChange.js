import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';

export const useProfileOnRouteChange = () => {
    const location = useLocation();
    const previousPathRef = useRef(location.pathname);
    const timeoutRef = useRef(null);
    const { fetchProfile, isAuthenticated } = useApp();

    useEffect(() => {
        const currentPath = location.pathname;
        const previousPath = previousPathRef.current;

        // Only call profile API if we're on a protected route (not auth pages)
        const isAuthPage = [
            "/authentication/sign-in/",
            "/authentication/sign-up/",
            "/authentication/forgot-password/",
            "/authentication/reset-password/",
            "/authentication/confirm-email/",
            "/authentication/lock-screen/",
            "/authentication/logout/",
            "/coming-soon/",
            "/",
            "/features/",
            "/team/",
            "/faq/",
            "/contact/",
            "/login/",
            "/login",
        ].includes(currentPath);

        // Check if user is authenticated
        const authenticated = isAuthenticated();

        // Call profile API if:
        // 1. Route has changed
        // 2. Not on an auth page
        // 3. User is authenticated
        if (currentPath !== previousPath && !isAuthPage && authenticated) {
            // Clear any existing timeout
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            // Debounce the API call to prevent too many requests
            timeoutRef.current = setTimeout(async () => {
                try {
                    await fetchProfile();
                    console.log('Profile updated on route change');
                } catch (error) {
                    console.error('Failed to fetch profile on route change:', error);
                }
            }, 300); // 300ms debounce
        }

        // Update the previous path reference
        previousPathRef.current = currentPath;
    }, [location.pathname, fetchProfile, isAuthenticated]);

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);
}; 