const loadAuth = (req, res) => {
    res.render('auth')
}

const loadUnauthorizedPage = (req, res) => {
    res.render('unauthorized')

}

const successGoogleLogin = (req, res) => {
    if(!req.user) {
        res.redirect('/failure')
    } else {
        res.redirect("/api")
    }
}

const failureGoogleLogin = (req, res) => {
    res.send("error")
}

const getData = (req, res) => {
    res.send([{
        a: 1
    }])
}

module.exports = {
    loadAuth, successGoogleLogin, failureGoogleLogin, getData, loadUnauthorizedPage
}