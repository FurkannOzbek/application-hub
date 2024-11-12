import { Box, Typography, Paper } from '@mui/material'
import ApplicationCard from './ApplicationCard'

export default function StatusColumn({ status, applications }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        width: '100%',
        minWidth: 180,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 1,
          mb: 2,
          border: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          bgcolor: 'background.default',
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 'medium',
            letterSpacing: 2,
          }}
        >
          {status.name.toUpperCase()}
        </Typography>
      </Paper>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {applications.map((application) => (
          <ApplicationCard key={application.id} application={application} />
        ))}
      </Box>
    </Box>
  )
}
