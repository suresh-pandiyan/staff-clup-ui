import { BaseService } from './baseService';

export class AccountService extends BaseService {
    constructor() {
        super('accounts');
    }

    // Additional account-specific methods
    async getAccountBalance(accountId) {
        try {
            const response = await this.getById(accountId);
            return response;
        } catch (error) {
            throw error;
        }
    }

    async deposit(accountId, amount) {
        try {
            const response = await this.patch(accountId, {
                transaction: { type: 'deposit', amount }
            });
            return response;
        } catch (error) {
            throw error;
        }
    }

    async withdraw(accountId, amount) {
        try {
            const response = await this.patch(accountId, {
                transaction: { type: 'withdraw', amount }
            });
            return response;
        } catch (error) {
            throw error;
        }
    }

    async getTransactionHistory(accountId) {
        try {
            const response = await this.getAll({ accountId, type: 'transactions' });
            return response;
        } catch (error) {
            throw error;
        }
    }
}

export const accountService = new AccountService(); 