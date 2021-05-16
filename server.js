const express = require('express')
const bodyParser = require('body-parser')
const app = express()
var cors = require('cors')
//require('dotenv').load()
const port = process.env.PORT = 8081

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors());

let routes = require('./api/routes') //importing route
routes(app)

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
})

app.listen(port)

console.log('RESTful API server started on: ' + port)