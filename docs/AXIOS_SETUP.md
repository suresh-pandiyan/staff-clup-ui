# Axios Configuration and API Service Setup

This guide explains the axios configuration and API service layer setup in your staff-club-ui project.

## Installation

Axios has been installed:

```bash
npm install axios
```

## File Structure

```
src/
├── helpers/
│   ├── axiosConfig.js      # Axios configuration with interceptors
│   └── apiService.js       # API service layer
├── utils/
│   └── queryUtils.js       # React Query hooks using axios services
└── App.js                  # Main app with QueryClientProvider
```

## Configuration Overview

### 1. Axios Configuration (`src/helpers/axiosConfig.js`)

The axios instance is configured with:

- **Base URL**: Configurable via environment variable
- **Timeout**: 10 seconds
- **Default Headers**: JSON content type
- **Request Interceptors**: Authentication token handling
- **Response Interceptors**: Error handling and logging

#### Key Features:

```javascript
// Base configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:3001/api",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// Request interceptor - adds auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor - handles errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401, 403, 404, 500 errors
    // Auto-redirect to login on 401
  }
);
```

### 2. API Service Layer (`src/helpers/apiService.js`)

Organized service classes for different resources:

#### Available Services:

- `userService` - User management
- `eventService` - Event management
- `accountService` - Account management
- `shareService` - Share management
- `chitFundService` - Chit fund management
- `loanService` - Loan management
- `emergencyFundService` - Emergency fund management
- `authService` - Authentication
- `fileService` - File uploads
- `dashboardService` - Dashboard data

#### Service Methods:

Each service provides:

- `getAll(params)` - Get all items with optional parameters
- `getById(id)` - Get single item by ID
- `create(data)` - Create new item
- `update(id, data)` - Update item by ID
- `patch(id, data)` - Partial update
- `delete(id)` - Delete item by ID
- `uploadFile(formData)` - Upload file
- `downloadFile(id)` - Download file

### 3. React Query Integration (`src/utils/queryUtils.js`)

Updated to use axios services instead of fetch:

```javascript
// Before (fetch)
export const useUsers = () => {
  return useApiQuery(["users"], "/users");
};

// After (axios)
export const useUsers = (params = {}) => {
  return useApiQuery(["users", params], () => userService.getAll(params), {
    staleTime: 5 * 60 * 1000,
  });
};
```

## Usage Examples

### 1. Basic API Calls

```javascript
import { userService } from "../helpers/apiService";

// Get all users
const users = await userService.getAll({ page: 1, limit: 10 });

// Get single user
const user = await userService.getById(123);

// Create user
const newUser = await userService.create({
  name: "John Doe",
  email: "john@example.com",
});

// Update user
const updatedUser = await userService.update(123, {
  name: "John Smith",
});

// Delete user
await userService.delete(123);
```

### 2. Authentication

```javascript
import { authService } from "../helpers/apiService";

// Login
const loginResult = await authService.login({
  email: "user@example.com",
  password: "password123",
});

// Register
const registerResult = await authService.register({
  name: "New User",
  email: "newuser@example.com",
  password: "password123",
});

// Get current user
const currentUser = await authService.getCurrentUser();

// Logout
await authService.logout();
```

### 3. File Uploads

```javascript
import { fileService } from "../helpers/apiService";

// Upload single file
const formData = new FormData();
formData.append("file", fileInput.files[0]);

const uploadResult = await fileService.uploadFile(formData, (progress) => {
  console.log(`Upload progress: ${progress}%`);
});

// Upload multiple files
const files = Array.from(fileInput.files);
const uploadResult = await fileService.uploadMultipleFiles(
  files,
  (progress) => {
    console.log(`Upload progress: ${progress}%`);
  }
);
```

### 4. React Query with Axios

```javascript
import { useUsers, useCreateUser, useDeleteUser } from "../utils/queryUtils";

function UsersComponent() {
  const { data: users, isLoading, error } = useUsers({ status: "active" });
  const createUser = useCreateUser();
  const deleteUser = useDeleteUser();

  const handleCreate = () => {
    createUser.mutate({
      name: "New User",
      email: "new@example.com",
    });
  };

  const handleDelete = (id) => {
    deleteUser.mutate(id);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {users?.data?.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
```

## Error Handling

### Automatic Error Handling

The axios configuration automatically handles:

- **401 Unauthorized**: Redirects to login page
- **403 Forbidden**: Logs access denied
- **404 Not Found**: Logs resource not found
- **500 Server Error**: Logs server error
- **Network Errors**: Handles connection issues

### Manual Error Handling

```javascript
try {
  const result = await userService.getAll();
  console.log("Success:", result.data);
} catch (error) {
  console.error("Error:", error.message);
  console.error("Status:", error.status);
  console.error("Data:", error.data);
}
```

## Environment Variables

Set up your API configuration in `.env`:

```env
REACT_APP_API_URL=http://localhost:3001/api
```

## Authentication Flow

### Token Management

1. **Login**: Token stored in localStorage
2. **Requests**: Token automatically added to headers
3. **401 Response**: Token removed, redirect to login
4. **Logout**: Token removed, queries cleared

### Token Refresh

```javascript
// Automatic token refresh (if implemented)
const refreshToken = async () => {
  try {
    const result = await authService.refreshToken();
    return result.data.token;
  } catch (error) {
    // Redirect to login if refresh fails
    window.location.href = "/login";
  }
};
```

## File Upload Features

### Progress Tracking

```javascript
const uploadFile = async (file) => {
  try {
    const result = await fileService.uploadFile(file, (progress) => {
      console.log(`Upload: ${progress}%`);
      // Update UI progress bar
    });
    console.log("Upload complete:", result.data);
  } catch (error) {
    console.error("Upload failed:", error.message);
  }
};
```

### Multiple File Upload

```javascript
const uploadMultiple = async (files) => {
  try {
    const result = await fileService.uploadMultipleFiles(files, (progress) => {
      console.log(`Upload: ${progress}%`);
    });
    console.log("All files uploaded:", result.data);
  } catch (error) {
    console.error("Upload failed:", error.message);
  }
};
```

## Dashboard Integration

### Stats and Charts

```javascript
import { useDashboardStats, useChartsData } from "../utils/queryUtils";

function Dashboard() {
  const { data: stats } = useDashboardStats();
  const { data: chartsData } = useChartsData("month");

  return (
    <div>
      <div>Total Users: {stats?.data?.totalUsers}</div>
      <div>Active Events: {stats?.data?.activeEvents}</div>
      {/* Render charts with chartsData */}
    </div>
  );
}
```

## Best Practices

### 1. Service Organization

- Keep services focused on specific resources
- Use consistent naming conventions
- Implement proper error handling

### 2. Query Keys

```javascript
// Use hierarchical query keys
["users"][("users", { status: "active" })][("user", 123)][ // All users // Active users // Single user
  ("dashboard", "stats")
]; // Dashboard stats
```

### 3. Error Boundaries

```javascript
// Wrap API calls in try-catch
try {
  const result = await userService.getAll();
  // Handle success
} catch (error) {
  // Handle error appropriately
  showErrorNotification(error.message);
}
```

### 4. Loading States

```javascript
// Always handle loading states
const { data, isLoading, error } = useUsers();

if (isLoading) return <LoadingSpinner />;
if (error) return <ErrorMessage error={error} />;
```

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure backend allows your domain
2. **401 Errors**: Check token storage and refresh logic
3. **Network Errors**: Verify API URL and connectivity
4. **Timeout Errors**: Adjust timeout in axios config

### Debug Tools

```javascript
// Enable axios request/response logging
// Already configured in axiosConfig.js
console.log("Request:", method, url);
console.log("Response:", status, url);
```

## Next Steps

1. **Customize API endpoints** to match your backend
2. **Add more specific services** for your data models
3. **Implement token refresh logic** if needed
4. **Add request/response caching** for better performance
5. **Create custom hooks** for complex API operations
6. **Add retry logic** for failed requests
7. **Implement offline support** with service workers
