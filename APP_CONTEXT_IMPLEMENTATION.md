# App Context Implementation

## Overview

This implementation provides a global profile management system using React Context API. It automatically fetches and manages user profile data across the application, with automatic profile updates on route changes.

## Architecture

### 1. AppContext (`src/contexts/AppContext.js`)

- **Global State Management**: Manages profile data, loading states, and errors
- **API Integration**: Handles `authService.getCurrentUser()` calls
- **Data Persistence**: Stores profile data in localStorage
- **Error Handling**: Manages authentication errors and auto-logout

### 2. useProfileOnRouteChange Hook (`src/hooks/useProfileOnRouteChange.js`)

- **Route Change Detection**: Uses React Router's `useLocation`
- **Smart Filtering**: Only calls API on protected routes
- **Debouncing**: Prevents excessive API calls (300ms debounce)
- **Context Integration**: Uses app context for API calls

### 3. RouteChangeHandler Component (`src/components/Layout/RouteChangeHandler.js`)

- **Silent Component**: Renders nothing but triggers profile updates
- **Global Integration**: Placed in App.js to work across all routes

## Features

### ✅ Automatic Profile Management

- Loads profile from localStorage on app start
- Automatically fetches fresh profile data on route changes
- Handles authentication errors gracefully

### ✅ Global State Access

- Profile data available throughout the app
- Loading and error states managed globally
- Easy profile updates and clearing

### ✅ Performance Optimized

- Debounced API calls prevent excessive requests
- Smart route filtering excludes auth pages
- Efficient re-renders with context optimization

### ✅ Error Resilient

- Handles 401/403 errors with auto-logout
- Graceful fallbacks for API failures
- Comprehensive error logging

## Usage Examples

### Basic Profile Access

```javascript
import { useApp } from "../contexts/AppContext";

const MyComponent = () => {
  const { profile, isLoading, error } = useApp();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!profile) return <div>No profile data</div>;

  return (
    <div>
      <h1>Welcome, {profile.name}!</h1>
      <p>Email: {profile.email}</p>
    </div>
  );
};
```

### Manual Profile Refresh

```javascript
import { useApp } from "../contexts/AppContext";

const ProfileRefresh = () => {
  const { fetchProfile, isLoading } = useApp();

  const handleRefresh = async () => {
    try {
      await fetchProfile();
      console.log("Profile refreshed successfully");
    } catch (error) {
      console.error("Failed to refresh profile:", error);
    }
  };

  return (
    <button onClick={handleRefresh} disabled={isLoading}>
      {isLoading ? "Refreshing..." : "Refresh Profile"}
    </button>
  );
};
```

### Profile Updates

```javascript
import { useApp } from "../contexts/AppContext";

const ProfileEditor = () => {
  const { profile, updateProfile } = useApp();

  const handleUpdate = (newData) => {
    const updatedProfile = {
      ...profile,
      ...newData,
      lastUpdated: new Date().toISOString(),
    };
    updateProfile(updatedProfile);
  };

  return (
    <button onClick={() => handleUpdate({ status: "active" })}>
      Update Status
    </button>
  );
};
```

## Context API Reference

### AppProvider Props

- `children`: React components to wrap with app context

### useApp Hook Returns

- `profile`: Current profile data (null if not loaded)
- `isLoading`: Boolean indicating if profile is being fetched
- `error`: Error message if profile fetch failed
- `fetchProfile()`: Function to manually fetch profile from API
- `updateProfile(data)`: Function to update profile data
- `clearProfile()`: Function to clear profile data (for logout)
- `isAuthenticated()`: Function to check if user is authenticated

## Integration Points

### 1. App.js Integration

```javascript
import { AppProvider } from "./contexts/AppContext";
import RouteChangeHandler from "./components/Layout/RouteChangeHandler";

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <Router>
          <RouteChangeHandler />
          {/* Rest of your app */}
        </Router>
      </AppProvider>
    </QueryClientProvider>
  );
};
```

### 2. Logout Integration

```javascript
import { useApp } from "../contexts/AppContext";

const useAuth = () => {
  const { clearProfile } = useApp();

  const logout = async () => {
    // ... logout logic
    clearProfile(); // Clear profile data
    // ... redirect logic
  };
};
```

## Benefits

1. **Centralized State**: All profile data managed in one place
2. **Automatic Updates**: Profile stays current across the app
3. **Performance**: Optimized with debouncing and smart filtering
4. **Error Handling**: Comprehensive error management
5. **Developer Friendly**: Simple API with clear documentation
6. **Type Safe**: Easy to extend with TypeScript

## Configuration

### Debounce Time

Modify the timeout in `useProfileOnRouteChange.js`:

```javascript
timeoutRef.current = setTimeout(async () => {
  // API call
}, 300); // Change this value
```

### Protected Routes

Update the `isAuthPage` array in `useProfileOnRouteChange.js` to control which routes trigger profile updates.

### Error Handling

Customize error handling in `ProfileContext.js` by modifying the catch blocks.

## Files Structure

```
src/
├── contexts/
│   └── AppContext.js              # Main context provider
├── hooks/
│   ├── useProfileOnRouteChange.js # Route change hook
│   └── useAuth.js                 # Updated auth hook
├── components/
│   ├── Layout/
│   │   └── RouteChangeHandler.js  # Route change component
│   └── ProfileExample.js          # Usage example
└── App.js                         # Updated with providers
```

This implementation provides a robust, performant, and easy-to-use profile management system that automatically keeps user data current across the entire application.
