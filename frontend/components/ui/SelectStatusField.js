'use client'
import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import Stack from '@mui/material/Stack'

const status = [
  { name: 'Wishlist' },
  { name: 'Offered' },
  { name: 'Applied' },
  { name: 'Rejected' },
  { name: 'Interview' },
]

export default function SelectStatusField() {
  const defaultProps = {
    options: status,
    getOptionLabel: (option) => option.name,
  }

  const [value, setValue] = useState(null)

  return (
    <Stack spacing={1} sx={{ width: 300 }}>
      <Autocomplete
        {...defaultProps}
        id="Status"
        disableClearable
        renderInput={(params) => (
          <TextField {...params} label="Status" variant="standard" />
        )}
      />
    </Stack>
  )
}
