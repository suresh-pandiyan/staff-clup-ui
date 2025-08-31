"use client";

import React, { useState } from "react";
import {
    Card,
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TablePagination,
    TableRow,
    Paper,
    IconButton,
    TableHead,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    Alert,
    Snackbar,
    Chip,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { useEvents, useCreateEvent, useUpdateEvent, useDeleteEvent } from "../../hooks/useEvents";
import { Link } from 'react-router-dom';
import EventForm from "../forms/EventForm";
import { useApp } from "../../contexts/AppContext";


function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    return (
        <Box
            sx={{
                flexShrink: 0,
                display: "flex",
                gap: "10px",
                padding: "0 20px",
            }}
        >
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
                sx={{
                    borderRadius: "4px",
                    padding: "4px",
                }}
                className="border"
            >
                {theme.direction === "rtl" ? (
                    <KeyboardArrowRight />
                ) : (
                    <KeyboardArrowLeft />
                )}
            </IconButton>

            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
                sx={{
                    borderRadius: "4px",
                    padding: "4px",
                }}
                className="border"
            >
                {theme.direction === "rtl" ? (
                    <KeyboardArrowLeft />
                ) : (
                    <KeyboardArrowRight />
                )}
            </IconButton>
        </Box>
    );
}

const TableEvents = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState("");
    const [openCreateDialog, setOpenCreateDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [editingEvent, setEditingEvent] = useState(null);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });
    const { selectedFinancialYear } = useApp();
    const { data: events, refetch, isLoading: eventsLoading, error: eventsError } = useEvents(selectedFinancialYear?.id);
    const createEventMutation = useCreateEvent();
    const updateEventMutation = useUpdateEvent();
    const deleteEventMutation = useDeleteEvent();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value.toLowerCase());
    };

    const handleOpenCreateDialog = () => {
        setOpenCreateDialog(true);
    };

    const handleCloseCreateDialog = () => {
        setOpenCreateDialog(false);
    };

    const handleOpenEditDialog = (event) => {
        // Check if event is closed and prevent editing
        const eventClosedDate = event.eventClosed ? new Date(event.eventClosed) : null;
        const today = new Date();

        if (eventClosedDate && eventClosedDate < today) {
            setSnackbar({
                open: true,
                message: 'Cannot edit closed events. The event date has passed.',
                severity: 'warning'
            });
            return;
        }

        // Format the event data for the form
        const formattedEvent = {
            ...event,
            // Format eventClosed for the date input field (YYYY-MM-DD)
            eventClosed: event.eventClosed ? new Date(event.eventClosed).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
            // Ensure financeYearId is properly set - extract ID from object if needed
            financeYearId: (() => {
                const financeYear = event.financeYearId || event.financialYearId || event.financeYear || event.financialYear;
                if (typeof financeYear === 'string') {
                    return financeYear;
                } else if (financeYear && typeof financeYear === 'object') {
                    return financeYear.id || financeYear._id;
                }
                return null;
            })()
        };

        setSelectedEvent(event);
        setEditingEvent(formattedEvent);
        setOpenEditDialog(true);
    };

    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
        setSelectedEvent(null);
        setEditingEvent(null);
    };

    const handleCreateEvent = async (formData) => {
        try {
            await createEventMutation.mutateAsync(formData);

            setSnackbar({
                open: true,
                message: 'Event created successfully!',
                severity: 'success'
            });
            handleCloseCreateDialog();
            refetch();
        } catch (error) {
            console.error('Error creating event:', error);
            setSnackbar({
                open: true,
                message: error.message || 'Failed to create event. Please try again.',
                severity: 'error'
            });
        }
    };

    const handleUpdateEvent = async (formData) => {
        console.log('Update event called with:', { id: selectedEvent.id, formData });
        try {
            await updateEventMutation.mutateAsync({ id: selectedEvent.id, ...formData });

            setSnackbar({
                open: true,
                message: 'Event updated successfully!',
                severity: 'success'
            });

            handleCloseEditDialog();
            refetch();
        } catch (error) {
            // Handle specific error cases
            let errorMessage = 'Failed to update event. Please try again.';
            if (error.message) {
                errorMessage = error.message;
            } else if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.data?.message) {
                errorMessage = error.data.message;
            }

            // Check for specific closed event error
            if (errorMessage.toLowerCase().includes('closed event') || errorMessage.toLowerCase().includes('cannot update')) {
                errorMessage = 'Cannot update closed events. The event date has passed and cannot be modified.';
            }

            setSnackbar({
                open: true,
                message: errorMessage,
                severity: 'error'
            });
        }
    };

    const handleDeleteEvent = async (eventId) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            try {
                await deleteEventMutation.mutateAsync(eventId);

                setSnackbar({
                    open: true,
                    message: 'Event deleted successfully!',
                    severity: 'success'
                });

                refetch();
            } catch (error) {
                console.error('Error deleting event:', error);
                setSnackbar({
                    open: true,
                    message: error.message || 'Failed to delete event. Please try again.',
                    severity: 'error'
                });
            }
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar(prev => ({ ...prev, open: false }));
    };

    // const getStatusColor = (status) => {
    //     switch (status) {
    //         case 'upcoming': return 'primary';
    //         case 'ongoing': return 'warning';
    //         case 'completed': return 'success';
    //         case 'cancelled': return 'error';
    //         default: return 'default';
    //     }
    // };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            // year: 'numeric',
            month: 'short',
            day: 'numeric',
            // hour: '2-digit',
            // minute: '2-digit'
        });
    };

    // const isEventClosed = (event) => {
    //     console.log(event, 'event');

    //     if (!event.eventClosed) return false;
    //     const eventClosedDate = new Date(event.eventClosed);
    //     const today = new Date();
    //     return eventClosedDate < today;
    // };

    const isEventClosed = (event) => {
        // If the event does not have a closed date, it is not closed.
        if (!event.eventClosed) {
            return false;
        }

        // Create new Date objects for the closed date and today's date.
        // This is important to avoid modifying the original data.
        const eventClosedDate = new Date(event.eventClosed);
        const today = new Date();

        // Reset the time for both dates to midnight (00:00:00.000)
        // to compare only the day, month, and year.
        eventClosedDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);

        // The event is closed if its closing date is on or before today.
        return eventClosedDate <= today;
    };

    return (
        <>
            <Card
                sx={{
                    boxShadow: "none",
                    borderRadius: "7px",
                    mb: "25px",
                    padding: { xs: "18px", sm: "20px", lg: "25px" },
                }}
                className="rmui-card"
            >
                <Box mb="25px" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <form className="t-search-form" style={{ flex: 1, maxWidth: "400px" }}>
                        <label>
                            <i className="material-symbols-outlined">search</i>
                        </label>
                        <input
                            type="text"
                            className="t-input"
                            placeholder="Search here....."
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                    </form>
                    <Button
                        variant="contained"
                        onClick={handleOpenCreateDialog}
                        sx={{
                            backgroundColor: "#1976d2",
                            color: "white",
                            textTransform: "none",
                            borderRadius: "8px",
                            px: 3,
                            py: 1.5,
                            fontWeight: 500,
                            "&:hover": {
                                backgroundColor: "#1565c0",
                            },
                        }}
                        startIcon={<i className="material-symbols-outlined" style={{ fontSize: "20px" }}>add</i>}
                    >
                        Create Event
                    </Button>
                </Box>

                {/* Table */}
                <TableContainer
                    component={Paper}
                    sx={{
                        boxShadow: "none",
                        borderRadius: "7px",
                    }}
                    className="rmui-table border"
                >
                    <Table sx={{ minWidth: 750 }} aria-label="Recent Leads Table">
                        <TableHead className="bg-primary-50">
                            <TableRow
                                sx={{
                                    th: {
                                        fontWeight: "500",
                                        padding: "10px 24px",
                                        fontSize: "14px",
                                    },
                                }}
                            >
                                <TableCell className="text-black border-bottom">
                                    Event Name
                                </TableCell>
                                <TableCell className="text-black border-bottom">
                                    Event Description
                                </TableCell>
                                <TableCell className="text-black border-bottom">
                                    Event Amount
                                </TableCell>
                                <TableCell className="text-black border-bottom">
                                    Event Time
                                </TableCell>
                                <TableCell className="text-black border-bottom">
                                    Event Location
                                </TableCell>
                                <TableCell className="text-black border-bottom">
                                    Status
                                </TableCell>
                                <TableCell className="text-black border-bottom">
                                    Created
                                </TableCell>
                                <TableCell className="text-black border-bottom">
                                    Ended
                                </TableCell>
                                <TableCell className="text-black border-bottom">
                                    Actions
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {eventsLoading ? (
                                <TableRow>
                                    <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                                        <Typography>Loading events...</Typography>
                                    </TableCell>
                                </TableRow>
                            ) : eventsError ? (
                                <TableRow>
                                    <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                                        <Typography color="error">
                                            Error loading events: {eventsError.message}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ) : !events || events.data?.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                                        <Typography>No events found</Typography>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                events && events.data.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        sx={{
                                            "& td": {
                                                padding: "15px 20px",
                                                fontSize: "14px",
                                            },
                                        }}
                                    >
                                        <TableCell className="border-bottom">
                                            <Typography
                                                sx={{
                                                    fontSize: "15px",
                                                    fontWeight: "500",
                                                }}
                                                className="text-black"
                                            >
                                                {row.eventName}
                                            </Typography>
                                        </TableCell>

                                        <TableCell className="border-bottom">
                                            <Typography
                                                sx={{
                                                    fontSize: "14px",
                                                    color: "text.secondary",
                                                    maxWidth: "200px",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    whiteSpace: "nowrap",
                                                }}
                                            >
                                                {row.eventDescription}
                                            </Typography>
                                        </TableCell>

                                        <TableCell className="border-bottom">
                                            <Typography
                                                sx={{
                                                    fontSize: "12px",
                                                    fontWeight: "500",
                                                    color: "primary.main",
                                                    textAlign: 'center'
                                                }}
                                            >
                                                ${row.eventAmount}
                                            </Typography>
                                        </TableCell>
                                        <TableCell className="border-bottom">
                                            <Typography
                                                sx={{
                                                    fontSize: "12px",
                                                    fontWeight: "500",
                                                    color: "primary.main",
                                                    textAlign: 'center'
                                                }}
                                            >
                                                {row.eventTime} {row.eventTime < '12.00' ? "AM" : "PM"}
                                            </Typography>
                                        </TableCell>
                                        <TableCell className="border-bottom">
                                            {row.eventLocation}
                                        </TableCell>
                                        {/* <Chip
                                                label={row.eventStatus}
                                                color={getStatusColor(row.eventStatus)}
                                                size="small"
                                            /> */}
                                        <TableCell className="border-bottom">
                                            <div
                                                className={`trezo-badge  ${isEventClosed(row) ? 'trezo-badge' : 'inProgress'}`}
                                                style={{ fontSize: '8px', width: '57px' }}
                                            >
                                                {isEventClosed(row) ? 'Resolved' : 'In Progress'}
                                            </div>
                                        </TableCell>
                                        <TableCell className="border-bottom">
                                            {formatDate(row.createdAt)}
                                        </TableCell>
                                        <TableCell className="border-bottom">
                                            {formatDate(row.eventClosed)}
                                        </TableCell>
                                        <TableCell className="border-bottom">
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 1,
                                                }}
                                            >
                                                <Link to={`/events/contributors/${row?._id}`}>
                                                    <IconButton
                                                        aria-label="contributors"
                                                        color="primary"
                                                        sx={{ padding: "5px" }}
                                                        title="Manage Contributors"
                                                    >
                                                        <i
                                                            className="material-symbols-outlined"
                                                            style={{ fontSize: "16px" }}
                                                        >
                                                            payments
                                                        </i>
                                                    </IconButton>
                                                </Link>
                                                <IconButton
                                                    aria-label="edit"
                                                    color="secondary"
                                                    sx={{ padding: "5px" }}
                                                    onClick={() => handleOpenEditDialog(row)}
                                                    disabled={isEventClosed(row)}
                                                    title={isEventClosed(row) ? "Cannot edit closed event" : "Edit Event"}
                                                >
                                                    <i
                                                        className="material-symbols-outlined"
                                                        style={{ fontSize: "16px" }}
                                                    >
                                                        edit
                                                    </i>
                                                </IconButton>

                                                <IconButton
                                                    aria-label="delete"
                                                    color="error"
                                                    sx={{ padding: "5px" }}
                                                    onClick={() => handleDeleteEvent(row.id)}
                                                    disabled={isEventClosed(row)}
                                                    title="Delete Event"
                                                >
                                                    <i
                                                        className="material-symbols-outlined"
                                                        style={{ fontSize: "16px" }}
                                                    >
                                                        delete
                                                    </i>
                                                </IconButton>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>

                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                                    colSpan={8}
                                    count={events?.data?.length || 0}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    slotProps={{
                                        select: {
                                            inputProps: {
                                                "aria-label": "rows per page",
                                            },
                                            native: true,
                                        },
                                    }}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                    ActionsComponent={TablePaginationActions}
                                    sx={{
                                        border: "none",
                                    }}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            </Card>

            {/* Create Event Dialog */}
            <Dialog
                open={openCreateDialog}
                onClose={createEventMutation.isPending ? undefined : handleCloseCreateDialog}
                maxWidth="lg"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: "12px",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                        maxHeight: "90vh",
                    }
                }}
            >
                <DialogTitle sx={{
                    pb: 1,
                    borderBottom: "1px solid #e0e0e0",
                    fontSize: "20px",
                    fontWeight: 600
                }}>
                    Create New Event
                </DialogTitle>
                <DialogContent sx={{ pt: 3 }}>
                    <EventForm
                        onSubmit={handleCreateEvent}
                        onCancel={handleCloseCreateDialog}
                        loading={createEventMutation.isPending}
                    />
                </DialogContent>
            </Dialog>

            {/* Edit Event Dialog */}
            <Dialog
                open={openEditDialog}
                onClose={updateEventMutation.isPending ? undefined : handleCloseEditDialog}
                maxWidth="lg"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: "12px",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                        maxHeight: "90vh",
                    }
                }}
            >
                <DialogTitle sx={{
                    pb: 1,
                    borderBottom: "1px solid #e0e0e0",
                    fontSize: "20px",
                    fontWeight: 600
                }}>
                    Edit Event
                </DialogTitle>
                <DialogContent sx={{ pt: 3 }}>
                    <EventForm
                        onSubmit={handleUpdateEvent}
                        onCancel={handleCloseEditDialog}
                        loading={updateEventMutation.isPending}
                        isEdit={true}
                        defaultValues={editingEvent}
                    />
                </DialogContent>
            </Dialog>



            {/* Snackbar for notifications */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </>
    );
};

export default TableEvents;
