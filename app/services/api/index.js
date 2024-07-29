const axiosInstance = require('./axios-instance')
const { getAccessToken, isValidAccessToken } = require('../utils')

axiosInstance.interceptors.request.use(async (config) => {
  if (isValidAccessToken(config)) {
    return config
  }

  const token = await getAccessToken()

  config.headers.Authorization = `Bearer ${token.accessToken}`
  config._tokenExpiry = new Date(token.expiresOn)

  return config
})
