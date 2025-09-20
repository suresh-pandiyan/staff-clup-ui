# New Modular Structure - Services and Hooks Organization

This document explains the new modular structure with services in the `services` folder and hooks in the `hooks` folder.

## 📁 New File Structure

```
src/
├── helpers/
│   └── axiosConfig.js          # Axios configuration with interceptors
├── services/
│   ├── index.js                # Main services index
│   ├── baseService.js          # Base service class
│   ├── userService.js          # User service
│   ├── eventService.js         # Event service
│   ├── accountService.js       # Account service
│   ├── shareService.js         # Share service
│   ├── chitFundService.js      # Chit fund service
│   ├── loanService.js          # Loan service
│   ├── emergencyFundService.js # Emergency fund service
│   ├── authService.js          # Authentication service
│   ├── fileService.js          # File service
│   └── dashboardService.js     # Dashboard service
├── hooks/
│   ├── index.js                # Main hooks index
│   ├── useApiQuery.js          # Generic API query hook
│   ├── useApiMutation.js       # Generic API mutation hook
│   ├── useUsers.js             # User-related hooks
│   ├── useEvents.js            # Event-related hooks
│   ├── useAccounts.js          # Account-related hooks
│   ├── useShares.js            # Share-related hooks
│   ├── useChitFunds.js         # Chit fund-related hooks
│   ├── useLoans.js             # Loan-related hooks
│   ├── useEmergencyFunds.js    # Emergency fund-related hooks
│   ├── useAuth.js              # Authentication hooks
│   ├── useFiles.js             # File-related hooks
│   └── useDashboard.js         # Dashboard-related hooks
└── components/
    └── DataTable/
        └── UsersTable.js       # Updated to use new hooks
```

## 🏗️ Architecture Overview

### 1. **Services Layer** (`src/services/`)

Each service is a separate module that extends the `BaseService` class or implements specific functionality:

#### Base Service Pattern

```javascript
// src/services/baseService.js
export class BaseService {
  constructor(resource) {
    this.resource = resource;
  }

  async getAll(params = {}) {
    /* ... */
  }
  async getById(id) {
    /* ... */
  }
  async create(data) {
    /* ... */
  }
  async update(id, data) {
    /* ... */
  }
  async delete(id) {
    /* ... */
  }
  // ... more methods
}
```

#### Service Implementation

```javascript
// src/services/userService.js
import { BaseService } from "./baseService";

export class UserService extends BaseService {
  constructor() {
    super("users");
  }

  // Additional user-specific methods
  async getByEmail(email) {
    /* ... */
  }
  async updateProfile(userId, profileData) {
    /* ... */
  }
  async changePassword(userId, passwordData) {
    /* ... */
  }
}

export const userService = new UserService();
```

### 2. **Hooks Layer** (`src/hooks/`)

Each hook module provides React Query hooks for a specific domain:

#### Generic Hooks

```javascript
// src/hooks/useApiQuery.js
export const useApiQuery = (queryKey, queryFn, options = {}) => {
  return useQuery({
    queryKey,
    queryFn,
    ...options,
  });
};

// src/hooks/useApiMutation.js
export const useApiMutation = (mutationFn, options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn,
    onSuccess: (data, variables, context) => {
      // Handle cache invalidation
      if (options.invalidateQueries) {
        options.invalidateQueries.forEach((queryKey) => {
          queryClient.invalidateQueries({ queryKey });
        });
      }
      options.onSuccess?.(data, variables, context);
    },
    ...options,
  });
};
```

#### Domain-Specific Hooks

```javascript
// src/hooks/useUsers.js
import { useApiQuery, useApiMutation } from "./index";
import { userService } from "../services";

export const useUsers = (params = {}) => {
  return useApiQuery(["users", params], () => userService.getAll(params), {
    staleTime: 5 * 60 * 1000,
  });
};

export const useCreateUser = () => {
  return useApiMutation((userData) => userService.create(userData), {
    invalidateQueries: [["users"]],
  });
};
```

## 🔧 Usage Examples

### 1. **Using Services Directly**

```javascript
import { userService, eventService } from "../services";

// Direct service usage
const handleCreateUser = async (userData) => {
  try {
    const result = await userService.create(userData);
    console.log("User created:", result.data);
  } catch (error) {
    console.error("Error creating user:", error.message);
  }
};

// Service with specific methods
const handleJoinEvent = async (eventId, userId) => {
  try {
    const result = await eventService.registerForEvent(eventId, userId);
    console.log("Joined event:", result.data);
  } catch (error) {
    console.error("Error joining event:", error.message);
  }
};
```

### 2. **Using Hooks in Components**

```javascript
import { useUsers, useCreateUser, useDeleteUser } from "../hooks";

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

### 3. **Authentication with Hooks**

```javascript
import { useLogin, useCurrentUser, useLogout } from "../hooks";

function LoginComponent() {
  const login = useLogin();
  const { data: currentUser } = useCurrentUser();
  const logout = useLogout();

  const handleLogin = (credentials) => {
    login.mutate(credentials);
  };

  const handleLogout = () => {
    logout.mutate();
  };

  return (
    <div>
      {currentUser ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <LoginForm onSubmit={handleLogin} />
      )}
    </div>
  );
}
```

### 4. **File Upload with Progress**

```javascript
import { useUploadFile } from "../hooks";

function FileUploadComponent() {
  const uploadFile = useUploadFile();
  const [progress, setProgress] = useState(0);

  const handleFileUpload = (file) => {
    uploadFile.mutate({
      file,
      onProgress: (percent) => setProgress(percent),
    });
  };

  return (
    <div>
      <input
        type="file"
        onChange={(e) => handleFileUpload(e.target.files[0])}
      />
      {progress > 0 && <progress value={progress} max="100" />}
    </div>
  );
}
```

## 🎯 Benefits of New Structure

### 1. **Modularity**

- Each service is self-contained with its own methods
- Easy to add new services without affecting existing ones
- Clear separation of concerns

### 2. **Reusability**

- Services can be used directly or through hooks
- Hooks provide consistent React Query patterns
- Easy to share logic across components

### 3. **Maintainability**

- Clear file organization
- Easy to find and update specific functionality
- Consistent patterns across all modules

### 4. **Type Safety** (when using TypeScript)

- Each service can have its own types
- Hooks can be properly typed
- Better IDE support and error catching

### 5. **Testing**

- Services can be tested independently
- Hooks can be tested with React Testing Library
- Easy to mock specific services

## 📋 Available Services

### Base Services (extend BaseService)

- `userService` - User management
- `eventService` - Event management
- `accountService` - Account management
- `shareService` - Share management
- `chitFundService` - Chit fund management
- `loanService` - Loan management
- `emergencyFundService` - Emergency fund management

### Specialized Services

- `authService` - Authentication (object-based)
- `fileService` - File operations (object-based)
- `dashboardService` - Dashboard data (object-based)

## 📋 Available Hooks

### Generic Hooks

- `useApiQuery` - Generic query hook
- `useApiMutation` - Generic mutation hook

### Domain-Specific Hooks

- `useUsers` - User-related queries and mutations
- `useEvents` - Event-related queries and mutations
- `useAccounts` - Account-related queries and mutations
- `useShares` - Share-related queries and mutations
- `useChitFunds` - Chit fund-related queries and mutations
- `useLoans` - Loan-related queries and mutations
- `useEmergencyFunds` - Emergency fund-related queries and mutations
- `useAuth` - Authentication hooks
- `useFiles` - File operation hooks
- `useDashboard` - Dashboard data hooks

## 🔄 Migration Guide

### From Old Structure to New Structure

#### Old Usage:

```javascript
import { useUsers, useCreateUser } from "../utils/queryUtils";
```

#### New Usage:

```javascript
import { useUsers, useCreateUser } from "../hooks";
```

### Direct Service Usage:

```javascript
// Old way (if you had direct API calls)
const response = await fetch("/api/users");

// New way
import { userService } from "../services";
const response = await userService.getAll();
```

## 🚀 Best Practices

### 1. **Service Organization**

- Keep services focused on specific resources
- Use consistent naming conventions
- Implement proper error handling

### 2. **Hook Organization**

- Group related hooks in the same file
- Use descriptive hook names
- Implement proper cache invalidation

### 3. **Import Patterns**

```javascript
// Import specific hooks
import { useUsers, useCreateUser } from "../hooks";

// Import specific services
import { userService, eventService } from "../services";

// Import all hooks (if needed)
import * as hooks from "../hooks";

// Import all services (if needed)
import * as services from "../services";
```

### 4. **Error Handling**

```javascript
// In services
try {
  const response = await apiHelpers.get(`/${this.resource}`);
  return handleApiSuccess(response);
} catch (error) {
  throw handleApiError(error);
}

// In hooks
const { data, isLoading, error } = useUsers();
if (error) {
  // Handle error appropriately
  showErrorNotification(error.message);
}
```

## 🔧 Configuration

### Environment Variables

```env
REACT_APP_API_URL=http://localhost:3001/api
```

### Axios Configuration

The axios configuration in `src/helpers/axiosConfig.js` handles:

- Base URL configuration
- Request/response interceptors
- Authentication token management
- Error handling
- Request logging

## 📚 Next Steps

1. **Add TypeScript** - Convert services and hooks to TypeScript for better type safety
2. **Add Tests** - Create unit tests for services and integration tests for hooks
3. **Add Documentation** - Generate API documentation from service methods
4. **Add Validation** - Implement input validation in services
5. **Add Caching** - Implement advanced caching strategies
6. **Add Offline Support** - Implement offline-first patterns
7. **Add Real-time Updates** - Implement WebSocket integration
