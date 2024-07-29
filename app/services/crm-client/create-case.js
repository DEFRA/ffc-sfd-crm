const api = require('../api')

const createCase = async (organisationId, contactId, submissionId, type) => {
  const data = {
    caseorigincode: process.env.CASE_ORIGIN_CODE,
    casetypecode: process.env.CASE_TYPE_CODE,
    'customerid_contact@odata.bind': `/contacts(${contactId})`,
    'rpa_Contact@odata.bind': `/contacts(${contactId})`,
    'rpa_Organisation@odata.bind': `/accounts(${organisationId})`,
    rpa_isunknowncontact: false,
    rpa_isunknownorganisation: false,
    title: `${type} (${submissionId})`
  }

  return api.post('/incidents?$select=incidentid,ticketnumber', data)
}

module.exports = createCase
