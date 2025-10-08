# Quick Start Guide

## Getting Started in 5 Minutes

### 1. Install and Run
```bash
cd my-react-app
npm install
npm run dev
```

Visit `http://localhost:5173` (or the port shown in terminal)

### 2. First Login
- Click "Sign up" or go to `/register`
- Enter any name, email, and password (mock auth)
- You'll be automatically logged in and redirected to the dashboard

### 3. Explore the App
- **Dashboard** (`/`) - View stats, projects overview, and recent activity
- **About** (`/about`) - Learn about the tech stack and features
- **Navigation** - Click the menu icon (mobile) or use the sidebar
- **Logout** - Click your avatar in the top-right corner

## Project Overview

### Tech Stack
- **React 19** - Latest React with modern features
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Material-UI v7** - Modern component library
- **React Router v7** - Client-side routing
- **TanStack Query** - Server state management
- **Axios** - HTTP client

### Key Features
✅ Authentication with protected routes  
✅ Responsive layout with drawer navigation  
✅ Dashboard with stats and data tables  
✅ Form validation with React Hook Form + Yup  
✅ API client with interceptors  
✅ React Query for data fetching  
✅ TypeScript strict mode  
✅ Modern UI with Material-UI  

## Common Tasks

### Add a New Page
1. Create `src/pages/MyPage.tsx`
2. Add route in `src/App.tsx`
3. Add navigation link in `src/components/layout/Drawer.tsx`

### Connect to Real API
1. Update `VITE_API_BASE_URL` in `.env`
2. Modify `src/contexts/AuthContext.tsx` for real auth
3. Create API services in `src/api/services/`
4. Use React Query hooks for data fetching

### Customize Theme
Edit `src/config/theme.ts` to change:
- Colors (primary, secondary)
- Typography (fonts, sizes)
- Component styles (buttons, cards, etc.)

### Add Form Validation
1. Create schema in `src/schemas/`
2. Use `react-hook-form` with `yupResolver`
3. Display validation errors

## Project Structure

```
src/
├── api/              # API client and services
├── components/       # Reusable components
│   ├── auth/        # Auth-related components
│   ├── dashboard/   # Dashboard components
│   └── layout/      # Layout components
├── config/          # App configuration
├── contexts/        # React contexts
├── pages/           # Page components
├── types/           # TypeScript types
├── App.tsx          # Main app component
└── main.tsx         # Entry point
```

## Development Workflow

### 1. Start Development Server
```bash
npm run dev
```

### 2. Make Changes
- Edit files in `src/`
- Hot reload updates automatically
- Check browser console for errors

### 3. Build for Production
```bash
npm run build
npm run preview  # Preview production build
```

### 4. Lint Code
```bash
npm run lint
```

## Authentication Flow

### Current (Mock)
- Any credentials work
- User stored in localStorage
- Token not required

### For Production
1. Update `src/api/client.ts` with real API URL
2. Modify `src/contexts/AuthContext.tsx`:
   - Call real login/register endpoints
   - Store JWT token
   - Handle token refresh
3. Update `apiClient` interceptors for token injection

## Data Fetching Pattern

```tsx
// 1. Create API service
export const getProjects = async () => {
  const response = await apiClient.get('/projects');
  return response.data;
};

// 2. Create React Query hook
export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
  });
};

// 3. Use in component
const { data, isLoading, error } = useProjects();
```

## Styling Approach

### Material-UI System
```tsx
<Box sx={{ p: 2, bgcolor: 'primary.main' }}>
  Content
</Box>
```

### Responsive Design
```tsx
<Stack 
  direction={{ xs: 'column', md: 'row' }}
  spacing={{ xs: 2, md: 3 }}
>
  {/* Content */}
</Stack>
```

### Custom Styles
```tsx
<Paper sx={{ 
  p: 3,
  '&:hover': { boxShadow: 4 },
  transition: 'box-shadow 0.3s'
}}>
  Content
</Paper>
```

## Troubleshooting

### Port Already in Use
Vite will automatically try another port (5174, 5175, etc.)

### TypeScript Errors
- Run `npm run build` to see all errors
- Check `tsconfig.app.json` settings
- Ensure all imports have proper types

### Module Not Found
- Check file paths (case-sensitive)
- Ensure index exports exist
- Restart dev server

### Styling Issues
- Check MUI version compatibility
- Use `sx` prop for custom styles
- Verify theme configuration

## Next Steps

1. **Read EXTENDING.md** - Learn how to add features
2. **Explore the code** - Check existing components for patterns
3. **Customize the theme** - Make it your own
4. **Connect to API** - Replace mock data with real endpoints
5. **Add features** - Build on this foundation

## Resources

- [React Docs](https://react.dev)
- [Material-UI](https://mui.com)
- [React Router](https://reactrouter.com)
- [TanStack Query](https://tanstack.com/query)
- [TypeScript](https://www.typescriptlang.org)
- [Vite](https://vitejs.dev)

## Support

For issues or questions:
1. Check the code comments
2. Review EXTENDING.md for patterns
3. Consult official documentation
4. Check browser console for errors

---

**Happy coding! 🚀**
