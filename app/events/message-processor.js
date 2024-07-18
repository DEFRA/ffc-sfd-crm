const fs = require('fs').promises
const path = require('path')

const messageProcessor = async (data) => {
  try {
    const dirPath = path.join(__dirname, '..', 'data')
    const filePath = path.join(dirPath, 'output.json')
    await fs.mkdir(dirPath, { recursive: true })

    let messages = []
    const fileContent = await fs.readFile(filePath, 'utf8')
    messages = JSON.parse(fileContent)
    messages.push(data)

    await fs.writeFile(filePath, JSON.stringify(messages, null, 2))
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = {
  messageProcessor
}
