const Joi = require('joi')

const schema = Joi.object({
  auth: {
    clientId: Joi.string(),
    authority: Joi.string(),
    clientSecret: Joi.string()
  }
})

const config = {
  auth: {
    clientId: process.env.CRM_CLIENT_APP_ID,
    authority: `https://login.microsoftonline.com/${process.env.CRM_TENANT_ID}`,
    clientSecret: process.env.CRM_CLIENT_SECRET_VALUE
  }
}

const host = process.env.CRM_API_HOST

const configResult = schema.validate(config, { abortEarly: false })

if (configResult.error) {
  throw new Error(`The MSAL config is invalid. ${configResult.error.message}`)
}

module.exports = { config: config, host: host }
