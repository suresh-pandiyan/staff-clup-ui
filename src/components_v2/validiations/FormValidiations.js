import * as yup from 'yup';

export const eventSchema = yup.object({
    // Employee Information
    eventName: yup
        .string()
        .required('Event Name is required')
        .max(50, 'Event Name cannot be more than 50 characters'),
    hostEmployeeId: yup
        .string()
        .required('Host EmployeeId is required')
        .max(20, 'Host EmployeeId cannot be more than 20 characters'),
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

export const emergencyfundSchema = yup.object({
    employeeId: yup
        .string()
        .required('Employee ID is required'),
        // .max(20, 'Employee ID cannot be more than 20 characters'),
    nomineeId: yup
        .string()
        .required('Nominee ID is required'),
        // .max(20, 'Nominee ID cannot be more than 20 characters'),
    emergencyFundAmount: yup
        .mixed()
        .test('is-number', 'Emergency Amount must be a number', (value) => {
            if (value === '' || value === null || value === undefined) return false;
            const num = Number(value);
            return !isNaN(num) && num > 0;
        })
        .required('Emergency Amount is required'),
    // emergencyMonthlyAmount: yup
    //     .number()
    //     .required('Emergency Monthly Amount is required'),

});


// const registrationSchema = eventSchema
//     .pick(['hostEmployeeId'])
//     .shape({
//         password: yup.string().min(8).required(),
//         confirmPassword: yup.string().oneOf([yup.ref('password')]).required()
//     });