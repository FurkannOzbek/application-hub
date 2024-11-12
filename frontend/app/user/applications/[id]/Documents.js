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
import CustomDrawer from './CustomDrawer'

const Documents = () => {
  return (
    <>
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h6">Documents</Typography>
      </Box>

      <Box sx={{ marginTop: 2 }}>
        <Typography variant="h6">Documents</Typography>
        <Paper sx={{ padding: 2 }}>CV_User, Cover letter</Paper>
      </Box>
    </>
  )
}

export default Documents
