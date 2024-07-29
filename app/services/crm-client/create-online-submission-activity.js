const api = require('../api')

async function createOnlineSubmissionActivity (body) {
  const { caseId, organisationId, contactId, submissionId, submissionDateTime, holdStatus, type, validCrns, crmBankAccountNumber, invalidCrns } = body

  const data = {
    'regardingobjectid_incident_rpa_onlinesubmission@odata.bind': `/incidents(${caseId})`,
    'rpa_SubmissionType_rpa_onlinesubmission@odata.bind': `/rpa_documenttypeses(${process.env.RPA_DOCUMENT_TYPES_ES})`,
    rpa_filesinsubmission: process.env.RPA_FILES_IN_SUBMISSION,
    rpa_onlinesubmission_activity_parties: [
      {
        participationtypemask: 1,
        'partyid_contact@odata.bind': `/contacts(${contactId})`
      },
      {
        participationtypemask: 11,
        'partyid_account@odata.bind': `/accounts(${organisationId})`
      }
    ],
    rpa_onlinesubmissiondate: new Date(this.swapDateMonth(submissionDateTime)).toISOString(),
    rpa_onlinesubmissionid: `${submissionId}`,
    rpa_genericcontrol2: `${crmBankAccountNumber}`,
    subject: `${type} (${submissionId})`
  }

  if (holdStatus) {
    data.rpa_genericcontrol1 = holdStatus
  }

  if (validCrns?.length) {
    for (const c of validCrns) {
      data.rpa_onlinesubmission_activity_parties.push({
        participationtypemask: 2,
        'partyid_contact@odata.bind': `/contacts(${c})`
      })
    }
  }

  if (invalidCrns?.length) {
    data.rpa_genericerror1 = 'Invalid CRN(s)'
  }

  return api.post('/rpa_onlinesubmissions', data)
}

module.exports = createOnlineSubmissionActivity
