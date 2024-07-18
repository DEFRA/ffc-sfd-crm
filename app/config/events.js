const Joi = require('joi')
const { PRODUCTION } = require('../constants/environments')

const schema = Joi.object({
  eventsQueue: {
    host: Joi.string(),
    username: Joi.string(),
    password: Joi.string(),
    useCredentialChain: Joi.bool().default(false),
    managedIdentityClientId: Joi.string().optional(),
    appInsights: Joi.object()
  },
  eventsSubscription: {
    address: Joi.string(),
    topic: Joi.string(),
    type: Joi.string().allow('subscription')
  }
})

const config = {
  eventsQueue: {
    host: process.env.MESSAGE_HOST,
    username: process.env.MESSAGE_USER,
    password: process.env.MESSAGE_PASSWORD,
    useCredentialChain: process.env.NODE_ENV === PRODUCTION,
    managedIdentityClientId: process.env.AZURE_CLIENT_ID,
    appInsights:
      process.env.NODE_ENV === PRODUCTION
        ? require('applicationinsights')
        : undefined
  },
  eventsSubscription: {
    address: process.env.CRM_SUBSCRIPTION_ADDRESS,
    topic: process.env.CRM_TOPIC_ADDRESS,
    type: 'subscription'
  }
}

const result = schema.validate(config, {
  abortEarly: false
})

if (result.error) {
  throw new Error(`The CRM events config is invalid. ${result.error.message}`)
}

const eventsSubscription = {
  ...result.value.eventsQueue,
  ...result.value.eventsSubscription
}

module.exports = { eventsSubscription }
