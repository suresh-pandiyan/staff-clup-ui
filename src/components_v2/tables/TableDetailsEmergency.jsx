import React from "react";
import {
    Card,
    Box,
    Typography,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TablePagination,
    TableRow,
    TableHead,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    Snackbar,
    Alert,
    CircularProgress,
    Grid,
} from "@mui/material";
import EmergencyForm from "../forms/Emergencyform";
import { useGetEmergencyFunds, useCreateEmergencyFund, useFinancialYears, useDeleteEmergencyFund } from "../../hooks";
import { formatDate } from "../../helpers/formatDate";
import { commonCancelStyles, commonSubmitStyle } from "../styles/commonStyles";
import { useApp } from "../../contexts/AppContext";
import { Link } from "react-router-dom";
import EmergencyPaymentForm from "../forms/EmergencyPaymentForm";



const TableDetailsEmergency = () => {
    const [openCreateDialog, setOpenCreateDialog] = React.useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
    const [deleteEmergencyFundId, setDeleteEmergencyFundId] = React.useState(null);
    const [financeYearId, setFinanceYearId] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [snackbar, setSnackbar] = React.useState({
        open: false,
        message: '',
        severity: 'success'
    });
    const { selectedFinancialYear } = useApp();
    // emergency fund hooks
    const { mutateAsync: createEmergencyFundMutation, isPending: emergencyFundsLoading, e } = useCreateEmergencyFund();
    const { data: getEmergencyFunds, isLoading: getEmergencyFundsLoading, error: getEmergencyFundsError } = useGetEmergencyFunds(selectedFinancialYear?.id);
    const { mutateAsync: deleteEmergencyFundMutation, isPending: deleteEmergencyFundLoading } = useDeleteEmergencyFund();
    //set states
    const handleCloseCreateDialog = () => {
        setOpenCreateDialog(false);
        setOpenDeleteDialog(false);
    };
    const handleDeleteEmegency = (id) => {
        setOpenDeleteDialog(true);
        setDeleteEmergencyFundId(id);
    }
    const handleCloseSnackbar = () => {
        setSnackbar(prev => ({ ...prev, open: false }));
    };
    //handle functions
    //handle create emergency fund
    const handleCreateEmergencyFund = async (formData) => {
        console.log(formData, 'formData in table emergency');
        setLoading(true);
        try {
            const response = await createEmergencyFundMutation(formData);
            console.log(response, 'response in table emergency');
            setSnackbar({
                open: true,
                message: "Emergency fund created successfully!",
                severity: 'success'
            });
        } catch (error) {
            console.log(error, 'error in table emergency');
            setSnackbar({
                open: true,
                message: error.message || 'Failed to create emergency fund. Please try again.',
                severity: 'error'
            });
        } finally {
            setLoading(false);
            handleCloseCreateDialog();
        }

    };
    //handle delete emergency fund
    const handleDeleteEmergencyFund = async () => {
        setLoading(true);
        try {
            const response = await deleteEmergencyFundMutation(deleteEmergencyFundId);
            setSnackbar({
                open: true,
                message: "Emergency fund deleted successfully!",
                severity: 'success'
            });
            // refetch();
            handleCloseCreateDialog();
        } catch (error) {
            setSnackbar({
                open: true,
                message: error.message || 'Failed to delete emergency fund. Please try again.',
                severity: 'error'
            });
        } finally {
            setLoading(false);
            handleCloseCreateDialog();
        }

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
                    <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                        <form className="t-search-form" style={{ maxWidth: "300px" }}>
                            <label>
                                <i className="material-symbols-outlined">search</i>
                            </label>
                            <input
                                type="text"
                                className="t-input"
                                placeholder="Search users..."
                            //   value={searchQuery}
                            //   onChange={handleSearch}
                            />
                        </form>
                    </Box>
                    <Button
                        variant="contained"
                        onClick={() => setOpenCreateDialog(true)}
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
                        Create Emergency Fund
                    </Button>
                </Box>
                {/* Table */}
                <EmergencyPaymentForm />
                <TableContainer
                    component={Paper}
                    sx={{
                        boxShadow: "none",
                        borderRadius: "7px",
                    }}
                    className="rmui-table border"
                >
                    <Typography variant="h5" sx={{ padding: "10px 20px" }}>Payment History</Typography>
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
                                    Nominee
                                </TableCell>
                                <TableCell className="text-black border-bottom text-center">
                                    Amount
                                </TableCell>
                                <TableCell className="text-black border-bottom text-center">
                                    Paid Months
                                </TableCell>
                                <TableCell className="text-black border-bottom">
                                    Status
                                </TableCell>
                                <TableCell className="text-black border-bottom text-center">
                                    Created - Ended
                                </TableCell>
                                <TableCell className="text-black border-bottom text-center" >
                                    Amount Collected
                                </TableCell>
                                <TableCell className="text-black border-bottom">
                                    Actions
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                        </TableBody>
                        <TableFooter>

                        </TableFooter>
                    </Table>
                </TableContainer>
            </Card >
            {/* Create Emergency Fund dialog */}
            < Dialog
                open={openCreateDialog}
                onClose={''}
                maxWidth="lg"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: "12px",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                        maxHeight: "90vh",
                    }
                }
                }
            >
                <DialogTitle sx={{
                    pb: 1,
                    borderBottom: "1px solid #e0e0e0",
                    fontSize: "20px",
                    fontWeight: 600
                }}>
                    Create New Emergency Fund
                </DialogTitle>
                <DialogContent sx={{ pt: 3 }}>
                    <EmergencyForm
                        onSubmit={handleCreateEmergencyFund}
                        onCancel={handleCloseCreateDialog}
                        loading={loading || emergencyFundsLoading}
                    />
                </DialogContent>
            </Dialog >
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
                    Are you sure you want to delete the emergency fund
                </DialogTitle>
                <DialogContent sx={{ pt: 3 }}>
                    <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
                        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 3 }}>
                            <Button
                                variant="outlined"
                                onClick={handleCloseCreateDialog}
                                disabled={deleteEmergencyFundLoading}
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
                                onClick={handleDeleteEmergencyFund}
                                disabled={deleteEmergencyFundLoading}
                            >
                                {deleteEmergencyFundLoading ? 'Deleting...' : 'Delete'}
                            </Button>
                        </Box>
                    </Grid>
                </DialogContent>
            </Dialog >

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
    )
}

export default TableDetailsEmergency;