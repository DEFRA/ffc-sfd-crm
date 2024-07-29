const isValidAccessToken = config => config.header.Authorization && config._tokenExpiry?.getTime() > Date.now()

module.exports = isValidAccessToken
