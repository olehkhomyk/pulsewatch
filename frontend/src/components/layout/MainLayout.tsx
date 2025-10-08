import { type ReactNode, useState } from 'react';
import { Box, Container, CssBaseline, Toolbar } from '@mui/material';
import { AppBar } from './AppBar';
import { Drawer } from './Drawer';
import { useAuth } from '../../contexts/AuthContext';

type MainLayoutProps = {
  children: ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => {
  const { user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  if (!user) return <>{children}</>;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar onMenuClick={handleDrawerToggle} />
      <Drawer open={mobileOpen} onClose={handleDrawerToggle} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          {children}
        </Container>
      </Box>
    </Box>
  );
};
