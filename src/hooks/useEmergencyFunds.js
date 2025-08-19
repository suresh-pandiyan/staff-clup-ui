import { useApiQuery, useApiMutation } from './index';
import { emergencyFundService } from '../services';

// Emergency Fund-related hooks
export const useEmergencyFunds = (params = {}) => {
    return useApiQuery(
        ['emergency-funds', params],
        () => emergencyFundService.getAll(params),
        { staleTime: 5 * 60 * 1000 }
    );
};

export const useEmergencyFund = (id) => {
    return useApiQuery(
        ['emergency-fund', id],
        () => emergencyFundService.getById(id),
        {
            enabled: !!id,
            staleTime: 5 * 60 * 1000,
        }
    );
};

export const useCreateEmergencyFund = () => {
    return useApiMutation(
        (emergencyFundData) => emergencyFundService.create(emergencyFundData),
        {
            invalidateQueries: [['emergency-funds']],
        }
    );
};

export const useUpdateEmergencyFund = () => {
    return useApiMutation(
        ({ id, ...emergencyFundData }) => emergencyFundService.update(id, emergencyFundData),
        {
            invalidateQueries: [['emergency-funds'], ['emergency-fund']],
        }
    );
};

export const useDeleteEmergencyFund = () => {
    return useApiMutation(
        (id) => emergencyFundService.delete(id),
        {
            invalidateQueries: [['emergency-funds']],
        }
    );
};

export const useContributeToEmergencyFund = () => {
    return useApiMutation(
        ({ emergencyFundId, userId, amount }) => emergencyFundService.contribute(emergencyFundId, userId, amount),
        {
            invalidateQueries: [['emergency-funds'], ['emergency-fund']],
        }
    );
};

export const useRequestWithdrawal = () => {
    return useApiMutation(
        ({ emergencyFundId, userId, amount, reason }) => emergencyFundService.requestWithdrawal(emergencyFundId, userId, amount, reason),
        {
            invalidateQueries: [['emergency-funds'], ['emergency-fund']],
        }
    );
};

export const useApproveWithdrawal = () => {
    return useApiMutation(
        ({ emergencyFundId, requestId, approvedBy }) => emergencyFundService.approveWithdrawal(emergencyFundId, requestId, approvedBy),
        {
            invalidateQueries: [['emergency-funds'], ['emergency-fund']],
        }
    );
};

export const useActiveEmergencyFunds = () => {
    return useApiQuery(
        ['emergency-funds', 'active'],
        () => emergencyFundService.getActiveEmergencyFunds(),
        { staleTime: 2 * 60 * 1000 }
    );
};

export const useContributionHistory = (emergencyFundId) => {
    return useApiQuery(
        ['emergency-fund', emergencyFundId, 'contributions'],
        () => emergencyFundService.getContributionHistory(emergencyFundId),
        {
            enabled: !!emergencyFundId,
            staleTime: 5 * 60 * 1000,
        }
    );
}; 