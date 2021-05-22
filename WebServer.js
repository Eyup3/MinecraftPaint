const express = require('express')
const app = express()

app.get("/", (req, res) => {
    res.send("main")
    console.log("Website served")
})

app.listen(process.env.WEBSERVER_PORT, (err) => {
    err ? console.log(err) : console.log("Webserver has no errors")
})

module.exports = { express, app }