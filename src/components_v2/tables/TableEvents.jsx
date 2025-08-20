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
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { useUsers } from "../../hooks/useUsers";
import MemberForm from "../forms/MemberForm";
import { userService } from "../../services/userService";

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
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    const { data: users, refetch, isLoading: usersLoading, error: usersError } = useUsers();

    // Debug logging to understand data structure
    console.log('useUsers hook result:', { users, usersLoading, usersError });
    console.log('users type:', typeof users);
    console.log('users is array:', Array.isArray(users));


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

    const handleCreateMember = async (formData) => {
        console.log('Form data received:', formData);

        try {
            setLoading(true);

            // Format the data to match the API expectations
            const userData = {
                ...formData,
                // Ensure joinDate is properly formatted
                joinDate: formData.joinDate ? new Date(formData.joinDate).toISOString() : new Date().toISOString(),
                // Set default values for required fields
                isActive: true,
                emailVerified: false,
                lastLogin: new Date().toISOString(),
            };

            console.log('Formatted user data:', userData);

            // Call the userService to create the user
            const response = await userService.createUser(userData);
            console.log('API response:', response);

            // Show success message
            setSnackbar({
                open: true,
                message: 'Member created successfully!',
                severity: 'success'
            });

            // Close dialog and refresh the users list
            handleCloseCreateDialog();
            refetch();

        } catch (error) {
            console.error('Error creating member:', error);
            console.error('Error details:', {
                message: error.message,
                response: error.response,
                status: error.status,
                data: error.data
            });

            // Show error message
            let errorMessage = 'Failed to create member. Please try again.';

            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.data?.message) {
                errorMessage = error.data.message;
            } else if (error.message) {
                errorMessage = error.message;
            }

            setSnackbar({
                open: true,
                message: errorMessage,
                severity: 'error'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar(prev => ({ ...prev, open: false }));
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
                        Create Events
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
                                    Event Created
                                </TableCell>
                                <TableCell className="text-black border-bottom">
                                    Event Closed
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {usersLoading ? (
                                <TableRow>
                                    <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                                        <Typography>Loading users...</Typography>
                                    </TableCell>
                                </TableRow>
                            ) : usersError ? (
                                <TableRow>
                                    <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                                        <Typography color="error">
                                            Error loading users: {usersError.message}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ) : !users || users.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                                        <Typography>No users found</Typography>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                users && users.data.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        sx={{
                                            "& td": {
                                                padding: "15px 20px",
                                                fontSize: "14px",
                                            },
                                        }}
                                    >
                                        <TableCell className="border-bottom">{row.employeeId}</TableCell>

                                        <TableCell className="text-black border-bottom">
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "12px",
                                                }}
                                            >
                                                <Box sx={{ flexShrink: "0" }}>
                                                    <img
                                                        src={row.avatar}
                                                        alt="."
                                                        width={40}
                                                        height={40}
                                                        style={{ borderRadius: "100px" }}
                                                    />
                                                </Box>

                                                <Box>
                                                    <Typography
                                                        sx={{
                                                            fontSize: "15px",
                                                            fontWeight: "500",
                                                        }}
                                                        className="text-black"
                                                    >
                                                        {row.firstName} {row.lastName}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </TableCell>

                                        <TableCell className="border-bottom">{row.phone}</TableCell>

                                        <TableCell className="border-bottom">{row.designation}</TableCell>

                                        <TableCell className="border-bottom">
                                            {row.joinDate}
                                        </TableCell>

                                        <TableCell className="border-bottom">
                                            {row.hasLoan ? "Yes" : "No"}
                                        </TableCell>

                                        <TableCell className="border-bottom">
                                            {row.hasChitfund ? "Yes" : "No"}
                                        </TableCell>

                                        <TableCell className="border-bottom">
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <IconButton
                                                    aria-label="view"
                                                    color="primary"
                                                    sx={{ padding: "5px" }}
                                                >
                                                    <i
                                                        className="material-symbols-outlined"
                                                        style={{ fontSize: "16px" }}
                                                    >
                                                        visibility
                                                    </i>
                                                </IconButton>

                                                <IconButton
                                                    aria-label="edit"
                                                    color="secondary"
                                                    sx={{ padding: "5px" }}
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
                                    count={users?.data?.length || 0}
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

            {/* Create Member Dialog */}
            <Dialog
                open={openCreateDialog}
                onClose={loading ? undefined : handleCloseCreateDialog}
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
                    Create New Events
                </DialogTitle>
                <DialogContent sx={{ pt: 3 }}>
                    <MemberForm
                        onSubmit={handleCreateMember}
                        onCancel={handleCloseCreateDialog}
                        loading={loading}
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
