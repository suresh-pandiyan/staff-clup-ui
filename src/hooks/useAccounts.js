import { useApiQuery, useApiMutation } from './index';
import { accountService } from '../services';

// Account-related hooks
export const useAccounts = (params = {}) => {
    return useApiQuery(
        ['accounts', params],
        () => accountService.getAll(params),
        { staleTime: 5 * 60 * 1000 }
    );
};

export const useAccount = (id) => {
    return useApiQuery(
        ['account', id],
        () => accountService.getById(id),
        {
            enabled: !!id,
            staleTime: 5 * 60 * 1000,
        }
    );
};

export const useCreateAccount = () => {
    return useApiMutation(
        (accountData) => accountService.create(accountData),
        {
            invalidateQueries: [['accounts']],
        }
    );
};

export const useUpdateAccount = () => {
    return useApiMutation(
        ({ id, ...accountData }) => accountService.update(id, accountData),
        {
            invalidateQueries: [['accounts'], ['account']],
        }
    );
};

export const useDeleteAccount = () => {
    return useApiMutation(
        (id) => accountService.delete(id),
        {
            invalidateQueries: [['accounts']],
        }
    );
};

export const useAccountBalance = (accountId) => {
    return useApiQuery(
        ['account', accountId, 'balance'],
        () => accountService.getAccountBalance(accountId),
        {
            enabled: !!accountId,
            staleTime: 1 * 60 * 1000, // 1 minute for balance
        }
    );
};

export const useDeposit = () => {
    return useApiMutation(
        ({ accountId, amount }) => accountService.deposit(accountId, amount),
        {
            invalidateQueries: [['account'], ['accounts']],
        }
    );
};

export const useWithdraw = () => {
    return useApiMutation(
        ({ accountId, amount }) => accountService.withdraw(accountId, amount),
        {
            invalidateQueries: [['account'], ['accounts']],
        }
    );
};

export const useTransactionHistory = (accountId) => {
    return useApiQuery(
        ['account', accountId, 'transactions'],
        () => accountService.getTransactionHistory(accountId),
        {
            enabled: !!accountId,
            staleTime: 2 * 60 * 1000,
        }
    );
}; 