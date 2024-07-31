const { checkContact } = require('../crm-client')

const checkAdditionalCrns = async (listofCRNwithEmpowerment, validCrns, invalidCrns, logMessage, crn) => {
  console.log('in additional crns')
  if (listofCRNwithEmpowerment?.length) {
    const filteredCrns = listofCRNwithEmpowerment.filter((c) => c !== crn)
    for (const c of filteredCrns) {
      const result = await checkContact(c)

      if (result.data?.value?.[0]?.contactid) {
        console.log('Contact ID for additional Crn:', result.data.value?.[0]?.contactid)
        logMessage += ` Contact ID for additional Crn: ${result.data.value?.[0]?.contactid}.`
        validCrns.push(result.data.value?.[0]?.contactid)
      } else {
        invalidCrns.push(c)
        logMessage += `Invalid contact ID for additional Crn: ${c}.`
      }
    }
  } else {
    console.log('No additional crns found in payload')
  }
}

module.exports = checkAdditionalCrns
