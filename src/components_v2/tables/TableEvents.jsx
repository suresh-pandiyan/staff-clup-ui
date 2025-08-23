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
import EventForm from "../forms/EventForm";
import EventPaymentModal from "../modals/EventPaymentModal";
import { eventService } from "../../services/eventService";

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
    const [openPaymentModal, setOpenPaymentModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    const { data: events, refetch, isLoading: eventsLoading, error: eventsError } = useEvents();
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
        setSelectedEvent(event);
        setOpenEditDialog(true);
    };

    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
        setSelectedEvent(null);
    };

    const handleOpenPaymentModal = (event) => {
        setSelectedEvent(event);
        setOpenPaymentModal(true);
    };

    const handleClosePaymentModal = () => {
        setOpenPaymentModal(false);
        setSelectedEvent(null);
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
            console.error('Error updating event:', error);
            setSnackbar({
                open: true,
                message: error.message || 'Failed to update event. Please try again.',
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

    const getStatusColor = (status) => {
        switch (status) {
            case 'upcoming': return 'primary';
            case 'ongoing': return 'warning';
            case 'completed': return 'success';
            case 'cancelled': return 'error';
            default: return 'default';
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
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
                        <TableHead className="bg-f6f7f9">
                            <TableRow
                                sx={{
                                    "& th": {
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
                                                    fontSize: "15px",
                                                    fontWeight: "500",
                                                    color: "primary.main",
                                                }}
                                            >
                                                ₹{row.eventAmount}
                                            </Typography>
                                        </TableCell>

                                        <TableCell className="border-bottom">
                                            {formatDate(row.eventTime)}
                                        </TableCell>

                                        <TableCell className="border-bottom">
                                            {row.eventLocation}
                                        </TableCell>

                                        <TableCell className="border-bottom">
                                            <Chip
                                                label={row.eventStatus}
                                                color={getStatusColor(row.eventStatus)}
                                                size="small"
                                            />
                                        </TableCell>

                                        <TableCell className="border-bottom">
                                            {formatDate(row.createdAt)}
                                        </TableCell>

                                        <TableCell className="border-bottom">
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 1,
                                                }}
                                            >
                                                <IconButton
                                                    aria-label="payments"
                                                    color="primary"
                                                    sx={{ padding: "5px" }}
                                                    onClick={() => handleOpenPaymentModal(row)}
                                                    title="Manage Payments"
                                                >
                                                    <i
                                                        className="material-symbols-outlined"
                                                        style={{ fontSize: "16px" }}
                                                    >
                                                        payments
                                                    </i>
                                                </IconButton>

                                                <IconButton
                                                    aria-label="edit"
                                                    color="secondary"
                                                    sx={{ padding: "5px" }}
                                                    onClick={() => handleOpenEditDialog(row)}
                                                    title="Edit Event"
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
                        initialData={selectedEvent}
                    />
                </DialogContent>
            </Dialog>

            {/* Event Payment Modal */}
            <EventPaymentModal
                open={openPaymentModal}
                onClose={handleClosePaymentModal}
                event={selectedEvent}
            />

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
