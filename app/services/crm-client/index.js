const checkContact = require('./check-contact')
const checkOrganisation = require('./check-organisation')
const createCase = require('./create-case')
const createOnlineSubmissionActivity = require('./create-online-submission-activity')
const handleError = require('./handle-error')

class CRMClient {
  async checkContact (id) {
    return checkContact(id)
  }

  async checkOrganisation (id) {
    return checkOrganisation(id)
  }

  async createCase (organisationId, contactId, submissionId, type) {
    return createCase(organisationId, contactId, submissionId, type)
  }

  async createOnlineSubmissionActivity (body) {
    return createOnlineSubmissionActivity(body)
  }

  async handleError (error) {
    return handleError(error)
  }
}

module.exports = CRMClient
