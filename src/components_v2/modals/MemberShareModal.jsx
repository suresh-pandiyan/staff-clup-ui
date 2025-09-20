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
    Box,
    Typography,
    Card,
    IconButton,
    Alert,
    Snackbar,
    TextField,
    InputAdornment,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";

const MemberShareModal = ({ open, onClose, member }) => {
    const [currentYearShares, setCurrentYearShares] = useState([]);
    const [previousYearsShares, setPreviousYearsShares] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentYearAmount, setCurrentYearAmount] = useState("");
    const [savingAmount, setSavingAmount] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    const currentYear = new Date().getFullYear();

    useEffect(() => {
        if (open && member) {
            loadMemberShares();
        }
    }, [open, member]);

    const loadMemberShares = async () => {
        try {
            setLoading(true);
            
            // Mock current year monthly shares data
            const mockCurrentYearShares = [
                { month: 'January', amount: 500, paid: true },
                { month: 'February', amount: 500, paid: true },
                { month: 'March', amount: 500, paid: true },
                { month: 'April', amount: 500, paid: false },
                { month: 'May', amount: 500, paid: false },
                { month: 'June', amount: 500, paid: false },
                { month: 'July', amount: 500, paid: false },
                { month: 'August', amount: 500, paid: false },
                { month: 'September', amount: 500, paid: false },
                { month: 'October', amount: 500, paid: false },
                { month: 'November', amount: 500, paid: false },
                { month: 'December', amount: 500, paid: false },
            ];

            // Mock previous years data
            const mockPreviousYears = [
                { year: 2023, totalAmount: 6000, monthsPaid: 12 },
                { year: 2022, totalAmount: 6000, monthsPaid: 12 },
                { year: 2021, totalAmount: 5500, monthsPaid: 11 },
                { year: 2020, totalAmount: 6000, monthsPaid: 12 },
            ];

            setCurrentYearShares(mockCurrentYearShares);
            setPreviousYearsShares(mockPreviousYears);
            
            // Set current year amount (sum of all monthly amounts)
            const totalCurrentYear = mockCurrentYearShares.reduce((total, share) => total + share.amount, 0);
            setCurrentYearAmount(totalCurrentYear.toString());
        } catch (error) {
            console.error('Error loading member shares:', error);
            setSnackbar({
                open: true,
                message: 'Failed to load shares',
                severity: 'error'
            });
        } finally {
            setLoading(false);
        }
    };

    const getCurrentYearTotal = () => {
        return currentYearShares.reduce((total, share) => total + share.amount, 0);
    };

    const getCurrentYearPaid = () => {
        return currentYearShares
            .filter(share => share.paid)
            .reduce((total, share) => total + share.amount, 0);
    };

    const getCurrentYearPending = () => {
        return getCurrentYearTotal() - getCurrentYearPaid();
    };

    const getMonthsPaid = () => {
        return currentYearShares.filter(share => share.paid).length;
    };

    const handleSaveCurrentYearAmount = async () => {
        if (!currentYearAmount || isNaN(currentYearAmount) || parseFloat(currentYearAmount) <= 0) {
            setSnackbar({
                open: true,
                message: 'Please enter a valid amount',
                severity: 'warning'
            });
            return;
        }

        try {
            setSavingAmount(true);
            
            // Mock API call to save current year amount
            // Replace this with actual API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Update the monthly shares with new amount (distribute equally)
            const monthlyAmount = Math.round(parseFloat(currentYearAmount) / 12);
            const updatedShares = currentYearShares.map(share => ({
                ...share,
                amount: monthlyAmount
            }));
            
            setCurrentYearShares(updatedShares);
            
            setSnackbar({
                open: true,
                message: 'Current year share amount updated successfully!',
                severity: 'success'
            });
        } catch (error) {
            console.error('Error saving current year amount:', error);
            setSnackbar({
                open: true,
                message: 'Failed to save amount. Please try again.',
                severity: 'error'
            });
        } finally {
            setSavingAmount(false);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar(prev => ({ ...prev, open: false }));
    };

    const handleModalClose = () => {
        onClose();
    };

    if (!member) return null;

    return (
        <>
            <Dialog
                open={open}
                onClose={handleModalClose}
                maxWidth="md"
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
                    fontWeight: 600,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    Member Share Details
                    <IconButton
                        aria-label="close"
                        onClick={handleModalClose}
                        sx={{
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                
                <DialogContent sx={{ pt: 3 }}>
                    {/* Member Profile Section - Using existing component pattern */}
                    <Card
                        sx={{
                            boxShadow: "none",
                            borderRadius: "7px",
                            mb: "25px",
                            padding: { xs: "18px", sm: "20px", lg: "25px" },
                        }}
                        className="rmui-card"
                    >
                        {/* Member Information */}
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: "25px" }}>
                            {/* Left side - Member Info */}
                            <Box sx={{ display: "flex", alignItems: "center", gap: "13px" }}>
                                <Box sx={{ flexShrink: "0" }}>
                                    <img
                                        src={member.avatar}
                                        alt="Member"
                                        width={60}
                                        height={60}
                                        style={{ borderRadius: "100px" }}
                                    />
                                </Box>
                                <Box>
                                    <Typography
                                        variant="h3"
                                        sx={{
                                            fontSize: { xs: "16px", md: "18px" },
                                            fontWeight: 700,
                                            mb: "5px",
                                        }}
                                        className="text-black"
                                    >
                                        {member.firstName} {member.lastName}
                                    </Typography>
                                    <Typography sx={{ fontSize: "14px", mb: "3px" }} className="text-black">
                                        Employee ID: {member.employeeId || 'N/A'}
                                    </Typography>
                                    <Typography sx={{ fontSize: "14px" }} className="text-black">
                                        Designation: {member.designation || 'N/A'}
                                    </Typography>
                                </Box>
                            </Box>

                            {/* Right side - Current Year Amount Input */}
                            <Box sx={{ display: "flex", alignItems: "center", gap: "10px", minWidth: "250px" }}>
                                <TextField
                                    size="small"
                                    label="Current Year Amount"
                                    value={currentYearAmount}
                                    onChange={(e) => setCurrentYearAmount(e.target.value)}
                                    type="number"
                                    disabled={loading || savingAmount}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                                    }}
                                    sx={{ width: "180px" }}
                                />
                                <Button
                                    variant="contained"
                                    size="small"
                                    onClick={handleSaveCurrentYearAmount}
                                    disabled={loading || savingAmount || !currentYearAmount}
                                    startIcon={<SaveIcon />}
                                    sx={{
                                        backgroundColor: "#1976d2",
                                        "&:hover": {
                                            backgroundColor: "#1565c0",
                                        },
                                        minWidth: "auto",
                                        px: 2
                                    }}
                                >
                                    {savingAmount ? 'Saving...' : 'Save'}
                                </Button>
                            </Box>
                        </Box>

                        {/* Current Year Summary */}
                        <Typography
                            variant="h3"
                            sx={{
                                fontSize: { xs: "16px", md: "18px" },
                                fontWeight: 700,
                                mb: "15px",
                                pb: "10px",
                            }}
                            className="text-black border-bottom"
                        >
                            {currentYear} Share Summary
                        </Typography>

                        <Box sx={{ 
                            display: "flex", 
                            flexWrap: "wrap", 
                            gap: "20px", 
                            mb: "25px"
                        }}>
                            <Box>
                                <Typography sx={{ fontSize: "14px", mb: "5px", color: "text.secondary" }}>
                                    Total Amount
                                </Typography>
                                <Typography sx={{ fontSize: "18px", fontWeight: "600", color: "primary.main" }}>
                                    ₹{getCurrentYearTotal().toLocaleString()}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography sx={{ fontSize: "14px", mb: "5px", color: "text.secondary" }}>
                                    Paid Amount
                                </Typography>
                                <Typography sx={{ fontSize: "18px", fontWeight: "600", color: "success.main" }}>
                                    ₹{getCurrentYearPaid().toLocaleString()}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography sx={{ fontSize: "14px", mb: "5px", color: "text.secondary" }}>
                                    Pending Amount
                                </Typography>
                                <Typography sx={{ fontSize: "18px", fontWeight: "600", color: "error.main" }}>
                                    ₹{getCurrentYearPending().toLocaleString()}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography sx={{ fontSize: "14px", mb: "5px", color: "text.secondary" }}>
                                    Months Paid
                                </Typography>
                                <Typography sx={{ fontSize: "18px", fontWeight: "600" }} className="text-black">
                                    {getMonthsPaid()}/12
                                </Typography>
                            </Box>
                        </Box>
                    </Card>

                    {/* Previous Years Table - Using existing table component pattern */}
                    <Card
                        sx={{
                            boxShadow: "none",
                            borderRadius: "7px",
                            mb: "25px",
                            padding: { xs: "18px", sm: "20px", lg: "25px" },
                        }}
                        className="rmui-card"
                    >
                        <Typography
                            variant="h3"
                            sx={{
                                fontSize: { xs: "16px", md: "18px" },
                                fontWeight: 700,
                                mb: "25px",
                            }}
                            className="text-black"
                        >
                            Previous Years Share History
                        </Typography>

                        <TableContainer
                            component={Paper}
                            sx={{
                                boxShadow: "none",
                                borderRadius: "7px",
                            }}
                            className="rmui-table border"
                        >
                            <Table sx={{ minWidth: 500 }} aria-label="Previous Years Share Table">
                                <TableHead className="bg-f6f7f9">
                                    <TableRow
                                        sx={{
                                            "& th": {
                                                fontWeight: "500",
                                                padding: "10px 20px",
                                                fontSize: "14px",
                                            },
                                        }}
                                    >
                                        <TableCell className="text-black border-bottom">Year</TableCell>
                                        <TableCell className="text-black border-bottom">Total Amount</TableCell>
                                        <TableCell className="text-black border-bottom">Months Paid</TableCell>
                                        <TableCell className="text-black border-bottom">Status</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {loading ? (
                                        <TableRow>
                                            <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
                                                <Typography>Loading previous years data...</Typography>
                                            </TableCell>
                                        </TableRow>
                                    ) : previousYearsShares.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
                                                <Typography>No previous years data available</Typography>
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        previousYearsShares.map((yearData) => (
                                            <TableRow
                                                key={yearData.year}
                                                sx={{
                                                    "& td": {
                                                        padding: "15px 20px",
                                                        fontSize: "14px",
                                                    },
                                                }}
                                            >
                                                <TableCell className="text-black border-bottom">
                                                    <Typography sx={{ fontWeight: "600" }}>
                                                        {yearData.year}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell className="text-black border-bottom">
                                                    <Typography sx={{ fontWeight: "500", color: "primary.main" }}>
                                                        ₹{yearData.totalAmount.toLocaleString()}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell className="text-black border-bottom">
                                                    {yearData.monthsPaid}/12
                                                </TableCell>
                                                <TableCell className="border-bottom">
                                                    <div className={`trezo-badge ${yearData.monthsPaid === 12 ? 'Confirmed' : 'Pending'}`}>
                                                        {yearData.monthsPaid === 12 ? 'Complete' : 'Incomplete'}
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Card>
                </DialogContent>
                
                <DialogActions sx={{ p: 3, pt: 0 }}>
                    <Button onClick={handleModalClose} variant="contained">
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

export default MemberShareModal;
