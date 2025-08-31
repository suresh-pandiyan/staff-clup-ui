import { BaseService } from './baseService';
import { mockEvents, getEventPayments, addEventPayment, removeEventPayment } from '../utils/mockEventData';
import { apiHelpers } from '../helpers/axiosConfig';

export class EventService extends BaseService {
    constructor() {
        super('events');
    }

    // Override getAll method to use mock data for demonstration
    async getAll(params = {}) {
        try {
            // Simulate API delay
            const response = await apiHelpers.get(`/events/financial-year/${params}`);
            return response;

        } catch (error) {
            throw error;
        }
    }
    async singleEvent(params = {}) {
        try {
            const response = await apiHelpers.get(`/events/${params}`);
            return response;
        } catch (error) {
            throw error;
        }
    }

    // Override create method to use mock data
    async create(eventsData) {
        try {
            const response = await apiHelpers.post(`/events`, eventsData);
            return response;
        } catch (error) {
            throw error;
        }
    }
    // async create(eventData) {
    //     try {
    //         // Simulate API delay
    //         await new Promise(resolve => setTimeout(resolve, 800));

    //         const newEvent = {
    //             id: Date.now(),
    //             ...eventData,
    //             createdAt: new Date().toISOString(),
    //             updatedAt: new Date().toISOString()
    //         };

    //         mockEvents.push(newEvent);

    //         return {
    //             data: newEvent,
    //             success: true
    //         };
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    // Override update method to use API
    async update(id, eventData) {
        try {
            const response = await apiHelpers.put(`/events/${id}`, eventData);
            return response;
        } catch (error) {
            throw error;
        }
    }

    // Override delete method to use mock data
    async delete(id) {
        try {
            const response = await apiHelpers.delete(`/events/${id}`);
            return response;
        } catch (error) {
            throw error;
        }
    }

    // Additional event-specific methods
    async getUpcomingEvents() {
        try {
            const response = await this.getAll({ status: 'upcoming' });
            return response;
        } catch (error) {
            throw error;
        }
    }

    async getPastEvents() {
        try {
            const response = await this.getAll({ status: 'past' });
            return response;
        } catch (error) {
            throw error;
        }
    }

    async registerForEvent(eventId, userId) {
        try {
            const response = await this.patch(eventId, {
                registeredUsers: userId
            });
            return response;
        } catch (error) {
            throw error;
        }
    }

    async cancelRegistration(eventId, userId) {
        try {
            const response = await this.patch(eventId, {
                cancelRegistration: userId
            });
            return response;
        } catch (error) {
            throw error;
        }
    }

    // Event payment tracking methods
    async getEventPayments(eventId) {
        try {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 300));

            const payments = getEventPayments(eventId);
            return {
                data: payments,
                success: true
            };
        } catch (error) {
            throw error;
        }
    }

    async addEventPayment(paymentData) {
        try {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 500));

            const newPayment = addEventPayment(paymentData.eventId, paymentData);
            return {
                data: newPayment,
                success: true
            };
        } catch (error) {
            throw error;
        }
    }

    async removeEventPayment(paymentId) {
        try {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 300));

            const success = removeEventPayment(paymentId);
            return {
                success,
                message: success ? 'Payment removed successfully' : 'Payment not found'
            };
        } catch (error) {
            throw error;
        }
    }

    async updateEventPayment(paymentId, paymentData) {
        try {
            const response = await this.apiHelpers.patch(`/event-payments/${paymentId}`, paymentData);
            return response;
        } catch (error) {
            throw error;
        }
    }

    async getEventPaymentSummary(eventId) {
        try {
            const response = await this.apiHelpers.get(`/${this.resource}/${eventId}/payment-summary`);
            return response;
        } catch (error) {
            throw error;
        }
    }
 Z   // async getAllContributors(eventId) {
    //     try {
    //         const response = await apiHelpers.get(`/events/contributors/${eventId}`);
    //         return response;
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    // EventService.js
async getAllContributors(eventId, params = {}) {
    try {
        const response = await apiHelpers.get(`/events/contributors/${eventId}`, {
            params, // <-- add this to send ?search=...
        });
        return response;
    } catch (error) {
        throw error;
    }
}


    async updateEventContributorsStatus(eventId, userId, eventData) {
        console.log(eventId, userId, eventData, 'eventData event update');

        try {
            const response = await apiHelpers.patch(
                `/events/${eventId}/contributors/${userId}/status`,
                eventData
            );
            return response;
        } catch (error) {
            throw error;
        }
    }
}



export const eventService = new EventService(); 