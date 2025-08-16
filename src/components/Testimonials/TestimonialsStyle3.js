"use client";

import React from "react";
import { Grid, Card, Typography, Box } from "@mui/material";

const TestimonialsStyle3 = () => {
  // Dynamic testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Financial Manager",
      image: "/images/users/user6.jpg",
      rating: 5,
      text: `"Statistics is the science of using data to make decisions. This is relevant in almost all fields of work and there are many opportunities for employment."`,
    },
    {
      id: 2,
      name: "Michael Smith",
      role: "Software Developer",
      image: "/images/users/user7.jpg",
      rating: 5,
      text: `"Statistics is the science of using data to make decisions. This is relevant in almost all fields of work and there are many opportunities for employment."`,
    },
    {
      id: 3,
      name: "Emily Brown",
      role: "IT Manager",
      image: "/images/users/user8.jpg",
      rating: 5,
      text: `"Statistics is the science of using data to make decisions. This is relevant in almost all fields of work and there are many opportunities for employment."`,
    },
  ];

  return (
    <>
      <Card
        sx={{
          boxShadow: "none",
          borderRadius: "7px",
          mb: "25px",
          p: { xs: "18px", sm: "20px", lg: "25px" },
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
          Testimonials Style - 3
        </Typography>

        <Grid
          container
          columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}
          spacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}
        >
          {testimonials.map((testimonial) => (
            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 4 }} key={testimonial.id}>
              <Box
                className="testimonial-item bg-gray border-radius"
                sx={{
                  mb: "25px",
                  padding: { xs: "20px", sm: "25px" },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "15px",
                    mb: "15px",
                  }}
                >
                  <Box>
                    <img
                      src={testimonial.image}
                      width={100}
                      height={100}
                      alt={testimonial.name}
                      className="rounded-circle"
                    />
                  </Box>

                  <Box>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: "700",
                        fontSize: { xs: "16px", sm: "18px" },
                        marginBottom: "6px",
                      }}
                    >
                      {testimonial.name}
                    </Typography>

                    <Typography component="span">{testimonial.role}</Typography>

                    <Box
                      className="ratings"
                      sx={{
                        lineHeight: "1",
                        color: "#fe7a36",
                        fontSize: "16px",
                        mt: "10px",
                      }}
                    >
                      {[...Array(testimonial.rating)].map((_, index) => (
                        <i
                          key={index}
                          className="ri-star-fill mr-1"
                          style={{ marginRight: "4px" }}
                        ></i>
                      ))}
                    </Box>
                  </Box>
                </Box>

                <Typography
                  className="text-black"
                  sx={{
                    fontWeight: "500",
                    fontStyle: "italic",
                    lineHeight: "1.8",
                  }}
                >
                  {testimonial.text}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Card>
    </>
  );
};

export default TestimonialsStyle3;
