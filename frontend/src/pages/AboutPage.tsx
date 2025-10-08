import { Box, Typography, Paper, Stack, Card, CardContent } from '@mui/material';
import { Code, Speed, Security, Extension } from '@mui/icons-material';

const features = [
  {
    icon: <Code sx={{ fontSize: 40 }} />,
    title: 'Modern Tech Stack',
    description: 'Built with React 18, TypeScript, and Material-UI for a robust and type-safe development experience.',
  },
  {
    icon: <Speed sx={{ fontSize: 40 }} />,
    title: 'High Performance',
    description: 'Optimized with Vite for lightning-fast builds and hot module replacement during development.',
  },
  {
    icon: <Security sx={{ fontSize: 40 }} />,
    title: 'Secure Authentication',
    description: 'Implements secure authentication patterns with protected routes and context-based state management.',
  },
  {
    icon: <Extension sx={{ fontSize: 40 }} />,
    title: 'Extensible Architecture',
    description: 'Clean architecture with separation of concerns, making it easy to extend and maintain.',
  },
];

export const AboutPage = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        About This Project
      </Typography>

      <Paper sx={{ p: 4, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Welcome to Your Dashboard
        </Typography>
        <Typography variant="body1" paragraph>
          This is a modern React application built with the latest technologies and best practices.
          It serves as a solid foundation for building scalable web applications with authentication,
          routing, and state management.
        </Typography>
        <Typography variant="body1" paragraph>
          The project is structured to be easily extensible, allowing you to add new features and
          functionality as your application grows.
        </Typography>
      </Paper>

      <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 2 }}>
        Key Features
      </Typography>

      <Stack direction="row" spacing={3} flexWrap="wrap">
        {features.map((feature, index) => (
          <Box key={index} sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(50% - 12px)' } }}>
            <Card sx={{ height: '100%', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)' } }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ color: 'primary.main', mr: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" component="h3">
                    {feature.title}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Stack>

      <Paper sx={{ p: 4, mt: 4, bgcolor: 'primary.main', color: 'white' }}>
        <Typography variant="h5" gutterBottom>
          Technology Stack
        </Typography>
        <Stack direction="row" spacing={2} flexWrap="wrap">
          <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)', md: '1 1 calc(25% - 12px)' } }}>
            <Typography variant="subtitle1" fontWeight="bold">Frontend</Typography>
            <Typography variant="body2">React 18</Typography>
            <Typography variant="body2">TypeScript</Typography>
            <Typography variant="body2">Material-UI</Typography>
          </Box>
          <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)', md: '1 1 calc(25% - 12px)' } }}>
            <Typography variant="subtitle1" fontWeight="bold">State Management</Typography>
            <Typography variant="body2">React Context</Typography>
            <Typography variant="body2">React Query</Typography>
          </Box>
          <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)', md: '1 1 calc(25% - 12px)' } }}>
            <Typography variant="subtitle1" fontWeight="bold">Routing</Typography>
            <Typography variant="body2">React Router v6</Typography>
          </Box>
          <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)', md: '1 1 calc(25% - 12px)' } }}>
            <Typography variant="subtitle1" fontWeight="bold">Build Tool</Typography>
            <Typography variant="body2">Vite</Typography>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
};
