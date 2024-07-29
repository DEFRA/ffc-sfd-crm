const util = require('util')
const { messageConfig } = require('../config')
const { MessageReceiver } = require('ffc-messaging')
const { messageProcessor } = require('./message-processor')

const handleMessage = async (message, receiver) => {
  try {
    console.log('Received event:', message.body)
    await messageProcessor(message.body)
    await receiver.completeMessage(message)
  } catch (err) {
    console.error('Message error', util.inspect(err.message, false, null, true))
  }
}

const startMessaging = async () => {
  let crmReceiver //eslint-disable-line
  const eventsAction = (message) => handleMessage(message, crmReceiver)
  crmReceiver = new MessageReceiver(
    messageConfig.eventsSubscription,
    eventsAction
  )
  await crmReceiver.subscribe()
  console.info('Running CRM service')
}

module.exports = { startMessaging }
