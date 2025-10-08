import { Paper, Typography, Box } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import type { Project } from '../../types';

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Project Name', flex: 1, minWidth: 150 },
  { field: 'status', headerName: 'Status', width: 120 },
  { 
    field: 'progress', 
    headerName: 'Progress', 
    width: 100,
    renderCell: (params) => `${params.value}%`,
  },
  { field: 'owner', headerName: 'Owner', width: 150 },
  { 
    field: 'startDate', 
    headerName: 'Start Date', 
    width: 120,
    valueFormatter: (value) => new Date(value).toLocaleDateString(),
  },
];

export const ProjectsOverview = () => {
  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      return [
        {
          id: '1',
          name: 'Website Redesign',
          description: 'Complete redesign of company website',
          status: 'active',
          startDate: '2024-01-15',
          owner: 'John Doe',
          team: ['John Doe', 'Jane Smith'],
          progress: 65,
        },
        {
          id: '2',
          name: 'Mobile App Development',
          description: 'New mobile application',
          status: 'active',
          startDate: '2024-02-01',
          owner: 'Jane Smith',
          team: ['Jane Smith', 'Bob Johnson'],
          progress: 40,
        },
        {
          id: '3',
          name: 'API Integration',
          description: 'Third-party API integration',
          status: 'completed',
          startDate: '2023-12-01',
          endDate: '2024-01-30',
          owner: 'Bob Johnson',
          team: ['Bob Johnson'],
          progress: 100,
        },
        {
          id: '4',
          name: 'Database Migration',
          description: 'Migrate to new database system',
          status: 'on-hold',
          startDate: '2024-03-01',
          owner: 'Alice Williams',
          team: ['Alice Williams', 'John Doe'],
          progress: 20,
        },
      ];
    },
  });

  return (
    <Paper sx={{ p: 3, height: 400 }}>
      <Typography variant="h6" gutterBottom>
        Projects Overview
      </Typography>
      <Box sx={{ height: 320, width: '100%' }}>
        <DataGrid
          rows={projects || []}
          columns={columns}
          loading={isLoading}
          pageSizeOptions={[5, 10]}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5 },
            },
          }}
          disableRowSelectionOnClick
          sx={{
            border: 'none',
            '& .MuiDataGrid-cell:focus': {
              outline: 'none',
            },
          }}
        />
      </Box>
    </Paper>
  );
};
