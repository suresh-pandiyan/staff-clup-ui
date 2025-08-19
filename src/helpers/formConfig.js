import { useForm, useFieldArray, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Common validation schemas
export const validationSchemas = {
    // User registration/login
    login: yup.object({
        email: yup.string().email('Invalid email format').required('Email is required'),
        password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    }),

    register: yup.object({
        firstName: yup.string().min(2, 'First name must be at least 2 characters').required('First name is required'),
        lastName: yup.string().min(2, 'Last name must be at least 2 characters').required('Last name is required'),
        email: yup.string().email('Invalid email format').required('Email is required'),
        password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
        confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm password is required'),
        phone: yup.string().matches(/^[0-9+\-\s()]+$/, 'Invalid phone number format'),
    }),

    // User profile
    profile: yup.object({
        firstName: yup.string().min(2, 'First name must be at least 2 characters').required('First name is required'),
        lastName: yup.string().min(2, 'Last name must be at least 2 characters').required('Last name is required'),
        email: yup.string().email('Invalid email format').required('Email is required'),
        phone: yup.string().matches(/^[0-9+\-\s()]+$/, 'Invalid phone number format'),
        address: yup.string().min(10, 'Address must be at least 10 characters'),
        dateOfBirth: yup.date().max(new Date(), 'Date of birth cannot be in the future'),
        bio: yup.string().max(500, 'Bio must be less than 500 characters'),
    }),

    // Password change
    changePassword: yup.object({
        currentPassword: yup.string().required('Current password is required'),
        newPassword: yup.string().min(8, 'Password must be at least 8 characters').required('New password is required'),
        confirmPassword: yup.string().oneOf([yup.ref('newPassword'), null], 'Passwords must match').required('Confirm password is required'),
    }),

    // Event form
    event: yup.object({
        title: yup.string().min(3, 'Title must be at least 3 characters').required('Title is required'),
        description: yup.string().min(10, 'Description must be at least 10 characters').required('Description is required'),
        date: yup.date().min(new Date(), 'Event date cannot be in the past').required('Event date is required'),
        time: yup.string().required('Event time is required'),
        location: yup.string().min(5, 'Location must be at least 5 characters').required('Location is required'),
        maxAttendees: yup.number().positive('Max attendees must be positive').integer('Max attendees must be a whole number'),
        category: yup.string().required('Category is required'),
    }),

    // Account form
    account: yup.object({
        accountNumber: yup.string().matches(/^[0-9]+$/, 'Account number must contain only numbers').required('Account number is required'),
        accountType: yup.string().required('Account type is required'),
        balance: yup.number().positive('Balance must be positive').required('Balance is required'),
        currency: yup.string().required('Currency is required'),
    }),

    // Share form
    share: yup.object({
        shareType: yup.string().required('Share type is required'),
        quantity: yup.number().positive('Quantity must be positive').integer('Quantity must be a whole number').required('Quantity is required'),
        price: yup.number().positive('Price must be positive').required('Price is required'),
        description: yup.string().min(10, 'Description must be at least 10 characters'),
    }),

    // Chit fund form
    chitFund: yup.object({
        name: yup.string().min(3, 'Name must be at least 3 characters').required('Name is required'),
        amount: yup.number().positive('Amount must be positive').required('Amount is required'),
        members: yup.number().positive('Members must be positive').integer('Members must be a whole number').required('Members is required'),
        duration: yup.number().positive('Duration must be positive').integer('Duration must be a whole number').required('Duration is required'),
        startDate: yup.date().min(new Date(), 'Start date cannot be in the past').required('Start date is required'),
    }),

    // Loan form
    loan: yup.object({
        amount: yup.number().positive('Amount must be positive').required('Amount is required'),
        purpose: yup.string().min(10, 'Purpose must be at least 10 characters').required('Purpose is required'),
        duration: yup.number().positive('Duration must be positive').integer('Duration must be a whole number').required('Duration is required'),
        interestRate: yup.number().positive('Interest rate must be positive').max(100, 'Interest rate cannot exceed 100%').required('Interest rate is required'),
        collateral: yup.string().min(5, 'Collateral must be at least 5 characters'),
    }),

    // Emergency fund form
    emergencyFund: yup.object({
        name: yup.string().min(3, 'Name must be at least 3 characters').required('Name is required'),
        targetAmount: yup.number().positive('Target amount must be positive').required('Target amount is required'),
        currentAmount: yup.number().min(0, 'Current amount cannot be negative').required('Current amount is required'),
        monthlyContribution: yup.number().positive('Monthly contribution must be positive').required('Monthly contribution is required'),
    }),
};

// Form configuration options
export const formConfig = {
    mode: 'onChange', // Validate on change
    reValidateMode: 'onChange', // Re-validate on change
    criteriaMode: 'all', // Show all validation errors
    shouldFocusError: true, // Focus on first error field
    shouldUnregister: false, // Keep field registered when unmounted
};

// Custom hook for form with validation
export const useFormWithValidation = (schema, options = {}) => {
    return useForm({
        resolver: yupResolver(schema),
        ...formConfig,
        ...options,
    });
};

// Form error helper
export const getFieldError = (errors, fieldName) => {
    const error = errors[fieldName];
    return error ? error.message : '';
};

// Form success/error message helper
export const getFormMessage = (isSuccess, isError, successMessage, errorMessage) => {
    if (isSuccess) return { type: 'success', message: successMessage };
    if (isError) return { type: 'error', message: errorMessage };
    return null;
};

// Form submission helper
export const handleFormSubmit = async (form, submitFn, onSuccess, onError) => {
    try {
        const data = await form.handleSubmit(submitFn)();
        if (onSuccess) onSuccess(data);
        return { success: true, data };
    } catch (error) {
        if (onError) onError(error);
        return { success: false, error };
    }
};

// Form reset helper
export const resetForm = (form, defaultValues = {}) => {
    form.reset(defaultValues);
    form.clearErrors();
};

// Form field array helper
export const useFormFieldArray = (form, fieldName) => {
    return useFieldArray({
        control: form.control,
        name: fieldName,
    });
};

// Form watch helper
export const useFormWatch = (form, fieldName) => {
    return useWatch({
        control: form.control,
        name: fieldName,
    });
};

// Common form field props
export const getFieldProps = (form, fieldName, label, placeholder = '', type = 'text') => ({
    ...form.register(fieldName),
    label,
    placeholder,
    type,
    error: !!form.formState.errors[fieldName],
    helperText: getFieldError(form.formState.errors, fieldName),
    fullWidth: true,
    margin: 'normal',
});

// File upload field props
export const getFileFieldProps = (form, fieldName, label, accept = '*') => ({
    ...form.register(fieldName),
    label,
    accept,
    error: !!form.formState.errors[fieldName],
    helperText: getFieldError(form.formState.errors, fieldName),
    fullWidth: true,
    margin: 'normal',
});

// Select field props
export const getSelectFieldProps = (form, fieldName, label, options = []) => ({
    ...form.register(fieldName),
    label,
    options,
    error: !!form.formState.errors[fieldName],
    helperText: getFieldError(form.formState.errors, fieldName),
    fullWidth: true,
    margin: 'normal',
});

// Date field props
export const getDateFieldProps = (form, fieldName, label) => ({
    ...form.register(fieldName),
    label,
    type: 'date',
    error: !!form.formState.errors[fieldName],
    helperText: getFieldError(form.formState.errors, fieldName),
    fullWidth: true,
    margin: 'normal',
    InputLabelProps: {
        shrink: true,
    },
});

// Time field props
export const getTimeFieldProps = (form, fieldName, label) => ({
    ...form.register(fieldName),
    label,
    type: 'time',
    error: !!form.formState.errors[fieldName],
    helperText: getFieldError(form.formState.errors, fieldName),
    fullWidth: true,
    margin: 'normal',
    InputLabelProps: {
        shrink: true,
    },
});

// Number field props
export const getNumberFieldProps = (form, fieldName, label, min = 0, step = 1) => ({
    ...form.register(fieldName),
    label,
    type: 'number',
    inputProps: { min, step },
    error: !!form.formState.errors[fieldName],
    helperText: getFieldError(form.formState.errors, fieldName),
    fullWidth: true,
    margin: 'normal',
});

// Textarea field props
export const getTextareaFieldProps = (form, fieldName, label, rows = 4) => ({
    ...form.register(fieldName),
    label,
    multiline: true,
    rows,
    error: !!form.formState.errors[fieldName],
    helperText: getFieldError(form.formState.errors, fieldName),
    fullWidth: true,
    margin: 'normal',
});

export default {
    validationSchemas,
    formConfig,
    useFormWithValidation,
    getFieldError,
    getFormMessage,
    handleFormSubmit,
    resetForm,
    useFormFieldArray,
    useFormWatch,
    getFieldProps,
    getFileFieldProps,
    getSelectFieldProps,
    getDateFieldProps,
    getTimeFieldProps,
    getNumberFieldProps,
    getTextareaFieldProps,
}; 