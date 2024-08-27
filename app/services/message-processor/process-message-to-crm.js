const { checkContact, checkOrganisation, createCase, createOnlineSubmissionActivity, handleError } = require('../crm-client')

const processMessageToCRM = async (body) => {
const { frn, crn, SubmissionId, submissionDateTime, holdStatus, type, listofCRNwithEmpowerment, crmBankAccountNumber } = body

  const headerSubstringStart = 37
  const headerSubstringEnd = 1

  let organisationId, contactId, caseId, activityId
  const invalidCrns = []
  const validCrns = []

  let logMessage = ''

  try {
    const organisation = await checkOrganisation(frn)
    organisationId = organisation.data.value?.[0]?.accountid

    console.log('Organisation ID:', organisationId)
    logMessage += `Organisation ID: ${organisationId}.`

    if (!organisationId) {
      throw new Error('Could not find accountid')
    }

    const contact = await checkContact(crn)
    contactId = contact.data.value?.[0]?.contactid

    console.log('Contact ID:', contactId)
    logMessage += ` Contact ID: ${contactId}.`

    if (!contactId) {
      throw new Error('Could not find contactid')
    }

    /* const crmCase = await createCase(
      organisationId,
      contactId,
      SubmissionId,
      type
    )

    const caseUrl = crmCase.headers['odata-entityid']
    caseId = caseUrl.substring(
      caseUrl.length - headerSubstringStart,
      caseUrl.length - headerSubstringEnd
    )

    console.log('Case ID:', caseId)
    logMessage += ` Case ID: ${caseId}.`

    if (!caseId) {
      throw new Error('Could not find case id: odata-entityid')
    }

    await this.checkAdditionalCrns(listofCRNwithEmpowerment, validCrns, invalidCrns, logMessage, crn)

    const crmActivity = await createOnlineSubmissionActivity(
      {
        caseId,
        organisationId,
        contactId,
        submissionId: SubmissionId,
        submissionDateTime,
        holdStatus,
        type,
        validCrns,
        crmBankAccountNumber,
        invalidCrns
      }
    ) 

    const activityUrl = crmActivity.headers['odata-entityid']
    activityId = activityUrl.substring(
      activityUrl.length - headerSubstringStart,
      activityUrl.length - headerSubstringEnd
    )

    console.log('Activity ID:', activityId)
    logMessage += ` Online Submission Activity ID: ${activityId}.`

    if (!activityId) {
      throw new Error('Could not find activity id: odata-entityid')
    }

    if (invalidCrns?.length) {
      await handleError({ stack: 'Invalid additional Crns', submissionId: SubmissionId, message: `Could not find contact ids for the following additional crns : ${invalidCrns}` })
    } else {
      logMessage += 'No Invalid additional crns found'
    } */

    console.log('Message processed to CRM')
  } catch (err) {
    err.submissionId = SubmissionId
    err.log = logMessage
    console.error('Could not process message to CRM:', err)
    throw err
  } 
}

module.exports = processMessageToCRM
