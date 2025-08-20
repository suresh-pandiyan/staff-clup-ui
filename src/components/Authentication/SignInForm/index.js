"use client";

import * as React from "react";
import {
  Grid,
  Button,
  Box,
  Typography,
  FormControl,
  TextField,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useFormWithValidation, validationSchemas, handleFormSubmit } from "../../../helpers/formConfig";
import { authService } from "../../../services/authService";
import { useApp } from "../../../contexts/AppContext";

const SignInForm = () => {
  const navigate = useNavigate();
  const { fetchProfile } = useApp();
  const [isLoading, setIsLoading] = React.useState(false);
  const [formMessage, setFormMessage] = React.useState(null);

  // Initialize form with validation
  const form = useFormWithValidation(validationSchemas.login, {
    defaultValues: {
      email: "john.doe@company.com",
      password: "password123",
    },
  });

  // Handle form submission
  const onSubmit = async (data) => {
    setIsLoading(true);
    setFormMessage(null);

    try {
      const result = await authService.login(data);

      console.log("Result", result);

      if (result.status === 200) {
        setFormMessage({
          type: "success",
          message: "Login successful! Fetching profile...",
        });

        try {
          // Fetch user profile after successful login
          await fetchProfile();

          setFormMessage({
            type: "success",
            message: "Login successful! Redirecting to dashboard...",
          });

          // Redirect to dashboard after profile is loaded
          setTimeout(() => {
            navigate("/dashboard");
          }, 1500);
        } catch (profileError) {
          console.error('Profile fetch error:', profileError);
          // Still redirect even if profile fetch fails
          setFormMessage({
            type: "success",
            message: "Login successful! Redirecting to dashboard...",
          });
          setTimeout(() => {
            navigate("/dashboard");
          }, 1500);
        }
      }
    } catch (error) {
      setFormMessage({
        type: "error",
        message: error.message || "Login failed. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form submit with error handling
  const handleSubmit = form.handleSubmit(onSubmit);

  return (
    <>
      <Box
        className="auth-main-wrapper sign-in-area"

        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",

        }}
      >
        <Box
          sx={{
            maxWidth: { sm: "500px", md: "1255px" },
            mx: "auto !important",
            px: "12px",
          }}
        >
          <Grid
            container
            alignItems="center"

            justifyContent="center"

            columnSpacing={{ xs: 1, sm: 2, md: 4, lg: 3 }}
          >
            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 7 }}>
              <Box
                sx={{
                  display: { xs: "none", md: "block" },
                }}
              >
                <img
                  src="/images/sign-in.jpg"
                  alt="sign-in-image"
                  width={500}
                  height={500}
                  style={{
                    borderRadius: "24px",
                  }}
                />
              </Box>
            </Grid>

            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 5 }}>
              <Box
                className="form-content"
                sx={{
                  paddingLeft: { xs: "0", lg: "10px" },
                }}
              >
                <Box
                  className="logo"
                  sx={{
                    mb: "23px",
                  }}
                >

                  <img

                    src="/images/logo-big.svg"
                    alt="logo"
                    width={142}
                    height={38}

                  />
                  <img

                    src="/images/white-logo.svg"
                    className="d-none"
                    alt="logo"
                    width={142}
                    height={38}

                  />

                </Box>

                <Box
                  className="title"
                  sx={{
                    mb: "23px",
                  }}
                >
                  <Typography
                    variant="h4"
                    component="h1"
                    sx={{
                      fontWeight: "600",
                      fontSize: { xs: "24px", sm: "28px", md: "32px" },
                      mb: "8px",
                    }}
                    className="text-black"
                  >
                    Welcome Back!
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#6B7280",
                      fontSize: "16px",
                    }}
                  >
                    Sign in to your account to continue
                  </Typography>
                </Box>

                {/* Form Message Alert */}
                {formMessage && (
                  <Box mb="20px">
                    <Alert severity={formMessage.type}>
                      {formMessage.message}
                    </Alert>
                  </Box>
                )}

                <Box component="form" onSubmit={handleSubmit}>
                  <Box mb="15px">
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
                        Email Address
                      </Typography>

                      <TextField
                        {...form.register("email")}
                        label="example&#64;trezo.com"
                        variant="filled"
                        id="email"
                        name="email"
                        error={!!form.formState.errors.email}
                        helperText={form.formState.errors.email?.message}
                        disabled={isLoading}
                        sx={{
                          "& .MuiInputBase-root": {
                            border: "1px solid #D5D9E2",
                            backgroundColor: "#fff",
                            borderRadius: "7px",
                          },
                          "& .MuiInputBase-root::before": {
                            border: "none",
                          },
                          "& .MuiInputBase-root:hover::before": {
                            border: "none",
                          },
                          "& .MuiInputBase-root:hover:hover:not(.Mui-disabled, .Mui-error)::before":
                          {
                            border: "none",
                          },
                          "& .MuiFormHelperText-root": {
                            color: "#d32f2f",
                            marginLeft: "0",
                          },
                        }}
                      />
                    </FormControl>
                  </Box>

                  <Box mb="15px">
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
                        Password
                      </Typography>

                      <TextField
                        {...form.register("password")}
                        label="Type Password"
                        variant="filled"
                        type="password"
                        id="password"
                        name="password"
                        error={!!form.formState.errors.password}
                        helperText={form.formState.errors.password?.message}
                        disabled={isLoading}
                        sx={{
                          "& .MuiInputBase-root": {
                            border: "1px solid #D5D9E2",
                            backgroundColor: "#fff",
                            borderRadius: "7px",
                          },
                          "& .MuiInputBase-root::before": {
                            border: "none",
                          },
                          "& .MuiInputBase-root:hover::before": {
                            border: "none",
                          },
                          "& .MuiInputBase-root:hover:hover:not(.Mui-disabled, .Mui-error)::before":
                          {
                            border: "none",
                          },
                          "& .MuiFormHelperText-root": {
                            color: "#d32f2f",
                            marginLeft: "0",
                          },
                        }}
                      />
                    </FormControl>
                  </Box>

                  <Box mb="20px">
                    <Link
                      to="/authentication/forgot-password/"
                      className="text-primary"
                      style={{
                        fontWeight: "500",
                      }}
                    >
                      Forgot Password?
                    </Link>
                  </Box>

                  <Box mb="20px">
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={isLoading || !form.formState.isValid}
                      sx={{
                        textTransform: "capitalize",
                        borderRadius: "6px",
                        fontWeight: "500",
                        fontSize: { xs: "13px", sm: "16px" },
                        padding: { xs: "10px 20px", sm: "10px 24px" },
                        color: "#fff !important",
                        boxShadow: "none",
                        width: "100%",
                        minHeight: "48px",
                        "&:disabled": {
                          opacity: 0.6,
                        },
                      }}
                    >
                      {isLoading ? (
                        <CircularProgress size={20} color="inherit" />
                      ) : (
                        <>
                          <i className="material-symbols-outlined mr-5">login</i>
                          Sign In
                        </>
                      )}
                    </Button>
                  </Box>

                  <Box textAlign="center">
                    <Typography variant="body2" sx={{ color: "#6B7280" }}>
                      Don't have an account?{" "}
                      <Link
                        to="/authentication/sign-up/"
                        className="text-primary"
                        style={{
                          fontWeight: "500",
                          textDecoration: "none",
                        }}
                      >
                        Sign up here
                      </Link>
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default SignInForm;
