import React from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    Alert,
    CircularProgress,
} from '@mui/material';
import { useLoginForm, getFieldProps } from '../../hooks';
import { getFormMessage } from '../../helpers/formConfig';

const LoginForm = ({ onSuccess, onError }) => {
    const { form, handleSubmit, reset, isLoading, isError, error } = useLoginForm();

    const onSubmit = async (onSuccessCallback, onErrorCallback) => {
        const result = await handleSubmit(
            (data) => {
                console.log('Login successful:', data);
                if (onSuccessCallback) onSuccessCallback(data);
                if (onSuccess) onSuccess(data);
            },
            (error) => {
                console.error('Login failed:', error);
                if (onErrorCallback) onErrorCallback(error);
                if (onError) onError(error);
            }
        );
        return result;
    };

    const formMessage = getFormMessage(
        false, // isSuccess
        isError,
        '', // successMessage
        error?.message || 'Login failed. Please try again.'
    );

    return (
        <Paper elevation={3} sx={{ p: 4, maxWidth: 400, mx: 'auto' }}>
            <Typography variant="h4" component="h1" gutterBottom align="center">
                Login
            </Typography>

            {formMessage && (
                <Alert severity={formMessage.type} sx={{ mb: 2 }}>
                    {formMessage.message}
                </Alert>
            )}

            <Box component="form" onSubmit={form.handleSubmit(() => onSubmit())} noValidate>
                <TextField
                    {...getFieldProps(form, 'email', 'Email', 'Enter your email', 'email')}
                    autoComplete="email"
                    autoFocus
                />

                <TextField
                    {...getFieldProps(form, 'password', 'Password', 'Enter your password', 'password')}
                    autoComplete="current-password"
                />

                <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={isLoading}
                        sx={{ mt: 1, mb: 2 }}
                    >
                        {isLoading ? <CircularProgress size={24} /> : 'Login'}
                    </Button>

                    <Button
                        type="button"
                        fullWidth
                        variant="outlined"
                        onClick={reset}
                        disabled={isLoading}
                        sx={{ mt: 1, mb: 2 }}
                    >
                        Reset
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
};

export default LoginForm; 