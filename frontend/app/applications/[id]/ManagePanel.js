'use client'
import { useState } from 'react'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import NotesIcon from '@mui/icons-material/Notes'
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar'
import PeopleIcon from '@mui/icons-material/People'
import PreviewIcon from '@mui/icons-material/Preview'
import { useIsMobileSmall } from '@/app/hooks/useIsMobile'
import JobInfo from './tabs/JobInfo'
import Contacts from './tabs/Contacts'
import Notes from './tabs/Notes'
import Interview from './tabs/Interview'
import { useThemeContext } from '@/components/styles/ThemeApp'
import TitleTabMobile from './tabs/TitleTabMobile'

export default function ManagePanel() {
  const { isLightMode } = useThemeContext()
  const isMobileSmall = useIsMobileSmall()
  const [value, setValue] = useState('Job Info')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const tabStyles = {
    minWidth: '42px',
    width: 'auto',
    minHeight: 40,
    height: 'auto',
    color: !isLightMode ? 'text.secondary' : 'text.secondary',
    opacity: 0.8,
    '&.Mui-selected': {
      color: !isLightMode ? 'text.primary' : 'inherit',
      opacity: 1,
    },
    '&:hover': {
      color: !isLightMode ? 'text.primary' : 'inherit',
      opacity: 0.8,
    },
  }

  const tabs = [
    {
      label: 'Job Info',
      value: 'Job Info',
      icon: <PreviewIcon />,
      component: <JobInfo />,
    },
    {
      label: 'Notes',
      value: 'Notes',
      icon: <NotesIcon />,
      component: <Notes />,
    },
    {
      label: 'Interview',
      value: 'Interview',
      icon: <PeopleIcon />,
      component: <Interview />,
    },
    {
      label: 'Contacts',
      value: 'Contacts',
      icon: <PermContactCalendarIcon />,
      component: <Contacts />,
    },
  ]

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTabs-indicator': {
                backgroundColor: !isLightMode ? 'text.primary' : '',
              },
            }}
          >
            {tabs.map((item) => (
              <Tab
                key={item.value}
                label={isMobileSmall ? '' : item.label}
                value={item.value}
                icon={item.icon}
                iconPosition="start"
                sx={tabStyles}
              />
            ))}
          </TabList>
        </Box>
        {tabs.map((item) => (
          <TabPanel key={item.value} value={item.value} sx={{ padding: 0 }}>
            <TitleTabMobile title={item.value} />
            {item.component}
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  )
}
