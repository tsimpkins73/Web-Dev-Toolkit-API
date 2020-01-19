const mysql = require('mysql');
const dotenv = require('dotenv')
dotenv.config()

module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    API_TOKEN: process.env.API_TOKEN || 'token',
    API_BASE_URL: process.env.API_BASE_URL || 'https://web-dev-toolkit-api.herokuapp.com/api',
    DATABASE_URL: process.env.DATABASE_URL || 'postgres://bjdtgbaxupkxmh:2b6cacf62d5382f61d8f543d7d320bbb75a9e010e98b37adc725f5d4182e46b6@ec2-174-129-33-2.compute-1.amazonaws.com:5432/d7oq5p5pdkm8fk',
    JWT_SECRET: process.env.JWT_SECRET || 'WebDevToolKit',
    JWT_EXPIRY: process.env.JWT_EXPIRY || '2h',
    CLIENT_ORIGIN: process.env.CLIENT_ORIGIN,
  }
