# React Hook Form Integration

This document provides a comprehensive guide to the React Hook Form integration in the staff-club-ui project.

## Table of Contents

1. [Overview](#overview)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Form Configuration](#form-configuration)
5. [Validation Schemas](#validation-schemas)
6. [Form Hooks](#form-hooks)
7. [Usage Examples](#usage-examples)
8. [Best Practices](#best-practices)
9. [Available Forms](#available-forms)
10. [Migration Guide](#migration-guide)

## Overview

React Hook Form has been integrated to provide:

- **Performance**: Minimal re-renders and fast validation
- **Type Safety**: Full TypeScript support with validation schemas
- **Accessibility**: Built-in accessibility features
- **Flexibility**: Easy integration with any UI library
- **Developer Experience**: Excellent debugging and development tools

## Installation

The following packages have been installed:

```bash
npm install react-hook-form @hookform/resolvers yup
```

### Dependencies

- **react-hook-form**: Core form library
- **@hookform/resolvers**: Validation resolvers
- **yup**: Schema validation library

## Configuration

### Form Configuration (`src/helpers/formConfig.js`)

The form configuration provides:

```javascript
// Form configuration options
export const formConfig = {
  mode: "onChange", // Validate on change
  reValidateMode: "onChange", // Re-validate on change
  criteriaMode: "all", // Show all validation errors
  shouldFocusError: true, // Focus on first error field
  shouldUnregister: false, // Keep field registered when unmounted
};
```

### Validation Schemas

Pre-defined validation schemas for common forms:

```javascript
export const validationSchemas = {
  login: yup.object({
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  }),

  register: yup.object({
    firstName: yup
      .string()
      .min(2, "First name must be at least 2 characters")
      .required("First name is required"),
    lastName: yup
      .string()
      .min(2, "Last name must be at least 2 characters")
      .required("Last name is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
    phone: yup
      .string()
      .matches(/^[0-9+\-\s()]+$/, "Invalid phone number format"),
  }),

  // ... more schemas
};
```

## Form Configuration

### Custom Hook for Form with Validation

```javascript
export const useFormWithValidation = (schema, options = {}) => {
  return useForm({
    resolver: yupResolver(schema),
    ...formConfig,
    ...options,
  });
};
```

### Helper Functions

#### Field Props Helpers

```javascript
// Text field
export const getFieldProps = (
  form,
  fieldName,
  label,
  placeholder = "",
  type = "text"
) => ({
  ...form.register(fieldName),
  label,
  placeholder,
  type,
  error: !!form.formState.errors[fieldName],
  helperText: getFieldError(form.formState.errors, fieldName),
  fullWidth: true,
  margin: "normal",
});

// Date field
export const getDateFieldProps = (form, fieldName, label) => ({
  ...form.register(fieldName),
  label,
  type: "date",
  error: !!form.formState.errors[fieldName],
  helperText: getFieldError(form.formState.errors, fieldName),
  fullWidth: true,
  margin: "normal",
  InputLabelProps: { shrink: true },
});

// Number field
export const getNumberFieldProps = (
  form,
  fieldName,
  label,
  min = 0,
  step = 1
) => ({
  ...form.register(fieldName),
  label,
  type: "number",
  inputProps: { min, step },
  error: !!form.formState.errors[fieldName],
  helperText: getFieldError(form.formState.errors, fieldName),
  fullWidth: true,
  margin: "normal",
});

// Textarea field
export const getTextareaFieldProps = (form, fieldName, label, rows = 4) => ({
  ...form.register(fieldName),
  label,
  multiline: true,
  rows,
  error: !!form.formState.errors[fieldName],
  helperText: getFieldError(form.formState.errors, fieldName),
  fullWidth: true,
  margin: "normal",
});
```

#### Form Submission Helper

```javascript
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
```

## Validation Schemas

### Available Schemas

1. **login**: Email and password validation
2. **register**: User registration with password confirmation
3. **profile**: User profile update
4. **changePassword**: Password change with confirmation
5. **event**: Event creation/editing
6. **account**: Account management
7. **share**: Share trading
8. **chitFund**: Chit fund management
9. **loan**: Loan application
10. **emergencyFund**: Emergency fund management

### Custom Schema Example

```javascript
import * as yup from "yup";

const customSchema = yup.object({
  name: yup
    .string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  age: yup
    .number()
    .positive("Age must be positive")
    .integer("Age must be a whole number"),
  website: yup.string().url("Invalid URL format"),
});
```

## Form Hooks

### Authentication Forms

```javascript
// Login Form
export const useLoginForm = () => {
  const form = useFormWithValidation(validationSchemas.login);
  const loginMutation = useAuth().loginMutation;

  const onSubmit = async (data) => {
    return await loginMutation.mutateAsync(data);
  };

  const handleSubmit = async (onSuccess, onError) => {
    return await handleFormSubmit(form, onSubmit, onSuccess, onError);
  };

  return {
    form,
    handleSubmit,
    reset: () => resetForm(form),
    isLoading: loginMutation.isPending,
    isError: loginMutation.isError,
    error: loginMutation.error,
  };
};
```

### Data Forms

```javascript
// Event Form
export const useEventForm = (eventData = {}) => {
  const form = useFormWithValidation(validationSchemas.event, {
    defaultValues: eventData,
  });
  const createEventMutation = useCreateEvent();
  const updateEventMutation = useUpdateEvent();

  const onSubmit = async (data) => {
    if (eventData.id) {
      return await updateEventMutation.mutateAsync({ id: eventData.id, data });
    } else {
      return await createEventMutation.mutateAsync(data);
    }
  };

  const handleSubmit = async (onSuccess, onError) => {
    return await handleFormSubmit(form, onSubmit, onSuccess, onError);
  };

  const isLoading = eventData.id
    ? updateEventMutation.isPending
    : createEventMutation.isPending;
  const isError = eventData.id
    ? updateEventMutation.isError
    : createEventMutation.isError;
  const error = eventData.id
    ? updateEventMutation.error
    : createEventMutation.error;

  return {
    form,
    handleSubmit,
    reset: () => resetForm(form, eventData),
    isLoading,
    isError,
    error,
  };
};
```

## Usage Examples

### Basic Form Component

```javascript
import React from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useLoginForm, getFieldProps } from "../../hooks";
import { getFormMessage } from "../../helpers/formConfig";

const LoginForm = ({ onSuccess, onError }) => {
  const { form, handleSubmit, reset, isLoading, isError, error } =
    useLoginForm();

  const onSubmit = async (onSuccessCallback, onErrorCallback) => {
    const result = await handleSubmit(
      (data) => {
        console.log("Login successful:", data);
        if (onSuccessCallback) onSuccessCallback(data);
        if (onSuccess) onSuccess(data);
      },
      (error) => {
        console.error("Login failed:", error);
        if (onErrorCallback) onErrorCallback(error);
        if (onError) onError(error);
      }
    );
    return result;
  };

  const formMessage = getFormMessage(
    false, // isSuccess
    isError,
    "", // successMessage
    error?.message || "Login failed. Please try again."
  );

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 400, mx: "auto" }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Login
      </Typography>

      {formMessage && (
        <Alert severity={formMessage.type} sx={{ mb: 2 }}>
          {formMessage.message}
        </Alert>
      )}

      <Box
        component="form"
        onSubmit={form.handleSubmit(() => onSubmit())}
        noValidate
      >
        <TextField
          {...getFieldProps(
            form,
            "email",
            "Email",
            "Enter your email",
            "email"
          )}
          autoComplete="email"
          autoFocus
        />

        <TextField
          {...getFieldProps(
            form,
            "password",
            "Password",
            "Enter your password",
            "password"
          )}
          autoComplete="current-password"
        />

        <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isLoading}
            sx={{ mt: 1, mb: 2 }}
          >
            {isLoading ? <CircularProgress size={24} /> : "Login"}
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
```

### Complex Form with Multiple Field Types

```javascript
import React from "react";
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
} from "@mui/material";
import {
  useEventForm,
  getFieldProps,
  getDateFieldProps,
  getTimeFieldProps,
  getNumberFieldProps,
  getTextareaFieldProps,
} from "../../hooks";
import { getFormMessage } from "../../helpers/formConfig";

const EventForm = ({ eventData = {}, onSuccess, onError }) => {
  const { form, handleSubmit, reset, isLoading, isError, error } =
    useEventForm(eventData);

  const onSubmit = async (onSuccessCallback, onErrorCallback) => {
    const result = await handleSubmit(
      (data) => {
        console.log("Event saved successfully:", data);
        if (onSuccessCallback) onSuccessCallback(data);
        if (onSuccess) onSuccess(data);
      },
      (error) => {
        console.error("Event save failed:", error);
        if (onErrorCallback) onErrorCallback(error);
        if (onError) onError(error);
      }
    );
    return result;
  };

  const formMessage = getFormMessage(
    false, // isSuccess
    isError,
    "", // successMessage
    error?.message || "Failed to save event. Please try again."
  );

  const categoryOptions = [
    { value: "meeting", label: "Meeting" },
    { value: "workshop", label: "Workshop" },
    { value: "seminar", label: "Seminar" },
    { value: "conference", label: "Conference" },
    { value: "social", label: "Social Event" },
    { value: "other", label: "Other" },
  ];

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 800, mx: "auto" }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        {eventData.id ? "Edit Event" : "Create New Event"}
      </Typography>

      {formMessage && (
        <Alert severity={formMessage.type} sx={{ mb: 2 }}>
          {formMessage.message}
        </Alert>
      )}

      <Box
        component="form"
        onSubmit={form.handleSubmit(() => onSubmit())}
        noValidate
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              {...getFieldProps(
                form,
                "title",
                "Event Title",
                "Enter event title"
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              {...getTextareaFieldProps(form, "description", "Description", 4)}
              placeholder="Enter event description"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField {...getDateFieldProps(form, "date", "Event Date")} />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField {...getTimeFieldProps(form, "time", "Event Time")} />
          </Grid>

          <Grid item xs={12}>
            <TextField
              {...getFieldProps(
                form,
                "location",
                "Location",
                "Enter event location"
              )}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              {...getNumberFieldProps(form, "maxAttendees", "Max Attendees", 1)}
              placeholder="Enter maximum number of attendees"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField {...getFieldProps(form, "category", "Category")} select>
              {categoryOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
              
                  {option.label}
               
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isLoading}
            sx={{ mt: 1, mb: 2 }}
          >
            {isLoading ? (
              <CircularProgress size={24} />
            ) : eventData.id ? (
              "Update Event"
            ) : (
              "Create Event"
            )}
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
```

## Best Practices

### 1. Form Structure

- Use the provided form hooks for consistency
- Implement proper error handling
- Provide user feedback for loading states
- Include form reset functionality

### 2. Validation

- Use Yup schemas for validation
- Provide clear error messages
- Validate on change for better UX
- Use appropriate field types (email, number, date, etc.)

### 3. Performance

- Use `useFormWithValidation` for consistent configuration
- Implement proper loading states
- Avoid unnecessary re-renders
- Use field arrays for dynamic forms

### 4. Accessibility

- Include proper labels and descriptions
- Use semantic HTML elements
- Provide keyboard navigation support
- Include ARIA attributes where needed

### 5. Error Handling

- Display validation errors clearly
- Handle API errors gracefully
- Provide fallback error messages
- Log errors for debugging

## Available Forms

### Authentication Forms

1. **useLoginForm**: User login
2. **useRegisterForm**: User registration
3. **useChangePasswordForm**: Password change

### Data Forms

1. **useProfileForm**: User profile update
2. **useEventForm**: Event creation/editing
3. **useAccountForm**: Account management
4. **useShareForm**: Share trading
5. **useChitFundForm**: Chit fund management
6. **useLoanForm**: Loan application
7. **useEmergencyFundForm**: Emergency fund management

### Generic Form

1. **useGenericForm**: For custom forms with custom schemas

## Migration Guide

### From Manual Forms

1. **Replace manual form state**:

   ```javascript
   // Before
   const [formData, setFormData] = useState({});
   const [errors, setErrors] = useState({});

   // After
   const { form, handleSubmit, reset, isLoading, isError, error } =
     useLoginForm();
   ```

2. **Replace manual validation**:

   ```javascript
   // Before
   const validateForm = () => {
     const errors = {};
     if (!email) errors.email = "Email is required";
     // ... more validation
     return errors;
   };

   // After
   const form = useFormWithValidation(validationSchemas.login);
   ```

3. **Replace manual submission**:

   ```javascript
   // Before
   const handleSubmit = async (e) => {
     e.preventDefault();
     const errors = validateForm();
     if (Object.keys(errors).length > 0) {
       setErrors(errors);
       return;
     }
     // Submit logic
   };

   // After
   const { handleSubmit } = useLoginForm();
   const onSubmit = async (data) => {
     // Submit logic
   };
   ```

### From Other Form Libraries

1. **Replace Formik**:

   ```javascript
   // Before (Formik)
   <Formik initialValues={initialValues} validationSchema={schema}>
     {({ values, errors, handleSubmit }) => (
       <form onSubmit={handleSubmit}>{/* form fields */}</form>
     )}
   </Formik>;

   // After (React Hook Form)
   const { form, handleSubmit } = useLoginForm();
   <form onSubmit={form.handleSubmit(onSubmit)}>{/* form fields */}</form>;
   ```

2. **Replace Redux Form**:

   ```javascript
   // Before (Redux Form)
   export default reduxForm({
     form: "login",
     validate,
   })(LoginForm);

   // After (React Hook Form)
   const LoginForm = () => {
     const { form, handleSubmit } = useLoginForm();
     // component logic
   };
   ```

## File Structure

```
src/
├── helpers/
│   └── formConfig.js          # Form configuration and helpers
├── hooks/
│   └── useForms.js            # Form hooks
└── components/
    └── Forms/
        ├── LoginForm.js       # Example login form
        └── EventForm.js       # Example event form
```

## Integration with Existing Services

The form hooks integrate seamlessly with the existing service layer:

```javascript
// Form hooks use existing mutations
export const useLoginForm = () => {
  const form = useFormWithValidation(validationSchemas.login);
  const loginMutation = useAuth().loginMutation; // Uses existing auth service

  const onSubmit = async (data) => {
    return await loginMutation.mutateAsync(data);
  };
  // ...
};
```

This ensures:

- Consistent API calls
- Proper error handling
- Cache invalidation
- Loading states
- Optimistic updates

## Next Steps

1. **Create more form components** for different use cases
2. **Add form field arrays** for dynamic forms
3. **Implement file upload forms** with proper validation
4. **Add form wizard components** for multi-step forms
5. **Create form templates** for common patterns
6. **Add form testing** with React Testing Library
7. **Implement form analytics** for user behavior tracking

## Troubleshooting

### Common Issues

1. **Form not submitting**: Check if `onSubmit` is properly wrapped with `form.handleSubmit`
2. **Validation not working**: Ensure schema is properly imported and used
3. **Field errors not showing**: Check if `getFieldError` is used correctly
4. **Loading state not working**: Verify mutation state is properly accessed

### Debug Tips

1. **Enable form debugging**:

   ```javascript
   const form = useFormWithValidation(schema, {
     mode: "onChange",
     reValidateMode: "onChange",
   });
   console.log("Form state:", form.formState);
   ```

2. **Check field registration**:

   ```javascript
   console.log("Registered fields:", form.getValues());
   ```

3. **Validate schema**:
   ```javascript
   console.log("Schema validation:", schema.validateSync(data));
   ```

## Resources

- [React Hook Form Documentation](https://react-hook-form.com/)
- [Yup Validation Documentation](https://github.com/jquense/yup)
- [Material-UI Form Components](https://mui.com/material-ui/react-text-field/)
- [Form Validation Best Practices](https://react-hook-form.com/docs/useform/validation)
