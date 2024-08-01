const Wreck = require('@hapi/wreck')
const { getAccessToken, isValidAccessToken } = require('../../token')

const makeRequest = async (options) => {
  const { method, url, headers, payload } = options

  const defaults = Wreck.defaults({
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    timeout: 30000,
    baseUrl: process.env.CRM_API_URL
  })

  const requestHeaders = {
    ...headers,
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }

  if (!isValidAccessToken(requestHeaders)) {
    const token = await getAccessToken()
    requestHeaders.Authorization = `Bearer ${token.accessToken}`
    requestHeaders._tokenExpiry = token.expiresOn
  }

  try {
    const response = await defaults.request(method, url, {
      headers: requestHeaders,
      payload: JSON.stringify(payload)
    })

    return {
      statusCode: response.statusCode,
      payload: await Wreck.read(response, { json: true })
    }
  } catch (error) {
    if (error.response?.statusCode === 401 && !error._retry) {
      error._retry = true

      const token = await getAccessToken()
      requestHeaders.Authorization = `Bearer ${token.accessToken}`
      requestHeaders._tokenExpiry = token.expiresOn

      return makeRequest({ method, url, headers: requestHeaders, payload })
    }
    throw new Error(error.message)
  }
}

module.exports = makeRequest
