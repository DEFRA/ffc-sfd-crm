const fs = require('fs').promises
const path = require('path')

const messageProcessor = async (data) => {
  try {
    const dirPath = path.join(__dirname, '..', 'data')
    const filePath = path.join(dirPath, 'output.json')
    await fs.mkdir(dirPath, { recursive: true })

    let messages = []

    try {
      const fileContent = await fs.readFile(filePath, 'utf8')
      messages = JSON.parse(fileContent)
    } catch (error) {
      if (error.code !== 'ENOENT') {
        throw error
      }
    }

    messages.push(data)

    await fs.writeFile(filePath, JSON.stringify(messages, null, 2))
  } catch (error) {
    console.error('Error processing message:', error)
    throw new Error(error)
  }
}

module.exports = {
  messageProcessor
}
