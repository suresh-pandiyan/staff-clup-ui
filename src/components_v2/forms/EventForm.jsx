import React, { useEffect } from 'react';
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
} from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useFinancialYears } from '../../hooks';
import { useApp } from '../../contexts/AppContext';

// Validation schema
const eventSchema = yup.object({
    // Employee Information
    eventName: yup
        .string()
        .required('Event Name is required')
        .max(50, 'Event Name cannot be more than 50 characters'),
    eventDescription: yup
        .string()
        .required('Event Description is required')
        .max(100, 'Event Description cannot be more than 100 characters'),
    eventLocation: yup
        .string()
        .required('Event Location is required')
        .max(20, 'Event Location cannot be more than 20 characters'),
    eventAmount: yup
        .mixed()
        .test('is-number', 'Event Amount must be a number', (value) => {
            if (value === '' || value === null || value === undefined) return false;
            const num = Number(value);
            return !isNaN(num) && num > 0;
        })
        .required('Event Amount is required'),
    eventClosed: yup
        .string()
        .required('Event Closed date is required'),
    eventTime: yup
        .mixed()
        .test('is-valid-time', 'Event Time is required', (value) => {
            if (value === null || value === undefined || value === '') return false;
            if (value && typeof value.isValid === 'function') {
                return value.isValid();
            }
            return true;
        })
        .required('Event Time is required'),
    financeYearId: yup
        .string()
        .required('Financial Year is required')
});

const EventForm = ({ onSubmit, onCancel, loading = false, defaultValues = {}, isEdit = false }) => {
    const { data: financialYears = [], isLoading: financialYearsLoading } = useFinancialYears();
    // const { selectedFinancialYear } = useApp();
    // Find the currently active financial year
    const activeFinancialYear = financialYears?.data?.find(year => year.currentlyActive);
    const defaultfinanceYearId = activeFinancialYear ? (activeFinancialYear.id || activeFinancialYear._id) : '';

    const {
        control,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(eventSchema),
        defaultValues: {
            eventName: '',
            hostEmployeeId:'',
            eventDescription: '',
            eventLocation: '',
            eventAmount: '',
            eventClosed: '',
            eventTime: null,
            financeYearId: defaultfinanceYearId,
            ...(defaultValues || {}),
        },
    });

    // Update financial year when data is loaded and no default value is set
    useEffect(() => {
        if (financialYears?.data) {
            if (!isEdit) {
                // For create mode, set active financial year
                const activeYear = financialYears.data.find(year => year.currentlyActive);
                if (activeYear) {
                    setValue('financeYearId', activeYear.id || activeYear._id);
                }
            } else {
                // For edit mode, ensure the financial year is set if it exists in defaultValues
                if (defaultValues && defaultValues.financeYearId) {
                    console.log('Setting financeYearId in edit mode:', defaultValues.financeYearId);
                    setValue('financeYearId', defaultValues.financeYearId);
                } else {
                    console.log('No financeYearId in defaultValues, using active year');
                    const activeYear = financialYears.data.find(year => year.currentlyActive);
                    if (activeYear) {
                        setValue('financeYearId', activeYear.id || activeYear._id);
                    }
                }
            }
        }
    }, [financialYears?.data, setValue, defaultValues?.financeYearId, isEdit]);

    // Handle existing event time data when editing
    useEffect(() => {
        if (isEdit && defaultValues && defaultValues.eventTime) {
            try {
                // Convert string time to dayjs object for the time picker
                const timeValue = dayjs(defaultValues.eventTime, 'HH:mm');
                if (timeValue.isValid()) {
                    setValue('eventTime', timeValue);
                } else {
                    setValue('eventTime', null);
                }
            } catch (error) {
                console.error('Error parsing time:', error);
                setValue('eventTime', null);
            }
        }
    }, [isEdit, defaultValues?.eventTime, setValue]);

    // Reset form when defaultValues change (for edit mode)
    useEffect(() => {
        if (isEdit && defaultValues && defaultValues !== null && Object.keys(defaultValues).length > 0) {
            // Format the date for the date input field
            const formatDateForInput = (dateString) => {
                if (!dateString) return '';
                const date = new Date(dateString);
                return date.toISOString().split('T')[0];
            };

            // Get the best available financial year ID
            const getFinanceYearId = () => {
                const extractId = (value) => {
                    if (typeof value === 'string') {
                        return value;
                    } else if (value && typeof value === 'object') {
                        return value.id || value._id;
                    }
                    return null;
                };

                if (defaultValues && defaultValues.financeYearId) return extractId(defaultValues.financeYearId);
                if (defaultValues && defaultValues.financialYearId) return extractId(defaultValues.financialYearId);
                if (defaultValues && defaultValues.financeYear) return extractId(defaultValues.financeYear);
                if (defaultValues && defaultValues.financialYear) return extractId(defaultValues.financialYear);
                return defaultfinanceYearId;
            };

            const formData = {
                eventName: defaultValues?.eventName || '',
                eventDescription: defaultValues?.eventDescription || '',
                eventLocation: defaultValues?.eventLocation || '',
                eventAmount: defaultValues?.eventAmount || '',
                eventClosed: formatDateForInput(defaultValues?.eventClosed),
                eventTime: defaultValues?.eventTime ? (() => {
                    try {
                        const timeValue = dayjs(defaultValues.eventTime, 'HH:mm');
                        return timeValue.isValid() ? timeValue : null;
                    } catch (error) {
                        return null;
                    }
                })() : null,
                financeYearId: getFinanceYearId(),
            };
            console.log('Resetting form with data:', formData);
            reset(formData);
        }
    }, [isEdit, defaultValues, reset, defaultfinanceYearId]);

    // Additional useEffect to ensure financial year is set in edit mode
    useEffect(() => {
        if (isEdit && defaultValues && defaultValues !== null && financialYears?.data) {
            console.log('Edit mode - checking financial year:', {
                defaultValues: defaultValues,
                financeYearId: defaultValues?.financeYearId,
                financialYears: financialYears.data
            });

            // Try to find the financial year from various possible sources
            let targetFinanceYearId = null;

            const getFinanceYearId = (value) => {
                if (typeof value === 'string') {
                    return value;
                } else if (value && typeof value === 'object') {
                    return value.id || value._id;
                }
                return null;
            };

            if (defaultValues && defaultValues.financeYearId) {
                targetFinanceYearId = getFinanceYearId(defaultValues.financeYearId);
            } else if (defaultValues && defaultValues.financialYearId) {
                targetFinanceYearId = getFinanceYearId(defaultValues.financialYearId);
            } else if (defaultValues && defaultValues.financeYear) {
                targetFinanceYearId = getFinanceYearId(defaultValues.financeYear);
            } else if (defaultValues && defaultValues.financialYear) {
                targetFinanceYearId = getFinanceYearId(defaultValues.financialYear);
            }

            if (targetFinanceYearId) {
                console.log('Setting financial year to:', targetFinanceYearId);
                setValue('financeYearId', targetFinanceYearId);
            } else {
                console.log('No financial year found, using active year');
                const activeYear = financialYears.data.find(year => year.currentlyActive);
                if (activeYear) {
                    setValue('financeYearId', activeYear.id || activeYear._id);
                }
            }
        }
    }, [isEdit, defaultValues, financialYears?.data, setValue]);

    const onSubmitForm = (data) => {
        // Convert dayjs time object to string format for backend
        const formData = {
            ...data,
            eventTime: data.eventTime && data.eventTime.isValid ? data.eventTime.format('HH:mm') : null
        };
        console.log('Form submitted with data:', formData);
        onSubmit(formData);
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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <form component="form" onSubmit={handleSubmit(onSubmitForm)}>
                <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}>
                    <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} sx={{ marginTop: '30px' }}>
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
                                        label="Enter Event Name"
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

                    <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} sx={{ marginTop: '30px' }}>
                        <FormControl fullWidth error={!!errors.hostEmployeeId}>
                            <Typography component="label" sx={{ fontWeight: "500", fontSize: "14px", mb: "10px", display: "block" }} className="text-black">
                            Host EmployeeId *
                            </Typography>
                            <Controller
                                name="hostEmployeeId"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Enter Host EmployeeId "
                                        type='text'
                                        variant="filled"
                                        error={!!errors.hostEmployeeId}
                                        sx={commonTextFieldStyles}
                                    />
                                )}
                            />
                            {errors.hostEmployeeId && <FormHelperText error>{errors.hostEmployeeId.message}</FormHelperText>}
                        </FormControl>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} sx={{ marginTop: '30px' ,display:'none'}}>
                        <FormControl fullWidth error={!!errors.financeYearId}>
                            <Typography component="label" sx={{ fontWeight: "500", fontSize: "14px", mb: "10px", display: "block" }} className="text-black">
                                Financial Year *
                            </Typography>
                            <Controller
                                name="financeYearId"
                                control={control}
                                render={({ field }) => {
                                    console.log('Financial Year field value:', field.value);
                                    return (
                                        <Select
                                            {...field}
                                            variant="filled"
                                            error={!!errors.financeYearId}
                                            sx={commonSelectStyles}
                                            disabled={financialYearsLoading}
                                            displayEmpty
                                        >
                                            <MenuItem value="" disabled>
                                                {financialYearsLoading ? 'Loading...' : 'Select Financial Year'}
                                            </MenuItem>
                                            {financialYears?.data?.map((year) => (
                                                <MenuItem key={year.id || year._id} value={year.id || year._id}>
                                                    {year.financeYear} {year.currentlyActive ? '(Active)' : ''}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    );
                                }}
                            />
                            {errors.financeYearId && <FormHelperText error>{errors.financeYearId.message}</FormHelperText>}
                        </FormControl>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}  >
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


                    <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
                        <FormControl fullWidth error={!!errors.eventLocation}>
                            <Typography component="label" sx={{ fontWeight: "500", fontSize: "14px", mb: "10px", display: "block" }} className="text-black">
                                Event Location *
                            </Typography>
                            <Controller
                                name="eventLocation"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        type='text'
                                        label="Enter Event Location"
                                        variant="filled"
                                        error={!!errors.eventLocation}
                                        sx={commonTextFieldStyles}
                                    />
                                )}
                            />
                            {errors.eventLocation && <FormHelperText error>{errors.eventLocation.message}</FormHelperText>}
                        </FormControl>
                    </Grid>



                    <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
                        <FormControl fullWidth error={!!errors.eventClosed}>
                            <Typography component="label" sx={{ fontWeight: "500", fontSize: "14px", mb: "10px", display: "block" }} className="text-black">
                                Event Closed *
                            </Typography>
                            <Controller
                                name="eventClosed"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Enter Event Closed Date"
                                        type="date"
                                        variant="filled"
                                        error={!!errors.eventClosed}
                                        sx={commonTextFieldStyles}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                )}
                            />
                            {errors.eventClosed && <FormHelperText error>{errors.eventClosed.message}</FormHelperText>}
                        </FormControl>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
                        <FormControl fullWidth error={!!errors.eventTime}>
                            <Typography component="label" sx={{ fontWeight: "500", fontSize: "14px", mb: "10px", display: "block" }} className="text-black">
                                Event Time *
                            </Typography>
                            <Controller
                                name="eventTime"
                                control={control}
                                render={({ field }) => (
                                    <TimePicker
                                        {...field}
                                        label="Select Event Time"
                                        variant="filled"
                                        error={!!errors.eventTime}
                                        sx={commonTextFieldStyles}
                                        format="HH:mm"
                                        ampm={false}
                                        value={field.value && field.value.isValid ? field.value : null}
                                        onChange={(newValue) => {
                                            field.onChange(newValue);
                                        }}
                                        slotProps={{
                                            textField: {
                                                variant: "filled",
                                                sx: commonTextFieldStyles
                                            }
                                        }}
                                    />
                                )}
                            />
                            {errors.eventTime && <FormHelperText error>{errors.eventTime.message}</FormHelperText>}
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
                                {loading || isSubmitting ? 'Saving...' : (isEdit ? 'Update Event' : 'Create Event')}
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </LocalizationProvider>
    );
};

export default EventForm;
