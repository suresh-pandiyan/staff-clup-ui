import { BaseService } from './baseService';

export class ShareService extends BaseService {
    constructor() {
        super('shares');
    }

    // Additional share-specific methods
    async buyShares(shareId, quantity, userId) {
        try {
            const response = await this.patch(shareId, {
                transaction: { type: 'buy', quantity, userId }
            });
            return response;
        } catch (error) {
            throw error;
        }
    }

    async sellShares(shareId, quantity, userId) {
        try {
            const response = await this.patch(shareId, {
                transaction: { type: 'sell', quantity, userId }
            });
            return response;
        } catch (error) {
            throw error;
        }
    }

    async getSharePrice(shareId) {
        try {
            const response = await this.getById(shareId);
            return response;
        } catch (error) {
            throw error;
        }
    }

    async getShareHistory(shareId) {
        try {
            const response = await this.getAll({ shareId, type: 'history' });
            return response;
        } catch (error) {
            throw error;
        }
    }
}

export const shareService = new ShareService(); 