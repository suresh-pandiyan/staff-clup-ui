import { useApiQuery, useApiMutation } from './index';
import { eventService } from '../services';

// Event-related hooks
export const useEvents = (params = {}) => {
    return useApiQuery(
        ['events', params],
        () => eventService.getAll(params),
        { staleTime: 2 * 60 * 1000 } // 2 minutes
    );
};

export const useEvent = (id) => {
    return useApiQuery(
        ['event', id],
        () => eventService.getById(id),
        {
            enabled: !!id,
            staleTime: 2 * 60 * 1000,
        }
    );
};

export const useCreateEvent = () => {
    return useApiMutation(
        (eventData) => eventService.create(eventData),
        {
            invalidateQueries: [['events']],
        }
    );
};

export const useUpdateEvent = () => {
    return useApiMutation(
        ({ id, ...eventData }) => eventService.update(id, eventData),
        {
            invalidateQueries: [['events'], ['event']],
        }
    );
};

export const useDeleteEvent = () => {
    return useApiMutation(
        (id) => eventService.delete(id),
        {
            invalidateQueries: [['events']],
        }
    );
};

export const useUpcomingEvents = () => {
    return useApiQuery(
        ['events', 'upcoming'],
        () => eventService.getUpcomingEvents(),
        { staleTime: 2 * 60 * 1000 }
    );
};

export const usePastEvents = () => {
    return useApiQuery(
        ['events', 'past'],
        () => eventService.getPastEvents(),
        { staleTime: 5 * 60 * 1000 }
    );
};

export const useRegisterForEvent = () => {
    return useApiMutation(
        ({ eventId, userId }) => eventService.registerForEvent(eventId, userId),
        {
            invalidateQueries: [['events'], ['event']],
        }
    );
};

export const useCancelEventRegistration = () => {
    return useApiMutation(
        ({ eventId, userId }) => eventService.cancelRegistration(eventId, userId),
        {
            invalidateQueries: [['events'], ['event']],
        }
    );
}; 