import { BaseService } from './baseService';
import { mockEvents, getEventPayments, addEventPayment, removeEventPayment } from '../utils/mockEventData';

export class EventService extends BaseService {
    constructor() {
        super('events');
    }

    // Override getAll method to use mock data for demonstration
    async getAll(params = {}) {
        try {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 500));
            
            let filteredEvents = [...mockEvents];
            
            // Apply filters
            if (params.status) {
                filteredEvents = filteredEvents.filter(event => event.eventStatus === params.status);
            }
            
            return {
                data: filteredEvents,
                total: filteredEvents.length,
                success: true
            };
        } catch (error) {
            throw error;
        }
    }

    // Override create method to use mock data
    async create(eventData) {
        try {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 800));
            
            const newEvent = {
                id: Date.now(),
                ...eventData,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            
            mockEvents.push(newEvent);
            
            return {
                data: newEvent,
                success: true
            };
        } catch (error) {
            throw error;
        }
    }

    // Override update method to use mock data
    async update(id, eventData) {
        try {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 600));
            
            const eventIndex = mockEvents.findIndex(event => event.id === id);
            if (eventIndex === -1) {
                throw new Error('Event not found');
            }
            
            const updatedEvent = {
                ...mockEvents[eventIndex],
                ...eventData,
                id,
                updatedAt: new Date().toISOString()
            };
            
            mockEvents[eventIndex] = updatedEvent;
            
            return {
                data: updatedEvent,
                success: true
            };
        } catch (error) {
            throw error;
        }
    }

    // Override delete method to use mock data
    async delete(id) {
        try {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 400));
            
            const eventIndex = mockEvents.findIndex(event => event.id === id);
            if (eventIndex === -1) {
                throw new Error('Event not found');
            }
            
            mockEvents.splice(eventIndex, 1);
            
            return {
                success: true,
                message: 'Event deleted successfully'
            };
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
}

export const eventService = new EventService(); 