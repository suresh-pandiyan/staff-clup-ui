"use client";

import React, { useState } from "react";
import {
  IconButton,
  Typography,
  Box,
  Tooltip,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  CircularProgress,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import ChatIcon from "@mui/icons-material/Chat";
import ListIcon from "@mui/icons-material/List";
import Logout from "@mui/icons-material/Logout";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SettingsIcon from "@mui/icons-material/Settings";
import SupportIcon from "@mui/icons-material/Support";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useAuth } from "../../../hooks/useAuth";
import { useProfile } from "../../../hooks/useProfile";

const Profile = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { logout, isLoading } = useAuth();
  const { profile, hasProfile, isProfileStale } = useProfile();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleClose();
    await logout();
  };

  const location = useLocation();
  const pathname = location.pathname;

  return (
    <>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ p: 0, borderRadius: "5px" }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar
            src={profile?.avatar || profile?.profilePicture || "/images/admin.png"}
            alt={profile?.name || profile?.fullName || "User"}
            sx={{
              width: { xs: "35px", sm: "42px" },
              height: { xs: "35px", sm: "42px" },
              border: "2px solid #C2CDFF",
            }}
            className="mr-8"
          >
            {!profile?.avatar && !profile?.profilePicture && (profile?.name || profile?.fullName) 
              ? (profile.name || profile.fullName).charAt(0).toUpperCase() 
              : "U"
            }
          </Avatar>
          <Typography
            variant="h3"
            sx={{
              fontWeight: "600",
              fontSize: "13px",
              display: { xs: "none", sm: "block" },
            }}
            className="text-black"
          >
            {hasProfile ? (profile?.name || profile?.fullName || "User") : "Loading..."}
          </Typography>
          <KeyboardArrowDownIcon sx={{ fontSize: "15px" }} />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            borderRadius: "7px",
            boxShadow: "0 4px 45px #0000001a",
            overflow: "visible",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        className="for-dark-top-navList"
      >
        <MenuItem sx={{ padding: "10px 20px" }}>
          <Avatar
            src={profile?.avatar || profile?.profilePicture || "/images/admin.png"}
            sx={{
              width: 31,
              height: 31,
              border: "2px solid #C2CDFF",
            }}
            className="mr-8"
          >
            {!profile?.avatar && !profile?.profilePicture && (profile?.name || profile?.fullName) 
              ? (profile.name || profile.fullName).charAt(0).toUpperCase() 
              : "U"
            }
          </Avatar>
          <Box>
            <Typography
              variant="h5"
              sx={{
                fontSize: "13px",
                color: "#260944",
                fontWeight: "500",
              }}
              className="text-black"
            >
              {hasProfile ? (profile?.name || profile?.fullName || "User") : "Loading..."}
            </Typography>

            <Typography sx={{ fontSize: "12px" }}>
              {hasProfile ? (profile?.role || profile?.jobTitle || "Member") : "Loading..."}
            </Typography>
            {isProfileStale && (
              <Typography sx={{ fontSize: "10px", color: "warning.main", mt: 0.5 }}>
                Profile data may be outdated
              </Typography>
            )}
          </Box>
        </MenuItem>

        <Divider sx={{ borderColor: "#F6F7F9" }} />

        <MenuItem sx={{ padding: "8px 20px" }}>
          <Link
            to="/my-profile/"
            className={`text-black ${pathname === "/my-profile/" ? `text-primary` : ""
              }`}
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <ListItemIcon sx={{ mr: "-10px", mt: "-3px" }}>
              <AccountCircleIcon
                sx={{ fontSize: "20px" }}
                className="text-black"
              />
            </ListItemIcon>

            <span style={{ fontSize: "13px" }}>My Profile</span>
          </Link>
        </MenuItem>

        <MenuItem sx={{ padding: "8px 20px" }}>
          <Link
            to="/apps/chat/"
            className={`text-black ${pathname === "/apps/chat/" ? `text-primary` : ""
              }`}
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <ListItemIcon sx={{ mr: "-10px", mt: "-3px" }}>
              <ChatIcon sx={{ fontSize: "20px" }} className="text-black" />
            </ListItemIcon>

            <span style={{ fontSize: "13px" }}>Messages</span>
          </Link>
        </MenuItem>

        <MenuItem sx={{ padding: "8px 20px" }}>
          <Link
            to="/apps/to-do-list/"
            className={`text-black ${pathname === "/apps/to-do-list/" ? `text-primary` : ""
              }`}
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <ListItemIcon sx={{ mr: "-10px", mt: "-3px" }}>
              <ListIcon sx={{ fontSize: "20px" }} className="text-black" />
            </ListItemIcon>

            <span style={{ fontSize: "13px" }}>My Task</span>
          </Link>
        </MenuItem>

        <MenuItem sx={{ padding: "8px 20px" }}>
          <Link
            to="/ecommerce/checkout/"
            className={`text-black ${pathname === "/ecommerce/checkout/" ? `text-primary` : ""
              }`}
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <ListItemIcon sx={{ mr: "-10px", mt: "-3px" }}>
              <CreditCardIcon
                sx={{ fontSize: "20px" }}
                className="text-black"
              />
            </ListItemIcon>

            <span style={{ fontSize: "13px" }}>Billing</span>
          </Link>
        </MenuItem>

        <Divider sx={{ borderColor: "#F6F7F9" }} />

        <MenuItem sx={{ padding: "8px 20px" }}>
          <Link
            to="/settings/account-settings"
            className={`text-black ${pathname === "/settings/account-settings" ? `text-primary` : ""
              }`}
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <ListItemIcon sx={{ mr: "-10px", mt: "-3px" }}>
              <SettingsIcon sx={{ fontSize: "20px" }} className="text-black" />
            </ListItemIcon>

            <span style={{ fontSize: "13px" }}>Settings</span>
          </Link>
        </MenuItem>

        <MenuItem sx={{ padding: "8px 20px" }}>
          <Link
            to="/extra-faq/"
            className={`text-black ${pathname === "/extra-faq/" ? `text-primary` : ""
              }`}
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <ListItemIcon sx={{ mr: "-10px", mt: "-3px" }}>
              <SupportIcon sx={{ fontSize: "20px" }} className="text-black" />
            </ListItemIcon>

            <span style={{ fontSize: "13px" }}>Support</span>
          </Link>
        </MenuItem>

        <MenuItem sx={{ padding: "8px 20px" }}>
          <a
            href="/authentication/lock-screen/"
            className='text-black'
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <ListItemIcon sx={{ mr: "-10px", mt: "-3px" }}>
              <LockOpenIcon sx={{ fontSize: "20px" }} className="text-black" />
            </ListItemIcon>

            <span style={{ fontSize: "13px" }}>Lock Screen</span>
          </a>
        </MenuItem>

        <MenuItem
          sx={{ padding: "8px 20px" }}
          onClick={handleLogout}
          disabled={isLoading}
        >
          <ListItemIcon sx={{ mr: "-10px", mt: "-3px" }}>
            {isLoading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              <Logout sx={{ fontSize: "20px" }} className="text-black" />
            )}
          </ListItemIcon>

          <span style={{ fontSize: "13px" }}>
            {isLoading ? "Logging out..." : "Logout"}
          </span>
        </MenuItem>
      </Menu>
    </>
  );
};

export default Profile;
