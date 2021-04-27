const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
var format = require('pg-format')
const app = express()
const db = require('./queries')
const port = 9000

app.use(cors())

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  //response.json({ info: 'This is the Express-PostGreSQL API server. You can directly access the JSON output of the Inventory and Orders tables at /inventory and /orders.' })
  response.send('This is the Express-PostGreSQL API server. You can directly access the JSON output of the Inventory and Orders tables at /inventory and /orders.');
})

/* Show database tables */
app.get('/theaters', db.getTheaters)
app.get('/theaters/:id', db.getSortedTheaters)
app.get('/movies', db.getMovies)
app.get('/movies/:id', db.getSortedMovies)
app.get('/screenings', db.getScreenings)
app.get('/screenings/:id', db.getSortedScreenings)
app.get('/users', db.getUsers)
app.get('/users/:id', db.getSortedUsers)
app.get('/equipment', db.getEquipment)
app.get('/equipment/:id', db.getSortedEquipment)
app.get('/employees', db.getEmployees)
app.get('/employees/:id', db.getSortedEmployees)
app.get('/visits', db.getVisits)
app.get('/visits/:id', db.getSortedVisits)
/* Add to database */
app.put('/addTh', db.addTheater)
app.put('/addMv', db.addMovie)
app.put('/addScrn', db.addScreening)
app.put('/addUser', db.addUser)
app.put('/addEq', db.addEquipment)
app.put('/addEmp', db.addEmployee)
app.put('/addVisit', db.addVisit)
/* Remove from database */
app.put('/delTh', db.delTheater)
app.put('/delMv', db.delMovie)
app.put('/delScrn', db.delScreening)
app.put('/delUser', db.delUser)
app.put('/delEq', db.delEquipment)
app.put('/delEmp', db.delEmployee)
app.put('/delVisit', db.delVisit)
/* Start webserver */
app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})