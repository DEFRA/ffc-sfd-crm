const { ConfidentialClientApplication } = require('@azure/msal-node')
const msalConfig = require('../config').msalConfig

const isValidAccessToken = config => config.headers.Authorization &&
  config._tokenExpiry?.getTime() > Date.now()

const getAccessToken = async () => {
  try {
    const pca = new ConfidentialClientApplication(msalConfig.config)
    const host = msalConfig.host
    const tokenRequest = {
      scopes: [`https://${host}/.default`]
    }
    return await pca.acquireTokenByClientCredential(tokenRequest)
  } catch (err) {
    console.error('Error acquiring token:', err)
    throw new Error(err)
  }
}

module.exports = {
  getAccessToken,
  isValidAccessToken
}
