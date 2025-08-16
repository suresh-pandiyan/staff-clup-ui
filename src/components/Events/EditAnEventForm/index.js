"use client";

import React, { useState } from "react";
import {
  Grid,
  Card,
  Box,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
  Button,
  Select,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CustomEditor from "./CustomEditor";
import FileUpload from "../../Forms/FileUpload";

const EditAnEventForm = () => {
  const [ticketType, setTicketType] = useState("");
  const [eventType, setEventType] = useState("");
  const [selectTopic, setSelectTopic] = useState("");
  const [eventCountry, setEventCountry] = useState("");
  const [eventState, setEventState] = useState("");
  const [eventCity, setEventCity] = useState("");
  const [eventTime, setEventTime] = useState("");

  const handleTicketTypeChange = (event) => {
    setTicketType(event.target.value);
  };

  const handleEventTypeChange = (event) => {
    setEventType(event.target.value);
  };

  const handleSelectTopicChange = (event) => {
    setSelectTopic(event.target.value);
  };

  const handleEventCountryChange = (event) => {
    setEventCountry(event.target.value);
  };

  const handleEventStateChange = (event) => {
    setEventState(event.target.value);
  };

  const handleEventCityChange = (event) => {
    setEventCity(event.target.value);
  };

  const handleEventTimeChange = (event) => {
    setEventTime(event.target.value);
  };

  // File Upload
  const handleFileSelect = (files) => {
    console.log("Selected files:", files);
    // Process your files here
  };

  return (
    <>
      <Box component="form">
        <Card
          sx={{
            boxShadow: "none",
            borderRadius: "7px",
            mb: "25px",
            padding: { xs: "18px", sm: "20px", lg: "25px" },
          }}
          className="rmui-card"
        >
          <Grid
            container
            spacing={3}
            columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}
          >
            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 4 }}>
              <Box>
                <FormControl fullWidth>
                  <Typography
                    component="label"
                    sx={{
                      fontWeight: "500",
                      fontSize: "14px",
                      mb: "10px",
                      display: "block",
                    }}
                    className="text-black"
                  >
                    Event Name
                  </Typography>

                  <TextField
                    label="Enter event name"
                    placeholder="E.g. Annual Conference 2024"
                    defaultValue="E.g. Annual Conference 2024"
                    variant="filled"
                    id="eventName"
                    name="eventName"
                    sx={{
                      "& .MuiInputBase-root": {
                        border: "1px solid #D5D9E2",
                        backgroundColor: "#fff",
                        borderRadius: "7px",
                        color: "#000",
                        fontWeight: "500",
                      },
                      "& .MuiInputBase-root::before": {
                        border: "none",
                      },
                      "& .MuiInputBase-root:hover::before": {
                        border: "none",
                      },
                    }}
                  />
                </FormControl>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 4 }}>
              <Box>
                <Typography
                  component="label"
                  sx={{
                    fontWeight: "500",
                    fontSize: "14px",
                    mb: "10px",
                    display: "block",
                  }}
                  className="text-black"
                >
                  Ticket Type
                </Typography>

                <FormControl fullWidth>
                  <InputLabel id="ticket-type-label">Select</InputLabel>
                  <Select
                    labelId="ticket-type-label"
                    id="ticket-type"
                    value={ticketType}
                    label="Select"
                    onChange={handleTicketTypeChange}
                    sx={{
                      "& fieldset": {
                        border: "1px solid #D5D9E2",
                        borderRadius: "7px",
                      },
                    }}
                  >
                    <MenuItem value={0}>Free</MenuItem>
                    <MenuItem value={1}>Paid</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 4 }}>
              <Box>
                <FormControl fullWidth>
                  <Typography
                    component="label"
                    sx={{
                      fontWeight: "500",
                      fontSize: "14px",
                      mb: "10px",
                      display: "block",
                    }}
                    className="text-black"
                  >
                    Ticket Price
                  </Typography>

                  <TextField
                    label="Enter ticket price"
                    placeholder="E.g. $20.00"
                    defaultValue="E.g. $20.00"
                    variant="filled"
                    id="ticketPrice"
                    name="ticketPrice"
                    sx={{
                      "& .MuiInputBase-root": {
                        border: "1px solid #D5D9E2",
                        backgroundColor: "#fff",
                        borderRadius: "7px",
                        color: "#000",
                        fontWeight: "500",
                      },
                      "& .MuiInputBase-root::before": {
                        border: "none",
                      },
                      "& .MuiInputBase-root:hover::before": {
                        border: "none",
                      },
                    }}
                  />
                </FormControl>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 4 }}>
              <Box>
                <Typography
                  component="label"
                  sx={{
                    fontWeight: "500",
                    fontSize: "14px",
                    mb: "10px",
                    display: "block",
                  }}
                  className="text-black"
                >
                  Event Type
                </Typography>

                <FormControl fullWidth>
                  <InputLabel id="event-type-label">Select</InputLabel>
                  <Select
                    labelId="event-type-label"
                    id="event-type"
                    value={eventType}
                    label="Select"
                    onChange={handleEventTypeChange}
                    sx={{
                      "& fieldset": {
                        border: "1px solid #D5D9E2",
                        borderRadius: "7px",
                      },
                    }}
                  >
                    <MenuItem value={0}>Online</MenuItem>
                    <MenuItem value={1}>Offline</MenuItem>
                    <MenuItem value={2}>Both</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 4 }}>
              <Box>
                <Typography
                  component="label"
                  sx={{
                    fontWeight: "500",
                    fontSize: "14px",
                    mb: "10px",
                    display: "block",
                  }}
                  className="text-black"
                >
                  Select Topic
                </Typography>

                <FormControl fullWidth>
                  <InputLabel id="select-topic-label">Select</InputLabel>
                  <Select
                    labelId="select-topic-label"
                    id="select-topic"
                    value={selectTopic}
                    label="Select"
                    onChange={handleSelectTopicChange}
                    sx={{
                      "& fieldset": {
                        border: "1px solid #D5D9E2",
                        borderRadius: "7px",
                      },
                    }}
                  >
                    <MenuItem value={0}>Pepper Festival</MenuItem>
                    <MenuItem value={1}>A Day of Comedy</MenuItem>
                    <MenuItem value={2}>Replicate Oktoberfest</MenuItem>
                    <MenuItem value={3}>Kite Flying Festival</MenuItem>
                    <MenuItem value={4}>Music Concert</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 4 }}>
              <Box>
                <FormControl fullWidth>
                  <Typography
                    component="label"
                    sx={{
                      fontWeight: "500",
                      fontSize: "14px",
                      mb: "10px",
                      display: "block",
                    }}
                    className="text-black"
                  >
                    Event Vanue
                  </Typography>

                  <TextField
                    label="Enter event vanue"
                    placeholder="E.g. 2750 Quadra Street Victoria Road"
                    defaultValue="E.g. 2750 Quadra Street Victoria Road"
                    variant="filled"
                    id="eventVanue"
                    name="eventVanue"
                    sx={{
                      "& .MuiInputBase-root": {
                        border: "1px solid #D5D9E2",
                        backgroundColor: "#fff",
                        borderRadius: "7px",
                        color: "#000",
                        fontWeight: "500",
                      },
                      "& .MuiInputBase-root::before": {
                        border: "none",
                      },
                      "& .MuiInputBase-root:hover::before": {
                        border: "none",
                      },
                    }}
                  />
                </FormControl>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 4 }}>
              <Box>
                <Typography
                  component="label"
                  sx={{
                    fontWeight: "500",
                    fontSize: "14px",
                    mb: "10px",
                    display: "block",
                  }}
                  className="text-black"
                >
                  Event Country
                </Typography>

                <FormControl fullWidth>
                  <InputLabel id="select-topic-label">Select</InputLabel>
                  <Select
                    labelId="select-topic-label"
                    id="select-topic"
                    value={eventCountry}
                    label="Select"
                    onChange={handleEventCountryChange}
                    sx={{
                      "& fieldset": {
                        border: "1px solid #D5D9E2",
                        borderRadius: "7px",
                      },
                    }}
                  >
                    <MenuItem value={0}>Switzerland</MenuItem>
                    <MenuItem value={1}>New Zealand</MenuItem>
                    <MenuItem value={2}>Germany</MenuItem>
                    <MenuItem value={3}>United States</MenuItem>
                    <MenuItem value={4}>Japan</MenuItem>
                    <MenuItem value={5}>Netherlands</MenuItem>
                    <MenuItem value={6}>Sweden</MenuItem>
                    <MenuItem value={7}>Canada</MenuItem>
                    <MenuItem value={8}>United Kingdom</MenuItem>
                    <MenuItem value={9}>Australia</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 4 }}>
              <Box>
                <Typography
                  component="label"
                  sx={{
                    fontWeight: "500",
                    fontSize: "14px",
                    mb: "10px",
                    display: "block",
                  }}
                  className="text-black"
                >
                  Event State
                </Typography>

                <FormControl fullWidth>
                  <InputLabel id="select-topic-label">Select</InputLabel>
                  <Select
                    labelId="select-topic-label"
                    id="select-topic"
                    value={eventState}
                    label="Select"
                    onChange={handleEventStateChange}
                    sx={{
                      "& fieldset": {
                        border: "1px solid #D5D9E2",
                        borderRadius: "7px",
                      },
                    }}
                  >
                    <MenuItem value={0}>Florida</MenuItem>
                    <MenuItem value={1}>Wisconsin</MenuItem>
                    <MenuItem value={2}>Washington</MenuItem>
                    <MenuItem value={3}>Nebraska</MenuItem>
                    <MenuItem value={4}>Minnesota</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 4 }}>
              <Box>
                <Typography
                  component="label"
                  sx={{
                    fontWeight: "500",
                    fontSize: "14px",
                    mb: "10px",
                    display: "block",
                  }}
                  className="text-black"
                >
                  Event City
                </Typography>

                <FormControl fullWidth>
                  <InputLabel id="select-topic-label">Select</InputLabel>
                  <Select
                    labelId="select-topic-label"
                    id="select-topic"
                    value={eventCity}
                    label="Select"
                    onChange={handleEventCityChange}
                    sx={{
                      "& fieldset": {
                        border: "1px solid #D5D9E2",
                        borderRadius: "7px",
                      },
                    }}
                  >
                    <MenuItem value={0}>New York</MenuItem>
                    <MenuItem value={1}>Tokyo</MenuItem>
                    <MenuItem value={2}>London</MenuItem>
                    <MenuItem value={3}>Amsterdam</MenuItem>
                    <MenuItem value={4}>Paris</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 4 }}>
              <Typography
                component="h5"
                sx={{
                  fontWeight: "500",
                  fontSize: "14px",
                  mb: "12px",
                }}
                className="text-black"
              >
                Event Start Date
              </Typography>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  sx={{
                    width: "100%",
                    "& fieldset": {
                      border: "1px solid rgba(0, 0, 0, 0.23)",
                      borderRadius: "7px",
                    },
                  }}
                  className="input-date-picker"
                />
              </LocalizationProvider>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 4 }}>
              <Typography
                component="h5"
                sx={{
                  fontWeight: "500",
                  fontSize: "14px",
                  mb: "12px",
                }}
                className="text-black"
              >
                Event End Date
              </Typography>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  sx={{
                    width: "100%",
                    "& fieldset": {
                      border: "1px solid rgba(0, 0, 0, 0.23)",
                      borderRadius: "7px",
                    },
                  }}
                  className="input-date-picker"
                />
              </LocalizationProvider>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 4 }}>
              <Box>
                <Typography
                  component="label"
                  sx={{
                    fontWeight: "500",
                    fontSize: "14px",
                    mb: "10px",
                    display: "block",
                  }}
                  className="text-black"
                >
                  Event Time
                </Typography>

                <FormControl fullWidth>
                  <InputLabel id="select-topic-label">Select</InputLabel>
                  <Select
                    labelId="select-topic-label"
                    id="select-topic"
                    value={eventTime}
                    label="Select"
                    onChange={handleEventTimeChange}
                    sx={{
                      "& fieldset": {
                        border: "1px solid #D5D9E2",
                        borderRadius: "7px",
                      },
                    }}
                  >
                    <MenuItem value={0}>9AM - 10AM</MenuItem>
                    <MenuItem value={1}>11AM - 12PM</MenuItem>
                    <MenuItem value={2}>2PM - 4PM</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 4 }}>
              <Typography
                component="h5"
                sx={{
                  fontWeight: "500",
                  fontSize: "14px",
                  mb: "12px",
                }}
                className="text-black"
              >
                Registration Deadline
              </Typography>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  sx={{
                    width: "100%",
                    "& fieldset": {
                      border: "1px solid rgba(0, 0, 0, 0.23)",
                      borderRadius: "7px",
                    },
                  }}
                  className="input-date-picker"
                />
              </LocalizationProvider>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 4 }}>
              <Box>
                <FormControl fullWidth>
                  <Typography
                    component="label"
                    sx={{
                      fontWeight: "500",
                      fontSize: "14px",
                      mb: "10px",
                      display: "block",
                    }}
                    className="text-black"
                  >
                    Event Organizers
                  </Typography>

                  <TextField
                    label="Enter event organizers name"
                    placeholder="E.g. Hand Watch"
                    defaultValue="E.g. Hand Watch"
                    variant="filled"
                    id="eventOrganizers"
                    name="eventOrganizers"
                    required
                    sx={{
                      "& .MuiInputBase-root": {
                        border: "1px solid #D5D9E2",
                        backgroundColor: "#fff",
                        borderRadius: "7px",
                        color: "#000",
                        fontWeight: "500",
                      },
                      "& .MuiInputBase-root::before": {
                        border: "none",
                      },
                      "& .MuiInputBase-root:hover::before": {
                        border: "none",
                      },
                    }}
                  />
                </FormControl>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 4 }}>
              <Box>
                <FormControl fullWidth>
                  <Typography
                    component="label"
                    sx={{
                      fontWeight: "500",
                      fontSize: "14px",
                      mb: "10px",
                      display: "block",
                    }}
                    className="text-black"
                  >
                    Event Sponsors
                  </Typography>

                  <TextField
                    label="Enter event sponsors name"
                    placeholder="E.g. Hand Watch"
                    defaultValue="E.g. Hand Watch"
                    variant="filled"
                    id="eventSponsors"
                    name="eventSponsors"
                    required
                    sx={{
                      "& .MuiInputBase-root": {
                        border: "1px solid #D5D9E2",
                        backgroundColor: "#fff",
                        borderRadius: "7px",
                        color: "#000",
                        fontWeight: "500",
                      },
                      "& .MuiInputBase-root::before": {
                        border: "none",
                      },
                      "& .MuiInputBase-root:hover::before": {
                        border: "none",
                      },
                    }}
                  />
                </FormControl>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
              <Box>
                <Typography
                  component="label"
                  sx={{
                    fontWeight: "500",
                    fontSize: "14px",
                    mb: "10px",
                    display: "block",
                  }}
                  className="text-black"
                >
                  Event Details
                </Typography>

                <CustomEditor />
              </Box>
            </Grid>

            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
              <Typography
                component="h5"
                sx={{
                  fontWeight: "500",
                  fontSize: "14px",
                  mb: "12px",
                }}
                className="text-black"
              >
                Event Image
              </Typography>

              <FileUpload onFileSelect={handleFileSelect} />
            </Grid>

            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: { xs: "10px", sm: "20px" },
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  color="error"
                  sx={{
                    textTransform: "capitalize",
                    borderRadius: "6px",
                    fontWeight: "500",
                    fontSize: { xs: "13px", sm: "16px" },
                    padding: { xs: "10px 20px", sm: "10px 24px" },
                    color: "#fff !important",
                    boxShadow: "none",
                  }}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    textTransform: "capitalize",
                    borderRadius: "6px",
                    fontWeight: "500",
                    fontSize: { xs: "13px", sm: "16px" },
                    padding: { xs: "10px 20px", sm: "10px 24px" },
                    color: "#fff !important",
                    boxShadow: "none",
                  }}
                >
                  <i className="material-symbols-outlined">add</i>{" "}
                  Create/Publish
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Box>
    </>
  );
};

export default EditAnEventForm;
