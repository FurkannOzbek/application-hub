import knex from '../database_client.js'
import { checkApplicationExist } from '../utils/checkApplicationExist.js'
import { getOrCreateCompanyId } from '../utils/getOrCreateCompanyId.js'
import { updateField } from '../utils/updateField.js'
import { getCompany } from '../utils/getCompany.js'
import { getApplication } from '../utils/getApplication.js'
import { sanitizeData } from '../utils/sanitizeData.js'
import { buildErrorDto } from '../dtos/errorDto.js'

export const getUserProfile = async (req, res) => {
  try {
    const userData = await knex('user')
      .where({ user_id: req.userInfo.userId })
      .first()
    if (!userData) {
      return res.status(404).json(buildErrorDto('User not found'))
    }
    return res.status(200).json({ userData })
  } catch (error) {
    return res.status(500).json(
      buildErrorDto('Error fetching user profile', {
        cause: error.message,
      })
    )
  }
}

export const getUserApplications = async (req, res) => {
  try {
    const applications = await knex('application')
      .select(['application.*', 'company.name as company_name'])
      .leftJoin('company', 'application.company_id', 'company.company_id')
      .where('application.user_id', req.userInfo.userId)
      .orderBy('application.created_at', 'desc')

    res.json(applications)
  } catch (error) {
    console.error(error)
    res.status(500).json(
      buildErrorDto('Error fetching applications', {
        cause: error.message,
      })
    )
  }
}

export const getUserApplicationsById = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    if (!id || isNaN(id)) {
      return res.status(400).json(buildErrorDto('Invalid application ID'))
    }
    const application = await knex('application')
      .select([
        'application.*',
        'company.name as company_name',
        'company.website as company_website',
        'company.location as company_location',
      ])
      .leftJoin('company', 'application.company_id', 'company.company_id')
      .where({
        'application.application_id': id,
        'application.user_id': req.userInfo.userId,
      })
      .first()

    if (!application) {
      return res.status(404).json(buildErrorDto('Application not found'))
    }
    return res.json(application)
  } catch (error) {
    return res.status(500).json(
      buildErrorDto('Error fetching application by ID', {
        cause: error.message,
      })
    )
  }
}

export const postUserApplications = async (req, res) => {
  try {
    const appData = req.body
    const user_id = req.userInfo.userId
    try {
      // If application exist throw error
      await checkApplicationExist(
        appData.company_name,
        appData.job_title,
        user_id
      )
    } catch (error) {
      return res.status(400).json(buildErrorDto(error.message))
    }
    let company_id
    try {
      company_id = await getOrCreateCompanyId(appData.company_name, user_id)
    } catch (error) {
      return res.status(500).json(
        buildErrorDto('Error getting or creating company', {
          cause: error.message,
        })
      )
    }

    // Insert the data for the new application and return the application id

    const [insertedApplication] = await knex('application')
      .insert({
        user_id: user_id,
        job_title: appData.job_title,
        company_id: company_id,
        status: appData.status,
        job_description: appData.job_description || null,
        job_link: appData.job_link || null,
        applied_date: appData.applied_date || null,
        deadline_date: appData.deadline_date || null,
      })
      .returning('application_id')
    res.status(201).json({
      message: 'Application added successfully',
      application_id: insertedApplication.application_id,
    })
  } catch (error) {
    res.status(500).json(
      buildErrorDto('Error creating application', {
        cause: error.message,
      })
    )
  }
}

// Update Application
export const patchUserApplication = async (req, res) => {
  const id = parseInt(req.params.id)
  if (!id || isNaN(id)) {
    return res.status(400).json(buildErrorDto('Invalid application ID'))
  }
  const {
    job_title,
    status,
    job_description,
    job_link,
    salary,
    applied_date,
    deadline_date,
  } = req.body

  const user_id = req.userInfo.userId
  let updateData = {}

  const sanitizeJobDescription = sanitizeData(job_description)

  try {
    const application = await getApplication(id, user_id)
    if (!application) {
      return res.status(404).json(buildErrorDto('Application not found'))
    }
  } catch (error) {
    return res.status(500).json(
      buildErrorDto('Error fetching application', {
        cause: error.message,
      })
    )
  }

  try {
    updateField(updateData, 'job_title', job_title)
    updateField(updateData, 'status', status)
    updateField(updateData, 'job_description', sanitizeJobDescription)
    updateField(updateData, 'job_link', job_link)
    updateField(updateData, 'salary', salary, false, true)
    updateField(updateData, 'applied_date', applied_date, true)
    updateField(updateData, 'deadline_date', deadline_date, true)
  } catch (validationError) {
    return res.status(400).json(buildErrorDto(validationError.message))
  }

  try {
    if (Object.keys(updateData).length > 0) {
      await knex('application')
        .where({
          'application.application_id': id,
          'application.user_id': user_id,
        })
        .update(updateData)
    }

    res.status(200).json({
      message: 'Application updated successfully',
      updateData: updateData,
    })
  } catch (error) {
    res.status(500).json(
      buildErrorDto('Error updating application', {
        cause: error.message,
      })
    )
  }
}

// Update Company
export const patchUserApplicationCompany = async (req, res) => {
  const id = parseInt(req.params.id)
  if (!id || isNaN(id)) {
    return res.status(400).json(buildErrorDto('Invalid application ID'))
  }

  const { company_name, company_website, company_location } = req.body
  const user_id = req.userInfo.userId

  let updateData = {}
  let application
  let company
  try {
    application = await getApplication(id, user_id)
    if (!application) {
      return res.status(404).json(buildErrorDto('Application not found'))
    }
  } catch (error) {
    return res.status(500).json(
      buildErrorDto('Error fetching application', {
        cause: error.message,
      })
    )
  }

  try {
    company = await getCompany(application.company_id, user_id)
    if (!company) {
      return res.status(404).json(buildErrorDto('Company not found'))
    }
  } catch (error) {
    return res.status(500).json(buildErrorDto('Error fetching company'))
  }

  try {
    updateField(updateData, 'name', company_name)
    updateField(updateData, 'website', company_website)
    updateField(updateData, 'location', company_location)
  } catch (validationError) {
    return res.status(400).json(buildErrorDto(validationError.message))
  }

  try {
    if (Object.keys(updateData).length > 0) {
      await knex('company')
        .where({
          company_id: application.company_id,
          'company.user_id': user_id,
        })
        .update(updateData)
    }

    res.status(200).json({
      message: 'Company updated successfully',
      updateData: updateData,
    })
  } catch (error) {
    res.status(500).json(
      buildErrorDto('Error updating company', {
        cause: error.message,
      })
    )
  }
}

//delete Application
export const deleteUserApplicationsById = async (req, res) => {
  const user_id = req.userInfo.userId
  const id = parseInt(req.params.id)
  if (!id || isNaN(id)) {
    return res.status(400).json(buildErrorDto('Invalid application ID'))
  }
  try {
    // Attempt to delete the application
    const rowsDeleted = await knex('application')
      .where({
        'application.application_id': id,
        'application.user_id': user_id,
      })
      .del()

    if (rowsDeleted) {
      return res.json({ message: 'Application was deleted' })
    } else {
      return res.status(404).json(buildErrorDto('Application not found'))
    }
  } catch (error) {
    console.error(error)
    return res.status(500).json(
      buildErrorDto('Error deleting application', {
        cause: error.message,
      })
    )
  }
}
