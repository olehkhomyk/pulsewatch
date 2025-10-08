import { Box, Typography, Stack } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { DashboardStatsCard } from '../components/dashboard/DashboardStatsCard';
import { RecentActivity } from '../components/dashboard/RecentActivity';
import { ProjectsOverview } from '../components/dashboard/ProjectsOverview';

export const DashboardPage = () => {
  // In a real app, you would fetch this data from your API
  const { data: stats, isLoading } = useQuery<{
    totalProjects: number;
    activeTasks: number;
    completedTasks: number;
    teamMembers: number;
  }>({
    queryKey: ['dashboardStats'],
    queryFn: async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      return {
        totalProjects: 12,
        activeTasks: 28,
        completedTasks: 45,
        teamMembers: 8,
      };
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      
      {/* Stats Grid */}
      <Stack 
        direction={{ xs: 'column', sm: 'row' }} 
        spacing={3} 
        sx={{ mb: 4 }}
        flexWrap="wrap"
      >
        <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(25% - 18px)' } }}>
          <DashboardStatsCard
            title="Total Projects"
            value={stats?.totalProjects.toString() || '0'}
            icon="📊"
            color="primary"
          />
        </Box>
        <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(25% - 18px)' } }}>
          <DashboardStatsCard
            title="Active Tasks"
            value={stats?.activeTasks.toString() || '0'}
            icon="✅"
            color="success"
          />
        </Box>
        <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(25% - 18px)' } }}>
          <DashboardStatsCard
            title="Completed Tasks"
            value={stats?.completedTasks.toString() || '0'}
            icon="🏆"
            color="info"
          />
        </Box>
        <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(25% - 18px)' } }}>
          <DashboardStatsCard
            title="Team Members"
            value={stats?.teamMembers.toString() || '0'}
            icon="👥"
            color="warning"
          />
        </Box>
      </Stack>

      {/* Main Content */}
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
        <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 66%' } }}>
          <ProjectsOverview />
        </Box>
        <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 34%' } }}>
          <RecentActivity />
        </Box>
      </Stack>
    </Box>
  );
};
