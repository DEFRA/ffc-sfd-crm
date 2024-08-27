const util = require('util')
const { messageConfig } = require('../../config')
const { MessageReceiver } = require('ffc-messaging')
// const checkAdditionalCrns = require('./check-additional-crns')
const processMessageToCrm = require('./process-message-to-crm')

const handleMessage = async (message, receiver) => {
  try {
    console.log('Received event:', message.body)
    // await checkAdditionalCrns(message.body)

    await processMessageToCrm(message.body)
    await receiver.completeMessage(message)
  } catch (err) {
    console.error('Message error', util.inspect(err.message, false, null, true))
  }
}

const startMessaging = async () => {
  let crmReceiver //eslint-disable-line
  const crmAction = (message) => handleMessage(message, crmReceiver)
  crmReceiver = new MessageReceiver(
    messageConfig.crmSubscription,
    crmAction
  )
  await crmReceiver.subscribe()
  console.info('Running CRM service')
}

module.exports = { startMessaging }
