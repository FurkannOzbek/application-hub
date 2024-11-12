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

const Notes = () => {
  return (
    <>
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h6">Notes</Typography>
      </Box>

      <Box sx={{ marginTop: 2 }}>
        <Typography variant="h6">Notes</Typography>
        <Paper sx={{ padding: 2 }}>Follow up with the company next week.</Paper>
      </Box>
    </>
  )
}

export default Notes
