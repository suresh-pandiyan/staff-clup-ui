import React from 'react';
import { Box, Typography, Button, CircularProgress, Alert } from '@mui/material';
import { useApp } from '../contexts/AppContext';

const ProfileExample = () => {
    const {
        profile,
        isLoading,
        error,
        fetchProfile,
        updateProfile,
        clearProfile
    } = useApp();

    const handleRefreshProfile = async () => {
        try {
            await fetchProfile();
        } catch (error) {
            console.error('Failed to refresh profile:', error);
        }
    };

    const handleUpdateProfile = () => {
        const updatedProfile = {
            ...profile,
            lastUpdated: new Date().toISOString(),
        };
        updateProfile(updatedProfile);
    };

    return (
        <Box p={3}>
            <Typography variant="h5" gutterBottom>
                Profile Context Example
            </Typography>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            <Box mb={2}>
                <Button
                    variant="contained"
                    onClick={handleRefreshProfile}
                    disabled={isLoading}
                    sx={{ mr: 1 }}
                >
                    {isLoading ? <CircularProgress size={20} /> : 'Refresh Profile'}
                </Button>

                <Button
                    variant="outlined"
                    onClick={handleUpdateProfile}
                    disabled={!profile}
                    sx={{ mr: 1 }}
                >
                    Update Profile
                </Button>

                <Button
                    variant="outlined"
                    color="error"
                    onClick={clearProfile}
                >
                    Clear Profile
                </Button>
            </Box>

            {profile ? (
                <Box>
                    <Typography variant="h6" gutterBottom>
                        Current Profile:
                    </Typography>
                    <pre style={{
                        background: '#f5f5f5',
                        padding: '10px',
                        borderRadius: '4px',
                        overflow: 'auto'
                    }}>
                        {JSON.stringify(profile, null, 2)}
                    </pre>
                </Box>
            ) : (
                <Typography color="text.secondary">
                    No profile data available. Please refresh to load profile.
                </Typography>
            )}
        </Box>
    );
};

export default ProfileExample; 