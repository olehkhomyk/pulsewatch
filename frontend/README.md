# React TypeScript Dashboard Application

A modern, production-ready React application built with TypeScript, Material-UI, and best practices for scalable web development.

## 🚀 Features

- **Modern Tech Stack**: React 19, TypeScript, Vite
- **UI Framework**: Material-UI (MUI) v7 with custom theming
- **Routing**: React Router v7 with protected routes
- **State Management**: React Context API + TanStack React Query
- **Authentication**: Mock authentication system (ready for backend integration)
- **Data Fetching**: TanStack React Query with caching and devtools
- **Form Handling**: React Hook Form with Yup validation
- **Code Quality**: ESLint, TypeScript strict mode
- **Responsive Design**: Mobile-first approach with MUI breakpoints

## 📋 Prerequisites

- Node.js 20+ 
- npm or yarn

## 🛠️ Installation

1. Clone the repository and navigate to the project directory:
```bash
cd my-react-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

## 📁 Project Structure

```
my-react-app/
├── src/
│   ├── api/                  # API client and React Query setup
│   │   ├── client.ts         # Axios instance with interceptors
│   │   └── queryClient.ts    # React Query configuration
│   ├── components/           # Reusable components
│   │   ├── auth/             # Authentication components
│   │   │   └── ProtectedRoute.tsx
│   │   ├── dashboard/        # Dashboard-specific components
│   │   │   ├── DashboardStatsCard.tsx
│   │   │   ├── ProjectsOverview.tsx
│   │   │   └── RecentActivity.tsx
│   │   └── layout/           # Layout components
│   │       ├── AppBar.tsx
│   │       ├── Drawer.tsx
│   │       └── MainLayout.tsx
│   ├── contexts/             # React Context providers
│   │   └── AuthContext.tsx   # Authentication context
│   ├── config/               # Configuration files
│   │   └── theme.ts          # MUI theme configuration
│   ├── pages/                # Page components
│   │   ├── AboutPage.tsx
│   │   ├── DashboardPage.tsx
│   │   ├── LoginPage.tsx
│   │   └── RegisterPage.tsx
│   ├── types/                # TypeScript type definitions
│   │   └── index.ts
│   ├── App.tsx               # Main app component
│   └── main.tsx              # Application entry point
├── package.json
├── tsconfig.json
├── tsconfig.app.json
└── vite.config.ts
```

## 🎨 Architecture & Design Patterns

### Authentication Flow
- Context-based authentication state management
- Protected routes with automatic redirects
- Mock authentication (easily replaceable with real API)
- Persistent sessions using localStorage

### State Management
- **Local State**: React useState for component-specific state
- **Global State**: React Context for authentication
- **Server State**: TanStack React Query for API data

### Component Patterns
- **Separation of Concerns**: Clear separation between layout, pages, and components
- **Composition**: Reusable components with props-based customization
- **Type Safety**: Full TypeScript coverage with strict mode

### API Integration
- Centralized Axios client with interceptors
- Automatic token injection for authenticated requests
- Error handling and 401 redirect logic
- Ready for backend integration

## 🔐 Authentication

The app includes a mock authentication system. To integrate with a real backend:

1. Update `src/api/client.ts` with your API base URL
2. Modify `src/contexts/AuthContext.tsx` to call your authentication endpoints
3. Update token storage logic as needed

**Mock Login**: Any email/password combination will work in development.

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory (see `.env.example`):
```
VITE_API_BASE_URL=https://your-api.com/v1
```

### Theme Customization
Edit `src/config/theme.ts` to customize colors, typography, and component styles.

## 📦 Key Dependencies

- **react** & **react-dom**: ^19.1.1
- **@mui/material**: ^7.3.4
- **react-router-dom**: ^7.9.4
- **@tanstack/react-query**: ^5.90.2
- **axios**: ^1.12.2
- **react-hook-form**: ^7.64.0
- **yup**: ^1.7.1

## 🚀 Deployment

Build the application:
```bash
npm run build
```

The optimized files will be in the `dist/` directory, ready to deploy to any static hosting service (Vercel, Netlify, AWS S3, etc.).

## 🎓 Learning Resources

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
