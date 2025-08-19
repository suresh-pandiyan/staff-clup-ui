import { BaseService } from './baseService';

export class EventService extends BaseService {
    constructor() {
        super('events');
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
}

export const eventService = new EventService(); 