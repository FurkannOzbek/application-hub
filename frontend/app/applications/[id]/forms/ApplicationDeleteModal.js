'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useNotification } from '@/components/Context/NotificationContext'
import { useApplicationContext } from '@/components/Context/ApplicationContext'
import DeleteModal from '@/components/ui/DeleteModal'
import { deleteApplication } from '@/utils/api'

export default function ApplicationDeleteModal({ openModal, onClose }) {
  const { application } = useApplicationContext()
  const { showNotification } = useNotification()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleDelete = async () => {
    setLoading(true)
    setError('')
    try {
      await deleteApplication(application.application_id)
      router.push(`/user`)
      showNotification('Application was deleted!')
      onClose()
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <DeleteModal
      openModal={openModal}
      onClose={onClose}
      title="Are you sure you want to delete this application?"
      error={error}
      loading={loading}
      onConfirm={handleDelete}
      cancelLabel="No, keep the application"
      confirmLabel="Yes, delete the application"
    />
  )
}
