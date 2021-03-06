const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV, CLIENT_ORIGIN } = require('./config')
const resource_router = require('./resources/resource-router')
const authRouter = require('./auth/auth-router')
const usersRouter = require('./users/users-router')
require('dotenv').config()
const app = express()

app.use(morgan((NODE_ENV === 'production') ? 'tiny' : 'common', {
  skip: () => NODE_ENV === 'test',
}))
app.use(helmet())
app.use(
  cors({
      origin: CLIENT_ORIGIN
  })
);
app.use((req, res, next) => {
  req.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use(resource_router)
app.use(authRouter)
app.use(usersRouter)

app.use(function errorHandler(error, req, res, next) {
  console.error(error)
  let response
  if (NODE_ENV === 'production') {
    response = { error: 'Server error' }
  } else {
    response = { error: error.message, object: error }
  }
  res.status(500).json(response)
})

module.exports = app
