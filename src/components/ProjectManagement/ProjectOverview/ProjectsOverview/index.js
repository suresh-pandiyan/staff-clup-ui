"use client";

import * as React from "react";
import { Card, Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";

const ProjectsOverview = () => {
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
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: "16px", md: "18px" },
              fontWeight: 700,
            }}
            className="text-black"
          >
            Projects Overview
          </Typography>
        </Box>

        <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}>
          <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
            <Box
              className="pm-po-card bg-primary-50"
              sx={{
                padding: "22px 20px",
                borderRadius: "7px",
                mt: "25px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <Box className="text-primary">
                  <i
                    className="material-symbols-outlined"
                    style={{ fontSize: "40px" }}
                  >
                    history_toggle_off
                  </i>
                </Box>

                <Box>
                  <Typography mb="3px">Total Hours</Typography>

                  <Typography
                    variant="h5"
                    fontSize={20}
                    mb={0}
                    fontWeight={700}
                    className="text-black"
                  >
                    102
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mt: "25px",
                }}
              >
                <Typography fontSize={13}>Hours this week</Typography>

                <Box
                  sx={{
                    bgcolor: "#d8ffc8",
                    color: "success.main",
                    border: "1px solid #82FC5A",
                    borderRadius: "100px",
                    fontSize: "13px",
                    padding: "1.3px 8.3px",
                  }}
                >
                  +10%
                </Box>
              </Box>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
            <Box
              className="pm-po-card bg-orange-50"
              sx={{
                padding: "22px 20px",
                borderRadius: "7px",
                mt: "25px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <Box className="text-orange">
                  <i
                    className="material-symbols-outlined"
                    style={{ fontSize: "40px" }}
                  >
                    local_cafe
                  </i>
                </Box>

                <Box>
                  <Typography mb="3px">Total Cup of Coffee</Typography>

                  <Typography
                    variant="h5"
                    fontSize={20}
                    mb={0}
                    fontWeight={700}
                    className="text-black"
                  >
                    89
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mt: "25px",
                }}
              >
                <Typography fontSize={13}>Coffee this week</Typography>

                <Box
                  sx={{
                    bgcolor: "#d8ffc8",
                    color: "success.main",
                    border: "1px solid #82FC5A",
                    borderRadius: "100px",
                    fontSize: "13px",
                    padding: "1.3px 8.3px",
                  }}
                >
                  +10%
                </Box>
              </Box>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
            <Box
              className="pm-po-card bg-success-50"
              sx={{
                padding: "22px 20px",
                borderRadius: "7px",
                mt: "25px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <Box className="text-success">
                  <i
                    className="material-symbols-outlined"
                    style={{ fontSize: "40px" }}
                  >
                    door_open
                  </i>
                </Box>

                <div>
                  <Typography mb="3px">Total Days</Typography>

                  <Typography
                    variant="h5"
                    fontSize={20}
                    mb={0}
                    fontWeight={700}
                    className="text-black"
                  >
                    54
                  </Typography>
                </div>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mt: "25px",
                }}
              >
                <Typography fontSize={13}>Days this week</Typography>

                <Typography
                  className="text-danger"
                  sx={{
                    bgcolor: "#ffe1dd",
                    border: "1px solid #ffcea9",
                    borderRadius: "100px",
                    fontSize: "13px",
                    padding: "1.3px 8.3px",
                  }}
                >
                  -15%
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
            <Box
              className="pm-po-card bg-purple-50"
              sx={{
                padding: "22px 20px",
                borderRadius: "7px",
                mt: "25px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <Box className="text-purple">
                  <i
                    className="material-symbols-outlined"
                    style={{ fontSize: "40px" }}
                  >
                    group
                  </i>
                </Box>

                <div>
                  <Typography mb="3px">Team Members</Typography>

                  <Typography
                    variant="h5"
                    fontSize={20}
                    mb={0}
                    fontWeight={700}
                    className="text-black"
                  >
                    65+
                  </Typography>
                </div>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mt: "20px",
                }}
              >
                <Typography fontSize={13}>Hard Worker</Typography>

                <AvatarGroup
                  total={59}
                  sx={{
                    "& .MuiAvatar-root": {
                      border: "2px solid #fff",
                      backgroundColor: "#f0f0f0",
                      color: "#000",
                      width: "28px",
                      height: "28px",
                    },
                    "& .MuiAvatarGroup-avatar": {
                      backgroundColor: "#605dff", // Custom background color for the total avatar
                      color: "#fff", // Custom color for the text
                      fontSize: "10px",
                    },
                  }}
                >
                  <Avatar alt="Remy Sharp" src="/images/users/user15.jpg" />
                  <Avatar alt="Travis Howard" src="/images/users/user14.jpg" />
                  <Avatar alt="Agnes Walker" src="/images/users/user13.jpg" />
                  <Avatar alt="Trevor Le" src="/images/users/user12.jpg" />
                </AvatarGroup>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

export default ProjectsOverview;
