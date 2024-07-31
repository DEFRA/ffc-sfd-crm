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

const result = schema.validate(config, { abortEarly: false })

if (result.error) {
  throw new Error(`The MSAL config is invalid. ${result.error.message}`)
}

module.exports = { msalConfig: result.value }
