import { apiHelpers, handleApiError, handleApiSuccess } from '../helpers/axiosConfig';

export const fileService = {
    // Upload single file
    async uploadFile(file, onProgress = null) {
        try {
            const formData = new FormData();
            formData.append('file', file);

            const config = {};
            if (onProgress) {
                config.onUploadProgress = (progressEvent) => {
                    const percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    onProgress(percentCompleted);
                };
            }

            const response = await apiHelpers.upload('/files/upload', formData, config);
            return handleApiSuccess(response);
        } catch (error) {
            throw handleApiError(error);
        }
    },

    // Upload multiple files
    async uploadMultipleFiles(files, onProgress = null) {
        try {
            const formData = new FormData();
            files.forEach((file, index) => {
                formData.append(`files[${index}]`, file);
            });

            const config = {};
            if (onProgress) {
                config.onUploadProgress = (progressEvent) => {
                    const percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    onProgress(percentCompleted);
                };
            }

            const response = await apiHelpers.upload('/files/upload-multiple', formData, config);
            return handleApiSuccess(response);
        } catch (error) {
            throw handleApiError(error);
        }
    },

    // Delete file
    async deleteFile(fileId) {
        try {
            const response = await apiHelpers.delete(`/files/${fileId}`);
            return handleApiSuccess(response);
        } catch (error) {
            throw handleApiError(error);
        }
    },

    // Get file info
    async getFileInfo(fileId) {
        try {
            const response = await apiHelpers.get(`/files/${fileId}`);
            return handleApiSuccess(response);
        } catch (error) {
            throw handleApiError(error);
        }
    },

    // Download file
    async downloadFile(fileId, filename = null) {
        try {
            const response = await apiHelpers.download(`/files/${fileId}/download`);
            return handleApiSuccess(response);
        } catch (error) {
            throw handleApiError(error);
        }
    },

    // Get user files
    async getUserFiles(userId) {
        try {
            const response = await apiHelpers.get(`/files/user/${userId}`);
            return handleApiSuccess(response);
        } catch (error) {
            throw handleApiError(error);
        }
    },

    // Update file metadata
    async updateFileMetadata(fileId, metadata) {
        try {
            const response = await apiHelpers.patch(`/files/${fileId}`, metadata);
            return handleApiSuccess(response);
        } catch (error) {
            throw handleApiError(error);
        }
    },
}; 