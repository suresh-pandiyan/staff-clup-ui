"use client";
import React from "react";
import {
    Card,
    Box,
    Typography,
    FormControl,
    InputLabel,
    MenuItem,
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
    Avatar,
    AvatarGroup,
    Alert,
    Snackbar,
} from "@mui/material";
import Select from "@mui/material/Select";
import { useTheme } from "@mui/material/styles";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { CircularProgress } from "@mui/material";
import { useEvents, useEventsContributors, useEventsContributorsStatus, useSingleEvents } from "../../hooks";
import { useDebounce } from "../../hooks/useDebounce";



const TableEventsContributors = ({ id }) => {
    const [select, setSelect] = React.useState("");
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [searchQuery, setSearchQuery] = React.useState("");
    const debounceSearch = useDebounce(searchQuery);
    console.log(searchQuery, 'searchQuery')
    console.log(debounceSearch, 'debounceSearch')
    const [snackbar, setSnackbar] = React.useState({
        open: false,
        message: '',
        severity: 'success'
    });
    const updateEventPaymentStatusMutation = useEventsContributorsStatus();

    //  const { data: eventsContributors, refetch, isLoading: eventsLoading, error: eventsError } = useEventsContributors(id);
    const { data: eventsContributors, isLoading: eventsLoading, error: eventsError } = useEventsContributors(id, { search: debounceSearch });
    const { data: singleEvent } = useSingleEvents(id && id);
    console.log(eventsContributors, 'eventsContributors');
    const handleChange = (event) => {
        setSelect(event.target.value);
    };
    const handleChangePaymentStatus = async (userId, value) => {
        try {
            await updateEventPaymentStatusMutation.mutateAsync({
                eventId: id,
                userId,
                paymentStatus: value,
            });
            setSnackbar({
                open: true,
                message: 'Event payment update successfully!',
                severity: 'success'
            });
        } catch (error) {
            setSnackbar({
                open: true,
                message: error.message || 'Failed to  update event payment status.',
                severity: 'error'
            });
        }

    }

    const handleCloseSnackbar = () => {
        setSnackbar(prev => ({ ...prev, open: false }));
    };
    const isEventClosed = (event) => {
        if (!event.eventClosed) {
            return false;
        }
        const eventClosedDate = new Date(event.eventClosed);
        const today = new Date();
        eventClosedDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);
        return eventClosedDate <= today;
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
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
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mb: "25px",
                    }}
                >
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
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <FormControl sx={{ minWidth: "115px" }} size="small">
                            <InputLabel id="demo-select-small">Select</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={select}
                                label="select"
                                onChange={handleChange}
                                className="select"
                            >
                                <MenuItem value={0}>This Day</MenuItem>
                                <MenuItem value={1}>This Weekly</MenuItem>
                                <MenuItem value={2}>This Monthly</MenuItem>
                                <MenuItem value={3}>This Yearly</MenuItem>
                                <MenuItem value={4}>All Time</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Box>
                {/* Table */}
                <Box
                    sx={{
                        marginLeft: "-25px",
                        marginRight: "-25px",
                    }}
                >
                    <TableContainer
                        component={Paper}
                        sx={{
                            boxShadow: "none",
                            borderRadius: "0",
                        }}
                        className="rmui-table"
                    >
                        <Table aria-label="All Contributors Table">
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
                                        Contributed Amount
                                    </TableCell>
                                    <TableCell className="text-black border-bottom">
                                        Payment Status
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(
                                    // rowsPerPage > 0
                                    // ? rows.slice(
                                    //     page * rowsPerPage,
                                    //     page * rowsPerPage + rowsPerPage
                                    // )
                                    // :
                                    eventsContributors.data
                                ).map((row) => (
                                    <TableRow
                                        key={row.id}
                                        sx={{
                                            td: {
                                                padding: "15px 20px",
                                                fontSize: "14px",
                                            },
                                        }}
                                    >
                                        <TableCell className="text-black border-bottom">
                                            {row.user.firstName}
                                        </TableCell>
                                        <TableCell className="text-black border-bottom">
                                            ${row.contributedAmount}
                                        </TableCell>
                                        <TableCell className="text-black border-bottom">
                                            <FormControl size="small" sx={{ minWidth: 120 }}
                                                disabled={
                                                    isEventClosed(singleEvent?.data) || row.paymentStatus === 'host'
                                                }
                                            >
                                                <Select
                                                    value={row.paymentStatus}
                                                    onChange={(e) =>
                                                        handleChangePaymentStatus(row.user._id, e.target.value)
                                                    }
                                                >
                                                    <MenuItem value="paid">Paid</MenuItem>
                                                    <MenuItem value="unpaid">Unpaid</MenuItem>
                                                    <MenuItem value="host">Host</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {/* {emptyRows > 0 && (
                                    <TableRow style={{ height: 53 * emptyRows }}>
                                        <TableCell className="border-bottom" colSpan={9} />
                                    </TableRow>
                                )} */}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Card>
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

export default TableEventsContributors;