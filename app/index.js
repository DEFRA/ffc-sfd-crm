require('./insights').setup()
require('log-timestamp')
const { startMessaging } = require('./events')
const { DEVELOPMENT } = require('./constants/environments')

// Disable TLS validation in development to allow connection to cosmosDb emulator
if (process.env.NODE_ENV === DEVELOPMENT) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
}

const init = async () => {
  await startMessaging()
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

init()
