'use client'
import { useState, useEffect, useCallback } from 'react'
import { Box, Stack, Button, Alert } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import ContactForm from '../forms/ContactForm'
import Loader from '@/components/ui/Loader'
import { useApplicationContext } from '@/components/Context/ApplicationContext'
import { getContactsByApplicationId } from '@/utils/api'
import ContactCard from './ContactCard'
import EmptyState from './EmptyState'

export default function Contacts() {
  const { application } = useApplicationContext()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [contacts, setContacts] = useState([])
  const [openModalAdd, setOpenModalAdd] = useState(false)
  const applicationId = application.application_id
  const hasContent = contacts.length > 0

  const handleOpenAddModal = useCallback(() => {
    setOpenModalAdd(true)
  }, [])
  const handleCloseAddModal = () => setOpenModalAdd(false)

  const handleAddContactSuccess = (newContact) => {
    setContacts((prevContacts) => [...prevContacts, newContact])
  }

  const handleContactDeleted = (currentName) => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.name !== currentName)
    )
  }

  const handleContactEdited = (updatedContact) => {
    setContacts((prevContacts) => {
      const updatedContacts = prevContacts.map((contact) =>
        contact.contactId === updatedContact.contactId
          ? { ...contact, ...updatedContact }
          : contact
      )
      return updatedContacts
    })
  }

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const contacts = await getContactsByApplicationId(applicationId)
        if (contacts) {
          setContacts(contacts)
        }
      } catch (error) {
        console.error('Error fetching contact:', error)
        setError(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchContacts()
  }, [applicationId])

  if (isLoading) {
    return <Loader height="200px" />
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Box sx={{ display: hasContent ? 'block' : 'none' }}>
        <Stack
          sx={{
            flexDirection: { xs: 'column', sm: 'row' },
            gap: { xs: 1, sm: 2 },
            justifyContent: 'start',
            alignItems: { xs: 'stretch', sm: 'center' },
            pb: 2,
            flexWrap: 'wrap',
          }}
        >
          {contacts.map((contact) => (
            <ContactCard
              key={contact.contactId}
              contact={contact}
              onContactDeleted={handleContactDeleted}
              onContactEdited={handleContactEdited}
            />
          ))}
        </Stack>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            onClick={handleOpenAddModal}
            variant="outlined"
            startIcon={<AddIcon />}
            sx={{
              textTransform: 'none',
              width: { xs: '100%', sm: 'auto' },
            }}
          >
            Add Contact
          </Button>
        </Box>
      </Box>
      {!hasContent && (
        <EmptyState
          onAction={handleOpenAddModal}
          subject="contacts"
          buttonText="Add Contact"
        />
      )}
      <ContactForm
        mode="add"
        openModal={openModalAdd}
        onClose={handleCloseAddModal}
        onContactAdd={handleAddContactSuccess}
      />
    </Box>
  )
}
