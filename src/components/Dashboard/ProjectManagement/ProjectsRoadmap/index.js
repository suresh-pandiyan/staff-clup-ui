"use client";

import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { Card, Box, Typography } from "@mui/material";
import CustomDropdown from "./CustomDropdown"; 

const ProjectsRoadmap = () => {
  // Chart
  const [isChartLoaded, setChartLoaded] = useState(false);

  useEffect(() => {
    setChartLoaded(true);
  }, []);

  const series = [
    {
      name: "Projects",
      data: [400, 550, 600, 700, 1000, 1100, 1200],
    },
  ];

  const options = {
    chart: {
      toolbar: {
        show: false,
      },
    },

    colors: ["#3584FC"],
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    grid: {
      show: true,
      borderColor: "#ECEEF2",
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: [
        "Project Planning",
        "Research",
        "Design",
        "Front-end",
        "Development",
        "Review & QA",
        "Launch",
      ],
      axisTicks: {
        show: true,
        color: "#ECEEF2",
      },
      axisBorder: {
        show: true,
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
      labels: {
        style: {
          colors: "#64748B",
          fontSize: "12px",
        },
      },
      axisBorder: {
        show: true,
        color: "#ECEEF2",
      },
      axisTicks: {
        show: true,
        color: "#ECEEF2",
      },
    },
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
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: "16px", md: "18px" },
              fontWeight: 700,
            }}
            className="text-black"
          >
            Projects Roadmap
          </Typography>

          <Box>
            <CustomDropdown
              options={["This Week", "This Month", "This Year"]} // Need to change the options also in CustomDropdown file
              onSelect={(value) => console.log(value)}
              defaultLabel="This Week"
            />
          </Box>
        </Box>

        <Box
          sx={{
            marginTop: "-25px",
            marginLeft: "-10px",
            marginBottom: "-25px",
          }}
        >
          {isChartLoaded && (
            <Chart
              options={options}
              series={series}
              type="bar"
              height={348}
              width={"100%"}
            />
          )}
        </Box>
      </Card>
    </>
  );
};

export default ProjectsRoadmap;
