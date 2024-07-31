const { ConfidentialClientApplication } = require('@azure/msal-node')
const { msalConfig } = require('../config')

const getAccessToken = async () => {
  try {
    const pca = new ConfidentialClientApplication(msalConfig)
    const tokenRequest = { scopes: [`https://${process.env.CRM_API_HOST}/.default`] }

    return await pca.acquireTokenByClientCredential(tokenRequest)
  } catch (error) {
    throw new Error('Error retrieving access token:', error.message)
  }
}

module.exports = getAccessToken
