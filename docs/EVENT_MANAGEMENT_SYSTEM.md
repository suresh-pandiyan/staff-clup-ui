# Event Management System with Payment Tracking

## Overview

This system provides comprehensive event management functionality with the ability to track staff payments for events. Admins can create events and manage which staff members have paid for each event.

## Features

### 1. Event Management
- **Create Events**: Admins can create new events with detailed information
- **Edit Events**: Modify existing event details
- **Delete Events**: Remove events from the system
- **View Events**: Display all events in a table format with search functionality

### 2. Event Details
Each event includes:
- **Event Name**: Title of the event
- **Event Description**: Detailed description of the event
- **Event Amount**: Cost per person for the event
- **Event Time**: Date and time when the event will occur
- **Event Location**: Venue or location of the event
- **Event Status**: Current status (upcoming, ongoing, completed, cancelled)
- **Maximum Participants**: Optional limit on number of participants
- **Created Date**: When the event was created

### 3. Payment Tracking
- **Add Payments**: Record which staff members have paid for events
- **View Payment Records**: See all payments for a specific event
- **Remove Payments**: Delete payment records if needed
- **Payment Summary**: View total amount collected vs. required amount

### 4. Staff Management
- **Select Staff**: Choose from existing staff members when adding payments
- **Payment History**: Track payment dates and amounts for each staff member
- **Payment Status**: Monitor payment status (paid, pending, etc.)

## File Structure

```
src/
├── components_v2/
│   ├── forms/
│   │   └── EventForm.jsx              # Form for creating/editing events
│   ├── modals/
│   │   └── EventPaymentModal.jsx      # Modal for managing event payments
│   └── tables/
│       └── TableEvents.jsx            # Main events table component
├── hooks/
│   └── useEvents.js                   # Event-related React Query hooks
├── services/
│   └── eventService.js                # Event API service
└── utils/
    └── mockEventData.js               # Mock data for demonstration
```

## Components

### EventForm.jsx
A comprehensive form component for creating and editing events with the following fields:
- Event Name (required)
- Event Description (required)
- Event Amount (required, numeric)
- Event Location (required)
- Event Time (required, datetime picker)
- Maximum Participants (optional, numeric)
- Event Status (dropdown: upcoming, ongoing, completed, cancelled)

### EventPaymentModal.jsx
A modal component for managing staff payments for events:
- **Event Summary**: Shows total amount, amount collected, remaining amount, and participant count
- **Add Payment Form**: Select staff member, enter payment amount and date
- **Payment Records Table**: Display all payments with staff details, amounts, and dates
- **Payment Actions**: Remove payments if needed

### TableEvents.jsx
The main events table component that:
- Displays all events in a paginated table
- Provides search functionality
- Shows event status with color-coded chips
- Includes action buttons for edit, delete, and payment management
- Handles create, edit, and delete operations

## API Endpoints

The system expects the following API endpoints:

### Events
- `GET /api/events` - Get all events
- `POST /api/events` - Create new event
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event

### Event Payments
- `GET /api/events/:id/payments` - Get payments for specific event
- `POST /api/events/:id/payments` - Add payment for event
- `DELETE /api/event-payments/:id` - Remove payment
- `PATCH /api/event-payments/:id` - Update payment

## Usage Examples

### Creating an Event
1. Click "Create Event" button
2. Fill in the event details in the form
3. Click "Create Event" to save

### Managing Event Payments
1. Click the payments icon (💰) next to any event
2. View the event summary and payment records
3. Add new payments by selecting staff member and entering amount
4. Remove payments if needed using the delete button

### Editing an Event
1. Click the edit icon (✏️) next to any event
2. Modify the event details in the form
3. Click "Update Event" to save changes

### Deleting an Event
1. Click the delete icon (🗑️) next to any event
2. Confirm the deletion in the popup dialog

## Data Models

### Event Model
```javascript
{
  id: number,
  eventName: string,
  eventDescription: string,
  eventAmount: number,
  eventLocation: string,
  eventTime: string (ISO date),
  eventStatus: 'upcoming' | 'ongoing' | 'completed' | 'cancelled',
  maxParticipants: number | null,
  createdAt: string (ISO date),
  updatedAt: string (ISO date)
}
```

### Payment Model
```javascript
{
  id: number,
  eventId: number,
  staffId: string,
  amount: number,
  paymentDate: string (YYYY-MM-DD),
  status: 'paid' | 'pending' | 'cancelled',
  createdAt: string (ISO date)
}
```

## Mock Data

The system includes mock data for demonstration purposes:
- 5 sample events with different statuses
- Sample payment records for some events
- Helper functions for managing mock data

## Future Enhancements

1. **Bulk Payment Import**: Import payment data from CSV/Excel files
2. **Payment Reports**: Generate detailed payment reports and analytics
3. **Email Notifications**: Send reminders for unpaid events
4. **Payment Methods**: Track different payment methods (cash, card, online)
5. **Refund Management**: Handle payment refunds and cancellations
6. **Event Categories**: Organize events by categories or types
7. **Recurring Events**: Support for recurring event series
8. **Event Templates**: Pre-defined event templates for common events

## Installation and Setup

1. Ensure all required dependencies are installed:
   ```bash
   npm install @mui/material @mui/x-date-pickers date-fns
   ```

2. Import the components in your application:
   ```javascript
   import TableEvents from './components_v2/tables/TableEvents';
   ```

3. Use the component in your page:
   ```javascript
   function EventsPage() {
     return (
       <div>
         <h1>Events Management</h1>
         <TableEvents />
       </div>
     );
   }
   ```

## Notes

- The current implementation uses mock data for demonstration
- Replace mock data calls with actual API calls when backend is ready
- Ensure proper error handling and loading states are implemented
- Add proper validation and security measures for production use

