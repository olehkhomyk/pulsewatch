import { Paper, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar, Chip } from '@mui/material';
import { Assignment, CheckCircle, Person, Update } from '@mui/icons-material';

const activities = [
  {
    id: 1,
    type: 'task',
    title: 'New task assigned',
    description: 'Website homepage redesign',
    time: '2 hours ago',
    icon: <Assignment />,
    color: 'primary',
  },
  {
    id: 2,
    type: 'completion',
    title: 'Task completed',
    description: 'API documentation updated',
    time: '5 hours ago',
    icon: <CheckCircle />,
    color: 'success',
  },
  {
    id: 3,
    type: 'team',
    title: 'New team member',
    description: 'Sarah joined the team',
    time: '1 day ago',
    icon: <Person />,
    color: 'info',
  },
  {
    id: 4,
    type: 'update',
    title: 'Project updated',
    description: 'Mobile app milestone reached',
    time: '2 days ago',
    icon: <Update />,
    color: 'warning',
  },
];

export const RecentActivity = () => {
  return (
    <Paper sx={{ p: 3, height: 400, overflow: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        Recent Activity
      </Typography>
      <List>
        {activities.map((activity) => (
          <ListItem
            key={activity.id}
            sx={{
              mb: 1,
              borderRadius: 1,
              '&:hover': {
                bgcolor: 'action.hover',
              },
            }}
          >
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: `${activity.color}.main` }}>
                {activity.icon}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={activity.title}
              secondary={
                <>
                  {activity.description}
                  <br />
                  <Chip
                    label={activity.time}
                    size="small"
                    sx={{ mt: 0.5, height: 20, fontSize: '0.7rem' }}
                  />
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};
