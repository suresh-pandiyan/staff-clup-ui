import React, { useState } from "react";
import {
    Box,
    Button,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Divider,
    Typography,
    Chip,
} from "@mui/material";
import { ExpandMore, FilterList, Sort, ViewList, ViewModule } from "@mui/icons-material";

const Dropdown = ({
    label = "Filter",
    options = [],
    onSelect,
    variant = "outlined",
    size = "medium",
    startIcon = <FilterList />,
    showChip = false,
    chipColor = "primary",
    disabled = false
}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);

    const handleClick = (event) => {
        if (disabled) return;
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOptionSelect = (option) => {
        if (disabled || option.id === 'loading' || option.id === 'error' || option.id === 'no-data') return;

        setSelectedOption(option);
        if (onSelect) {
            onSelect(option);
        }
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    // Default options if none provided
    const defaultOptions = [
        { id: 'all', label: 'All Items', icon: <ViewList /> },
        { id: 'active', label: 'Active', icon: <ViewModule /> },
        { id: 'inactive', label: 'Inactive', icon: <ViewList /> },
        { id: 'recent', label: 'Recent', icon: <Sort /> },
    ];

    const displayOptions = options.length > 0 ? options : defaultOptions;

    return (
        <Box>
            <Button
                variant={variant}
                size={size}
                onClick={handleClick}
                startIcon={startIcon}
                endIcon={<ExpandMore />}
                disabled={disabled}
                sx={{
                    minWidth: 'auto',
                    px: 2,
                    py: 1,
                    borderRadius: '8px',
                    textTransform: 'none',
                    fontWeight: 500,
                    borderColor: '#D5D9E2',
                    color: '#374151',
                    '&:hover': {
                        borderColor: '#9CA3AF',
                        backgroundColor: '#F9FAFB',
                    },
                    '&:disabled': {
                        opacity: 0.6,
                        cursor: 'not-allowed',
                    },
                }}
            >
                {label}
                {showChip && selectedOption && (
                    <Chip
                        label={selectedOption.label}
                        size="small"
                        color={chipColor}
                        sx={{ ml: 1, height: '20px', fontSize: '11px' }}
                    />
                )}
            </Button>

            <Menu
                anchorEl={anchorEl}
                open={open && !disabled}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                PaperProps={{
                    sx: {
                        mt: 1,
                        minWidth: 200,
                        borderRadius: '12px',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                        border: '1px solid #E5E7EB',
                    }
                }}
            >
                {displayOptions.map((option, index) => (
                    <React.Fragment key={option.id}>
                        <MenuItem
                            onClick={() => handleOptionSelect(option)}
                            sx={{
                                py: 1.5,
                                px: 2,
                                '&:hover': {
                                    backgroundColor: '#F3F4F6',
                                },
                                '&.Mui-selected': {
                                    backgroundColor: '#EFF6FF',
                                    color: '#1D4ED8',
                                    '&:hover': {
                                        backgroundColor: '#DBEAFE',
                                    },
                                },
                            }}
                            selected={selectedOption?.id === option.id}
                        >
                            {option.icon && (
                                <ListItemIcon sx={{ minWidth: 36 }}>
                                    {option.icon}
                                </ListItemIcon>
                            )}
                            <ListItemText>
                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                    {option.label}
                                </Typography>
                                {option.description && (
                                    <Typography variant="caption" color="text.secondary">
                                        {option.description}
                                    </Typography>
                                )}
                            </ListItemText>
                        </MenuItem>
                        {index < displayOptions.length - 1 && option.divider && (
                            <Divider sx={{ my: 0.5 }} />
                        )}
                    </React.Fragment>
                ))}
            </Menu>
        </Box>
    );
};

export default Dropdown;
