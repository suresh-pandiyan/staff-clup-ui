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
    Grid,
    Divider,
    Alert
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const ShareForm = ({ onSubmit, onCancel, loading, financialYear }) => {
    const [formData, setFormData] = useState({
        year: financialYear || new Date().getFullYear(),
        months: {
            january: { date: "" },
            february: { date: "" },
            march: { date: "" },
            april: { date: "" },
            may: { date: "" },
            june: { date: "" },
            july: { date: "" },
            august: { date: "" },
            september: { date: "" },
            october: { date: "" },
            november: { date: "" },
            december: { date: "" }
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
                    [field]: value
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
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            {errors.general && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {errors.general}
                </Alert>
            )}

            {/* <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="Financial Year"
                        value={formData.year}
                        onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))}
                        variant="outlined"
                        size="small"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="body2" color="text.secondary" sx={{ alignSelf: 'center', pt: 1 }}>
                        Share amounts are managed from the backend system
                    </Typography>
                </Grid>
            </Grid> */}

            {/* <Divider sx={{ my: 2 }} /> */}
            {/* 
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Monthly Share Due Dates
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Select due dates for each month. You can update months individually as needed.
            </Typography> */}

            <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #e0e0e0' }}>
                <Table size="small">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                            <TableCell sx={{ fontWeight: 600, width: '120px' }}>Month</TableCell>
                            <TableCell sx={{ fontWeight: 600, width: '200px' }}>Due Date</TableCell>
                            <TableCell sx={{ fontWeight: 600, width: '100px' }}>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {months.map((month) => (
                            <TableRow key={month.key} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#fafafa' } }}>
                                <TableCell sx={{ fontWeight: 500 }}>
                                    {month.label}
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        type="date"
                                        size="small"
                                        fullWidth
                                        value={formData.months[month.key].date}
                                        onChange={(e) => handleMonthChange(month.key, 'date', e.target.value)}
                                        placeholder="Select date"
                                        error={!!errors[month.key]}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1
                                    }}>
                                        {/* {formData.months[month.key].date ? (
                                            <Box sx={{
                                                width: 8,
                                                height: 8,
                                                borderRadius: '50%',
                                                backgroundColor: 'success.main'
                                            }} />
                                        ) : (
                                            <Box sx={{
                                                width: 8,
                                                height: 8,
                                                borderRadius: '50%',
                                                backgroundColor: 'grey.300'
                                            }} />
                                        )} */}

                                        <Button
                                            // onClick={handleClickOpen}
                                            variant="outlined"
                                            sx={{
                                                textTransform: "capitalize",
                                                borderRadius: "7px",
                                                fontWeight: "500",
                                                fontSize: "13px",
                                                padding: "6px 13px",
                                            }}
                                            color="primary"
                                        >
                                            <AddIcon sx={{ position: "relative", top: "-1px" }} /> Add Share
                                        </Button>
                                        {/* <Typography variant="caption" color="text.secondary">
                                            {formData.months[month.key].date ? 'Set' : 'Pending'}
                                        </Typography> */}
                                    </Box>
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
                    sx={{ textTransform: 'none' }}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    sx={{
                        textTransform: 'none',
                        backgroundColor: '#1976d2',
                        '&:hover': { backgroundColor: '#1565c0' }
                    }}
                >
                    {loading ? 'Updating...' : 'Update Share Dates'}
                </Button>
            </Box>
        </Box>
    );
};

export default ShareForm;
