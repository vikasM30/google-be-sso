const express = require('express')
const app = express()

const userController = require('../controller/userController')

const isLoggedIn = (req, res, next) => {
    console.log(req.user)
    req.user ? next() : res.render('unauthorized')
}
app.get('/', isLoggedIn, userController.getData)

app.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/');
})

module.exports = app