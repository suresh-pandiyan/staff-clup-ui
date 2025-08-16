import React from 'react';
import {
  Box,
  Grid,
  FormControl,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
} from '@mui/material';

const CreateMemberForm = ({ formData, onChange, onSubmit, onCancel, loading = false }) => {
  const handleInputChange = (field, value) => {
    onChange(field, value);
  };

  return (
    <Box component="form" onSubmit={onSubmit}>
      <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}>
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6 }}>
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
              First Name
            </Typography>
            <TextField
              label="Enter first name"
              variant="filled"
              id="firstName"
              name="firstName"
              value={formData.firstName || ''}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              required
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
                "& .MuiInputBase-root:hover:hover:not(.Mui-disabled, .Mui-error)::before": {
                  border: "none",
                },
              }}
            />
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6 }}>
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
              Last Name
            </Typography>
            <TextField
              label="Enter last name"
              variant="filled"
              id="lastName"
              name="lastName"
              value={formData.lastName || ''}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
              required
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
                "& .MuiInputBase-root:hover:hover:not(.Mui-disabled, .Mui-error)::before": {
                  border: "none",
                },
              }}
            />
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6 }}>
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
              label="Enter email address"
              variant="filled"
              type="email"
              id="email"
              name="email"
              value={formData.email || ''}
              onChange={(e) => handleInputChange("email", e.target.value)}
              required
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
                "& .MuiInputBase-root:hover:hover:not(.Mui-disabled, .Mui-error)::before": {
                  border: "none",
                },
              }}
            />
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6 }}>
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
              Phone Number
            </Typography>
            <TextField
              label="Enter phone number"
              variant="filled"
              id="phone"
              name="phone"
              value={formData.phone || ''}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              required
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
                "& .MuiInputBase-root:hover:hover:not(.Mui-disabled, .Mui-error)::before": {
                  border: "none",
                },
              }}
            />
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6 }}>
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
              Employee ID
            </Typography>
            <TextField
              label="Enter employee ID"
              variant="filled"
              id="employeeId"
              name="employeeId"
              value={formData.employeeId || ''}
              onChange={(e) => handleInputChange("employeeId", e.target.value)}
              required
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
                "& .MuiInputBase-root:hover:hover:not(.Mui-disabled, .Mui-error)::before": {
                  border: "none",
                },
              }}
            />
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6 }}>
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
              Join Date
            </Typography>
            <TextField
              label="Select join date"
              variant="filled"
              type="date"
              id="joinDate"
              name="joinDate"
              value={formData.joinDate || ''}
              onChange={(e) => handleInputChange("joinDate", e.target.value)}
              required
              InputLabelProps={{ shrink: true }}
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
                "& .MuiInputBase-root:hover:hover:not(.Mui-disabled, .Mui-error)::before": {
                  border: "none",
                },
              }}
            />
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
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
              Designation
            </Typography>
            <Select
              value={formData.designation || ''}
              onChange={(e) => handleInputChange("designation", e.target.value)}
              variant="filled"
              required
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
                "& .MuiInputBase-root:hover:hover:not(.Mui-disabled, .Mui-error)::before": {
                  border: "none",
                },
              }}
            >
              <MenuItem value="Software Engineer">Software Engineer</MenuItem>
              <MenuItem value="Senior Developer">Senior Developer</MenuItem>
              <MenuItem value="Team Lead">Team Lead</MenuItem>
              <MenuItem value="Project Manager">Project Manager</MenuItem>
              <MenuItem value="Designer">Designer</MenuItem>
              <MenuItem value="QA Engineer">QA Engineer</MenuItem>
              <MenuItem value="DevOps Engineer">DevOps Engineer</MenuItem>
              <MenuItem value="Product Manager">Product Manager</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 3 }}>
            <Button
              variant="outlined"
              onClick={onCancel}
              disabled={loading}
              sx={{
                borderColor: "#D5D9E2",
                color: "#6B7280",
                "&:hover": {
                  borderColor: "#9CA3AF",
                  backgroundColor: "#F9FAFB",
                },
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                backgroundColor: "#3B82F6",
                "&:hover": {
                  backgroundColor: "#2563EB",
                },
                "&:disabled": {
                  backgroundColor: "#9CA3AF",
                },
              }}
            >
              {loading ? 'Creating...' : 'Create Member'}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CreateMemberForm;
