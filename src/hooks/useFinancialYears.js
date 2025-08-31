import { useApiQuery } from './useApiQuery';
import { financialYearService } from '../services';

// Financial Year-related hooks
export const useFinancialYears = (params = {}) => {
    return useApiQuery(
        ['financialYears', params],
        () => financialYearService.getFinancialYear(params),
        { staleTime: 5 * 60 * 1000 } // 5 minutes
    );
};

export const useFinancialYear = (id) => {
    return useApiQuery(
        ['financialYear', id],
        () => financialYearService.getById(id),
        {
            enabled: !!id,
            staleTime: 5 * 60 * 1000,
        }
    );
};
