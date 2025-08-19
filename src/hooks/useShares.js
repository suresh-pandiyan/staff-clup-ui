import { useApiQuery, useApiMutation } from './index';
import { shareService } from '../services';

// Share-related hooks
export const useShares = (params = {}) => {
    return useApiQuery(
        ['shares', params],
        () => shareService.getAll(params),
        { staleTime: 5 * 60 * 1000 }
    );
};

export const useShare = (id) => {
    return useApiQuery(
        ['share', id],
        () => shareService.getById(id),
        {
            enabled: !!id,
            staleTime: 5 * 60 * 1000,
        }
    );
};

export const useCreateShare = () => {
    return useApiMutation(
        (shareData) => shareService.create(shareData),
        {
            invalidateQueries: [['shares']],
        }
    );
};

export const useUpdateShare = () => {
    return useApiMutation(
        ({ id, ...shareData }) => shareService.update(id, shareData),
        {
            invalidateQueries: [['shares'], ['share']],
        }
    );
};

export const useDeleteShare = () => {
    return useApiMutation(
        (id) => shareService.delete(id),
        {
            invalidateQueries: [['shares']],
        }
    );
};

export const useBuyShares = () => {
    return useApiMutation(
        ({ shareId, quantity, userId }) => shareService.buyShares(shareId, quantity, userId),
        {
            invalidateQueries: [['shares'], ['share']],
        }
    );
};

export const useSellShares = () => {
    return useApiMutation(
        ({ shareId, quantity, userId }) => shareService.sellShares(shareId, quantity, userId),
        {
            invalidateQueries: [['shares'], ['share']],
        }
    );
};

export const useSharePrice = (shareId) => {
    return useApiQuery(
        ['share', shareId, 'price'],
        () => shareService.getSharePrice(shareId),
        {
            enabled: !!shareId,
            staleTime: 1 * 60 * 1000, // 1 minute for price
        }
    );
};

export const useShareHistory = (shareId) => {
    return useApiQuery(
        ['share', shareId, 'history'],
        () => shareService.getShareHistory(shareId),
        {
            enabled: !!shareId,
            staleTime: 5 * 60 * 1000,
        }
    );
}; 