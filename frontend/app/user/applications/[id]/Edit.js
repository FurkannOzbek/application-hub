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

const Edit = () => {
  return (
    <>
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h6">Edit</Typography>
      </Box>
    </>
  )
}

export default Edit
