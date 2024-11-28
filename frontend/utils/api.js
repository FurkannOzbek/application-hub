import { getLocalStorageItem } from './localStorage'

const API_URL = process.env.NEXT_PUBLIC_API_URL

const buildAbsoluteUrl = (url) => {
  if (/^https?:\/\//i.test(url)) {
    return url
  }
  return `${API_URL}${url}`
}

const apiRequest = async ({
  url,
  method = 'GET',
  data = null,
  isAuthenticated = true,
  customHeaders = {},
}) => {
  const absoluteUrl = buildAbsoluteUrl(url)

  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...customHeaders,
  }

  if (isAuthenticated) {
    const authToken = getLocalStorageItem('authToken')
    if (!authToken) {
      throw new Error('Authentication token not found')
    }
    headers.Authorization = `Bearer ${authToken}`
  }

  const config = {
    method,
    headers,
    ...(data && { body: JSON.stringify(data) }),
  }

  try {
    const response = await fetch(absoluteUrl, config)

    switch (response.status) {
      case 401:
        throw new Error('Session expired. Please login again.')
      case 403:
        throw new Error('You do not have permission to perform this action.')
      case 404:
        throw new Error('Resource not found.')
    }

    const data = await response.json()

    if (response.ok) {
      return data
    }

    throw new Error(data.error || response.statusText || 'Request failed')
  } catch (error) {
    console.error('API Request Error:', error)
    throw error
  }
}

export const fetchQuote = () =>
  apiRequest({
    url: 'https://api.api-ninjas.com/v1/quotes?category=success',
    isAuthenticated: false,
    customHeaders: {
      'X-Api-Key': process.env.NEXT_PUBLIC_API_NINJAS_KEY,
    },
  })

export const loginUser = (contactData) =>
  apiRequest({
    url: '/login',
    method: 'POST',
    data: contactData,
    isAuthenticated: false,
  })

export const registerUser = (userData) =>
  apiRequest({
    url: '/register',
    method: 'POST',
    data: userData,
    isAuthenticated: false,
  })

export const refreshToken = () =>
  apiRequest({
    url: '/refresh-token',
    method: 'POST',
    isAuthenticated: true,
  })

export const logoutUser = () =>
  apiRequest({
    url: '/logout',
    method: 'POST',
    isAuthenticated: true,
  })

export const fetchApplicationStatuses = () =>
  apiRequest({
    url: '/publicApi/application/status',
    isAuthenticated: false,
  })

export const fetchApplications = () =>
  apiRequest({
    url: '/user/applications',
  })

export const fetchApplicationById = (id) =>
  apiRequest({
    url: `/user/applications/${id}`,
  })

export const addApplication = (appData) =>
  apiRequest({
    url: '/user/applications',
    method: 'POST',
    data: appData,
  })

export const patchApplication = ({ id, updatedData }) =>
  apiRequest({
    url: `/user/applications/${id}`,
    method: 'PATCH',
    data: updatedData,
  })

export const patchCompany = ({ id, updatedData }) =>
  apiRequest({
    url: `/user/applications/${id}/company`,
    method: 'PATCH',
    data: updatedData,
  })

export const deleteApplication = (id) =>
  apiRequest({
    url: `/user/applications/${id}`,
    method: 'DELETE',
  })

export const getNoteByApplicationId = (id) =>
  apiRequest({
    url: `/user/applications/${id}/note`,
  })

export const createOrUpdateNote = ({ id, content }) =>
  apiRequest({
    url: `/user/applications/${id}/note`,
    method: 'POST',
    data: { content },
  })

export const deleteNote = (id) =>
  apiRequest({
    url: `/user/applications/${id}/note`,
    method: 'DELETE',
  })
