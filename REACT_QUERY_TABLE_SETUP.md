# React Query and React Table Setup Guide

This guide explains how to use React Query (@tanstack/react-query) and React Table (@tanstack/react-table) in your staff-club-ui project.

## Installation

The following packages have been installed:

```bash
npm install @tanstack/react-query @tanstack/react-table
```

## Configuration

### React Query Setup

React Query has been configured in `src/App.js` with the following settings:

- **Stale Time**: 5 minutes (data is considered fresh for 5 minutes)
- **Cache Time**: 10 minutes (cached data is kept for 10 minutes)
- **Retry**: 1 attempt on failure
- **Refetch on Window Focus**: Disabled

### File Structure

```
src/
├── utils/
│   └── queryUtils.js          # React Query utility hooks
├── components/
│   └── DataTable/
│       └── UsersTable.js      # Example component using both libraries
└── App.js                     # Main app with QueryClientProvider
```

## Usage Examples

### 1. Basic React Query Usage

```javascript
import { useQuery } from "@tanstack/react-query";

// Simple query
const { data, isLoading, error } = useQuery({
  queryKey: ["users"],
  queryFn: () => fetch("/api/users").then((res) => res.json()),
});

// Query with parameters
const { data: user } = useQuery({
  queryKey: ["user", userId],
  queryFn: () => fetch(`/api/users/${userId}`).then((res) => res.json()),
  enabled: !!userId, // Only run if userId exists
});
```

### 2. Mutations with React Query

```javascript
import { useMutation, useQueryClient } from "@tanstack/react-query";

const queryClient = useQueryClient();

const createUserMutation = useMutation({
  mutationFn: (userData) =>
    fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    }).then((res) => res.json()),
  onSuccess: () => {
    // Invalidate and refetch users list
    queryClient.invalidateQueries({ queryKey: ["users"] });
  },
});

// Usage
createUserMutation.mutate({ name: "John", email: "john@example.com" });
```

### 3. React Table Basic Setup

```javascript
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";

const columns = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
];

const table = useReactTable({
  data,
  columns,
  getCoreRowModel: getCoreRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
});
```

### 4. Using Utility Hooks

The project includes utility hooks in `src/utils/queryUtils.js`:

```javascript
import { useUsers, useCreateUser, useDeleteUser } from "../utils/queryUtils";

function MyComponent() {
  const { data: users, isLoading } = useUsers();
  const createUser = useCreateUser();
  const deleteUser = useDeleteUser();

  const handleCreate = () => {
    createUser.mutate({ name: "New User", email: "new@example.com" });
  };

  const handleDelete = (id) => {
    deleteUser.mutate(id);
  };
}
```

## Available Utility Hooks

### Query Hooks

- `useUsers()` - Fetch all users
- `useUser(id)` - Fetch single user by ID
- `useApiQuery(queryKey, url, options)` - Generic query hook

### Mutation Hooks

- `useCreateUser()` - Create new user
- `useUpdateUser()` - Update existing user
- `useDeleteUser()` - Delete user
- `useApiMutation(mutationFn, options)` - Generic mutation hook

## Example Component

See `src/components/DataTable/UsersTable.js` for a complete example that demonstrates:

- Data fetching with React Query
- Table display with React Table
- Global filtering
- Pagination
- Sorting
- CRUD operations
- Loading states
- Error handling

## Key Features

### React Query Features

- ✅ Automatic caching and background updates
- ✅ Loading and error states
- ✅ Optimistic updates
- ✅ Infinite queries
- ✅ Query invalidation
- ✅ Retry logic

### React Table Features

- ✅ Sorting
- ✅ Filtering (global and column-specific)
- ✅ Pagination
- ✅ Row selection
- ✅ Column resizing
- ✅ Custom cell renderers
- ✅ TypeScript support

## Best Practices

1. **Query Keys**: Use consistent, hierarchical query keys

   ```javascript
   ["users"][("user", id)][("users", "active")]; // All users // Single user // Active users
   ```

2. **Error Handling**: Always handle loading and error states

   ```javascript
   if (isLoading) return <LoadingSpinner />;
   if (error) return <ErrorMessage error={error} />;
   ```

3. **Mutations**: Invalidate related queries after mutations

   ```javascript
   onSuccess: () => {
     queryClient.invalidateQueries({ queryKey: ["users"] });
   };
   ```

4. **Table Performance**: Use `useMemo` for columns definition
   ```javascript
   const columns = useMemo(() => [...], [dependencies]);
   ```

## Environment Variables

Set up your API base URL in `.env`:

```env
REACT_APP_API_URL=http://localhost:3001/api
```

## Troubleshooting

### Common Issues

1. **Query not refetching**: Check if `enabled` is set correctly
2. **Table not updating**: Ensure data is properly memoized
3. **Caching issues**: Adjust `staleTime` and `cacheTime` in QueryClient config

### Debug Tools

React Query DevTools can be added for debugging:

```javascript
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Add to your App component
<ReactQueryDevtools initialIsOpen={false} />;
```

## Next Steps

1. Customize the API endpoints in `queryUtils.js`
2. Add more specific hooks for your data models
3. Implement authentication headers in the fetch function
4. Add React Query DevTools for development
5. Create more table components for different data types
