export const buildCompanyContactDto = (company_contact) => ({
  contactId: company_contact.contact_id,
  companyId: company_contact.company_id,
  applicationId: company_contact.application_id,
  name: company_contact.name,
  phone: company_contact.phone,
  email: company_contact.email,
  role: company_contact.role,
  createdAt: company_contact.created_at,
  updatedAt: company_contact.updated_at,
})
