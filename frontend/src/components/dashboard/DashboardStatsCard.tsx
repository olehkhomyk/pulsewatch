import { Paper, Typography, Box } from '@mui/material';

type DashboardStatsCardProps = {
  title: string;
  value: string;
  icon: string;
  color: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
};

export const DashboardStatsCard = ({ title, value, icon, color }: DashboardStatsCardProps) => {
  return (
    <Paper
      sx={{
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        height: 140,
        position: 'relative',
        overflow: 'hidden',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: -10,
          right: -10,
          fontSize: '4rem',
          opacity: 0.1,
        }}
      >
        {icon}
      </Box>
      <Typography component="h2" variant="h6" color="text.secondary" gutterBottom>
        {title}
      </Typography>
      <Typography component="p" variant="h3" color={`${color}.main`} fontWeight="bold">
        {value}
      </Typography>
    </Paper>
  );
};
