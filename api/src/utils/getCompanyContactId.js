import knex from '../database_client.js'

export const getCompanyContactId = async (
  currentName,
  companyId,
  applicationId
) => {
  try {
    const existingContact = await knex('company_contact')
      .join('company', 'company_contact.company_id', 'company.company_id')
      .where({
        'company_contact.name': currentName,
        'company.company_id': companyId,
        'company_contact.application_id': applicationId,
      })
      .first()

    if (existingContact) {
      return existingContact.contact_id
    } else {
      throw new Error(
        'Contact with this name already exists for the given application'
      )
    }
  } catch (error) {
    console.error(error)
    throw new Error('Error while fetching contact:' + error.message)
  }
}
