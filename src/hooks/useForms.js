import { useFormWithValidation, validationSchemas, handleFormSubmit, resetForm } from '../helpers/formConfig';
import { useAuth, useCreateUser, useUpdateUser, useChangeUserPassword } from './index';
import { useCreateEvent, useUpdateEvent } from './useEvents';
import { useCreateAccount, useUpdateAccount } from './useAccounts';
import { useCreateShare, useUpdateShare } from './useShares';
import { useCreateChitFund, useUpdateChitFund } from './useChitFunds';
import { useCreateLoan, useUpdateLoan } from './useLoans';
import { useCreateEmergencyFund, useUpdateEmergencyFund } from './useEmergencyFunds';

// Authentication Forms
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

export const useRegisterForm = () => {
    const form = useFormWithValidation(validationSchemas.register);
    const registerMutation = useAuth().registerMutation;

    const onSubmit = async (data) => {
        const { confirmPassword, ...registerData } = data;
        return await registerMutation.mutateAsync(registerData);
    };

    const handleSubmit = async (onSuccess, onError) => {
        return await handleFormSubmit(form, onSubmit, onSuccess, onError);
    };

    return {
        form,
        handleSubmit,
        reset: () => resetForm(form),
        isLoading: registerMutation.isPending,
        isError: registerMutation.isError,
        error: registerMutation.error,
    };
};

export const useChangePasswordForm = () => {
    const form = useFormWithValidation(validationSchemas.changePassword);
    const changePasswordMutation = useChangeUserPassword();

    const onSubmit = async (data) => {
        const { confirmPassword, ...passwordData } = data;
        return await changePasswordMutation.mutateAsync(passwordData);
    };

    const handleSubmit = async (onSuccess, onError) => {
        return await handleFormSubmit(form, onSubmit, onSuccess, onError);
    };

    return {
        form,
        handleSubmit,
        reset: () => resetForm(form),
        isLoading: changePasswordMutation.isPending,
        isError: changePasswordMutation.isError,
        error: changePasswordMutation.error,
    };
};

// User Profile Form
export const useProfileForm = (userData = {}) => {
    const form = useFormWithValidation(validationSchemas.profile, {
        defaultValues: userData,
    });
    const updateProfileMutation = useUpdateUser();

    const onSubmit = async (data) => {
        return await updateProfileMutation.mutateAsync({ id: userData.id, data });
    };

    const handleSubmit = async (onSuccess, onError) => {
        return await handleFormSubmit(form, onSubmit, onSuccess, onError);
    };

    return {
        form,
        handleSubmit,
        reset: () => resetForm(form, userData),
        isLoading: updateProfileMutation.isPending,
        isError: updateProfileMutation.isError,
        error: updateProfileMutation.error,
    };
};

// Event Forms
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

    const isLoading = eventData.id ? updateEventMutation.isPending : createEventMutation.isPending;
    const isError = eventData.id ? updateEventMutation.isError : createEventMutation.isError;
    const error = eventData.id ? updateEventMutation.error : createEventMutation.error;

    return {
        form,
        handleSubmit,
        reset: () => resetForm(form, eventData),
        isLoading,
        isError,
        error,
    };
};

// Account Forms
export const useAccountForm = (accountData = {}) => {
    const form = useFormWithValidation(validationSchemas.account, {
        defaultValues: accountData,
    });
    const createAccountMutation = useCreateAccount();
    const updateAccountMutation = useUpdateAccount();

    const onSubmit = async (data) => {
        if (accountData.id) {
            return await updateAccountMutation.mutateAsync({ id: accountData.id, data });
        } else {
            return await createAccountMutation.mutateAsync(data);
        }
    };

    const handleSubmit = async (onSuccess, onError) => {
        return await handleFormSubmit(form, onSubmit, onSuccess, onError);
    };

    const isLoading = accountData.id ? updateAccountMutation.isPending : createAccountMutation.isPending;
    const isError = accountData.id ? updateAccountMutation.isError : createAccountMutation.isError;
    const error = accountData.id ? updateAccountMutation.error : createAccountMutation.error;

    return {
        form,
        handleSubmit,
        reset: () => resetForm(form, accountData),
        isLoading,
        isError,
        error,
    };
};

// Share Forms
export const useShareForm = (shareData = {}) => {
    const form = useFormWithValidation(validationSchemas.share, {
        defaultValues: shareData,
    });
    const createShareMutation = useCreateShare();
    const updateShareMutation = useUpdateShare();

    const onSubmit = async (data) => {
        if (shareData.id) {
            return await updateShareMutation.mutateAsync({ id: shareData.id, data });
        } else {
            return await createShareMutation.mutateAsync(data);
        }
    };

    const handleSubmit = async (onSuccess, onError) => {
        return await handleFormSubmit(form, onSubmit, onSuccess, onError);
    };

    const isLoading = shareData.id ? updateShareMutation.isPending : createShareMutation.isPending;
    const isError = shareData.id ? updateShareMutation.isError : createShareMutation.isError;
    const error = shareData.id ? updateShareMutation.error : createShareMutation.error;

    return {
        form,
        handleSubmit,
        reset: () => resetForm(form, shareData),
        isLoading,
        isError,
        error,
    };
};

// Chit Fund Forms
export const useChitFundForm = (chitFundData = {}) => {
    const form = useFormWithValidation(validationSchemas.chitFund, {
        defaultValues: chitFundData,
    });
    const createChitFundMutation = useCreateChitFund();
    const updateChitFundMutation = useUpdateChitFund();

    const onSubmit = async (data) => {
        if (chitFundData.id) {
            return await updateChitFundMutation.mutateAsync({ id: chitFundData.id, data });
        } else {
            return await createChitFundMutation.mutateAsync(data);
        }
    };

    const handleSubmit = async (onSuccess, onError) => {
        return await handleFormSubmit(form, onSubmit, onSuccess, onError);
    };

    const isLoading = chitFundData.id ? updateChitFundMutation.isPending : createChitFundMutation.isPending;
    const isError = chitFundData.id ? updateChitFundMutation.isError : createChitFundMutation.isError;
    const error = chitFundData.id ? updateChitFundMutation.error : createChitFundMutation.error;

    return {
        form,
        handleSubmit,
        reset: () => resetForm(form, chitFundData),
        isLoading,
        isError,
        error,
    };
};

// Loan Forms
export const useLoanForm = (loanData = {}) => {
    const form = useFormWithValidation(validationSchemas.loan, {
        defaultValues: loanData,
    });
    const createLoanMutation = useCreateLoan();
    const updateLoanMutation = useUpdateLoan();

    const onSubmit = async (data) => {
        if (loanData.id) {
            return await updateLoanMutation.mutateAsync({ id: loanData.id, data });
        } else {
            return await createLoanMutation.mutateAsync(data);
        }
    };

    const handleSubmit = async (onSuccess, onError) => {
        return await handleFormSubmit(form, onSubmit, onSuccess, onError);
    };

    const isLoading = loanData.id ? updateLoanMutation.isPending : createLoanMutation.isPending;
    const isError = loanData.id ? updateLoanMutation.isError : createLoanMutation.isError;
    const error = loanData.id ? updateLoanMutation.error : createLoanMutation.error;

    return {
        form,
        handleSubmit,
        reset: () => resetForm(form, loanData),
        isLoading,
        isError,
        error,
    };
};

// Emergency Fund Forms
export const useEmergencyFundForm = (emergencyFundData = {}) => {
    const form = useFormWithValidation(validationSchemas.emergencyFund, {
        defaultValues: emergencyFundData,
    });
    const createEmergencyFundMutation = useCreateEmergencyFund();
    const updateEmergencyFundMutation = useUpdateEmergencyFund();

    const onSubmit = async (data) => {
        if (emergencyFundData.id) {
            return await updateEmergencyFundMutation.mutateAsync({ id: emergencyFundData.id, data });
        } else {
            return await createEmergencyFundMutation.mutateAsync(data);
        }
    };

    const handleSubmit = async (onSuccess, onError) => {
        return await handleFormSubmit(form, onSubmit, onSuccess, onError);
    };

    const isLoading = emergencyFundData.id ? updateEmergencyFundMutation.isPending : createEmergencyFundMutation.isPending;
    const isError = emergencyFundData.id ? updateEmergencyFundMutation.isError : createEmergencyFundMutation.isError;
    const error = emergencyFundData.id ? updateEmergencyFundMutation.error : createEmergencyFundMutation.error;

    return {
        form,
        handleSubmit,
        reset: () => resetForm(form, emergencyFundData),
        isLoading,
        isError,
        error,
    };
};

// Generic Form Hook
export const useGenericForm = (schema, defaultValues = {}, mutationFn) => {
    const form = useFormWithValidation(schema, {
        defaultValues,
    });

    const onSubmit = async (data) => {
        return await mutationFn(data);
    };

    const handleSubmit = async (onSuccess, onError) => {
        return await handleFormSubmit(form, onSubmit, onSuccess, onError);
    };

    return {
        form,
        handleSubmit,
        reset: () => resetForm(form, defaultValues),
    };
}; 