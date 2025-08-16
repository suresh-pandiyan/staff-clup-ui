"use client";

import React, { useState } from "react";
import {
  Grid,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Checkbox,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
const label = { inputProps: { "aria-label": "Checkbox demo" } };

const AssetsContent = () => {
  // Dropdown
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}>
        <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 3 }}>
          <Box
            className="bg-white"
            sx={{
              borderRadius: "7px",
              padding: "20px",
              mb: "25px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Checkbox
                sx={{
                  padding: "0",

                  "& .MuiSvgIcon-root": { fontSize: 22 },
                }}
                {...label}
                className="dark-check"
              />

              <Box>
                <IconButton
                  onClick={handleClick}
                  size="small"
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  sx={{ padding: "0" }}
                >
                  <MoreHorizIcon sx={{ fontSize: "25px" }} />
                </IconButton>

                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,

                    sx: {
                      overflow: "visible",
                      boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                      mt: 0,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem>Edit</MenuItem>
                  <MenuItem>Delete</MenuItem>
                </Menu>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                mt: "35px",
              }}
            >
              <div className="text-primary">
                <i
                  className="material-symbols-outlined"
                  style={{ fontSize: "45px" }}
                >
                  folder_open
                </i>
              </div>
              <Typography
                fontWeight={700}
                fontSize="15px"
                className="text-black"
              >
                Projects
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mt: "35px",
              }}
            >
              <Typography className="text-black">159 Files</Typography>
              <Typography className="text-black">4.5 GB</Typography>
            </Box>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 3 }}>
          <Box
            className="bg-white"
            sx={{
              borderRadius: "7px",
              padding: "20px",
              mb: "25px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Checkbox
                sx={{
                  padding: "0",

                  "& .MuiSvgIcon-root": { fontSize: 22 },
                }}
                {...label}
                className="dark-check"
              />

              <Box>
                <IconButton
                  onClick={handleClick}
                  size="small"
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  sx={{ padding: "0" }}
                >
                  <MoreHorizIcon sx={{ fontSize: "25px" }} />
                </IconButton>

                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,

                    sx: {
                      overflow: "visible",
                      boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                      mt: 0,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem>Edit</MenuItem>
                  <MenuItem>Delete</MenuItem>
                </Menu>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                mt: "35px",
              }}
            >
              <div className="text-secondary">
                <i
                  className="material-symbols-outlined"
                  style={{ fontSize: "45px" }}
                >
                  folder_open
                </i>
              </div>
              <Typography
                fontWeight={700}
                fontSize="15px"
                className="text-black"
              >
                Documents
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mt: "35px",
              }}
            >
              <Typography className="text-black">552 Files</Typography>
              <Typography className="text-black">5.5 GB</Typography>
            </Box>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 3 }}>
          <Box
            className="bg-white"
            sx={{
              borderRadius: "7px",
              padding: "20px",
              mb: "25px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Checkbox
                sx={{
                  padding: "0",

                  "& .MuiSvgIcon-root": { fontSize: 22 },
                }}
                {...label}
                className="dark-check"
              />

              <Box>
                <IconButton
                  onClick={handleClick}
                  size="small"
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  sx={{ padding: "0" }}
                >
                  <MoreHorizIcon sx={{ fontSize: "25px" }} />
                </IconButton>

                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,

                    sx: {
                      overflow: "visible",
                      boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                      mt: 0,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem>Edit</MenuItem>
                  <MenuItem>Delete</MenuItem>
                </Menu>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                mt: "35px",
              }}
            >
              <div className="text-success">
                <i
                  className="material-symbols-outlined"
                  style={{ fontSize: "45px" }}
                >
                  folder_open
                </i>
              </div>
              <Typography
                fontWeight={700}
                fontSize="15px"
                className="text-black"
              >
                Media
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mt: "35px",
              }}
            >
              <Typography className="text-black">995 Files</Typography>
              <Typography className="text-black">7.5 GB</Typography>
            </Box>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 3 }}>
          <Box
            className="bg-white"
            sx={{
              borderRadius: "7px",
              padding: "20px",
              mb: "25px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Checkbox
                sx={{
                  padding: "0",

                  "& .MuiSvgIcon-root": { fontSize: 22 },
                }}
                {...label}
                className="dark-check"
              />

              <Box>
                <IconButton
                  onClick={handleClick}
                  size="small"
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  sx={{ padding: "0" }}
                >
                  <MoreHorizIcon sx={{ fontSize: "25px" }} />
                </IconButton>

                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,

                    sx: {
                      overflow: "visible",
                      boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                      mt: 0,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem>Edit</MenuItem>
                  <MenuItem>Delete</MenuItem>
                </Menu>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                mt: "35px",
              }}
            >
              <div className="text-orange">
                <i
                  className="material-symbols-outlined"
                  style={{ fontSize: "45px" }}
                >
                  folder_open
                </i>
              </div>
              <Typography
                fontWeight={700}
                fontSize="15px"
                className="text-black"
              >
                Applications
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mt: "35px",
              }}
            >
              <Typography className="text-black">39 Files</Typography>
              <Typography className="text-black">3.8 GB</Typography>
            </Box>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 3 }}>
          <Box
            className="bg-white"
            sx={{
              borderRadius: "7px",
              padding: "20px",
              mb: "25px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Checkbox
                sx={{
                  padding: "0",

                  "& .MuiSvgIcon-root": { fontSize: 22 },
                }}
                {...label}
                className="dark-check"
              />

              <Box>
                <IconButton
                  onClick={handleClick}
                  size="small"
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  sx={{ padding: "0" }}
                >
                  <MoreHorizIcon sx={{ fontSize: "25px" }} />
                </IconButton>

                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,

                    sx: {
                      overflow: "visible",
                      boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                      mt: 0,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem>Edit</MenuItem>
                  <MenuItem>Delete</MenuItem>
                </Menu>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                mt: "35px",
              }}
            >
              <div className="text-warning">
                <i
                  className="material-symbols-outlined"
                  style={{ fontSize: "45px" }}
                >
                  folder_open
                </i>
              </div>
              <Typography
                fontWeight={700}
                fontSize="15px"
                className="text-black"
              >
                ET Template
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mt: "35px",
              }}
            >
              <Typography className="text-black">75 Files</Typography>
              <Typography className="text-black">2.2 GB</Typography>
            </Box>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 3 }}>
          <Box
            className="bg-white"
            sx={{
              borderRadius: "7px",
              padding: "20px",
              mb: "25px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Checkbox
                sx={{
                  padding: "0",

                  "& .MuiSvgIcon-root": { fontSize: 22 },
                }}
                {...label}
                className="dark-check"
              />

              <Box>
                <IconButton
                  onClick={handleClick}
                  size="small"
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  sx={{ padding: "0" }}
                >
                  <MoreHorizIcon sx={{ fontSize: "25px" }} />
                </IconButton>

                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,

                    sx: {
                      overflow: "visible",
                      boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                      mt: 0,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem>Edit</MenuItem>
                  <MenuItem>Delete</MenuItem>
                </Menu>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                mt: "35px",
              }}
            >
              <div className="text-info">
                <i
                  className="material-symbols-outlined"
                  style={{ fontSize: "45px" }}
                >
                  folder_open
                </i>
              </div>
              <Typography
                fontWeight={700}
                fontSize="15px"
                className="text-black"
              >
                React Template
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mt: "35px",
              }}
            >
              <Typography className="text-black">357 Files</Typography>
              <Typography className="text-black">8.5 GB</Typography>
            </Box>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 3 }}>
          <Box
            className="bg-white"
            sx={{
              borderRadius: "7px",
              padding: "20px",
              mb: "25px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Checkbox
                sx={{
                  padding: "0",

                  "& .MuiSvgIcon-root": { fontSize: 22 },
                }}
                {...label}
                className="dark-check"
              />

              <Box>
                <IconButton
                  onClick={handleClick}
                  size="small"
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  sx={{ padding: "0" }}
                >
                  <MoreHorizIcon sx={{ fontSize: "25px" }} />
                </IconButton>

                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,

                    sx: {
                      overflow: "visible",
                      boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                      mt: 0,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem>Edit</MenuItem>
                  <MenuItem>Delete</MenuItem>
                </Menu>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                mt: "35px",
              }}
            >
              <div className="text-purple">
                <i
                  className="material-symbols-outlined"
                  style={{ fontSize: "45px" }}
                >
                  folder_open
                </i>
              </div>
              <Typography
                fontWeight={700}
                fontSize="15px"
                className="text-black"
              >
                Material UI
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mt: "35px",
              }}
            >
              <Typography className="text-black">159 Files</Typography>
              <Typography className="text-black">4.5 GB</Typography>
            </Box>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 3 }}>
          <Box
            className="bg-white"
            sx={{
              borderRadius: "7px",
              padding: "20px",
              mb: "25px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Checkbox
                sx={{
                  padding: "0",

                  "& .MuiSvgIcon-root": { fontSize: 22 },
                }}
                {...label}
                className="dark-check"
              />

              <Box>
                <IconButton
                  onClick={handleClick}
                  size="small"
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  sx={{ padding: "0" }}
                >
                  <MoreHorizIcon sx={{ fontSize: "25px" }} />
                </IconButton>

                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,

                    sx: {
                      overflow: "visible",
                      boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                      mt: 0,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem>Edit</MenuItem>
                  <MenuItem>Delete</MenuItem>
                </Menu>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                mt: "35px",
              }}
            >
              <div className="text-dark">
                <i
                  className="material-symbols-outlined"
                  style={{ fontSize: "45px" }}
                >
                  folder_open
                </i>
              </div>
              <Typography
                fontWeight={700}
                fontSize="15px"
                className="text-black"
              >
                WP Themes
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mt: "35px",
              }}
            >
              <Typography className="text-black">552 Files</Typography>
              <Typography className="text-black">5.5 GB</Typography>
            </Box>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 3 }}>
          <Box
            className="bg-white"
            sx={{
              borderRadius: "7px",
              padding: "20px",
              mb: "25px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Checkbox
                sx={{
                  padding: "0",

                  "& .MuiSvgIcon-root": { fontSize: 22 },
                }}
                {...label}
                className="dark-check"
              />

              <Box>
                <IconButton
                  onClick={handleClick}
                  size="small"
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  sx={{ padding: "0" }}
                >
                  <MoreHorizIcon sx={{ fontSize: "25px" }} />
                </IconButton>

                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,

                    sx: {
                      overflow: "visible",
                      boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                      mt: 0,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem>Edit</MenuItem>
                  <MenuItem>Delete</MenuItem>
                </Menu>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                mt: "35px",
              }}
            >
              <div className="text-danger">
                <i
                  className="material-symbols-outlined"
                  style={{ fontSize: "45px" }}
                >
                  folder_open
                </i>
              </div>
              <Typography
                fontWeight={700}
                fontSize="15px"
                className="text-black"
              >
                Personal Photos
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mt: "35px",
              }}
            >
              <Typography className="text-black">995 Files</Typography>
              <Typography className="text-black">7.5 GB</Typography>
            </Box>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 3 }}>
          <Box
            className="bg-white"
            sx={{
              borderRadius: "7px",
              padding: "20px",
              mb: "25px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Checkbox
                sx={{
                  padding: "0",

                  "& .MuiSvgIcon-root": { fontSize: 22 },
                }}
                {...label}
                className="dark-check"
              />

              <Box>
                <IconButton
                  onClick={handleClick}
                  size="small"
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  sx={{ padding: "0" }}
                >
                  <MoreHorizIcon sx={{ fontSize: "25px" }} />
                </IconButton>

                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,

                    sx: {
                      overflow: "visible",
                      boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                      mt: 0,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem>Edit</MenuItem>
                  <MenuItem>Delete</MenuItem>
                </Menu>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                mt: "35px",
              }}
            >
              <div className="text-primary">
                <i
                  className="material-symbols-outlined"
                  style={{ fontSize: "45px" }}
                >
                  folder_open
                </i>
              </div>
              <Typography
                fontWeight={700}
                fontSize="15px"
                className="text-black"
              >
                Mobile Apps
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mt: "35px",
              }}
            >
              <Typography className="text-black">39 Files</Typography>
              <Typography className="text-black">3.8 GB</Typography>
            </Box>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 3 }}>
          <Box
            className="bg-white"
            sx={{
              borderRadius: "7px",
              padding: "20px",
              mb: "25px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Checkbox
                sx={{
                  padding: "0",

                  "& .MuiSvgIcon-root": { fontSize: 22 },
                }}
                {...label}
                className="dark-check"
              />

              <Box>
                <IconButton
                  onClick={handleClick}
                  size="small"
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  sx={{ padding: "0" }}
                >
                  <MoreHorizIcon sx={{ fontSize: "25px" }} />
                </IconButton>

                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,

                    sx: {
                      overflow: "visible",
                      boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                      mt: 0,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem>Edit</MenuItem>
                  <MenuItem>Delete</MenuItem>
                </Menu>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                mt: "35px",
              }}
            >
              <div className="text-secondary">
                <i
                  className="material-symbols-outlined"
                  style={{ fontSize: "45px" }}
                >
                  folder_open
                </i>
              </div>
              <Typography
                fontWeight={700}
                fontSize="15px"
                className="text-black"
              >
                Important Files
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mt: "35px",
              }}
            >
              <Typography className="text-black">75 Files</Typography>
              <Typography className="text-black">2.2 GB</Typography>
            </Box>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 3 }}>
          <Box
            className="bg-white"
            sx={{
              borderRadius: "7px",
              padding: "20px",
              mb: "25px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Checkbox
                sx={{
                  padding: "0",

                  "& .MuiSvgIcon-root": { fontSize: 22 },
                }}
                {...label}
                className="dark-check"
              />

              <Box>
                <IconButton
                  onClick={handleClick}
                  size="small"
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  sx={{ padding: "0" }}
                >
                  <MoreHorizIcon sx={{ fontSize: "25px" }} />
                </IconButton>

                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,

                    sx: {
                      overflow: "visible",
                      boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                      mt: 0,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem>Edit</MenuItem>
                  <MenuItem>Delete</MenuItem>
                </Menu>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                mt: "35px",
              }}
            >
              <div className="text-warning">
                <i
                  className="material-symbols-outlined"
                  style={{ fontSize: "45px" }}
                >
                  folder_open
                </i>
              </div>
              <Typography
                fontWeight={700}
                fontSize="15px"
                className="text-black"
              >
                Angular Template
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mt: "35px",
              }}
            >
              <Typography className="text-black">357 Files</Typography>
              <Typography className="text-black">8.5 GB</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default AssetsContent;
