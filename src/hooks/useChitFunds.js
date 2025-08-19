import { useApiQuery, useApiMutation } from './index';
import { chitFundService } from '../services';

// Chit Fund-related hooks
export const useChitFunds = (params = {}) => {
    return useApiQuery(
        ['chitfunds', params],
        () => chitFundService.getAll(params),
        { staleTime: 5 * 60 * 1000 }
    );
};

export const useChitFund = (id) => {
    return useApiQuery(
        ['chitfund', id],
        () => chitFundService.getById(id),
        {
            enabled: !!id,
            staleTime: 5 * 60 * 1000,
        }
    );
};

export const useCreateChitFund = () => {
    return useApiMutation(
        (chitFundData) => chitFundService.create(chitFundData),
        {
            invalidateQueries: [['chitfunds']],
        }
    );
};

export const useUpdateChitFund = () => {
    return useApiMutation(
        ({ id, ...chitFundData }) => chitFundService.update(id, chitFundData),
        {
            invalidateQueries: [['chitfunds'], ['chitfund']],
        }
    );
};

export const useDeleteChitFund = () => {
    return useApiMutation(
        (id) => chitFundService.delete(id),
        {
            invalidateQueries: [['chitfunds']],
        }
    );
};

export const useJoinChitFund = () => {
    return useApiMutation(
        ({ chitFundId, userId }) => chitFundService.joinChitFund(chitFundId, userId),
        {
            invalidateQueries: [['chitfunds'], ['chitfund']],
        }
    );
};

export const useLeaveChitFund = () => {
    return useApiMutation(
        ({ chitFundId, userId }) => chitFundService.leaveChitFund(chitFundId, userId),
        {
            invalidateQueries: [['chitfunds'], ['chitfund']],
        }
    );
};

export const useBidOnChitFund = () => {
    return useApiMutation(
        ({ chitFundId, userId, amount }) => chitFundService.bid(chitFundId, userId, amount),
        {
            invalidateQueries: [['chitfunds'], ['chitfund']],
        }
    );
};

export const useActiveChitFunds = () => {
    return useApiQuery(
        ['chitfunds', 'active'],
        () => chitFundService.getActiveChitFunds(),
        { staleTime: 2 * 60 * 1000 }
    );
};

export const useChitFundHistory = (chitFundId) => {
    return useApiQuery(
        ['chitfund', chitFundId, 'history'],
        () => chitFundService.getChitFundHistory(chitFundId),
        {
            enabled: !!chitFundId,
            staleTime: 5 * 60 * 1000,
        }
    );
}; 