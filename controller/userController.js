const axios = require('axios');
const { client } = require('../config/db')

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
        res.redirect("/api/createUsers")
    }
}

const failureGoogleLogin = (req, res) => {
    res.send("error")
}

const getSubscription = async (req, res) => {
    const token = req.session.passport.user.accessToken
    const reqBody = {
        "snippet": {
            "resourceId": {
                "channelId": "UCbbia-zv2UA1KVgnIC6r8cA"
            }
        }
    }
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
      try {
          const data = await axios.post('https://www.googleapis.com/youtube/v3/subscriptions?part=snippet', reqBody, { headers: headers })
          res.json({res: data.error ? data.error : data.data})
        
      } catch (error) {
        const err = error.response.data.error
        res.json(err)
      }
}

const searchList = async (req, res) => {
    try {
        const data = await axios.get(`https://www.googleapis.com/youtube/v3/search?key=${process.env.API_KEY}&q=${process.env.YOUTUBE_CHANNEL}&type=video&part=snippet&maxResults=50`)
        res.json({res: data.data})
    } catch (error) {
       res.json(error.response.data)
    }
}

const createUsers = async (req, res) => {
    const { id, name, email } = req.session.passport.user
    const queryString = `insert into test_users (googleid, name, email) values('${id}', '${name}', '${email}')`
    client.query(queryString, async (error, results) => {
        if(!error) {
        //   res.json({data: "Successfully Inserted!"})
        await getUserById(req, res)
        } else {
          res.json({data: error})
        client.end()
        }
      })
};

const getUsers = async (req, res) => {
    client.query(`Select * from test_users`, (error, results) => {
        if(!error) {
          res.json({data: results.rows})
        } else {
            res.json({data: error})
        }
        client.end()
      })
}

const getUserById = async (req, res) => {
    const { id } = req.session.passport.user
    client.query(`Select * from test_users where googleid = '${id}'`, (error, results) => {
        if(!error) {
          res.json({data: results.rows})
        } else {
            res.json({data: error})
        }
        client.end()
      })
} 

module.exports = {
    loadAuth, successGoogleLogin, failureGoogleLogin, getSubscription, loadUnauthorizedPage, searchList, getUsers, createUsers, getUserById
}