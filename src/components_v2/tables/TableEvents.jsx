"use client";

import React from "react";
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
    CircularProgress,
    Grid,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { useEvents, useCreateEvent, useUpdateEvent, useDeleteEvent } from "../../hooks/useEvents";
import { Link } from 'react-router-dom';
import EventForm from "../forms/EventForm";
import { useApp } from "../../contexts/AppContext";
import { useDebounce } from "../../hooks/useDebounce";
import { useCallback } from "react";
import {commonCancelStyles} from "../styles/commonStyles"


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
    const [page, setPage] = React.useState(0);
    const [searchQuery, setSearchQuery] = React.useState("");
    const [openCreateDialog, setOpenCreateDialog] = React.useState(false);
    const [openEditDialog, setOpenEditDialog] = React.useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
    const [selectedEvent, setSelectedEvent] = React.useState(null);
    const [editingEvent, setEditingEvent] = React.useState(null);
    const [deleteEventId, setDeleteEventId] = React.useState(null);
    const [snackbar, setSnackbar] = React.useState({
        open: false,
        message: '',
        severity: 'success'
    });
    const debounceSearch = useDebounce(searchQuery);
    const [isPaginationLoading, setIsPaginationLoading] = React.useState(false);
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const { selectedFinancialYear } = useApp();

    // Static rows per page since backend handles the limit
    const rowsPerPage = 10;

    // Build pagination parameters for the API call
    const paginationParams = {
        page,
        search: debounceSearch
        // rowsPerPage is not needed since backend has fixed limit of 10
    };
    const { data: events, refetch, isLoading: eventsLoading, error: eventsError } = useEvents(
        selectedFinancialYear?.id,
        paginationParams
    );

    // Refetch data when pagination parameters change
    React.useEffect(() => {
        if (selectedFinancialYear?.id) {
            refetch();
        }
    }, [page, debounceSearch, selectedFinancialYear?.id, refetch]);

    // Reset pagination loading when data is loaded
    React.useEffect(() => {
        if (!eventsLoading && events) {
            setIsPaginationLoading(false);
        }
    }, [eventsLoading, events]);


    const createEventMutation = useCreateEvent();
    const updateEventMutation = useUpdateEvent();
  //  const deleteEventMutation = useDeleteEvent();
    const { mutateAsync: deleteEventMutation, isPending: deleteEventLoading } = useDeleteEvent();

    const handleChangePage = (event, newPage) => {
        setIsPaginationLoading(true);
        setPage(newPage);
        // Scroll to top of table for better UX
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    // No need for handleChangeRowsPerPage since rowsPerPage is static
    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
        setPage(0); // Reset to first page when searching
    };

    const handleOpenCreateDialog = () => {
        setOpenCreateDialog(true);
    };

    const handleCloseCreateDialog = () => {
        setOpenCreateDialog(false);
        setOpenDeleteDialog(false)
    };

    const handleOpenEditDialog = (event) => {
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

    const handleCreateEvent = useCallback(async (formData) => {
        // Prevent double submission
        if (createEventMutation.isPending || isSubmitting) {
            return;
        }
        // Set submitting state immediately
        setIsSubmitting(true);
        try {
            // Disable the form immediately to prevent double submission
            const result = await createEventMutation.mutateAsync(formData);
            // Only proceed if we get a successful result
            if (result && result.success !== false) {
                setSnackbar({
                    open: true,
                    message: 'Event created successfully!',
                    severity: 'success'
                });
                handleCloseCreateDialog();
                refetch();
            } else {
                throw new Error('Event creation failed');
            }
        } catch (error) {
            console.error('Error creating event:', error);
            setSnackbar({
                open: true,
                message: error.message || 'Failed to create event. Please try again.',
                severity: 'error'
            });
        } finally {
            setIsSubmitting(false);
        }
    }, [createEventMutation, isSubmitting, handleCloseCreateDialog, refetch]);

    const handleUpdateEvent = useCallback(async (formData) => {
        // Prevent double submission
        if (updateEventMutation.isPending || isSubmitting) {
            return;
        }

        // Set submitting state immediately
        setIsSubmitting(true);

        console.log('Update event called with:', { id: selectedEvent.id, formData });
        try {
            const result = await updateEventMutation.mutateAsync({ id: selectedEvent.id, ...formData });

            // Only proceed if we get a successful result
            if (result && result.success !== false) {
                setSnackbar({
                    open: true,
                    message: 'Event updated successfully!',
                    severity: 'success'
                });

                handleCloseEditDialog();
                refetch();
            } else {
                throw new Error('Event update failed');
            }
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
        } finally {
            // Always reset submitting state
            setIsSubmitting(false);
        }
    }, [updateEventMutation, isSubmitting, selectedEvent, handleCloseEditDialog, refetch]);

  
    const onSubmitDeleteEvent = async () => {
            try {
                await deleteEventMutation(deleteEventId);
                setSnackbar({
                    open: true,
                    message: 'Event deleted successfully!',
                    severity: 'success'
                });
                refetch();
            } catch (error) {
                setSnackbar({
                    open: true,
                    message: error.message || 'Failed to delete event. Please try again.',
                    severity: 'error'
                });
            }
            finally{
                setOpenDeleteDialog(false);
            }
    };

    const handleDeleteEvent = (id) => {
        setOpenDeleteDialog(true);
        setDeleteEventId(id);
    }

    const handleCloseSnackbar = () => {
        setSnackbar(prev => ({ ...prev, open: false }));
    };



    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            // year: 'numeric',
            month: 'short',
            day: 'numeric',
            // hour: '2-digit',
            // minute: '2-digit'
        });
    };




    // Get total count from API response or fallback to current data length
    const totalCount = events?.total || events?.data?.length || 0;
    const currentData = events?.data || [];

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
                    <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                        <form className="t-search-form" style={{ maxWidth: "300px" }}>
                            <label>
                                <i className="material-symbols-outlined">search</i>
                            </label>
                            <input
                                type="text"
                                className="t-input"
                                placeholder="Search events..."
                                value={searchQuery}
                                onChange={handleSearch}
                            />
                        </form>
                    </Box>
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
                                        padding: "10px 20px",
                                        fontSize: "14px",
                                    },
                                }}
                            >
                                <TableCell className="text-black border-bottom">
                                    Name
                                </TableCell>
                                <TableCell className="text-black border-bottom">
                                    Description
                                </TableCell>
                                <TableCell className="text-black border-bottom">
                                    Amount
                                </TableCell>
                                <TableCell className="text-black border-bottom">
                                    Time
                                </TableCell>
                                <TableCell className="text-black border-bottom">
                                    Location
                                </TableCell>
                                <TableCell className="text-black border-bottom">
                                    Status
                                </TableCell>
                                <TableCell className="text-black border-bottom">
                                    Created - Ended
                                </TableCell>
                                <TableCell className="text-black border-bottom" >
                                    Amount Collected
                                </TableCell>
                                <TableCell className="text-black border-bottom">
                                    Actions
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {eventsLoading || isPaginationLoading ? (
                                <TableRow>
                                    <TableCell colSpan={9} align="center" sx={{ py: 4 }}>
                                        <Typography>Loading events...</Typography>
                                    </TableCell>
                                </TableRow>
                            ) : eventsError ? (
                                <TableRow>
                                    <TableCell colSpan={9} align="center" sx={{ py: 4 }}>
                                        <Typography color="error">
                                            Error loading events: {eventsError.message}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ) : !events || currentData?.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={9} align="center" sx={{ py: 4 }}>
                                        <Box sx={{ textAlign: 'center' }}>
                                            <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                                                No events found
                                            </Typography>
                                            {debounceSearch && (
                                                <Typography variant="body2" color="text.secondary">
                                                    Try adjusting your search criteria
                                                </Typography>
                                            )}
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                currentData && currentData.map((row) => (
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
                                                ₹{row.eventAmount}
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
                                        <TableCell className="border-bottom">
                                            <div
                                                className={`trezo-badge ${row.status === 'active' ? 'inProgress' : 'trezo-badge'}`}
                                                style={{ fontSize: '8px', width: '57px' }}
                                            >
                                                {row.status === 'active' ? 'In Progress' : 'Resolved'}
                                            </div>
                                        </TableCell>
                                        <TableCell className="border-bottom">
                                            {formatDate(row.createdAt)} - {formatDate(row.eventClosed)}
                                        </TableCell>
                                        <TableCell className="border-bottom">
                                            ₹{row.amountCollected.toLocaleString()}
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
                                                    title={"Edit Event"}
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
                                <TableCell colSpan={9} sx={{ border: "none", p: 0 }}>
                                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", px: 2 }}>
                                        {isPaginationLoading && (
                                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                <CircularProgress size={16} />
                                                <Typography variant="body2" color="text.secondary">
                                                    Loading...
                                                </Typography>
                                            </Box>
                                        )}
                                    </Box>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan={9} sx={{ border: "none", p: 0 }}>
                                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                        <TablePagination
                                            rowsPerPageOptions={[10]} // Only 10 since backend has fixed limit
                                            count={totalCount}
                                            rowsPerPage={10} // Fixed to 10
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
                                            ActionsComponent={TablePaginationActions}
                                            sx={{
                                                border: "none",
                                                "& .MuiTablePagination-root": {
                                                    border: "none",
                                                },
                                                "& .MuiTableCell-root": {
                                                    border: "none",
                                                    padding: "8px 0",
                                                }
                                            }}
                                        />
                                    </Box>
                                </TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            </Card>
            {/* Create Event Dialog */}
            <Dialog
                open={openCreateDialog}
                onClose={(createEventMutation.isPending || isSubmitting) ? undefined : handleCloseCreateDialog}
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
                        loading={createEventMutation.isPending || isSubmitting}
                    />
                </DialogContent>
            </Dialog>
            {/* Edit Event Dialog */}
            <Dialog
                open={openEditDialog}
                onClose={(updateEventMutation.isPending || isSubmitting) ? undefined : handleCloseEditDialog}
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
                        loading={updateEventMutation.isPending || isSubmitting}
                        isEdit={true}
                        defaultValues={editingEvent}
                    />
                </DialogContent>
            </Dialog>
            {/* Delete Emergency Fund dialog */}
            < Dialog
                open={openDeleteDialog}
                onClose={''}
                maxWidth="lg"
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
                    fontSize: "16px",
                    fontWeight: 600
                }}>
                    Are you sure you want to delete the Event
                </DialogTitle>
                <DialogContent sx={{ pt: 3 }}>
                    <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
                        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 3 }}>
                            <Button
                                variant="outlined"
                                onClick={handleCloseCreateDialog}
                              disabled={deleteEventLoading}
                                sx={commonCancelStyles}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                color="error"
                                sx={{
                                    color: "#fff !important",
                                }}
                                onClick={onSubmitDeleteEvent}
                             disabled={deleteEventLoading}
                            >
                                {deleteEventLoading ? 'Deleting...' : 'Delete'}
                            </Button>
                        </Box>
                    </Grid>
                </DialogContent>
            </Dialog >

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
