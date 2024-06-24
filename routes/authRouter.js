
const express = require('express')
const app = express()
const passport = require('passport')
require("dotenv").config();
require('../passport')
const userController = require('../controller/userController')

app.use(passport.initialize())
app.use(passport.session())



app.get('/', userController.loadAuth)

app.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile', 'https://www.googleapis.com/auth/youtube'] }))

app.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: '/success',
    failureRedirect: '/failure',
}))

app.get('/success', userController.successGoogleLogin)
app.get('/failure', userController.failureGoogleLogin)

module.exports = app