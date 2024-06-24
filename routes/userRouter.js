const express = require('express')
const app = express()

const userController = require('../controller/userController')

const isLoggedIn = (req, res, next) => {
    req.user ? next() : res.render('unauthorized')
}
app.get('/youtubesubscription', isLoggedIn, userController.getSubscription)

app.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/');
})

app.get('/youtubesearchlist', isLoggedIn, userController.searchList)

app.get('/getUsers', isLoggedIn, userController.getUsers)
app.get('/getUserById', isLoggedIn, userController.getUserById)
app.get('/createUsers', isLoggedIn, userController.createUsers)

module.exports = app