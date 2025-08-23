// Mock event data for demonstration
export const mockEvents = [
    {
        id: 1,
        eventName: "Annual Staff Party",
        eventDescription: "Join us for our annual staff celebration with dinner, music, and fun activities for all employees.",
        eventAmount: 1500,
        eventLocation: "Grand Hotel, City Center",
        eventTime: "2024-12-25T18:00:00.000Z",
        eventStatus: "upcoming",
        maxParticipants: 100,
        createdAt: "2024-11-01T10:00:00.000Z",
        updatedAt: "2024-11-01T10:00:00.000Z"
    },
    {
        id: 2,
        eventName: "Team Building Workshop",
        eventDescription: "Enhance team collaboration and communication skills through interactive workshops and activities.",
        eventAmount: 800,
        eventLocation: "Conference Center, Business District",
        eventTime: "2024-12-15T09:00:00.000Z",
        eventStatus: "upcoming",
        maxParticipants: 50,
        createdAt: "2024-11-05T14:30:00.000Z",
        updatedAt: "2024-11-05T14:30:00.000Z"
    },
    {
        id: 3,
        eventName: "Holiday Celebration",
        eventDescription: "Celebrate the holiday season with colleagues, featuring traditional food and cultural activities.",
        eventAmount: 1200,
        eventLocation: "Community Hall, Downtown",
        eventTime: "2024-12-20T19:00:00.000Z",
        eventStatus: "upcoming",
        maxParticipants: 80,
        createdAt: "2024-11-10T11:15:00.000Z",
        updatedAt: "2024-11-10T11:15:00.000Z"
    },
    {
        id: 4,
        eventName: "Sports Tournament",
        eventDescription: "Annual inter-department sports tournament featuring cricket, football, and table tennis competitions.",
        eventAmount: 600,
        eventLocation: "Sports Complex, University Ground",
        eventTime: "2024-11-30T08:00:00.000Z",
        eventStatus: "ongoing",
        maxParticipants: 120,
        createdAt: "2024-10-15T09:45:00.000Z",
        updatedAt: "2024-10-15T09:45:00.000Z"
    },
    {
        id: 5,
        eventName: "Training Seminar",
        eventDescription: "Professional development seminar covering latest industry trends and best practices.",
        eventAmount: 1000,
        eventLocation: "Training Institute, Tech Park",
        eventTime: "2024-11-20T10:00:00.000Z",
        eventStatus: "completed",
        maxParticipants: 60,
        createdAt: "2024-10-20T16:20:00.000Z",
        updatedAt: "2024-11-20T18:00:00.000Z"
    }
];

// Mock payment data for events
export const mockEventPayments = {
    1: [
        {
            id: 1,
            eventId: 1,
            staffId: 1,
            amount: 1500,
            paymentDate: "2024-11-15",
            status: "paid",
            createdAt: "2024-11-15T10:00:00.000Z"
        },
        {
            id: 2,
            eventId: 1,
            staffId: 2,
            amount: 1500,
            paymentDate: "2024-11-16",
            status: "paid",
            createdAt: "2024-11-16T14:30:00.000Z"
        }
    ],
    2: [
        {
            id: 3,
            eventId: 2,
            staffId: 3,
            amount: 800,
            paymentDate: "2024-11-10",
            status: "paid",
            createdAt: "2024-11-10T09:15:00.000Z"
        }
    ],
    3: [],
    4: [
        {
            id: 4,
            eventId: 4,
            staffId: 1,
            amount: 600,
            paymentDate: "2024-11-25",
            status: "paid",
            createdAt: "2024-11-25T11:00:00.000Z"
        },
        {
            id: 5,
            eventId: 4,
            staffId: 4,
            amount: 600,
            paymentDate: "2024-11-26",
            status: "paid",
            createdAt: "2024-11-26T15:45:00.000Z"
        }
    ],
    5: [
        {
            id: 6,
            eventId: 5,
            staffId: 2,
            amount: 1000,
            paymentDate: "2024-11-18",
            status: "paid",
            createdAt: "2024-11-18T13:20:00.000Z"
        },
        {
            id: 7,
            eventId: 5,
            staffId: 5,
            amount: 1000,
            paymentDate: "2024-11-19",
            status: "paid",
            createdAt: "2024-11-19T10:30:00.000Z"
        }
    ]
};

// Helper function to get payments for a specific event
export const getEventPayments = (eventId) => {
    return mockEventPayments[eventId] || [];
};

// Helper function to add payment to an event
export const addEventPayment = (eventId, paymentData) => {
    const newPayment = {
        id: Date.now(),
        eventId: parseInt(eventId),
        staffId: parseInt(paymentData.staffId),
        amount: parseFloat(paymentData.amount),
        paymentDate: paymentData.paymentDate,
        status: paymentData.status || 'paid',
        createdAt: new Date().toISOString()
    };
    
    if (!mockEventPayments[eventId]) {
        mockEventPayments[eventId] = [];
    }
    
    mockEventPayments[eventId].push(newPayment);
    return newPayment;
};

// Helper function to remove payment from an event
export const removeEventPayment = (paymentId) => {
    for (const eventId in mockEventPayments) {
        const index = mockEventPayments[eventId].findIndex(p => p.id === paymentId);
        if (index !== -1) {
            mockEventPayments[eventId].splice(index, 1);
            return true;
        }
    }
    return false;
};
