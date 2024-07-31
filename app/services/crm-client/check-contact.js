const api = require('../api')

const checkContact = async (id) => {
  const path = encodeURI(`/contacts?$select=contactid,fullname,rpa_capcustomerid&$filter=rpa_capcustomerid eq '${id}'`)
  return api.get(path)
}

module.exports = checkContact
