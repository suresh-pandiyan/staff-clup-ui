import React, { useState, useMemo } from 'react';
import {
    Card,
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    CircularProgress,
    Alert,
    Avatar,
    Chip,
    IconButton,
    Tooltip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Fab,
} from '@mui/material';
import { Visibility, TrendingUp, Group, Close } from '@mui/icons-material';
import { useUsers, useShares } from '../../hooks';

const AllUsersShares = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    // Fetch all users and shares data
    const { data: users, isLoading: usersLoading, error: usersError } = useUsers();
    const { data: shares, isLoading: sharesLoading, error: sharesError } = useShares();

    // Combine users with their shares data
    const usersWithShares = useMemo(() => {
        if (!users?.data || !shares?.data) return [];

        return users.data.map(user => {
            // Find all shares for this user
            const userShares = shares.data.filter(share =>
                share.userId === user.id || share.ownerId === user.id
            );

            // Calculate total portfolio value and share count
            const totalShares = userShares.reduce((sum, share) => sum + (share.quantity || 0), 0);
            const totalValue = userShares.reduce((sum, share) =>
                sum + ((share.quantity || 0) * (share.currentPrice || share.price || 0)), 0
            );

            return {
                ...user,
                shares: userShares,
                totalShares,
                totalValue,
                shareCount: userShares.length,
            };
        });
    }, [users?.data, shares?.data]);

    // Filter users based on search query
    const filteredUsers = useMemo(() => {
        if (!searchQuery) return usersWithShares;

        return usersWithShares.filter(user =>
            user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.id?.toString().includes(searchQuery) ||
            user.shares?.some(share =>
                share.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                share.symbol?.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
    }, [usersWithShares, searchQuery]);

    // Format currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount || 0);
    };

    // Loading state
    if (usersLoading || sharesLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
                <CircularProgress size={60} />
            </Box>
        );
    }

    // Error state
    if (usersError || sharesError) {
        return (
            <Alert severity="error" sx={{ m: 2 }}>
                Error loading data: {usersError?.message || sharesError?.message}
            </Alert>
        );
    }

    console.log("USERS", users);
    console.log("FILTERED USERS", filteredUsers);

    return (
        <>
            {/* Main Page with Button to Open Popup */}
            <Card
                sx={{
                    boxShadow: "none",
                    borderRadius: "7px",
                    mb: "25px",
                    padding: { xs: "18px", sm: "20px", lg: "25px" },
                }}
                className="rmui-card"
            >
                <Box sx={{ textAlign: 'center', py: 8 }}>
                    <Group sx={{ fontSize: 80, color: 'primary.main', mb: 3 }} />
                    <Typography
                        variant="h3"
                        sx={{
                            fontSize: { xs: "24px", md: "32px" },
                            fontWeight: 700,
                            mb: 2,
                        }}
                        className="text-black"
                    >
                        Users' Shares Portfolio
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            color: 'text.secondary',
                            mb: 4,
                            maxWidth: 600,
                            mx: 'auto',
                        }}
                    >
                        View all users and their share holdings in a comprehensive popup.
                        Get insights into portfolio values, share distributions, and user performance.
                    </Typography>

                    <Button
                        variant="contained"
                        size="large"
                        onClick={() => setIsPopupOpen(true)}
                        startIcon={<Group />}
                        sx={{
                            fontSize: '16px',
                            padding: '12px 32px',
                            borderRadius: '8px',
                        }}
                    >
                        View All Users' Shares
                    </Button>

                    {/* Summary Stats Preview */}
                    {!usersLoading && !usersError && (
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                gap: 4,
                                mt: 6,
                                flexWrap: 'wrap',
                            }}
                        >
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
                                    {usersWithShares.length}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    Total Users
                                </Typography>
                            </Box>
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="h4" sx={{ fontWeight: 700, color: 'success.main' }}>
                                    {formatCurrency(
                                        usersWithShares.reduce((sum, user) => sum + user.totalValue, 0)
                                    )}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    Total Portfolio Value
                                </Typography>
                            </Box>
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="h4" sx={{ fontWeight: 700, color: 'info.main' }}>
                                    {usersWithShares.reduce((sum, user) => sum + user.totalShares, 0).toLocaleString()}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    Total Shares
                                </Typography>
                            </Box>
                        </Box>
                    )}
                </Box>
            </Card>

            {/* Floating Action Button */}
            <Fab
                color="primary"
                aria-label="view all shares"
                onClick={() => setIsPopupOpen(true)}
                sx={{
                    position: 'fixed',
                    bottom: 32,
                    right: 32,
                    zIndex: 1000,
                }}
            >
                <Group />
            </Fab>

            {/* Full Screen Popup/Modal */}
            <Dialog
                open={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
                maxWidth="xl"
                fullWidth
                fullScreen
                sx={{
                    '& .MuiDialog-paper': {
                        margin: 0,
                        maxHeight: '100%',
                    },
                }}
            >
                <DialogTitle
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderBottom: '1px solid',
                        borderBottomColor: 'divider',
                        px: 3,
                        py: 2,
                    }}
                >
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                        All Users' Shares Portfolio
                    </Typography>
                    <IconButton
                        onClick={() => setIsPopupOpen(false)}
                        sx={{ color: 'text.secondary' }}
                    >
                        <Close />
                    </IconButton>
                </DialogTitle>

                <DialogContent sx={{ p: 0, overflow: 'auto' }}>
                    <Card
                        sx={{
                            boxShadow: "none",
                            borderRadius: "0",
                            m: 0,
                            padding: { xs: "18px", sm: "20px", lg: "25px" },
                        }}
                        className="rmui-card"
                    >
                        <Box>
                            {/* Header */}
                            <Box
                                sx={{
                                    display: { xs: "block", sm: "flex" },
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    mb: "25px",
                                }}
                            >
                                <Typography
                                    variant="h4"
                                    sx={{
                                        fontSize: { xs: "20px", md: "24px" },
                                        fontWeight: 700,
                                        mb: { xs: 2, sm: 0 },
                                    }}
                                    className="text-black"
                                >
                                    All Users' Shares Portfolio
                                </Typography>

                                {/* Search */}
                                <TextField
                                    label="Search users or shares..."
                                    variant="outlined"
                                    size="small"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    sx={{ minWidth: 300 }}
                                />
                            </Box>

                            {/* Summary Stats */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: 3,
                                    mb: 3,
                                    flexWrap: 'wrap',
                                }}
                            >
                                <Box
                                    sx={{
                                        backgroundColor: 'primary.light',
                                        color: 'primary.contrastText',
                                        padding: '16px 20px',
                                        borderRadius: '8px',
                                        minWidth: '200px',
                                    }}
                                >
                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                        Total Users
                                    </Typography>
                                    <Typography variant="h4" sx={{ fontWeight: 700, mt: 1 }}>
                                        {filteredUsers.length}
                                    </Typography>
                                </Box>

                                <Box
                                    sx={{
                                        backgroundColor: 'success.light',
                                        color: 'success.contrastText',
                                        padding: '16px 20px',
                                        borderRadius: '8px',
                                        minWidth: '200px',
                                    }}
                                >
                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                        Total Portfolio Value
                                    </Typography>
                                    <Typography variant="h4" sx={{ fontWeight: 700, mt: 1 }}>
                                        {formatCurrency(
                                            filteredUsers.reduce((sum, user) => sum + user.totalValue, 0)
                                        )}
                                    </Typography>
                                </Box>

                                <Box
                                    sx={{
                                        backgroundColor: 'info.light',
                                        color: 'info.contrastText',
                                        padding: '16px 20px',
                                        borderRadius: '8px',
                                        minWidth: '200px',
                                    }}
                                >
                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                        Total Share Holdings
                                    </Typography>
                                    <Typography variant="h4" sx={{ fontWeight: 700, mt: 1 }}>
                                        {filteredUsers.reduce((sum, user) => sum + user.totalShares, 0)}
                                    </Typography>
                                </Box>
                            </Box>

                            {/* Table */}
                            <TableContainer
                                component={Paper}
                                sx={{
                                    boxShadow: "none",
                                    borderRadius: "7px",
                                    maxHeight: 'none',
                                }}
                                className="rmui-table"
                            >
                                <Table sx={{ minWidth: 1200 }} aria-label="All Users Shares Table">
                                    <TableHead className="bg-primary-50">
                                        <TableRow
                                            sx={{
                                                th: {
                                                    fontWeight: "600",
                                                    padding: "16px 20px",
                                                    fontSize: "14px",
                                                },
                                            }}
                                        >
                                            <TableCell className="text-black border-bottom">
                                                User
                                            </TableCell>
                                            <TableCell className="text-black border-bottom">
                                                Email
                                            </TableCell>
                                            <TableCell className="text-black border-bottom" align="center">
                                                Share Types
                                            </TableCell>
                                            <TableCell className="text-black border-bottom" align="right">
                                                Total Shares
                                            </TableCell>
                                            <TableCell className="text-black border-bottom" align="right">
                                                Portfolio Value
                                            </TableCell>
                                            <TableCell className="text-black border-bottom">
                                                Share Details
                                            </TableCell>
                                            <TableCell className="text-black border-bottom" align="center">
                                                Actions
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {filteredUsers.map((user) => (
                                            <TableRow
                                                key={user.id}
                                                sx={{
                                                    td: {
                                                        padding: "16px 20px",
                                                        fontSize: "14px",
                                                    },
                                                    '&:hover': {
                                                        backgroundColor: 'action.hover',
                                                    },
                                                }}
                                            >
                                                {/* User Info */}
                                                <TableCell className="border-bottom">
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            alignItems: "center",
                                                            gap: "12px",
                                                        }}
                                                    >
                                                        <Avatar
                                                            src={user.avatar || user.profilePicture}
                                                            alt={user.name}
                                                            sx={{ width: 40, height: 40 }}
                                                        >
                                                            {user.name?.charAt(0)?.toUpperCase()}
                                                        </Avatar>
                                                        <Box>
                                                            <Typography
                                                                sx={{
                                                                    fontSize: "15px",
                                                                    fontWeight: "600",
                                                                }}
                                                                className="text-black"
                                                            >
                                                                {user.name || 'N/A'}
                                                            </Typography>
                                                            <Typography
                                                                sx={{
                                                                    fontSize: "12px",
                                                                    color: "text.secondary",
                                                                }}
                                                            >
                                                                ID: {user.id}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </TableCell>

                                                {/* Email */}
                                                <TableCell className="text-black border-bottom">
                                                    {user.email || 'N/A'}
                                                </TableCell>

                                                {/* Share Types Count */}
                                                <TableCell className="border-bottom" align="center">
                                                    <Chip
                                                        label={`${user.shareCount} types`}
                                                        color={user.shareCount > 0 ? "primary" : "default"}
                                                        size="small"
                                                    />
                                                </TableCell>

                                                {/* Total Shares */}
                                                <TableCell className="text-black border-bottom" align="right">
                                                    <Typography sx={{ fontWeight: 600 }}>
                                                        {user.totalShares.toLocaleString()}
                                                    </Typography>
                                                </TableCell>

                                                {/* Portfolio Value */}
                                                <TableCell className="border-bottom" align="right">
                                                    <Typography
                                                        sx={{
                                                            fontWeight: 600,
                                                            color: user.totalValue > 0 ? 'success.main' : 'text.primary',
                                                        }}
                                                    >
                                                        {formatCurrency(user.totalValue)}
                                                    </Typography>
                                                </TableCell>

                                                {/* Share Details */}
                                                <TableCell className="border-bottom">
                                                    <Box sx={{ maxWidth: 300 }}>
                                                        {user.shares.length > 0 ? (
                                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                                {user.shares.slice(0, 3).map((share, index) => (
                                                                    <Chip
                                                                        key={index}
                                                                        label={`${share.symbol || share.name || 'Share'}: ${share.quantity || 0}`}
                                                                        size="small"
                                                                        variant="outlined"
                                                                        sx={{ fontSize: '11px' }}
                                                                    />
                                                                ))}
                                                                {user.shares.length > 3 && (
                                                                    <Chip
                                                                        label={`+${user.shares.length - 3} more`}
                                                                        size="small"
                                                                        color="secondary"
                                                                        sx={{ fontSize: '11px' }}
                                                                    />
                                                                )}
                                                            </Box>
                                                        ) : (
                                                            <Typography
                                                                sx={{
                                                                    fontSize: "12px",
                                                                    color: "text.secondary",
                                                                    fontStyle: 'italic',
                                                                }}
                                                            >
                                                                No shares held
                                                            </Typography>
                                                        )}
                                                    </Box>
                                                </TableCell>

                                                {/* Actions */}
                                                <TableCell className="border-bottom" align="center">
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            gap: 1,
                                                        }}
                                                    >
                                                        <Tooltip title="View Details">
                                                            <IconButton
                                                                aria-label="view"
                                                                color="primary"
                                                                size="small"
                                                            >
                                                                <Visibility fontSize="small" />
                                                            </IconButton>
                                                        </Tooltip>

                                                        {user.totalValue > 0 && (
                                                            <Tooltip title="Performance">
                                                                <IconButton
                                                                    aria-label="performance"
                                                                    color="success"
                                                                    size="small"
                                                                >
                                                                    <TrendingUp fontSize="small" />
                                                                </IconButton>
                                                            </Tooltip>
                                                        )}
                                                    </Box>
                                                </TableCell>
                                            </TableRow>
                                        ))}

                                        {/* Empty State */}
                                        {filteredUsers.length === 0 && (
                                            <TableRow>
                                                <TableCell colSpan={7} align="center" sx={{ py: 6 }}>
                                                    <Typography
                                                        variant="h6"
                                                        sx={{ color: 'text.secondary', mb: 1 }}
                                                    >
                                                        No users found
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                                        {searchQuery ? 'Try adjusting your search terms' : 'No users with shares data available'}
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                            {/* Footer Info */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    mt: 2,
                                    pt: 2,
                                    borderTop: '1px solid',
                                    borderTopColor: 'divider',
                                }}
                            >
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    Showing all {filteredUsers.length} users {searchQuery && `(filtered from ${usersWithShares.length} total)`}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    Last updated: {new Date().toLocaleString()}
                                </Typography>
                            </Box>
                        </Box>
                    </Card>
                </DialogContent>

                <DialogActions
                    sx={{
                        borderTop: '1px solid',
                        borderTopColor: 'divider',
                        px: 3,
                        py: 2,
                    }}
                >
                    <Button
                        onClick={() => setIsPopupOpen(false)}
                        variant="outlined"
                        size="large"
                    >
                        Close
                    </Button>
                    <Button
                        onClick={() => {
                            // Export functionality can be added here
                            console.log('Export data:', filteredUsers);
                        }}
                        variant="contained"
                        size="large"
                    >
                        Export Data
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default AllUsersShares;
