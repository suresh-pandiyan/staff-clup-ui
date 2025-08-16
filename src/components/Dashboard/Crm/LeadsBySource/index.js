"use client";

import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { Grid, Card, Box, Typography } from "@mui/material";
import CustomDropdown from "./CustomDropdown";

const LeadsBySource = () => {
  // Chart
  const [isChartLoaded, setChartLoaded] = useState(false);

  useEffect(() => {
    setChartLoaded(true);
  }, []);

  const series = [320, 60, 30, 160, 279, 19];

  const options = {
    labels: ["Organic", "Paid", "Direct", "Social", "Referrals", "Others"],
    colors: ["#605DFF", "#3584FC", "#AD63F6", "#0dcaf0", "#25B003", "#FD5812"],
    stroke: {
      width: 1,
      show: true,
      colors: ["#ffffff"],
    },
    legend: {
      show: false,
      position: "top",
      fontSize: "12px",
      horizontalAlign: "center",
      itemMargin: {
        horizontal: 8,
        vertical: 0,
      },
      labels: {
        colors: "#64748B",
      },
      markers: {
        shape: "diamond",
        offsetX: -2,
        offsetY: -0.5,
      },
    },
    plotOptions: {
      pie: {
        expandOnClick: false,
        donut: {
          labels: {
            show: true,
            name: {
              color: "#64748B",
            },
            value: {
              show: true,
              color: "#3A4252",
              fontSize: "28px",
              fontWeight: "600",
            },
            total: {
              show: true,
              color: "#64748B",
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      enabled: false,
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
            Leads By Source
          </Typography>

          <Box>
            <CustomDropdown
              options={["This Week", "This Month", "This Year"]} // Need to change the options also in CustomDropdown file
              onSelect={(value) => console.log(value)}
              defaultLabel="This Month"
            />
          </Box>
        </Box>

        <Box
          sx={{
            marginTop: "-15px",
          }}
        >
          {isChartLoaded && (
            <Chart
              options={options}
              series={series}
              type="donut"
              height={282}
              width={"100%"}
            />
          )}
        </Box>

        <Grid container spacing={3} sx={{ mt: "8px" }}>
          <Grid size={{ xs: 4 }}>
            <Box>
              <Typography
                component="span"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "13px",
                  mb: "8px",
                }}
              >
                <Typography
                  component="span"
                  className="bg-primary"
                  sx={{
                    width: "11px",
                    height: "11px",
                    borderRadius: "3px",
                  }}
                ></Typography>
                Organic
              </Typography>

              <Typography
                variant="h6"
                mb={0}
                fontSize={18}
                fontWeight={500}
                lineHeight={1}
                className="text-black"
              >
                320
              </Typography>
            </Box>
          </Grid>

          <Grid size={{ xs: 4 }}>
            <Box>
              <Typography
                component="span"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "13px",
                  mb: "8px",
                }}
              >
                <Typography
                  component="span"
                  className="bg-secondary"
                  sx={{
                    width: "11px",
                    height: "11px",
                    borderRadius: "3px",
                  }}
                ></Typography>
                Paid
              </Typography>

              <Typography
                variant="h6"
                mb={0}
                fontSize={18}
                fontWeight={500}
                lineHeight={1}
                className="text-black"
              >
                60
              </Typography>
            </Box>
          </Grid>

          <Grid size={{ xs: 4 }}>
            <Box>
              <Typography
                component="span"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "13px",
                  mb: "8px",
                }}
              >
                <Typography
                  component="span"
                  className="bg-purple"
                  sx={{
                    width: "11px",
                    height: "11px",
                    borderRadius: "3px",
                  }}
                ></Typography>
                Direct
              </Typography>

              <Typography
                variant="h6"
                mb={0}
                fontSize={18}
                fontWeight={500}
                lineHeight={1}
                className="text-black"
              >
                30
              </Typography>
            </Box>
          </Grid>

          <Grid size={{ xs: 4 }}>
            <Box>
              <Typography
                component="span"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "13px",
                  mb: "8px",
                }}
              >
                <Typography
                  component="span"
                  className="bg-info"
                  sx={{
                    width: "11px",
                    height: "11px",
                    borderRadius: "3px",
                  }}
                ></Typography>
                Social
              </Typography>

              <Typography
                variant="h6"
                mb={0}
                fontSize={18}
                fontWeight={500}
                lineHeight={1}
                className="text-black"
              >
                160
              </Typography>
            </Box>
          </Grid>

          <Grid size={{ xs: 4 }}>
            <Box>
              <Typography
                component="span"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "13px",
                  mb: "8px",
                }}
              >
                <Typography
                  component="span"
                  className="bg-success"
                  sx={{
                    width: "11px",
                    height: "11px",
                    borderRadius: "3px",
                  }}
                ></Typography>
                Referrals
              </Typography>

              <Typography
                variant="h6"
                mb={0}
                fontSize={18}
                fontWeight={500}
                lineHeight={1}
                className="text-black"
              >
                279
              </Typography>
            </Box>
          </Grid>

          <Grid size={{ xs: 4 }}>
            <Box>
              <Typography
                component="span"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "13px",
                  mb: "8px",
                }}
              >
                <Typography
                  component="span"
                  className="bg-orange"
                  sx={{
                    width: "11px",
                    height: "11px",
                    borderRadius: "3px",
                  }}
                ></Typography>
                Others
              </Typography>

              <Typography
                variant="h6"
                mb={0}
                fontSize={18}
                fontWeight={500}
                lineHeight={1}
                className="text-black"
              >
                19
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

export default LeadsBySource;
