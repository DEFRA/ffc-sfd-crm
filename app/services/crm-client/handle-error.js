const api = require('../api')

const handleError = (error) => {
  const errorMessage = {
    stack: error.stack,
    ...error
  }

  const data = {
    rpa_name: error.submissionId,
    rpa_processingentity: process.env.RPA_PROCESSING_ENTITY,
    rpa_xmlmessage: JSON.stringify(errorMessage)
  }

  return api.post('/rpa_integrationinboundqueues', data)
}

module.exports = handleError
