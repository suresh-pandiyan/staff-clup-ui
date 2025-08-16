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
    DialogActions,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { useUsers } from "../../hooks/useUsers";

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

// function createData(
//     id,
//     memberImage,
//     memberName,
//     email,
//     phone,
//     location,
//     joiningDate,
//     lastActive
// ) {
//     return {
//         id,
//         memberImage,
//         memberName,
//         email,
//         phone,
//         location,
//         joiningDate,
//         lastActive,
//     };
// }

// const rows = [
//     createData(
//         "#JAN-820",
//         "/images/users/user6.jpg",
//         "Oliver Khan",
//         "oliver@trezo.com",
//         "+1 555-123-4567",
//         "Washington D.C",
//         "10 Oct 2024",
//         "01 Dec 2024 08:23 AM"
//     ),
//     createData(
//         "#JAN-819",
//         "/images/users/user7.jpg",
//         "Carolyn Barnes",
//         "carolyn@trezo.com",
//         "+1 555-987-6543",
//         "Chicago",
//         "11 Sep 2024",
//         "02 Dec 2024 05:09 PM"
//     ),
//     createData(
//         "#JAN-818",
//         "/images/users/user8.jpg",
//         "Donna Miller",
//         "donna@trezo.com",
//         "+1 555-456-7890",
//         "Oklahoma City",
//         "12 Aug 2024",
//         "03 Dec 2024 09:30 AM"
//     ),
//     createData(
//         "#JAN-817",
//         "/images/users/user9.jpg",
//         "Barbara Cross",
//         "barbara@trezo.com",
//         "+1 555-369-7878",
//         "San Diego",
//         "13 Jul 2024",
//         "04 Dec 2024 10:22 AM"
//     ),
//     createData(
//         "#JAN-816",
//         "/images/users/user10.jpg",
//         "Rebecca Block",
//         "rebecca@trezo.com",
//         "+1 555-658-4488",
//         "Los Angeles",
//         "14 Jun 2024",
//         "05 Dec 2024 08:49 AM"
//     ),
//     createData(
//         "#JAN-815",
//         "/images/users/user11.jpg",
//         "Ramiro McCarty",
//         "ramiro@trezo.com",
//         "+1 555-558-9966",
//         "Las Vegas",
//         "15 May 2024",
//         "06 Dec 2024 04:35 PM"
//     ),
//     createData(
//         "#JAN-814",
//         "/images/users/user12.jpg",
//         "Robert Fairweather",
//         "robert@trezo.com",
//         "+1 555-357-5888",
//         "San Francisco",
//         "16 Apr 2024",
//         "07 Dec 2024 06:13 PM"
//     ),
//     createData(
//         "#JAN-813",
//         "/images/users/user13.jpg",
//         "Marcelino Haddock",
//         "marcelino@trezo.com",
//         "+1 555-456-8877",
//         "Washington D.C",
//         "17 Mar 2024",
//         "08 Dec 2024 02:20 AM"
//     ),
//     createData(
//         "#JAN-812",
//         "/images/users/user14.jpg",
//         "Thomas Wilson",
//         "thomas@trezo.com",
//         "+1 555-622-4488",
//         "San Diego",
//         "18 Feb 2024",
//         "09 Dec 2024 12:09 AM"
//     ),
//     createData(
//         "#JAN-811",
//         "/images/users/user15.jpg",
//         "Nathaniel Hulsey",
//         "nathaniel@trezo.com",
//         "+1 555-225-4488",
//         "Chicago",
//         "19 Jan 2024",
//         "10 Dec 2024 06:03 PM"
//     ),
//     createData(
//         "#JAN-810",
//         "/images/users/user15.jpg",
//         "Nathaniel Hulsey",
//         "nathaniel@trezo.com",
//         "+1 555-225-4488",
//         "Chicago",
//         "19 Jan 2024",
//         "10 Dec 2024 06:03 PM"
//     ),
//     createData(
//         "#JAN-809",
//         "/images/users/user14.jpg",
//         "Thomas Wilson",
//         "thomas@trezo.com",
//         "+1 555-622-4488",
//         "San Diego",
//         "18 Feb 2024",
//         "09 Dec 2024 12:09 AM"
//     ),
//     createData(
//         "#JAN-808",
//         "/images/users/user13.jpg",
//         "Marcelino Haddock",
//         "marcelino@trezo.com",
//         "+1 555-456-8877",
//         "Washington D.C",
//         "17 Mar 2024",
//         "08 Dec 2024 02:20 AM"
//     ),
//     createData(
//         "#JAN-807",
//         "/images/users/user12.jpg",
//         "Robert Fairweather",
//         "robert@trezo.com",
//         "+1 555-357-5888",
//         "San Francisco",
//         "16 Apr 2024",
//         "07 Dec 2024 06:13 PM"
//     ),
//     createData(
//         "#JAN-806",
//         "/images/users/user11.jpg",
//         "Ramiro McCarty",
//         "ramiro@trezo.com",
//         "+1 555-558-9966",
//         "Las Vegas",
//         "15 May 2024",
//         "06 Dec 2024 04:35 PM"
//     ),
//     createData(
//         "#JAN-805",
//         "/images/users/user10.jpg",
//         "Rebecca Block",
//         "rebecca@trezo.com",
//         "+1 555-658-4488",
//         "Los Angeles",
//         "14 Jun 2024",
//         "05 Dec 2024 08:49 AM"
//     ),
//     createData(
//         "#JAN-804",
//         "/images/users/user9.jpg",
//         "Barbara Cross",
//         "barbara@trezo.com",
//         "+1 555-369-7878",
//         "San Diego",
//         "13 Jul 2024",
//         "04 Dec 2024 10:22 AM"
//     ),
//     createData(
//         "#JAN-803",
//         "/images/users/user8.jpg",
//         "Donna Miller",
//         "donna@trezo.com",
//         "+1 555-456-7890",
//         "Oklahoma City",
//         "12 Aug 2024",
//         "03 Dec 2024 09:30 AM"
//     ),
//     createData(
//         "#JAN-802",
//         "/images/users/user7.jpg",
//         "Carolyn Barnes",
//         "carolyn@trezo.com",
//         "+1 555-987-6543",
//         "Chicago",
//         "11 Sep 2024",
//         "02 Dec 2024 05:09 PM"
//     ),
//     createData(
//         "#JAN-801",
//         "/images/users/user6.jpg",
//         "Oliver Khan",
//         "oliver@trezo.com",
//         "+1 555-123-4567",
//         "Washington D.C",
//         "10 Oct 2024",
//         "01 Dec 2024 08:23 AM"
//     ),
// ].sort((b, a) => (a.id < b.id ? -1 : 1));

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

    const handleCreateSubmit = () => {
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
                    <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, mb: 2 }}>
                        <TextField
                            label="First Name"
                            value={createFormData.firstName}
                            onChange={(e) => handleCreateFormChange("firstName", e.target.value)}
                            fullWidth
                            size="small"
                        />
                        <TextField
                            label="Last Name"
                            value={createFormData.lastName}
                            onChange={(e) => handleCreateFormChange("lastName", e.target.value)}
                            fullWidth
                            size="small"
                        />
                    </Box>
                    <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, mb: 2 }}>
                        <TextField
                            label="Email"
                            type="email"
                            value={createFormData.email}
                            onChange={(e) => handleCreateFormChange("email", e.target.value)}
                            fullWidth
                            size="small"
                        />
                        <TextField
                            label="Phone"
                            value={createFormData.phone}
                            onChange={(e) => handleCreateFormChange("phone", e.target.value)}
                            fullWidth
                            size="small"
                        />
                    </Box>
                    <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, mb: 2 }}>
                        <TextField
                            label="Employee ID"
                            value={createFormData.employeeId}
                            onChange={(e) => handleCreateFormChange("employeeId", e.target.value)}
                            fullWidth
                            size="small"
                        />
                        <TextField
                            label="Join Date"
                            type="date"
                            value={createFormData.joinDate}
                            onChange={(e) => handleCreateFormChange("joinDate", e.target.value)}
                            fullWidth
                            size="small"
                            InputLabelProps={{ shrink: true }}
                        />
                    </Box>
                    <FormControl fullWidth size="small">
                        <InputLabel>Designation</InputLabel>
                        <Select
                            value={createFormData.designation}
                            label="Designation"
                            onChange={(e) => handleCreateFormChange("designation", e.target.value)}
                        >
                            <MenuItem value="Software Engineer">Software Engineer</MenuItem>
                            <MenuItem value="Senior Developer">Senior Developer</MenuItem>
                            <MenuItem value="Team Lead">Team Lead</MenuItem>
                            <MenuItem value="Project Manager">Project Manager</MenuItem>
                            <MenuItem value="Designer">Designer</MenuItem>
                            <MenuItem value="QA Engineer">QA Engineer</MenuItem>
                            <MenuItem value="DevOps Engineer">DevOps Engineer</MenuItem>
                            <MenuItem value="Product Manager">Product Manager</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
                    <Button
                        onClick={handleCloseCreateDialog}
                        variant="outlined"
                        sx={{
                            textTransform: "none",
                            borderRadius: "8px",
                            px: 3
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleCreateSubmit}
                        variant="contained"
                        sx={{
                            textTransform: "none",
                            borderRadius: "8px",
                            px: 3,
                            backgroundColor: "#1976d2",
                            "&:hover": {
                                backgroundColor: "#1565c0",
                            }
                        }}
                    >
                        Create Member
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default TableMembers;
