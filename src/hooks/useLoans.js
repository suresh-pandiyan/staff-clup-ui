import { useApiQuery, useApiMutation } from './index';
import { loanService } from '../services';

// Loan-related hooks
export const useLoans = (params = {}) => {
    return useApiQuery(
        ['loans', params],
        () => loanService.getAll(params),
        { staleTime: 5 * 60 * 1000 }
    );
};

export const useLoan = (id) => {
    return useApiQuery(
        ['loan', id],
        () => loanService.getById(id),
        {
            enabled: !!id,
            staleTime: 5 * 60 * 1000,
        }
    );
};

export const useCreateLoan = () => {
    return useApiMutation(
        (loanData) => loanService.create(loanData),
        {
            invalidateQueries: [['loans']],
        }
    );
};

export const useUpdateLoan = () => {
    return useApiMutation(
        ({ id, ...loanData }) => loanService.update(id, loanData),
        {
            invalidateQueries: [['loans'], ['loan']],
        }
    );
};

export const useDeleteLoan = () => {
    return useApiMutation(
        (id) => loanService.delete(id),
        {
            invalidateQueries: [['loans']],
        }
    );
};

export const useApplyForLoan = () => {
    return useApiMutation(
        (loanData) => loanService.applyForLoan(loanData),
        {
            invalidateQueries: [['loans']],
        }
    );
};

export const useApproveLoan = () => {
    return useApiMutation(
        ({ loanId, approvedBy }) => loanService.approveLoan(loanId, approvedBy),
        {
            invalidateQueries: [['loans'], ['loan']],
        }
    );
};

export const useRejectLoan = () => {
    return useApiMutation(
        ({ loanId, rejectedBy, reason }) => loanService.rejectLoan(loanId, rejectedBy, reason),
        {
            invalidateQueries: [['loans'], ['loan']],
        }
    );
};

export const useMakeLoanPayment = () => {
    return useApiMutation(
        ({ loanId, amount }) => loanService.makePayment(loanId, amount),
        {
            invalidateQueries: [['loans'], ['loan']],
        }
    );
};

export const usePendingLoans = () => {
    return useApiQuery(
        ['loans', 'pending'],
        () => loanService.getPendingLoans(),
        { staleTime: 2 * 60 * 1000 }
    );
};

export const useActiveLoans = () => {
    return useApiQuery(
        ['loans', 'active'],
        () => loanService.getActiveLoans(),
        { staleTime: 2 * 60 * 1000 }
    );
}; 