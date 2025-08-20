import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { useApp } from '../contexts/AppContext';

export const useAuth = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { clearProfile } = useApp();

    const logout = async () => {
        setIsLoading(true);
        setError(null);
        try {
            // Call the logout API
            await authService.logout();

            // Clear any local storage or session data
            localStorage.removeItem('authToken');
            sessionStorage.clear();
            clearProfile(); // Clear profile from context

            // Redirect to login page
            navigate('/login');

            return { success: true };
        } catch (error) {
            setError(error.message || 'Logout failed. Please try again.');

            // Even if API call fails, clear local data and redirect
            localStorage.removeItem('authToken');
            sessionStorage.clear();
            clearProfile(); // Clear profile from context
            navigate('/login');

            return { success: false, error: error.message };
        } finally {
            setIsLoading(false);
        }
    };

    const isAuthenticated = () => {
        const token = localStorage.getItem('authToken');
        return !!token;
    };

    return {
        logout,
        isLoading,
        error,
        isAuthenticated,
    };
}; 