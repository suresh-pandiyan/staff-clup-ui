import React from 'react';
import { useProfileOnRouteChange } from '../../hooks/useProfileOnRouteChange';

const RouteChangeHandler = () => {
    // This hook will handle calling the profile API on route changes
    useProfileOnRouteChange();

    // This component doesn't render anything, it just uses the hook
    return null;
};

export default RouteChangeHandler; 