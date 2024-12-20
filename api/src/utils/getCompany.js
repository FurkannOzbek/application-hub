import knex from '../database_client.js'

export const getCompany = async (id, userId) => {
  const company = await knex('company')
    .where({
      company_id: id,
      'company.user_id': userId,
    })
    .first()

  return company
}
