import knex from '../database_client.js'

export const getApplication = async (id, userId) => {
  const application = await knex('application')
    .where({
      'application.application_id': id,
      'application.user_id': userId,
    })
    .first()

  return application
}
