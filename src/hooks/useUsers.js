import { useApiQuery, useApiMutation } from './index';
import { userService } from '../services';

// User-related hooks
export const useUsers = (params = {}) => {
    return useApiQuery(
        ['users', params],
        () => userService.getAll(params),
        { staleTime: 5 * 60 * 1000 } // 5 minutes
    );
};

export const useUser = (id) => {
    return useApiQuery(
        ['user', id],
        () => userService.getById(id),
        {
            enabled: !!id,
            staleTime: 5 * 60 * 1000,
        }
    );
};

export const useCreateUser = () => {
    return useApiMutation(
        (userData) => userService.create(userData),
        {
            invalidateQueries: [['users']],
        }
    );
};

export const useUpdateUser = () => {
    return useApiMutation(
        ({ id, ...userData }) => userService.update(id, userData),
        {
            invalidateQueries: [['users'], ['user']],
        }
    );
};

export const useDeleteUser = () => {
    return useApiMutation(
        (id) => userService.delete(id),
        {
            invalidateQueries: [['users']],
        }
    );
};

export const useUpdateUserProfile = () => {
    return useApiMutation(
        ({ userId, profileData }) => userService.updateProfile(userId, profileData),
        {
            invalidateQueries: [['user']],
        }
    );
};

export const useChangeUserPassword = () => {
    return useApiMutation(
        ({ userId, passwordData }) => userService.changePassword(userId, passwordData),
        {
            invalidateQueries: [['user']],
        }
    );
}; 