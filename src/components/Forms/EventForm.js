import React from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    Alert,
    CircularProgress,
    MenuItem,
    Grid,
} from '@mui/material';
import { useEventForm, getFieldProps, getDateFieldProps, getTimeFieldProps, getNumberFieldProps, getTextareaFieldProps } from '../../hooks';
import { getFormMessage } from '../../helpers/formConfig';

const EventForm = ({ eventData = {}, onSuccess, onError }) => {
    const { form, handleSubmit, reset, isLoading, isError, error } = useEventForm(eventData);

    const onSubmit = async (onSuccessCallback, onErrorCallback) => {
        const result = await handleSubmit(
            (data) => {
                console.log('Event saved successfully:', data);
                if (onSuccessCallback) onSuccessCallback(data);
                if (onSuccess) onSuccess(data);
            },
            (error) => {
                console.error('Event save failed:', error);
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
        error?.message || 'Failed to save event. Please try again.'
    );

    const categoryOptions = [
        { value: 'meeting', label: 'Meeting' },
        { value: 'workshop', label: 'Workshop' },
        { value: 'seminar', label: 'Seminar' },
        { value: 'conference', label: 'Conference' },
        { value: 'social', label: 'Social Event' },
        { value: 'other', label: 'Other' },
    ];

    return (
        <Paper elevation={3} sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
            <Typography variant="h4" component="h1" gutterBottom align="center">
                {eventData.id ? 'Edit Event' : 'Create New Event'}
            </Typography>

            {formMessage && (
                <Alert severity={formMessage.type} sx={{ mb: 2 }}>
                    {formMessage.message}
                </Alert>
            )}

            <Box component="form" onSubmit={form.handleSubmit(() => onSubmit())} noValidate>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            {...getFieldProps(form, 'title', 'Event Title', 'Enter event title')}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            {...getTextareaFieldProps(form, 'description', 'Description', 4)}
                            placeholder="Enter event description"
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            {...getDateFieldProps(form, 'date', 'Event Date')}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            {...getTimeFieldProps(form, 'time', 'Event Time')}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            {...getFieldProps(form, 'location', 'Location', 'Enter event location')}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            {...getNumberFieldProps(form, 'maxAttendees', 'Max Attendees', 1)}
                            placeholder="Enter maximum number of attendees"
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            {...getFieldProps(form, 'category', 'Category')}
                            select
                        >
                            {categoryOptions.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                </Grid>

                <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={isLoading}
                        sx={{ mt: 1, mb: 2 }}
                    >
                        {isLoading ? <CircularProgress size={24} /> : (eventData.id ? 'Update Event' : 'Create Event')}
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

export default EventForm; 