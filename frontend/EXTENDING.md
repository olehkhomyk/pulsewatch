# Extending the Application

This guide will help you extend the application with new features while maintaining the established architecture and design patterns.

## Adding a New Page

### 1. Create the Page Component

Create a new file in `src/pages/`:

```tsx
// src/pages/NewPage.tsx
import { Box, Typography } from '@mui/material';

export const NewPage = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        New Page
      </Typography>
      {/* Your content here */}
    </Box>
  );
};
```

### 2. Add Route to App.tsx

```tsx
import { NewPage } from './pages/NewPage';

// Inside the Routes component:
<Route
  path="/new-page"
  element={
    <ProtectedRoute>
      <MainLayout>
        <NewPage />
      </MainLayout>
    </ProtectedRoute>
  }
/>
```

### 3. Add Navigation Link

Update `src/components/layout/Drawer.tsx`:

```tsx
const menuItems = [
  // ... existing items
  { text: 'New Page', icon: <YourIcon />, path: '/new-page' },
];
```

## Adding API Integration

### 1. Create API Service

Create a new file in `src/api/`:

```tsx
// src/api/services/userService.ts
import { apiClient } from '../client';
import type { User } from '../../types';

export const userService = {
  getUsers: async (): Promise<User[]> => {
    const response = await apiClient.get('/users');
    return response.data;
  },
  
  getUser: async (id: string): Promise<User> => {
    const response = await apiClient.get(`/users/${id}`);
    return response.data;
  },
  
  createUser: async (userData: Partial<User>): Promise<User> => {
    const response = await apiClient.post('/users', userData);
    return response.data;
  },
};
```

### 2. Create React Query Hook

```tsx
// src/hooks/useUsers.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '../api/services/userService';

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: userService.getUsers,
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: userService.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};
```

### 3. Use in Component

```tsx
import { useUsers } from '../hooks/useUsers';

export const UsersPage = () => {
  const { data: users, isLoading, error } = useUsers();
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading users</div>;
  
  return (
    <div>
      {users?.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
};
```

## Adding New Types

Update `src/types/index.ts`:

```tsx
export interface NewType {
  id: string;
  name: string;
  // ... other fields
}
```

## Creating Reusable Components

### 1. Create Component

```tsx
// src/components/common/CustomButton.tsx
import { Button, type ButtonProps } from '@mui/material';

interface CustomButtonProps extends ButtonProps {
  loading?: boolean;
}

export const CustomButton = ({ loading, children, ...props }: CustomButtonProps) => {
  return (
    <Button {...props} disabled={loading || props.disabled}>
      {loading ? 'Loading...' : children}
    </Button>
  );
};
```

### 2. Export from Index

```tsx
// src/components/common/index.ts
export { CustomButton } from './CustomButton';
```

## Adding Form Validation

### 1. Create Validation Schema

```tsx
// src/schemas/userSchema.ts
import * as yup from 'yup';

export const userSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  age: yup.number().positive().integer().min(18, 'Must be at least 18'),
});
```

### 2. Use with React Hook Form

```tsx
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { userSchema } from '../schemas/userSchema';

export const UserForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(userSchema),
  });
  
  const onSubmit = (data) => {
    console.log(data);
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} />
      {errors.name && <span>{errors.name.message}</span>}
      {/* ... other fields */}
    </form>
  );
};
```

## Adding Context Providers

### 1. Create Context

```tsx
// src/contexts/ThemeContext.tsx
import { createContext, useContext, useState, type ReactNode } from 'react';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  mode: ThemeMode;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<ThemeMode>('light');
  
  const toggleMode = () => {
    setMode(prev => prev === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={{ mode, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeMode = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeMode must be used within ThemeProvider');
  }
  return context;
};
```

### 2. Add to App.tsx

```tsx
<ThemeProvider>
  <AuthProvider>
    {/* ... rest of app */}
  </AuthProvider>
</ThemeProvider>
```

## Customizing the Theme

Edit `src/config/theme.ts`:

```tsx
export const theme = createTheme({
  palette: {
    primary: {
      main: '#your-color',
    },
    secondary: {
      main: '#your-color',
    },
  },
  typography: {
    fontFamily: '"Your Font", "Roboto", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          // Your custom styles
        },
      },
    },
  },
});
```

## Best Practices

1. **Keep components small and focused** - Each component should have a single responsibility
2. **Use TypeScript strictly** - Define types for all props and data structures
3. **Separate concerns** - Keep business logic separate from UI components
4. **Use React Query for server state** - Don't mix server state with local state
5. **Follow the folder structure** - Keep related files together
6. **Write reusable components** - Extract common patterns into shared components
7. **Handle errors gracefully** - Always provide error states and loading states
8. **Test your components** - Add tests for critical functionality
9. **Keep the API client centralized** - Use the existing axios instance
10. **Document complex logic** - Add comments for non-obvious code

## Common Patterns

### Loading States
```tsx
if (isLoading) return <CircularProgress />;
if (error) return <Alert severity="error">{error.message}</Alert>;
```

### Conditional Rendering
```tsx
{user && <UserProfile user={user} />}
{items.length > 0 ? <ItemList items={items} /> : <EmptyState />}
```

### Event Handlers
```tsx
const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  event.preventDefault();
  // Your logic
};
```

### Async Operations
```tsx
const handleSubmit = async (data: FormData) => {
  try {
    await apiCall(data);
    // Success handling
  } catch (error) {
    // Error handling
  }
};
```

## Need Help?

- Check the existing code for examples
- Refer to the official documentation:
  - [React](https://react.dev)
  - [TypeScript](https://www.typescriptlang.org/docs/)
  - [Material-UI](https://mui.com)
  - [React Router](https://reactrouter.com)
  - [TanStack Query](https://tanstack.com/query)
