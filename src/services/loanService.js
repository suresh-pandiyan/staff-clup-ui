import { BaseService } from './baseService';

export class LoanService extends BaseService {
    constructor() {
        super('loans');
    }

    // Additional loan-specific methods
    async applyForLoan(loanData) {
        try {
            const response = await this.create(loanData);
            return response;
        } catch (error) {
            throw error;
        }
    }

    async approveLoan(loanId, approvedBy) {
        try {
            const response = await this.patch(loanId, {
                status: 'approved', approvedBy
            });
            return response;
        } catch (error) {
            throw error;
        }
    }

    async rejectLoan(loanId, rejectedBy, reason) {
        try {
            const response = await this.patch(loanId, {
                status: 'rejected', rejectedBy, reason
            });
            return response;
        } catch (error) {
            throw error;
        }
    }

    async makePayment(loanId, amount) {
        try {
            const response = await this.patch(loanId, {
                payment: { amount, date: new Date() }
            });
            return response;
        } catch (error) {
            throw error;
        }
    }

    async getPendingLoans() {
        try {
            const response = await this.getAll({ status: 'pending' });
            return response;
        } catch (error) {
            throw error;
        }
    }

    async getActiveLoans() {
        try {
            const response = await this.getAll({ status: 'active' });
            return response;
        } catch (error) {
            throw error;
        }
    }
}

export const loanService = new LoanService(); 