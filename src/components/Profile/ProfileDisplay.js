import React from 'react';
import { Box, Typography, Card, CardContent, Avatar, Button, CircularProgress } from '@mui/material';
import { useProfile } from '../../hooks/useProfile';

const ProfileDisplay = () => {
    const { profile, isLoading, error, refreshProfile, hasProfile, isProfileStale, profileLastFetched } = useProfile();

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Card>
                <CardContent>
                    <Typography color="error" variant="h6">
                        Error loading profile: {error}
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={refreshProfile}
                        sx={{ mt: 2 }}
                    >
                        Retry
                    </Button>
                </CardContent>
            </Card>
        );
    }

    if (!hasProfile) {
        return (
            <Card>
                <CardContent>
                    <Typography variant="h6" color="textSecondary">
                        No profile data available
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={refreshProfile}
                        sx={{ mt: 2 }}
                    >
                        Load Profile
                    </Button>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                    <Avatar
                        sx={{ width: 64, height: 64, mr: 2 }}
                        src={profile.avatar || profile.profilePicture}
                    >
                        {profile.name ? profile.name.charAt(0).toUpperCase() : 'U'}
                    </Avatar>
                    <Box>
                        <Typography variant="h5" component="h2">
                            {profile.name || profile.fullName || 'User'}
                        </Typography>
                        <Typography color="textSecondary">
                            {profile.email || 'No email available'}
                        </Typography>
                    </Box>
                </Box>

                <Box mt={2}>
                    <Typography variant="h6" gutterBottom>
                        Profile Information
                    </Typography>
                    <Typography variant="body2" paragraph>
                        <strong>ID:</strong> {profile.id || 'N/A'}
                    </Typography>
                    {profile.phone && (
                        <Typography variant="body2" paragraph>
                            <strong>Phone:</strong> {profile.phone}
                        </Typography>
                    )}
                    {profile.role && (
                        <Typography variant="body2" paragraph>
                            <strong>Role:</strong> {profile.role}
                        </Typography>
                    )}
                    {profile.createdAt && (
                        <Typography variant="body2" paragraph>
                            <strong>Member Since:</strong> {new Date(profile.createdAt).toLocaleDateString()}
                        </Typography>
                    )}
                </Box>

                                <Box mt={2}>
                    <Typography variant="body2" color="textSecondary" paragraph>
                        <strong>Last Updated:</strong> {profileLastFetched ? new Date(profileLastFetched).toLocaleString() : 'Never'}
                    </Typography>
                    {isProfileStale && (
                        <Typography variant="body2" color="warning.main" paragraph>
                            Profile data may be outdated
                        </Typography>
                    )}
                    <Button 
                        variant="outlined" 
                        onClick={() => refreshProfile(true)}
                        disabled={isLoading}
                    >
                        {isLoading ? <CircularProgress size={20} /> : 'Refresh Profile'}
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default ProfileDisplay;
