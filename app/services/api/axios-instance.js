const axios = require('axios')

const axiosInstance = axios.create({
  baseUrl: process.env.CRM_API_URL, // need to obtain this env var
  timeout: 30000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

module.exports = { axiosInstance }
