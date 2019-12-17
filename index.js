const PORT = require('./global/environments')
const express = require('express')
const routes = require('./routes/routes')
const path = require('path')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')

//helper with some functions
const vardump = require('./helpers/vardump')

//connection db
const db = require('./config/db')

//import model
require('./models/Projects')

db.sync()
  .then(() => console.log('Connect to Server'))
  .catch(error => console.log(error))

//config app express
const app = express()

//add express validator to all app
//app.use(expressValidator())

//charge static files
app.use(express.static('public'))

//view engine
app.set('view engine', 'pug')

//add folder of views
app.set('views', path.join(__dirname, ('./views')))

//give vardump to app
app.use((req, res, next) => {
  res.locals.vardump = vardump.vardump
  next()
})

//body parser for read data json
app.use(bodyParser.urlencoded({extended: true}))

app.use('/', routes())

app.listen(PORT, () => {
   console.log(`App is available now in port ${PORT}`)
})