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
    Checkbox,
    FormControlLabel,
} from '@mui/material';

// Validation schema
const memberSchema = yup.object({
    // Employee Information
    isEdit: yup.boolean(),
    employeeId: yup
        .string()
        .required('Employee ID is required')
        .max(20, 'Employee ID cannot be more than 20 characters'),
    firstName: yup
        .string()
        .required('First name is required')
        .max(50, 'First name cannot be more than 50 characters'),
    lastName: yup
        .string()
        .required('Last name is required')
        .max(50, 'Last name cannot be more than 50 characters'),
    email: yup
        .string()
        .required('Email is required')
        .email('Please add a valid email'),
    phone: yup
        .string()
        .required('Phone number is required')
        .matches(/^[\+]?[1-9][\d]{0,15}$/, 'Please add a valid phone number'),
    joinDate: yup
        .string()
        .required('Join date is required'),
    role: yup
        .string()
        .oneOf(['user', 'admin', 'moderator', 'manager', 'supervisor'], 'Please select a valid role'),
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
    password: yup
        .string()
        .when('isEdit', {
            is: false,
            then: (schema) => schema.required('Password is required').min(6, 'Password must be at least 6 characters'),
            otherwise: (schema) => schema.optional(),
        }),
    confirmPassword: yup
        .string()
        .when('isEdit', {
            is: false,
            then: (schema) => schema.required('Please confirm your password').oneOf([yup.ref('password')], 'Passwords must match'),
            otherwise: (schema) => schema.optional(),
        }),
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

const MemberForm = ({ onSubmit, onCancel, loading = false, defaultValues = {}, isEdit = false }) => {
    const {
        control,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(memberSchema),
        defaultValues: {
            employeeId: '',
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            role: 'user',
            type: 'full-time',
            joinDate: new Date().toISOString().split('T')[0], // Default to today's date
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
            confirmPassword: 'admin@123',
            isEdit: isEdit,
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
                {/* Basic Information Section */}
                <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
                    <Typography variant="h6" sx={{ mb: 2, color: '#374151', fontWeight: 600 }}>
                        Basic Information
                    </Typography>
                </Grid>

                <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
                    <FormControl fullWidth error={!!errors.employeeId}>
                        <Typography component="label" sx={{ fontWeight: "500", fontSize: "14px", mb: "10px", display: "block" }} className="text-black">
                            Employee ID *
                        </Typography>
                        <Controller
                            name="employeeId"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Enter employee ID"
                                    variant="filled"
                                    error={!!errors.employeeId}
                                    sx={commonTextFieldStyles}
                                />
                            )}
                        />
                        {errors.employeeId && <FormHelperText error>{errors.employeeId.message}</FormHelperText>}
                    </FormControl>
                </Grid>

                <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6 }}>
                    <FormControl fullWidth error={!!errors.firstName}>
                        <Typography component="label" sx={{ fontWeight: "500", fontSize: "14px", mb: "10px", display: "block" }} className="text-black">
                            First Name *
                        </Typography>
                        <Controller
                            name="firstName"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Enter first name"
                                    variant="filled"
                                    error={!!errors.firstName}
                                    sx={commonTextFieldStyles}
                                />
                            )}
                        />
                        {errors.firstName && <FormHelperText error>{errors.firstName.message}</FormHelperText>}
                    </FormControl>
                </Grid>

                <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6 }}>
                    <FormControl fullWidth error={!!errors.lastName}>
                        <Typography component="label" sx={{ fontWeight: "500", fontSize: "14px", mb: "10px", display: "block" }} className="text-black">
                            Last Name *
                        </Typography>
                        <Controller
                            name="lastName"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Enter last name"
                                    variant="filled"
                                    error={!!errors.lastName}
                                    sx={commonTextFieldStyles}
                                />
                            )}
                        />
                        {errors.lastName && <FormHelperText error>{errors.lastName.message}</FormHelperText>}
                    </FormControl>
                </Grid>

                <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6 }}>
                    <FormControl fullWidth error={!!errors.email}>
                        <Typography component="label" sx={{ fontWeight: "500", fontSize: "14px", mb: "10px", display: "block" }} className="text-black">
                            Email Address *
                        </Typography>
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Enter email address"
                                    variant="filled"
                                    type="email"
                                    error={!!errors.email}
                                    sx={commonTextFieldStyles}
                                />
                            )}
                        />
                        {errors.email && <FormHelperText error>{errors.email.message}</FormHelperText>}
                    </FormControl>
                </Grid>

                <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6 }}>
                    <FormControl fullWidth error={!!errors.phone}>
                        <Typography component="label" sx={{ fontWeight: "500", fontSize: "14px", mb: "10px", display: "block" }} className="text-black">
                            Phone Number *
                        </Typography>
                        <Controller
                            name="phone"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Enter phone number"
                                    variant="filled"
                                    error={!!errors.phone}
                                    sx={commonTextFieldStyles}
                                />
                            )}
                        />
                        {errors.phone && <FormHelperText error>{errors.phone.message}</FormHelperText>}
                    </FormControl>
                </Grid>

                <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6 }}>
                    <FormControl fullWidth error={!!errors.joinDate}>
                        <Typography component="label" sx={{ fontWeight: "500", fontSize: "14px", mb: "10px", display: "block" }} className="text-black">
                            Join Date *
                        </Typography>
                        <Controller
                            name="joinDate"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Select join date"
                                    variant="filled"
                                    type="date"
                                    error={!!errors.joinDate}
                                    InputLabelProps={{ shrink: true }}
                                    sx={commonTextFieldStyles}
                                />
                            )}
                        />
                        {errors.joinDate && <FormHelperText error>{errors.joinDate.message}</FormHelperText>}
                    </FormControl>
                </Grid>

                <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6 }}>
                    <FormControl fullWidth error={!!errors.role}>
                        <Typography component="label" sx={{ fontWeight: "500", fontSize: "14px", mb: "10px", display: "block" }} className="text-black">
                            Role *
                        </Typography>
                        <Controller
                            name="role"
                            control={control}
                            render={({ field }) => (
                                <Select {...field} variant="filled" error={!!errors.role} sx={commonSelectStyles}>
                                    <MenuItem value="user">User</MenuItem>
                                    <MenuItem value="admin">Admin</MenuItem>
                                    <MenuItem value="moderator">Moderator</MenuItem>
                                    <MenuItem value="manager">Manager</MenuItem>
                                    <MenuItem value="supervisor">Supervisor</MenuItem>
                                </Select>
                            )}
                        />
                        {errors.role && <FormHelperText error>{errors.role.message}</FormHelperText>}
                    </FormControl>
                </Grid>

                <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6 }}>
                    <FormControl fullWidth error={!!errors.type}>
                        <Typography component="label" sx={{ fontWeight: "500", fontSize: "14px", mb: "10px", display: "block" }} className="text-black">
                            Employment Type *
                        </Typography>
                        <Controller
                            name="type"
                            control={control}
                            render={({ field }) => (
                                <Select {...field} variant="filled" error={!!errors.type} sx={commonSelectStyles}>
                                    <MenuItem value="full-time">Full Time</MenuItem>
                                    <MenuItem value="part-time">Part Time</MenuItem>
                                    <MenuItem value="contract">Contract</MenuItem>
                                    <MenuItem value="intern">Intern</MenuItem>
                                </Select>
                            )}
                        />
                        {errors.type && <FormHelperText error>{errors.type.message}</FormHelperText>}
                    </FormControl>
                </Grid>

                <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6 }}>
                    <FormControl fullWidth error={!!errors.department}>
                        <Typography component="label" sx={{ fontWeight: "500", fontSize: "14px", mb: "10px", display: "block" }} className="text-black">
                            Department
                        </Typography>
                        <Controller
                            name="department"
                            control={control}
                            render={({ field }) => (
                                <Select {...field} variant="filled" error={!!errors.department} sx={commonSelectStyles}>
                                    <MenuItem value="">Select Department</MenuItem>
                                    <MenuItem value="Computer Science & Engineering(CSE)">Computer Science & Engineering (CSE)</MenuItem>
                                    <MenuItem value="Information Technology(IT)">Information Technology (IT)</MenuItem>
                                    <MenuItem value="Electronics & Communication Engineering(ECE)">Electronics & Communication Engineering (ECE)</MenuItem>
                                    <MenuItem value="Electrical & Electronics Engineering(EEE)">Electrical & Electronics Engineering (EEE)</MenuItem>
                                    <MenuItem value="Mechanical Engineering(MECH)">Mechanical Engineering (MECH)</MenuItem>
                                    <MenuItem value="Civil Engineering">Civil Engineering</MenuItem>
                                    <MenuItem value="Artificial Intelligence & Data Science(AI & DS)">Artificial Intelligence & Data Science (AI & DS)</MenuItem>
                                    <MenuItem value="Master of Business Administration(MBA)">Master of Business Administration (MBA)</MenuItem>
                                    <MenuItem value="Cyber Security">Cyber Security</MenuItem>
                                    <MenuItem value="Master of Computer Applications(MCA)">Master of Computer Applications (MCA)</MenuItem>
                                </Select>
                            )}
                        />
                        {errors.department && <FormHelperText error>{errors.department.message}</FormHelperText>}
                    </FormControl>
                </Grid>

                <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6 }}>
                    <FormControl fullWidth error={!!errors.designation}>
                        <Typography component="label" sx={{ fontWeight: "500", fontSize: "14px", mb: "10px", display: "block" }} className="text-black">
                            Designation *
                        </Typography>
                        <Controller
                            name="designation"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Enter designation"
                                    variant="filled"
                                    error={!!errors.designation}
                                    sx={commonTextFieldStyles}
                                />
                            )}
                        />
                        {errors.designation && <FormHelperText error>{errors.designation.message}</FormHelperText>}
                    </FormControl>
                </Grid>

                <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6 }}>
                    <FormControl fullWidth error={!!errors.status}>
                        <Typography component="label" sx={{ fontWeight: "500", fontSize: "14px", mb: "10px", display: "block" }} className="text-black">
                            Status *
                        </Typography>
                        <Controller
                            name="status"
                            control={control}
                            render={({ field }) => (
                                <Select {...field} variant="filled" error={!!errors.status} sx={commonSelectStyles}>
                                    <MenuItem value="active">Active</MenuItem>
                                    <MenuItem value="inactive">Inactive</MenuItem>
                                    <MenuItem value="terminated">Terminated</MenuItem>
                                    <MenuItem value="resigned">Resigned</MenuItem>
                                    <MenuItem value="on-leave">On Leave</MenuItem>
                                </Select>
                            )}
                        />
                        {errors.status && <FormHelperText error>{errors.status.message}</FormHelperText>}
                    </FormControl>
                </Grid>

                <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6 }}>
                    <FormControl fullWidth error={!!errors.currentSalary}>
                        <Typography component="label" sx={{ fontWeight: "500", fontSize: "14px", mb: "10px", display: "block" }} className="text-black">
                            Current Salary *
                        </Typography>
                        <Controller
                            name="currentSalary"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Enter current salary"
                                    variant="filled"
                                    type="number"
                                    error={!!errors.currentSalary}
                                    sx={commonTextFieldStyles}
                                />
                            )}
                        />
                        {errors.currentSalary && <FormHelperText error>{errors.currentSalary.message}</FormHelperText>}
                    </FormControl>
                </Grid>

                <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6 }}>
                    <FormControl fullWidth>
                        <Typography component="label" sx={{ fontWeight: "500", fontSize: "14px", mb: "10px", display: "block" }} className="text-black">
                            Has Loan
                        </Typography>
                        <Controller
                            name="hasLoan"
                            control={control}
                            render={({ field }) => (
                                <FormControlLabel
                                    control={<Checkbox {...field} checked={field.value} />}
                                    label="Employee has an active loan"
                                />
                            )}
                        />
                    </FormControl>
                </Grid>

                <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6 }}>
                    <FormControl fullWidth>
                        <Typography component="label" sx={{ fontWeight: "500", fontSize: "14px", mb: "10px", display: "block" }} className="text-black">
                            Has Chit Fund
                        </Typography>
                        <Controller
                            name="hasChitfund"
                            control={control}
                            render={({ field }) => (
                                <FormControlLabel
                                    control={<Checkbox {...field} checked={field.value} />}
                                    label="Employee participates in chit fund"
                                />
                            )}
                        />
                    </FormControl>
                </Grid>

                {/* Address Section */}
                <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
                    <Divider sx={{ my: 3 }} />
                    <Typography variant="h6" sx={{ mb: 2, color: '#374151', fontWeight: 600 }}>
                        Address Information
                    </Typography>
                </Grid>

                <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6 }}>
                    <FormControl fullWidth error={!!errors.address?.street}>
                        <Typography component="label" sx={{ fontWeight: "500", fontSize: "14px", mb: "10px", display: "block" }} className="text-black">
                            Street Address *
                        </Typography>
                        <Controller
                            name="address.street"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Enter street address"
                                    variant="filled"
                                    error={!!errors.address?.street}
                                    sx={commonTextFieldStyles}
                                />
                            )}
                        />
                        {errors.address?.street && <FormHelperText error>{errors.address.street.message}</FormHelperText>}
                    </FormControl>
                </Grid>

                <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6 }}>
                    <FormControl fullWidth error={!!errors.address?.city}>
                        <Typography component="label" sx={{ fontWeight: "500", fontSize: "14px", mb: "10px", display: "block" }} className="text-black">
                            City *
                        </Typography>
                        <Controller
                            name="address.city"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Enter city"
                                    variant="filled"
                                    error={!!errors.address?.city}
                                    sx={commonTextFieldStyles}
                                />
                            )}
                        />
                        {errors.address?.city && <FormHelperText error>{errors.address.city.message}</FormHelperText>}
                    </FormControl>
                </Grid>

                <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6 }}>
                    <FormControl fullWidth error={!!errors.address?.state}>
                        <Typography component="label" sx={{ fontWeight: "500", fontSize: "14px", mb: "10px", display: "block" }} className="text-black">
                            State *
                        </Typography>
                        <Controller
                            name="address.state"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Enter state"
                                    variant="filled"
                                    error={!!errors.address?.state}
                                    sx={commonTextFieldStyles}
                                />
                            )}
                        />
                        {errors.address?.state && <FormHelperText error>{errors.address.state.message}</FormHelperText>}
                    </FormControl>
                </Grid>

                <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6 }}>
                    <FormControl fullWidth error={!!errors.address?.zipCode}>
                        <Typography component="label" sx={{ fontWeight: "500", fontSize: "14px", mb: "10px", display: "block" }} className="text-black">
                            Zip Code *
                        </Typography>
                        <Controller
                            name="address.zipCode"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Enter zip code"
                                    variant="filled"
                                    error={!!errors.address?.zipCode}
                                    sx={commonTextFieldStyles}
                                />
                            )}
                        />
                        {errors.address?.zipCode && <FormHelperText error>{errors.address.zipCode.message}</FormHelperText>}
                    </FormControl>
                </Grid>

                <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6 }}>
                    <FormControl fullWidth error={!!errors.address?.country}>
                        <Typography component="label" sx={{ fontWeight: "500", fontSize: "14px", mb: "10px", display: "block" }} className="text-black">
                            Country *
                        </Typography>
                        <Controller
                            name="address.country"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Enter country"
                                    variant="filled"
                                    error={!!errors.address?.country}
                                    sx={commonTextFieldStyles}
                                />
                            )}
                        />
                        {errors.address?.country && <FormHelperText error>{errors.address.country.message}</FormHelperText>}
                    </FormControl>
                </Grid>

                {/* Emergency Contact Section */}
                <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
                    <Divider sx={{ my: 3 }} />
                    <Typography variant="h6" sx={{ mb: 2, color: '#374151', fontWeight: 600 }}>
                        Emergency Contact
                    </Typography>
                </Grid>

                <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6 }}>
                    <FormControl fullWidth error={!!errors.emergencyContact?.name}>
                        <Typography component="label" sx={{ fontWeight: "500", fontSize: "14px", mb: "10px", display: "block" }} className="text-black">
                            Emergency Contact Name *
                        </Typography>
                        <Controller
                            name="emergencyContact.name"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Enter emergency contact name"
                                    variant="filled"
                                    error={!!errors.emergencyContact?.name}
                                    sx={commonTextFieldStyles}
                                />
                            )}
                        />
                        {errors.emergencyContact?.name && <FormHelperText error>{errors.emergencyContact.name.message}</FormHelperText>}
                    </FormControl>
                </Grid>

                <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6 }}>
                    <FormControl fullWidth error={!!errors.emergencyContact?.relationship}>
                        <Typography component="label" sx={{ fontWeight: "500", fontSize: "14px", mb: "10px", display: "block" }} className="text-black">
                            Relationship *
                        </Typography>
                        <Controller
                            name="emergencyContact.relationship"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Enter relationship"
                                    variant="filled"
                                    error={!!errors.emergencyContact?.relationship}
                                    sx={commonTextFieldStyles}
                                />
                            )}
                        />
                        {errors.emergencyContact?.relationship && <FormHelperText error>{errors.emergencyContact.relationship.message}</FormHelperText>}
                    </FormControl>
                </Grid>

                <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6 }}>
                    <FormControl fullWidth error={!!errors.emergencyContact?.phone}>
                        <Typography component="label" sx={{ fontWeight: "500", fontSize: "14px", mb: "10px", display: "block" }} className="text-black">
                            Emergency Contact Phone *
                        </Typography>
                        <Controller
                            name="emergencyContact.phone"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Enter emergency contact phone"
                                    variant="filled"
                                    error={!!errors.emergencyContact?.phone}
                                    sx={commonTextFieldStyles}
                                />
                            )}
                        />
                        {errors.emergencyContact?.phone && <FormHelperText error>{errors.emergencyContact.phone.message}</FormHelperText>}
                    </FormControl>
                </Grid>

                <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6 }}>
                    <FormControl fullWidth error={!!errors.emergencyContact?.address}>
                        <Typography component="label" sx={{ fontWeight: "500", fontSize: "14px", mb: "10px", display: "block" }} className="text-black">
                            Emergency Contact Address
                        </Typography>
                        <Controller
                            name="emergencyContact.address"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Enter emergency contact address"
                                    variant="filled"
                                    error={!!errors.emergencyContact?.address}
                                    sx={commonTextFieldStyles}
                                />
                            )}
                        />
                        {errors.emergencyContact?.address && <FormHelperText error>{errors.emergencyContact.address.message}</FormHelperText>}
                    </FormControl>
                </Grid>

                {/* Password Section - Only show for new users */}
                {!isEdit && (
                    <>
                        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
                            <Divider sx={{ my: 3 }} />
                            <Typography variant="h6" sx={{ mb: 2, color: '#374151', fontWeight: 600 }}>
                                Authentication
                            </Typography>
                        </Grid>

                        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6 }}>
                            <FormControl fullWidth error={!!errors.password}>
                                <Typography component="label" sx={{ fontWeight: "500", fontSize: "14px", mb: "10px", display: "block" }} className="text-black">
                                    Password *
                                </Typography>
                                <Controller
                                    name="password"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Enter password"
                                            variant="filled"
                                            type="password"
                                            error={!!errors.password}
                                            sx={commonTextFieldStyles}
                                        />
                                    )}
                                />
                                {errors.password && <FormHelperText error>{errors.password.message}</FormHelperText>}
                            </FormControl>
                        </Grid>

                        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6 }}>
                            <FormControl fullWidth error={!!errors.confirmPassword}>
                                <Typography component="label" sx={{ fontWeight: "500", fontSize: "14px", mb: "10px", display: "block" }} className="text-black">
                                    Confirm Password *
                                </Typography>
                                <Controller
                                    name="confirmPassword"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Confirm password"
                                            variant="filled"
                                            type="password"
                                            error={!!errors.confirmPassword}
                                            sx={commonTextFieldStyles}
                                        />
                                    )}
                                />
                                {errors.confirmPassword && <FormHelperText error>{errors.confirmPassword.message}</FormHelperText>}
                            </FormControl>
                        </Grid>
                    </>
                )}

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
                            {loading || isSubmitting ? 'Saving...' : (isEdit ? 'Update Member' : 'Create Member')}
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </form>
    );
};

export default MemberForm;
