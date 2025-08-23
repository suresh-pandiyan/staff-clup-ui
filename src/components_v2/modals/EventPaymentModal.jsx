import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    Box,
    Typography,
    Chip,
    IconButton,
    Alert,
    Snackbar,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid,
} from "@mui/material";
import { useUsers } from "../../hooks/useUsers";
import { eventService } from "../../services/eventService";

const EventPaymentModal = ({ open, onClose, event }) => {
    const [payments, setPayments] = useState([]);
    const [selectedStaff, setSelectedStaff] = useState("");
    const [paymentAmount, setPaymentAmount] = useState("");
    const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split('T')[0]);
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    const { data: users, isLoading: usersLoading } = useUsers();

    useEffect(() => {
        if (open && event) {
            loadEventPayments();
        }
    }, [open, event]);

    const loadEventPayments = async () => {
        try {
            setLoading(true);
            // This would be an API call to get payments for the specific event
            const response = await eventService.getEventPayments(event.id);
            setPayments(response.data || []);
        } catch (error) {
            console.error('Error loading event payments:', error);
            setSnackbar({
                open: true,
                message: 'Failed to load payments',
                severity: 'error'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleAddPayment = async () => {
        if (!selectedStaff || !paymentAmount || !paymentDate) {
            setSnackbar({
                open: true,
                message: 'Please fill in all fields',
                severity: 'warning'
            });
            return;
        }

        try {
            setLoading(true);
            
            const paymentData = {
                eventId: event.id,
                staffId: selectedStaff,
                amount: parseFloat(paymentAmount),
                paymentDate: paymentDate,
                status: 'paid'
            };

            // This would be an API call to add payment
            await eventService.addEventPayment(paymentData);
            
            // Refresh payments list
            await loadEventPayments();
            
            // Reset form
            setSelectedStaff("");
            setPaymentAmount("");
            setPaymentDate(new Date().toISOString().split('T')[0]);
            
            setSnackbar({
                open: true,
                message: 'Payment added successfully',
                severity: 'success'
            });
        } catch (error) {
            console.error('Error adding payment:', error);
            setSnackbar({
                open: true,
                message: 'Failed to add payment',
                severity: 'error'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleRemovePayment = async (paymentId) => {
        try {
            setLoading(true);
            await eventService.removeEventPayment(paymentId);
            await loadEventPayments();
            
            setSnackbar({
                open: true,
                message: 'Payment removed successfully',
                severity: 'success'
            });
        } catch (error) {
            console.error('Error removing payment:', error);
            setSnackbar({
                open: true,
                message: 'Failed to remove payment',
                severity: 'error'
            });
        } finally {
            setLoading(false);
        }
    };

    const getStaffName = (staffId) => {
        if (!users?.data) return 'Unknown';
        const staff = users.data.find(user => user.id === staffId);
        return staff ? `${staff.firstName} ${staff.lastName}` : 'Unknown';
    };

    const getTotalPaid = () => {
        return payments.reduce((total, payment) => total + payment.amount, 0);
    };

    const getRemainingAmount = () => {
        return event.eventAmount - getTotalPaid();
    };

    const handleCloseSnackbar = () => {
        setSnackbar(prev => ({ ...prev, open: false }));
    };

    if (!event) return null;

    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
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
                    Event Payment Tracking - {event.eventName}
                </DialogTitle>
                
                <DialogContent sx={{ pt: 3 }}>
                    <Grid container spacing={3}>
                        {/* Event Summary */}
                        <Grid item xs={12}>
                            <Box sx={{ 
                                p: 2, 
                                bgcolor: 'grey.50', 
                                borderRadius: 2,
                                mb: 3 
                            }}>
                                <Typography variant="h6" sx={{ mb: 2 }}>
                                    Event Summary
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={3}>
                                        <Typography variant="body2" color="text.secondary">
                                            Total Amount
                                        </Typography>
                                        <Typography variant="h6" color="primary">
                                            ₹{event.eventAmount}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <Typography variant="body2" color="text.secondary">
                                            Total Paid
                                        </Typography>
                                        <Typography variant="h6" color="success.main">
                                            ₹{getTotalPaid()}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <Typography variant="body2" color="text.secondary">
                                            Remaining
                                        </Typography>
                                        <Typography variant="h6" color={getRemainingAmount() > 0 ? "error.main" : "success.main"}>
                                            ₹{getRemainingAmount()}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <Typography variant="body2" color="text.secondary">
                                            Participants
                                        </Typography>
                                        <Typography variant="h6">
                                            {payments.length}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>

                        {/* Add Payment Form */}
                        <Grid item xs={12}>
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                Add Payment
                            </Typography>
                            <Box sx={{ 
                                p: 2, 
                                border: '1px solid #e0e0e0', 
                                borderRadius: 2,
                                mb: 3 
                            }}>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs={12} md={4}>
                                        <FormControl fullWidth>
                                            <InputLabel>Select Staff Member</InputLabel>
                                            <Select
                                                value={selectedStaff}
                                                onChange={(e) => setSelectedStaff(e.target.value)}
                                                label="Select Staff Member"
                                                disabled={loading}
                                            >
                                                {users?.data?.map((user) => (
                                                    <MenuItem key={user.id} value={user.id}>
                                                        {user.firstName} {user.lastName} ({user.employeeId})
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <TextField
                                            fullWidth
                                            label="Payment Amount"
                                            type="number"
                                            value={paymentAmount}
                                            onChange={(e) => setPaymentAmount(e.target.value)}
                                            disabled={loading}
                                            InputProps={{
                                                startAdornment: <span style={{ marginRight: 8 }}>₹</span>,
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <TextField
                                            fullWidth
                                            label="Payment Date"
                                            type="date"
                                            value={paymentDate}
                                            onChange={(e) => setPaymentDate(e.target.value)}
                                            disabled={loading}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            onClick={handleAddPayment}
                                            disabled={loading || !selectedStaff || !paymentAmount}
                                            sx={{ height: 56 }}
                                        >
                                            Add Payment
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>

                        {/* Payments Table */}
                        <Grid item xs={12}>
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                Payment Records
                            </Typography>
                            <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #e0e0e0' }}>
                                <Table>
                                    <TableHead sx={{ bgcolor: 'grey.50' }}>
                                        <TableRow>
                                            <TableCell>Staff Member</TableCell>
                                            <TableCell>Employee ID</TableCell>
                                            <TableCell>Amount</TableCell>
                                            <TableCell>Payment Date</TableCell>
                                            <TableCell>Status</TableCell>
                                            <TableCell>Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {loading ? (
                                            <TableRow>
                                                <TableCell colSpan={6} align="center">
                                                    Loading payments...
                                                </TableCell>
                                            </TableRow>
                                        ) : payments.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={6} align="center">
                                                    No payments recorded yet
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            payments.map((payment) => (
                                                <TableRow key={payment.id}>
                                                    <TableCell>
                                                        {getStaffName(payment.staffId)}
                                                    </TableCell>
                                                    <TableCell>
                                                        {users?.data?.find(u => u.id === payment.staffId)?.employeeId || 'N/A'}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography variant="body2" fontWeight="500">
                                                            ₹{payment.amount}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        {new Date(payment.paymentDate).toLocaleDateString()}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Chip 
                                                            label={payment.status} 
                                                            color={payment.status === 'paid' ? 'success' : 'warning'}
                                                            size="small"
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <IconButton
                                                            size="small"
                                                            color="error"
                                                            onClick={() => handleRemovePayment(payment.id)}
                                                            disabled={loading}
                                                        >
                                                            <i className="material-symbols-outlined" style={{ fontSize: "16px" }}>
                                                                delete
                                                            </i>
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                </DialogContent>
                
                <DialogActions sx={{ p: 3, pt: 0 }}>
                    <Button onClick={onClose} variant="outlined">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

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

export default EventPaymentModal;

