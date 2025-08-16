"use client";

import * as React from "react";
import { Card, Typography, AvatarGroup, Avatar, Box } from "@mui/material";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";

const AdvancedTimeline = () => {
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
        <Typography
          variant="h3"
          sx={{
            fontSize: { xs: "16px", md: "18px" },
            fontWeight: 700,
            mb: "25px",
          }}
          className="text-black"
        >
          Advanced Timeline
        </Typography>

        <Timeline position="alternate">
          <TimelineItem sx={{ mt: "15px" }}>
            <TimelineOppositeContent fontSize="13px" className="text-body">
              Just now
            </TimelineOppositeContent>

            <TimelineSeparator>
              <TimelineDot
                sx={{
                  bgcolor: "success.main",
                  mb: "0",
                }}
              />
              <TimelineConnector sx={{ width: "1px", bgcolor: "#eceef2" }} />
            </TimelineSeparator>

            <TimelineContent>
              <Box
                className="bg-primary-50"
                sx={{ 
                  borderRadius: "7px",
                  padding: "20px",
                }}
              >
                <Typography color="primary.main" fontWeight={500} mb="10px">
                  Weekly Stand-Up Meetings:
                </Typography>

                <Typography mb="10px" maxWidth="770px" lineHeight="1.5">
                  We continued our weekly stand-up meetings where team members
                  provided updates on their current tasks, discussed any
                  roadblocks, and coordinated efforts for the week ahead.
                </Typography>

                <AvatarGroup
                  total={59}
                  sx={{
                    justifyContent: "flex-end",
                    mb: "15px",

                    "& .MuiAvatar-root": {
                      border: "2px solid #fff",
                      backgroundColor: "#f0f0f0",
                      color: "#000",
                      width: "38px",
                      height: "38px",
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

                <Typography fontSize="13px">
                  By: <span className="text-primary">Olivia Rodriguez</span>
                </Typography>
              </Box>
            </TimelineContent>
          </TimelineItem>

          <TimelineItem sx={{ mt: "15px" }}>
            <TimelineOppositeContent fontSize="13px" className="text-body">
              1 day ago
            </TimelineOppositeContent>

            <TimelineSeparator>
              <TimelineDot
                sx={{
                  bgcolor: "error.main",
                  mb: "0",
                }}
              />
              <TimelineConnector sx={{ width: "1px", bgcolor: "#eceef2" }} />
            </TimelineSeparator>

            <TimelineContent>
              <Box 
                className="bg-primary-50"
                sx={{ 
                  borderRadius: "7px",
                  padding: "20px",
                }}
              >
                <Typography color="primary.main" fontWeight={500} mb="10px">
                  Project Kickoff Session:
                </Typography>

                <Typography mb="10px" maxWidth="770px" lineHeight="1.5">
                  The session included introductions, a review of project goals
                  and objectives, and initial planning discussions.
                </Typography>

                <Typography fontSize="13px">
                  By: <span className="text-primary">Isabella Cooper</span>
                </Typography>
              </Box>
            </TimelineContent>
          </TimelineItem>

          <TimelineItem sx={{ mt: "15px" }}>
            <TimelineOppositeContent fontSize="13px" className="text-body">
              2 day ago
            </TimelineOppositeContent>

            <TimelineSeparator>
              <TimelineDot
                sx={{
                  mb: "0",
                }}
                className="bg-purple"
              />
              <TimelineConnector sx={{ width: "1px", bgcolor: "#eceef2" }} />
            </TimelineSeparator>

            <TimelineContent>
              <Box 
                className="bg-primary-50"
                sx={{ 
                  borderRadius: "7px",
                  padding: "20px",
                }}
              >
                <Typography color="primary.main" fontWeight={500} mb="10px">
                  Team Building Workshop:
                </Typography>

                <Typography mb="10px" maxWidth="770px" lineHeight="1.5">
                  Last Friday, we conducted a team building workshop focused on
                  improving communication and collaboration among team members.
                  Activities included team challenges, icebreakers, and open
                  discussions.
                </Typography>

                <Typography fontSize="13px">
                  By: <span className="text-primary">Lucas Morgan</span>
                </Typography>
              </Box>
            </TimelineContent>
          </TimelineItem>

          <TimelineItem sx={{ mt: "15px" }}>
            <TimelineOppositeContent fontSize="13px" className="text-body">
              3 day ago
            </TimelineOppositeContent>

            <TimelineSeparator>
              <TimelineDot
                sx={{
                  bgcolor: "primary.main",
                  mb: "0",
                }}
              />
              <TimelineConnector sx={{ width: "1px", bgcolor: "#eceef2" }} />
            </TimelineSeparator>

            <TimelineContent>
              <Box 
                className="bg-primary-50"
                sx={{ 
                  borderRadius: "7px",
                  padding: "20px",
                }}
              >
                <AvatarGroup
                  max={4}
                  sx={{
                    mb: "15px",

                    "& .MuiAvatar-root": {
                      border: "2px solid #fff",
                      backgroundColor: "#f0f0f0",
                      color: "#000",
                      width: "38px",
                      height: "38px",
                    },
                    "& .MuiAvatarGroup-avatar": {
                      backgroundColor: "#605dff", // Custom background color for the total avatar
                      color: "#fff", // Custom color for the text
                      fontSize: "10px",
                    },
                  }}
                >
                  <Avatar alt="Remy Sharp" src="/images/users/user6.jpg" />
                  <Avatar alt="Travis Howard" src="/images/users/user7.jpg" />
                  <Avatar alt="Agnes Walker" src="/images/users/user8.jpg" />
                  <Avatar alt="Trevor Le" src="/images/users/user9.jpg" />
                  <Avatar alt="Trevor" src="/images/users/user10.jpg" />
                </AvatarGroup>

                <Typography color="primary.main" fontWeight={500} mb="10px">
                  Lunch and Learn Session:
                </Typography>

                <Typography
                  fontSize="13px"
                  mb="10px"
                  maxWidth="770px"
                  lineHeight="1.7"
                >
                  We organized a lunch and learn session on March 15th where a
                  guest speaker from the industry discussed emerging trends in
                  our field. It was an insightful session that sparked valuable
                  discussions among team members.
                </Typography>

                <Typography fontSize="13px">
                  By: <span className="text-primary">Ethan Parker</span>
                </Typography>
              </Box>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </Card>
    </>
  );
};

export default AdvancedTimeline;
