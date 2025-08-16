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
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { useUsers } from "../../hooks/useUsers";
import CreateMemberForm from "../forms/CreateMemberForm";

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

const TableMembers = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState("");
    const [openCreateDialog, setOpenCreateDialog] = useState(false);
    const [createFormData, setCreateFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        designation: "",
        joinDate: "",
        employeeId: "",
    });

    const { data: users, isLoading: usersLoading, error: usersError } = useUsers();


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
        setCreateFormData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            designation: "",
            joinDate: "",
            employeeId: "",
        });
    };

    const handleCreateFormChange = (field, value) => {
        setCreateFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleCreateMember = (e) => {
        e.preventDefault();
        // TODO: Implement API call to create new member
        console.log("Creating new member:", createFormData);
        handleCloseCreateDialog();
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
                        Create Member
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
                                <TableCell className="text-black border-bottom">Emp ID</TableCell>

                                <TableCell className="text-black border-bottom">
                                    Member
                                </TableCell>

                                <TableCell className="text-black border-bottom">
                                    Phone
                                </TableCell>

                                <TableCell className="text-black border-bottom">
                                    Designation
                                </TableCell>

                                <TableCell className="text-black border-bottom">
                                    Joining Date
                                </TableCell>

                                <TableCell className="text-black border-bottom">
                                    Has Loan
                                </TableCell>

                                <TableCell className="text-black border-bottom">
                                    Has Chitfund
                                </TableCell>

                                <TableCell className="text-black border-bottom">
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {users?.data?.map((row) => (
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
                            ))}

                        </TableBody>

                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                                    colSpan={8}
                                    count={users?.data?.length}
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
                onClose={handleCloseCreateDialog}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: "12px",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                    }
                }}
            >
                <DialogTitle sx={{
                    pb: 1,
                    borderBottom: "1px solid #e0e0e0",
                    fontSize: "20px",
                    fontWeight: 600
                }}>
                    Create New Member
                </DialogTitle>
                <DialogContent sx={{ pt: 3 }}>
                    <CreateMemberForm
                        formData={createFormData}
                        onChange={handleCreateFormChange}
                        onSubmit={handleCreateMember}
                        onCancel={handleCloseCreateDialog}
                        loading={false}
                    />
                </DialogContent>
            </Dialog>
        </>
    );
};

export default TableMembers;
