const userRouter = require('./user.router');
const forgotPassRouter = require('./forgot-password.router')
const express = require('express')

const app = express();
/**
 * - Router for user CRUD operation
 */
app.use('/user', userRouter);
/**
 * - Router for forgot password CRUD operation
 */
app.use('/password',forgotPassRouter)

module.exports = app
