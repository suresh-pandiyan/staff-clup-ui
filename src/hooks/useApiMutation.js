import { useMutation, useQueryClient } from '@tanstack/react-query';

// Generic mutation hook
export const useApiMutation = (mutationFn, options = {}) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn,
        onSuccess: (data, variables, context) => {
            // Invalidate and refetch relevant queries
            if (options.invalidateQueries) {
                options.invalidateQueries.forEach(queryKey => {
                    queryClient.invalidateQueries({ queryKey });
                });
            }
            options.onSuccess?.(data, variables, context);
        },
        ...options,
    });
}; 