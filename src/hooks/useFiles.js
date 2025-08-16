import { useApiQuery, useApiMutation } from './index';
import { fileService } from '../services';

// File-related hooks
export const useUploadFile = () => {
    return useApiMutation(
        ({ file, onProgress }) => fileService.uploadFile(file, onProgress),
        {
            onSuccess: (data) => {
                console.log('File uploaded successfully:', data);
            },
        }
    );
};

export const useUploadMultipleFiles = () => {
    return useApiMutation(
        ({ files, onProgress }) => fileService.uploadMultipleFiles(files, onProgress),
        {
            onSuccess: (data) => {
                console.log('Files uploaded successfully:', data);
            },
        }
    );
};

export const useDeleteFile = () => {
    return useApiMutation(
        (fileId) => fileService.deleteFile(fileId),
        {
            onSuccess: (data) => {
                console.log('File deleted successfully:', data);
            },
        }
    );
};

export const useFileInfo = (fileId) => {
    return useApiQuery(
        ['file', fileId],
        () => fileService.getFileInfo(fileId),
        {
            enabled: !!fileId,
            staleTime: 5 * 60 * 1000,
        }
    );
};

export const useDownloadFile = () => {
    return useApiMutation(
        ({ fileId, filename }) => fileService.downloadFile(fileId, filename),
        {
            onSuccess: (data) => {
                console.log('File downloaded successfully:', data);
            },
        }
    );
};

export const useUserFiles = (userId) => {
    return useApiQuery(
        ['files', 'user', userId],
        () => fileService.getUserFiles(userId),
        {
            enabled: !!userId,
            staleTime: 5 * 60 * 1000,
        }
    );
};

export const useUpdateFileMetadata = () => {
    return useApiMutation(
        ({ fileId, metadata }) => fileService.updateFileMetadata(fileId, metadata),
        {
            invalidateQueries: [['file']],
            onSuccess: (data) => {
                console.log('File metadata updated successfully:', data);
            },
        }
    );
}; 