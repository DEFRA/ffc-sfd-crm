const util = require('util')
const { eventsConfig } = require('../config')
const { MessageReceiver } = require('ffc-messaging')

const handleMessage = async (message, receiver) => {
  try {
    console.log('Received event:', message.body)
    await receiver.completeMessage(message)
  } catch (err) {
    console.error('Message error', util.inspect(err.message, false, null, true))
  }
}

const startMessaging = async () => {
  let crmReceiver //eslint-disable-line
  const eventsAction = (message) => handleMessage(message, crmReceiver)
  crmReceiver = new MessageReceiver(
    eventsConfig.eventsSubscription,
    eventsAction
  )
  await crmReceiver.subscribe()
  console.info('Messages receiver is ready to consume messages')
}

module.exports = { startMessaging }
