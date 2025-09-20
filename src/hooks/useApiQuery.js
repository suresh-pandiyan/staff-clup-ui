import { useQuery } from '@tanstack/react-query';

// Generic query hook using axios
export const useApiQuery = (queryKey, queryFn, options = {}) => {
    return useQuery({
        queryKey,
        queryFn,
        ...options,
    });
}; 