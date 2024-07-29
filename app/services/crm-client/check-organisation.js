const api = require('../api')

async function checkOrganisation (id) {
  const path = encodeURI(`/accounts?$select=name,accountid,rpa_sbinumber,rpa_capfirmid&$filter=rpa_capfirmid eq '${id}'`)
  return api.get(path)
}

module.exports = checkOrganisation
