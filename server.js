const express = require('express')

const app = express()

const PORT = process.env.PORT || 8080

// Requiring our models for syncing
var db = require('./models')

// Static directory
app.use(express.static('public'))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Set Handlebars.
const exphbs = require('express-handlebars')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// Import routes and give the server access to them.
const routes = require('./controllers/burgers_controller.js')

app.use(routes)

// Start our server so that it can begin listening to client requests.
// "start" server
// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Server listening on: http://localhost:${PORT}`))
})
