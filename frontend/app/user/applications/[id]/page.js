'use client'
import {
  Box,
  Container,
  Paper,
  Typography,
  IconButton,
  Stack,
  useTheme,
} from '@mui/material'
import Dashboard from './Dashboard'
import SelectStatusField from '@/components/ui/SelectStatusField'
import CancelRoundedIcon from '@mui/icons-material/CancelRounded'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'

export default function Application() {
  const theme = useTheme()

  return (
    <Box component="main" sx={{ p: 2 }}>
      <Container maxWidth="xl">
        <Stack
          direction="row"
          sx={{ justifyContent: 'space-between', alignItems: 'center' }}
        >
          <Stack direction="column">
            <Typography variant="h4" component="h4" sx={{ pb: 2 }}>
              Front-End Developer
            </Typography>
            <Typography variant="h5" component="h5" sx={{ pb: 2 }}>
              Lego
            </Typography>
          </Stack>

          <Stack spacing={2} direction="row">
            <IconButton size="large" sx={{ color: theme.palette.accent.main }}>
              <DeleteRoundedIcon />
            </IconButton>
            <IconButton size="large" sx={{ color: theme.palette.accent.main }}>
              <CancelRoundedIcon />
            </IconButton>
          </Stack>
        </Stack>
        <SelectStatusField />
        <Dashboard />
      </Container>
    </Box>
  )
}
