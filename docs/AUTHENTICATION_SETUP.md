# Authentication System Setup

## Overview

This application now has a complete authentication system that protects dashboard routes and automatically manages user sessions.

## Features

### ✅ What's Implemented

1. **Token Storage**: Automatically stores JWT tokens in localStorage after login
2. **Route Protection**: Dashboard and protected routes are guarded against unauthorized access
3. **Profile Management**: Automatic profile fetching and caching
4. **Session Persistence**: Users stay logged in across page refreshes
5. **Automatic Redirects**: Authenticated users are redirected away from login pages

### 🔐 Protected Routes

The following routes now require authentication:

- `/accounts`
- `/shares`
- `/chitfunds`
- `/loans`
- `/emergency-funds`
- `/events`
- `/dashboard` and all dashboard sub-routes

### 🌐 Public Routes

These routes are accessible without authentication:

- `/` (Home page)
- `/login`
- `/features/`
- `/team/`
- `/faq/`
- `/contact/`

## How It Works

### 1. Login Flow

1. User submits login form
2. `authService.login()` is called
3. Token is automatically stored in localStorage
4. User profile is fetched from API
5. User is redirected to dashboard
6. All subsequent requests include the token

### 2. Route Protection

- **ProtectedRoute**: Wraps dashboard and protected pages
- **PublicRoute**: Wraps login and public pages
- Unauthenticated users are redirected to `/authentication/sign-in/`
- Authenticated users are redirected away from login pages

### 3. Profile Management

- Profile data is automatically fetched after login
- Profile is cached in localStorage for offline access
- Profile can be refreshed manually using `useProfile` hook

## Usage Examples

### Using the Profile Hook

```javascript
import { useProfile } from "../hooks/useProfile";

const MyComponent = () => {
  const { profile, isLoading, error, refreshProfile } = useProfile();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Welcome, {profile.name}!</h1>
      <button onClick={refreshProfile}>Refresh Profile</button>
    </div>
  );
};
```

### Protected Route Component

```javascript
import ProtectedRoute from "../components/Layout/ProtectedRoute";

// In your routing
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>;
```

### Public Route Component

```javascript
import PublicRoute from "../components/Layout/PublicRoute";

// In your routing
<Route
  path="/login"
  element={
    <PublicRoute>
      <Login />
    </PublicRoute>
  }
/>;
```

## API Endpoints

The system expects these API endpoints:

### Authentication

- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `POST /auth/refresh` - Refresh token
- `GET /auth/me` - Get current user profile

### Response Format

```json
{
  "status": 200,
  "data": {
    "token": "jwt_token_here",
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    }
  }
}
```

## Security Features

1. **Token Validation**: Every protected route checks for valid token
2. **Automatic Logout**: Invalid/expired tokens trigger automatic logout
3. **Profile Verification**: Profile is fetched to ensure token validity
4. **Secure Storage**: Tokens are stored in localStorage (consider httpOnly cookies for production)

## Troubleshooting

### Common Issues

1. **Infinite Redirect Loop**

   - Check if `isAuthenticated()` function is working correctly
   - Verify token storage in localStorage

2. **Profile Not Loading**

   - Check API endpoint `/auth/me`
   - Verify token is being sent in requests
   - Check browser console for errors

3. **Routes Not Protected**
   - Ensure routes are wrapped with `ProtectedRoute`
   - Check if `AppProvider` is wrapping your app

### Debug Mode

Enable console logging by checking:

- localStorage for `authToken` and `userProfile`
- Network tab for API calls
- Console for authentication errors

## Next Steps

Consider implementing:

1. **Token Refresh**: Automatic token renewal before expiration
2. **Remember Me**: Extended session duration option
3. **Role-Based Access**: Different access levels for different user roles
4. **Session Timeout**: Automatic logout after inactivity
5. **Multi-Device Support**: Handle multiple active sessions
