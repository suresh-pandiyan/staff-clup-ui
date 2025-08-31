import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

// Generic query hook using axios
export const useApiQuery = (queryKey, queryFn, options = {}) => {
    return useSuspenseQuery({
        queryKey,
        queryFn,
        ...options,
    });
}; 