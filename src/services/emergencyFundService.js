import { apiHelpers, handleApiError, handleApiSuccess } from '../helpers/axiosConfig';
import { BaseService } from './baseService';

export class EmergencyFundService extends BaseService {
    constructor() {
        super('emergency-funds');
    }
    // Additional emergency fund-specific methods
    async contribute(emergencyFundId, userId, amount) {
        try {
            const response = await this.patch(emergencyFundId, {
                contribution: { userId, amount, date: new Date() }
            });
            return response;
        } catch (error) {
            throw error;
        }
    }
    async requestWithdrawal(emergencyFundId, userId, amount, reason) {
        try {
            const response = await this.patch(emergencyFundId, {
                withdrawalRequest: { userId, amount, reason, date: new Date() }
            });
            return response;
        } catch (error) {
            throw error;
        }
    }
    async approveWithdrawal(emergencyFundId, requestId, approvedBy) {
        try {
            const response = await this.patch(emergencyFundId, {
                approveWithdrawal: { requestId, approvedBy }
            });
            return response;
        } catch (error) {
            throw error;
        }
    }
    async getActiveEmergencyFunds() {
        try {
            const response = await this.getAll({ status: 'active' });
            return response;
        } catch (error) {
            throw error;
        }
    }
    async getContributionHistory(emergencyFundId) {
        try {
            const response = await this.getAll({ emergencyFundId, type: 'contributions' });
            return response;
        } catch (error) {
            throw error;
        }
    }
    async create(data) {
        try {
            const response = await apiHelpers.post(`/${this.resource}`, data);
            console.log(response, 'response in emergencyFundService');
            return handleApiSuccess(response);
        } catch (error) {
            throw handleApiError(error);
        }
    }
    async delete(id) {
        try {
            const response = await apiHelpers.delete(`/${this.resource}/${id}`);
            return handleApiSuccess(response);
        } catch (error) {
            throw handleApiError(error);
        }
    }
}

export const emergencyFundService = new EmergencyFundService(); 