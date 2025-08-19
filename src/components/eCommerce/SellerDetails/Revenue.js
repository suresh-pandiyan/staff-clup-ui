"use client";

import React, { useEffect, useState } from "react";
import Chart from 'react-apexcharts';
import {
  Card,
  Box,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
import Select from "@mui/material/Select";

const Revenue = () => {
  // Select state
  const [select, setSelect] = useState("");

  const handleChange = (event) => {
    setSelect(event.target.value);
  };

  // Chart
  const [isChartLoaded, setChartLoaded] = useState(false);

  useEffect(() => {
    setChartLoaded(true);
  }, []);

  const series = [
    {
      name: "Orders",
      data: [28, 50, 90, 95, 20, 70, 35],
    },
    {
      name: "Earnings",
      data: [80, 60, 70, 30, 45, 20, 80],
    },
    {
      name: "Refunds",
      data: [32, 23, 78, 35, 65, 35, 15],
    },
    {
      name: "Conversion Rate",
      data: [60, 25, 80, 25, 15, 40, 15],
    },
  ];

  const options = {
    chart: {
      toolbar: {
        show: true,
      },
    },

    colors: ["#605DFF", "#3584FC", "#AD63F6", "#FD5812"],
    plotOptions: {
      bar: {
        columnWidth: "50%",
      },
    },
    grid: {
      show: true,
      borderColor: "#ECEEF2",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 5,
      show: true,
      colors: ["transparent"],
    },
    xaxis: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      axisTicks: {
        show: false,
        color: "#ECEEF2",
      },
      axisBorder: {
        show: false,
        color: "#ECEEF2",
      },
      labels: {
        show: true,
        style: {
          colors: "#8695AA",
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      tickAmount: 5,
      max: 100,
      min: 0,
      labels: {
        style: {
          colors: "#64748B",
          fontSize: "12px",
        },
      },
      axisBorder: {
        show: false,
        color: "#ECEEF2",
      },
      axisTicks: {
        show: false,
        color: "#ECEEF2",
      },
    },
    legend: {
      show: true,
      position: "top",
      fontSize: "12px",
      horizontalAlign: "left",
      itemMargin: {
        horizontal: 8,
        vertical: 0,
      },
      labels: {
        colors: "#64748B",
      },
      markers: {
        shape: 'diamond',
        offsetX: -2,
        offsetY: -0.5,
      },
    },
  };

  return (
    <>
      <Card
        sx={{
          position: "relative",
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
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: "16px", md: "18px" },
              fontWeight: 700,
            }}
            className="text-black"
          >
            Revenue: $23.91k
          </Typography>

          <Box>
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
                <MenuItem value={0}>This Weekly</MenuItem>
                <MenuItem value={1}>This Monthly</MenuItem>
                <MenuItem value={2}>This Yearly</MenuItem>
                <MenuItem value={4}>All Time</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        <div
          style={{
            marginBottom: "-22px",
            marginLeft: "-13px",
            marginTop: "-8px",
          }}
        >
          {isChartLoaded && (
            <Chart
              options={options}
              series={series}
              type="bar"
              height={398}
              width={"100%"}
            />
          )}
        </div>
      </Card>
    </>
  );
};

export default Revenue;
