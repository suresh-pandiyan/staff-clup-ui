# Profile Management System

## Overview

The profile management system has been refactored to store profile data only in React context, removing the dependency on localStorage for sensitive user information.

## Key Changes

### ✅ What's Been Updated

1. **Removed localStorage for Profile Data**: Profile information is no longer stored in localStorage
2. **Context-Only Storage**: All profile data is managed through React Context
3. **Smart Caching**: Profile data is cached in context with a 5-minute expiration
4. **Automatic Refresh**: Profile is automatically fetched when needed
5. **Real-time Updates**: Profile data is always fresh from the API

### 🔐 Security Improvements

- **No Sensitive Data in localStorage**: Profile data stays in memory only
- **Automatic Expiration**: Profile data expires after 5 minutes
- **API Validation**: Profile is always validated against the server
- **Secure Token Storage**: Only JWT tokens are stored in localStorage

## How It Works

### 1. Profile Data Flow

```
API Response → Context State → Component Display
     ↓              ↓              ↓
  Fresh Data    In-Memory     Real-time UI
```

### 2. Caching Strategy

- **Cache Duration**: 5 minutes
- **Automatic Refresh**: When accessing protected routes
- **Force Refresh**: Manual refresh button
- **Stale Detection**: Visual indicators for outdated data

### 3. Context State Management

```javascript
const [profile, setProfile] = useState(null);
const [profileLastFetched, setProfileLastFetched] = useState(null);
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState(null);
```

## Usage Examples

### Using the Profile Hook

```javascript
import { useProfile } from "../hooks/useProfile";

const MyComponent = () => {
  const {
    profile,
    isLoading,
    error,
    refreshProfile,
    isProfileStale,
    profileLastFetched,
  } = useProfile();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Welcome, {profile.name}!</h1>
      {isProfileStale && <p>Profile data may be outdated</p>}
      <p>Last updated: {new Date(profileLastFetched).toLocaleString()}</p>
      <button onClick={() => refreshProfile(true)}>Refresh Profile</button>
    </div>
  );
};
```

### Profile Data Structure

```javascript
// Example profile object
{
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  role: "admin",
  avatar: "https://example.com/avatar.jpg",
  phone: "+1234567890",
  createdAt: "2024-01-01T00:00:00.000Z"
}
```

## Components Updated

### 1. TopNavbar Profile

- Shows real user name and role
- Displays profile picture or initials
- Indicates when profile data is stale
- Real-time updates from context

### 2. ProfileDisplay Component

- Shows last update timestamp
- Stale data warnings
- Force refresh functionality
- Error handling and retry

### 3. ProtectedRoute

- Automatic profile fetching
- Smart caching (5-minute expiration)
- Error handling for auth failures

## API Integration

### Required Endpoints

- `GET /auth/me` - Fetch current user profile
- `POST /auth/login` - User authentication
- `POST /auth/logout` - User logout

### Response Format

```json
{
  "status": 200,
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "admin",
    "avatar": "https://example.com/avatar.jpg"
  }
}
```

## Benefits

### 1. **Security**

- No sensitive data in localStorage
- Profile data expires automatically
- Always validated against server

### 2. **Performance**

- Smart caching reduces API calls
- Context updates are instant
- No localStorage parsing overhead

### 3. **User Experience**

- Real-time profile updates
- Visual indicators for data freshness
- Seamless authentication flow

### 4. **Maintainability**

- Centralized profile management
- Consistent data across components
- Easy to debug and test

## Best Practices

### 1. **Always Use the Hook**

```javascript
// ✅ Good
const { profile } = useProfile();

// ❌ Bad
const profile = localStorage.getItem("userProfile");
```

### 2. **Handle Loading States**

```javascript
if (isLoading) return <LoadingSpinner />;
if (!hasProfile) return <NoProfileMessage />;
```

### 3. **Check Data Freshness**

```javascript
if (isProfileStale) {
  // Show warning or auto-refresh
}
```

### 4. **Error Handling**

```javascript
if (error) {
  return <ErrorMessage error={error} onRetry={refreshProfile} />;
}
```

## Troubleshooting

### Common Issues

1. **Profile Not Loading**

   - Check if user is authenticated
   - Verify API endpoint `/auth/me`
   - Check network tab for errors

2. **Stale Data Warnings**

   - Profile data is older than 5 minutes
   - Click refresh button or wait for auto-refresh
   - Normal behavior, not an error

3. **Context Not Available**
   - Ensure component is wrapped in `AppProvider`
   - Check component hierarchy
   - Verify imports are correct

### Debug Information

```javascript
const { profile, isLoading, error, isProfileStale, profileLastFetched } =
  useProfile();

console.log("Profile Debug:", {
  hasProfile: !!profile,
  isLoading,
  error,
  isStale: isProfileStale,
  lastFetched: profileLastFetched,
});
```

## Future Enhancements

1. **Background Refresh**: Auto-refresh profile in background
2. **Optimistic Updates**: Update UI before API response
3. **Profile Sync**: Sync across multiple tabs
4. **Offline Support**: Cache profile for offline use
5. **Real-time Updates**: WebSocket integration for live updates
