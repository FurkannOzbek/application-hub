'use client'
import React, { useState } from 'react'
import {
  AppBar,
  Toolbar,
  Box,
  Container,
  Typography,
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemText,
} from '@mui/material'
import { styled } from '@mui/system'
import MenuIcon from '@mui/icons-material/Menu'

const DrawerWidth = '240px'

const CustomDrawer = styled(Paper)(({ open }) => ({
  position: 'absolute',
  top: '4px',
  left: 0,
  width: open ? DrawerWidth : 0,
  height: 'calc(100% - 64px)',
  transition: 'width 0.3s ease',
  overflow: 'hidden',
  zIndex: 1201,
  marginRight: '10px',
}))

const AppBarStyled = styled(AppBar)({
  position: 'relative',
  zIndex: 1201,
})

const DashboardLayout = ({ children }) => {
  const [open, setOpen] = useState(false)

  const handleDrawerToggle = () => {
    setOpen(!open)
  }

  return (
    <Box sx={{ width: '100%', minHeight: '100vh' }}>
      <AppBarStyled>
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Job application
          </Typography>
        </Toolbar>
      </AppBarStyled>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          marginTop: 0,
          position: 'relative',
        }}
      >
        <CustomDrawer open={open}>
          <List>
            <ListItem>
              <ListItemText primary="Overview" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Edit" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Notes" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Interview" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Document" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Status" />
            </ListItem>
          </List>
        </CustomDrawer>

        <Box
          sx={{
            marginLeft: open ? DrawerWidth : 0,
            paddingLeft: 2,
            transition: 'margin-left 0.3s ease',
            flexGrow: 1,
            bgcolor: 'background.default',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  )
}

const Dashboard = () => {
  return (
    <DashboardLayout>
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h6">Job description</Typography>
        <Paper sx={{ padding: 2 }}>
          An internship position for a frontend developer with a focus on
          learning and development.
        </Paper>
      </Box>

      <Box sx={{ marginTop: 2 }}>
        <Typography variant="h6">Job link</Typography>
        <Paper sx={{ padding: 2 }}>
          https://www.lego.com/careers/intern-frontend
        </Paper>
      </Box>

      <Box sx={{ marginTop: 2 }}>
        <Typography variant="h6">The expected salary</Typography>
        <Paper sx={{ padding: 2 }}>0</Paper>
      </Box>

      <Box sx={{ marginTop: 2 }}>
        <Typography variant="h6">Applied date</Typography>
        <Paper sx={{ padding: 2 }}>01.11.2024</Paper>
      </Box>

      <Box sx={{ marginTop: 2 }}>
        <Typography variant="h6">Deadline</Typography>
        <Paper sx={{ padding: 2 }}>01.12.2024</Paper>
      </Box>

      <Box sx={{ marginTop: 2 }}>
        <Typography variant="h6">Notes</Typography>
        <Paper sx={{ padding: 2 }}>Follow up with the company next week.</Paper>
      </Box>

      <Box sx={{ marginTop: 2 }}>
        <Typography variant="h6">Documents</Typography>
        <Paper sx={{ padding: 2 }}>CV_User, Cover letter</Paper>
      </Box>

      <Box sx={{ marginTop: 2 }}>
        <Typography variant="h6">Status</Typography>
        <Paper sx={{ padding: 2 }}>Applied</Paper>
      </Box>

      <Box sx={{ marginTop: 2 }}>
        <Typography variant="h6">Website company</Typography>
        <Paper sx={{ padding: 2 }}>https://www.lego.com</Paper>
      </Box>

      <Box sx={{ marginTop: 2 }}>
        <Typography variant="h6">Location company</Typography>
        <Paper sx={{ padding: 2 }}>Billund, Denmark</Paper>
      </Box>

      <Box sx={{ marginTop: 2 }}>
        <Typography variant="h6">Contact name</Typography>
        <Paper sx={{ padding: 2 }}>Ole Kirk Christiansen</Paper>
      </Box>

      <Box sx={{ marginTop: 2 }}>
        <Typography variant="h6">Contact phone</Typography>
        <Paper sx={{ padding: 2 }}>+45 79 50 60 70</Paper>
      </Box>

      <Box sx={{ marginTop: 2 }}>
        <Typography variant="h6">Contact e-mail</Typography>
        <Paper sx={{ padding: 2 }} elevation={6}>
          contact@lego.com
        </Paper>
      </Box>
    </DashboardLayout>
  )
}

export default Dashboard