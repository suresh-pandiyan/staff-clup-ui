"use client";

import React from "react";
import {
  Card,
  Typography,
  Box,
  Button,
  CardActions,
  CardContent,
} from "@mui/material";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const BasicCard = () => {
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
          Basic Card
        </Typography>

        {/* Card */}
        <Card>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Word of the Day
            </Typography>

            <Typography variant="h5" component="div" className="text-black">
              be{bull}nev{bull}o{bull}lent
            </Typography>

            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              adjective
            </Typography>

            <Typography variant="body2">
              well meaning and kindly.
              <br />
              {'"a benevolent smile"'}
            </Typography>
          </CardContent>

          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </Card>
    </>
  );
};

export default BasicCard;
