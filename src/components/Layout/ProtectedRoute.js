import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useApp } from '../../contexts/AppContext';
import { CircularProgress, Box } from '@mui/material';

const ProtectedRoute = ({ children, redirectTo = '/authentication/sign-in/' }) => {
    const { isAuthenticated, profile, fetchProfile, isLoading } = useApp();
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);
    const location = useLocation();

    useEffect(() => {
        const checkAuthentication = async () => {
            if (isAuthenticated()) {
                // If we have a token but no profile, fetch it
                if (!profile) {
                    try {
                        await fetchProfile();
                    } catch (error) {
                        console.error('Failed to fetch profile:', error);
                        // If profile fetch fails due to auth error, redirect to login
                        if (error.status === 401 || error.status === 403) {
                            return;
                        }
                    }
                }
            }
            setIsCheckingAuth(false);
        };

        checkAuthentication();
    }, [isAuthenticated, profile, fetchProfile]);

    // Show loading spinner while checking authentication
    if (isCheckingAuth || isLoading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
            >
                <CircularProgress />
            </Box>
        );
    }

    // If not authenticated, redirect to login
    if (!isAuthenticated()) {
        return <Navigate to={redirectTo} state={{ from: location }} replace />;
    }

    // If authenticated and profile loaded, render children
    return children;
};

export default ProtectedRoute;
