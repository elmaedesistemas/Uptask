'use strict'

//path of dependencies
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

// call to routes
const routes = require('./routes/routes')

// create connection to database
const db = require('./config/db')

// import model
require('./models/Projects')

db.sync()
    .then(() => {
        console.log('connected to server')
    })
    .catch((err) => {
        console.log(err)
    })


// import Helpers
const helpers = require('./helpers/helpers')

// create application of express.js
const app = express()

// charge static files
app.use(express.static('public'))

// enable pug
app.set('view engine', 'pug')

// add folder of views
app.set('views', path.join(__dirname, './views'))

// give vardumo to app
app.use((req, res, next) => {
    res.locals.year = 2019
    res.locals.vardump = helpers.vardump
    next()
})

// enable body-parser
app.use(bodyParser.urlencoded({extended: true}))

//declaration of routes
app.use('/', routes())


// server enable
app.listen(3001, () => {
    console.log('The app is listen now, you can start to work! <3')
})