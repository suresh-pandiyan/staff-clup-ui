import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
    Box,
    Grid,
    FormControl,
    TextField,
    Select,
    MenuItem,
    Button,
    Typography,
    FormHelperText,
    Divider,
} from '@mui/material';

// Validation schema
const eventSchema = yup.object({
    // Employee Information

    eventName: yup
        .string()
        .required('Event Name  is required')
        .max(50, 'Event Name cannot be more than 50 characters'),
    eventDescription: yup
        .string()
        .required('Event Description  is required')
        .max(100, 'Event Description cannot be more than 100 characters'),
    eventAmount: yup
        .number()
        .typeError('Event Amount must be a number')
        .required('Event Amount is required')
        .min(1, 'Event Amount must be at least 1')
        .positive('Event Amount must be positive'),
    eventCreated: yup
        .date()
        .typeError('Please select a valid date')
        .required('Event Created date is required')
        .max(new Date(), 'Event Created date cannot be in the future'),
    phone: yup
        .string()
        .required('Phone number is required')
        .matches(/^[\+]?[1-9][\d]{0,15}$/, 'Please add a valid phone number'),
    type: yup
        .string()
        .oneOf(['full-time', 'part-time', 'contract', 'intern'], 'Please select a valid type'),
    address: yup.object({
        street: yup.string().required('Street address is required'),
        city: yup.string().required('City is required'),
        state: yup.string().required('State is required'),
        zipCode: yup.string().required('Zip code is required'),
        country: yup.string().required('Country is required'),
    }),

    department: yup
        .string()
        .oneOf([
            'Computer Science & Engineering(CSE)',
            'Information Technology(IT)',
            'Electronics & Communication Engineering(ECE)',
            'Electrical & Electronics Engineering(EEE)',
            'Mechanical Engineering(MECH)',
            'Civil Engineering',
            'Artificial Intelligence & Data Science(AI & DS)',
            'Master of Business Administration(MBA)',
            'Cyber Security',
            'Master of Computer Applications(MCA)',
        ], 'Please select a valid department'),

    designation: yup
        .string()
        .required('Designation is required')
        .max(100, 'Designation cannot be more than 100 characters'),

    status: yup
        .string()
        .oneOf(['active', 'inactive', 'terminated', 'resigned', 'on-leave'], 'Please select a valid status'),

    hasLoan: yup.boolean(),
    hasChitfund: yup.boolean(),

    currentSalary: yup
        .number()
        .required('Current salary is required')
        .min(0, 'Salary cannot be negative'),

    // Emergency Contact
    emergencyContact: yup.object({
        name: yup.string().required('Emergency contact name is required'),
        relationship: yup.string().required('Relationship is required'),
        phone: yup
            .string()
            .required('Emergency contact phone is required')
            .matches(/^[\+]?[1-9][\d]{0,15}$/, 'Please add a valid phone number'),
        address: yup.string(),
    }),
});

const EventForm = ({ onSubmit, onCancel, loading = false, defaultValues = {}, isEdit = false }) => {
    const {
        control,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(eventSchema),
        defaultValues: {
            eventName: '',
            eventDescription: '',
            eventAmount: '',
            eventCreated: '',
            email: '',
            phone: '',
            role: 'user',
            type: 'full-time',
            joinDate: '',
            address: {
                street: '',
                city: '',
                state: '',
                zipCode: '',
                country: 'India',
            },
            department: '',
            designation: '',
            status: 'active',
            hasLoan: false,
            hasChitfund: false,
            currentSalary: '',
            emergencyContact: {
                name: '',
                relationship: '',
                phone: '',
                address: '',
            },
            password: 'admin@123',
            ...defaultValues,
        },
    });

    const onSubmitForm = (data) => {
        onSubmit(data);
    };

    const commonTextFieldStyles = {
        "& .MuiInputBase-root": {
            border: "1px solid #D5D9E2",
            backgroundColor: "#fff",
            borderRadius: "7px",
        },
        "& .MuiInputBase-root::before": {
            border: "none",
        },
        "& .MuiInputBase-root:hover::before": {
            border: "none",
        },
        "& .MuiInputBase-root:hover:hover:not(.Mui-disabled, .Mui-error)::before": {
            border: "none",
        },
    };

    const commonSelectStyles = {
        "& .MuiInputBase-root": {
            border: "1px solid #D5D9E2",
            backgroundColor: "#fff",
            borderRadius: "7px",
        },
        "& .MuiInputBase-root::before": {
            border: "none",
        },
        "& .MuiInputBase-root:hover::before": {
            border: "none",
        },
        "& .MuiInputBase-root:hover:hover:not(.Mui-disabled, .Mui-error)::before": {
            border: "none",
        },
    };

    return (
        <form component="form" onSubmit={handleSubmit(onSubmitForm)}>
            <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}>
                <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} sx={{marginTop: '30px'}}>
                    <FormControl fullWidth error={!!errors.eventName}>
                        <Typography component="label" sx={{ fontWeight: "500", fontSize: "14px", mb: "10px", display: "block" }} className="text-black">
                            Event Name *
                        </Typography>
                        <Controller
                            name="eventName"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Enter Event Name "
                                    type='text'
                                    variant="filled"
                                    error={!!errors.eventName}
                                    sx={commonTextFieldStyles}
                                />
                            )}
                        />
                        {errors.eventName && <FormHelperText error>{errors.eventName.message}</FormHelperText>}
                    </FormControl>
                </Grid>

                <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} sx={{marginTop:'30px'}}>
                    <FormControl fullWidth error={!!errors.eventAmount}>
                        <Typography component="label" sx={{ fontWeight: "500", fontSize: "14px", mb: "10px", display: "block" }} className="text-black">
                            Event Amount *
                        </Typography>
                        <Controller
                            name="eventAmount"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Enter Event Amount"
                                    type='number'
                                    variant="filled"
                                    error={!!errors.eventAmount}
                                    sx={commonTextFieldStyles}
                                    inputProps={{
                                        min: 1,
                                        step: 1
                                    }}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (value === '' || (parseFloat(value) >= 1)) {
                                            field.onChange(value);
                                        }
                                    }}
                                />
                            )}
                        />
                        {errors.eventAmount && <FormHelperText error>{errors.eventAmount.message}</FormHelperText>}
                    </FormControl>
                </Grid>

                <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
                    <FormControl fullWidth error={!!errors.eventDescription}>
                        <Typography component="label" sx={{ fontWeight: "500", fontSize: "14px", mb: "10px", display: "block" }} className="text-black">
                            Event Description *
                        </Typography>
                        <Controller
                            name="eventDescription"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Enter Event Description"
                                    variant="filled"
                                    multiline
                                    minRows={1}
                                    maxRows={4}
                                    error={!!errors.eventDescription}
                                    sx={commonTextFieldStyles}
                                />
                            )}
                        />
                        {errors.eventDescription && <FormHelperText error>{errors.eventDescription.message}</FormHelperText>}
                    </FormControl>
                </Grid>



                {/* Submit Buttons */}
                <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 3 }}>
                        <Button
                            variant="outlined"
                            onClick={onCancel}
                            disabled={loading || isSubmitting}
                            sx={{
                                borderColor: "#D5D9E2",
                                color: "#6B7280",
                                "&:hover": {
                                    borderColor: "#9CA3AF",
                                    backgroundColor: "#F9FAFB",
                                },
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={loading || isSubmitting}
                            sx={{
                                backgroundColor: "#3B82F6",
                                "&:hover": {
                                    backgroundColor: "#2563EB",
                                },
                                "&:disabled": {
                                    backgroundColor: "#9CA3AF",
                                },
                            }}
                        >
                            {loading || isSubmitting ? 'Saving...' : (isEdit ? 'Update Member' : 'Create Event')}
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </form>
    );
};

export default EventForm;
