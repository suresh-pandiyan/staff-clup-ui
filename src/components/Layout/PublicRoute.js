import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useApp } from '../../contexts/AppContext';

const PublicRoute = ({ children, redirectTo = '/dashboard' }) => {
    const { isAuthenticated } = useApp();
    const location = useLocation();

    // If user is authenticated, redirect to dashboard
    if (isAuthenticated()) {
        // Check if there's a redirect location from protected route
        const from = location.state?.from?.pathname;
        return <Navigate to={from || redirectTo} replace />;
    }

    // If not authenticated, render the auth page
    return children;
};

export default PublicRoute;
