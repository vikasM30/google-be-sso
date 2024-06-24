const { Client } = require("pg")
require("dotenv").config();

const client = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
})

client.connect((err) => {
    if(!err) {
        console.log("DB Connection is Successful!")
    } else {
        console.log("error", err)
    }
})

module.exports = { client }