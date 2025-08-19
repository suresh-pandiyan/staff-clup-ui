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

import { Link } from 'react-router-dom';
import TableSharesMembers from "../../components_v2/tables/TableSharesMembers";


const AllUsersShares = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    // Fetch all users and shares data
    const { data: users, isLoading: usersLoading, error: usersError } = useUsers();
    const { data: shares, isLoading: sharesLoading, error: sharesError } = useShares();

    // Combine users with their shares data



    return (
        <>
            <div className="breadcrumb-card">
                <h5>Shares</h5>

                <ul className="breadcrumb">
                    <li>
                        <Link to="/dashboard/ecommerce/">
                            <i className="material-symbols-outlined">home</i>
                            Dashboard
                        </Link>
                    </li>
                    <li>Shares</li>
                </ul>
            </div>

            <TableSharesMembers />

        </>
    );
};

export default AllUsersShares;
