import { BaseService } from './baseService';

export class ChitFundService extends BaseService {
    constructor() {
        super('chitfunds');
    }

    // Additional chit fund-specific methods
    async joinChitFund(chitFundId, userId) {
        try {
            const response = await this.patch(chitFundId, {
                members: userId
            });
            return response;
        } catch (error) {
            throw error;
        }
    }

    async leaveChitFund(chitFundId, userId) {
        try {
            const response = await this.patch(chitFundId, {
                leaveMember: userId
            });
            return response;
        } catch (error) {
            throw error;
        }
    }

    async bid(chitFundId, userId, amount) {
        try {
            const response = await this.patch(chitFundId, {
                bid: { userId, amount }
            });
            return response;
        } catch (error) {
            throw error;
        }
    }

    async getActiveChitFunds() {
        try {
            const response = await this.getAll({ status: 'active' });
            return response;
        } catch (error) {
            throw error;
        }
    }

    async getChitFundHistory(chitFundId) {
        try {
            const response = await this.getAll({ chitFundId, type: 'history' });
            return response;
        } catch (error) {
            throw error;
        }
    }
}

export const chitFundService = new ChitFundService(); 