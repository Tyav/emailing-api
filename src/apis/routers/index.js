const userRouter = require('./user.router')
const express = require('express')

const app = express();
/**
 * - Router for user CRUD operation
 */
app.use('/api/v1', userRouter);

module.exports = app
