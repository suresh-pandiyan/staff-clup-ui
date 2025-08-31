import { BaseService } from './baseService';
import { apiHelpers } from '../helpers/axiosConfig';

export class FinancialYearService extends BaseService {
    constructor() {
        super('financial-years');
    }

    // Additional user-specific methods can be added here
    async getFinancialYear() {
        try {
            const response = await this.getAll();
            return response;
        } catch (error) {
            throw error;
        }
    }
}

export const financialYearService = new FinancialYearService(); 