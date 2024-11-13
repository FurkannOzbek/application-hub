import knex from '../database_client.js'

export const getUserProfile = async (req, res) => {
  try {
    const userData = await knex('user')
      .where({ user_id: req.userInfo.userId })
      .first()
    if (!userData) {
      return res.status(404).json({ message: 'User not found' })
    }
    return res.status(200).json({ userData })
  } catch (error) {
    return res.status(500).json({ message: error.message })
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
    res.status(500).json({ error: 'Error fetching applications' })
  }
}

export const getUserApplicationsById = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    if (!id || isNaN(id)) {
      return res.status(400).json({ message: 'Invalid application ID' })
    }
    const application = await knex('application')
      .select(['application.*', 'company.*'])
      .leftJoin('company', 'application.company_id', 'company.company_id')
      .where({ application_id: id, user_id: req.userInfo.userId })
      .first()
    if (!application) {
      return res.status(404).json({ message: "Application can't find" })
    }
    return res.json(application)
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}
export const postUserApplications = async (req, res) => {
  try {
    const { appData, user_id } = req.body

    // Check if the company name already exists
    const existingCompany = await knex('company')
      .where({ name: appData.company_name })
      .first()

    let company_id
    if (existingCompany) {
      company_id = existingCompany.company_id
    } else {
      // Insert the company and fetch the company ID immediately

      const [newCompany] = await knex('company')
        .insert({
          name: appData.company_name,
        })
        .returning('company_id') // Get the inserted company's ID
      company_id = newCompany.company_id
    }

    await knex('application').insert({
      user_id: user_id,
      job_title: appData.job_title,
      company_id: company_id,
      status: appData.status,
      applied_date: appData.applied_date,
      deadline_date: appData.deadline_date,
    })

    res.status(201).json({ message: 'Registration was successful' })
  } catch (error) {
    res.status(500).json({ error: `Registration error: ${error.message}` })
  }
}
