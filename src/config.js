const mysql = require('mysql');
const dotenv = require('dotenv')
dotenv.config()

module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    API_TOKEN: process.env.API_TOKEN || 'token',
    API_BASE_URL: process.env.API_BASE_URL || 'https://web-dev-toolkit-api.herokuapp.com/api',
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET || 'WebDevToolKit',
    JWT_EXPIRY: process.env.JWT_EXPIRY || '2h',
    CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'https://web-dev-toolkit-client.now.sh',
  }
