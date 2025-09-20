import React, { useState } from "react";
import {
    Box,
    Typography,
    TextField,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Card,
    Alert
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const ShareForm = ({ onSubmit, onCancel, loading, financialYear }) => {
    const [formData, setFormData] = useState({
        year: financialYear || new Date().getFullYear(),
        months: {
            january: { date: "2024-01-31", amount: 234500, status: "Paid" },
            february: { date: "2024-02-29", amount: 234500, status: "Paid" },
            march: { date: "2024-03-31", amount: 234500, status: "Paid" },
            april: { date: "", amount: 234500, status: "Pending" },
            may: { date: "", amount: 234500, status: "Pending" },
            june: { date: "", amount: 234500, status: "Pending" },
            july: { date: "", amount: 234500, status: "Pending" },
            august: { date: "", amount: 234500, status: "Pending" },
            september: { date: "", amount: 234500, status: "Pending" },
            october: { date: "", amount: 234500, status: "Pending" },
            november: { date: "", amount: 234500, status: "Pending" },
            december: { date: "", amount: 234500, status: "Pending" }
        }
    });

    const [errors, setErrors] = useState({});

    const months = [
        { key: 'january', label: 'January', short: 'Jan' },
        { key: 'february', label: 'February', short: 'Feb' },
        { key: 'march', label: 'March', short: 'Mar' },
        { key: 'april', label: 'April', short: 'Apr' },
        { key: 'may', label: 'May', short: 'May' },
        { key: 'june', label: 'June', short: 'Jun' },
        { key: 'july', label: 'July', short: 'Jul' },
        { key: 'august', label: 'August', short: 'Aug' },
        { key: 'september', label: 'September', short: 'Sep' },
        { key: 'october', label: 'October', short: 'Oct' },
        { key: 'november', label: 'November', short: 'Nov' },
        { key: 'december', label: 'December', short: 'Dec' }
    ];

    const handleMonthChange = (monthKey, field, value) => {
        setFormData(prev => ({
            ...prev,
            months: {
                ...prev.months,
                [monthKey]: {
                    ...prev.months[monthKey],
                    [field]: value,
                    status: field === 'date' ? (value ? 'Paid' : 'Pending') : prev.months[monthKey].status
                }
            }
        }));

        // Clear error when user starts typing
        if (errors[monthKey]) {
            setErrors(prev => ({ ...prev, [monthKey]: null }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate form - check if at least one month has a date
        const hasMonthData = Object.values(formData.months).some(month => month.date);
        if (!hasMonthData) {
            setErrors({ general: 'Please select at least one month date' });
            return;
        }

        onSubmit(formData);
    };

    return (
        <Card
            sx={{
                boxShadow: "none",
                borderRadius: "7px",
                mb: "25px",
                padding: { xs: "18px", sm: "20px", lg: "25px" },
            }}
            className="rmui-card"
        >
            {errors.general && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {errors.general}
                </Alert>
            )}

            <Typography
                variant="h3"
                sx={{
                    fontSize: { xs: "16px", md: "18px" },
                    fontWeight: 700,
                    mb: "25px",
                }}
                className="text-black"
            >
                Monthly Share Management - {formData.year}
            </Typography>

            <TableContainer
                component={Paper}
                sx={{
                    boxShadow: "none",
                    borderRadius: "7px",
                }}
                className="rmui-table border"
            >
                <Table sx={{ minWidth: 650 }} aria-label="Monthly Shares Table">
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
                            <TableCell className="text-black border-bottom">Month</TableCell>
                            <TableCell className="text-black border-bottom">Amount</TableCell>
                            <TableCell className="text-black border-bottom">Share Added Date</TableCell>
                            <TableCell className="text-black border-bottom">Status</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {months.map((month) => (
                            <TableRow
                                key={month.key}
                                sx={{
                                    "& td": {
                                        padding: "15px 20px",
                                        fontSize: "14px",
                                    },
                                }}
                            >
                                <TableCell className="text-black border-bottom">
                                    <Typography sx={{ fontWeight: "600" }}>
                                        {month.label}
                                    </Typography>
                                </TableCell>
                                <TableCell className="text-black border-bottom">
                                    <Typography sx={{ fontWeight: "500", color: "primary.main" }}>
                                        ₹{formData.months[month.key].amount.toLocaleString()}
                                    </Typography>
                                </TableCell>
                                <TableCell className="border-bottom">
                                    {formData.months[month.key].date ? (
                                        <Typography sx={{ fontWeight: "500" }}>
                                            {new Date(formData.months[month.key].date).toLocaleDateString('en-IN', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric'
                                            })}
                                        </Typography>
                                    ) : (
                                        <TextField
                                            size="small"
                                            type="date"
                                            value={formData.months[month.key].date}
                                            onChange={(e) => handleMonthChange(month.key, 'date', e.target.value)}
                                            disabled={loading}
                                            sx={{ width: "150px" }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    )}
                                </TableCell>
                                <TableCell className="border-bottom">
                                    <div className={`trezo-badge ${formData.months[month.key].status === 'Paid' ? 'Confirmed' : 'Pending'}`}>
                                        {formData.months[month.key].status}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button
                    variant="outlined"
                    onClick={onCancel}
                    disabled={loading}
                    sx={{ 
                        textTransform: 'none',
                        borderRadius: "8px",
                        px: 3,
                        py: 1
                    }}
                >
                    Cancel
                </Button>
                <Button
                    onClick={(e) => handleSubmit(e)}
                    variant="contained"
                    disabled={loading}
                    sx={{
                        backgroundColor: "#1976d2",
                        color: "white",
                        textTransform: "none",
                        borderRadius: "8px",
                        px: 3,
                        py: 1,
                        fontWeight: 500,
                        "&:hover": {
                            backgroundColor: "#1565c0",
                        },
                    }}
                >
                    {loading ? 'Updating...' : 'Update Shares'}
                </Button>
            </Box>
        </Card>
    );
};

export default ShareForm;
