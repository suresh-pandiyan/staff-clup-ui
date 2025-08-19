import { apiHelpers, handleApiError, handleApiSuccess } from '../helpers/axiosConfig';

// Base API service class
export class BaseService {
    constructor(resource) {
        this.resource = resource;
    }

    // Get all items
    async getAll(params = {}) {

        console.log("params", this.resource);
        try {
            const response = await apiHelpers.get(`/${this.resource}`, { params });
            return handleApiSuccess(response);
        } catch (error) {
            throw handleApiError(error);
        }
    }

    // Get single item by ID
    async getById(id) {
        try {
            const response = await apiHelpers.get(`/${this.resource}/${id}`);
            return handleApiSuccess(response);
        } catch (error) {
            throw handleApiError(error);
        }
    }

    // Create new item
    async create(data) {
        try {
            const response = await apiHelpers.post(`/${this.resource}`, data);
            return handleApiSuccess(response);
        } catch (error) {
            throw handleApiError(error);
        }
    }

    // Update item by ID
    async update(id, data) {
        try {
            const response = await apiHelpers.put(`/${this.resource}/${id}`, data);
            return handleApiSuccess(response);
        } catch (error) {
            throw handleApiError(error);
        }
    }

    // Patch item by ID
    async patch(id, data) {
        try {
            const response = await apiHelpers.patch(`/${this.resource}/${id}`, data);
            return handleApiSuccess(response);
        } catch (error) {
            throw handleApiError(error);
        }
    }

    // Delete item by ID
    async delete(id) {
        try {
            const response = await apiHelpers.delete(`/${this.resource}/${id}`);
            return handleApiSuccess(response);
        } catch (error) {
            throw handleApiError(error);
        }
    }

    // Upload file
    async uploadFile(formData) {
        try {
            const response = await apiHelpers.upload(`/${this.resource}/upload`, formData);
            return handleApiSuccess(response);
        } catch (error) {
            throw handleApiError(error);
        }
    }

    // Download file
    async downloadFile(id, filename = null) {
        try {
            const response = await apiHelpers.download(`/${this.resource}/${id}/download`);
            return handleApiSuccess(response);
        } catch (error) {
            throw handleApiError(error);
        }
    }
} 