const express = require("express")
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended : false}))

app.use(express.static('./public'))

app.use(morgan('short'))

app.post('/user_create', (req, res) => {
  console.log("Trying to create a new user...")
  console.log('How do we get the form data???')

  console.log("First name: " + req.body.create_first_name)
  const firstName = req.body.create_first_name
  const lastName = req.body.create_last_name

  const queryString = "INSERT INTO users (first_name, last_name) VALUES (?, ?)"
  getConnection().query(queryString, [firstName, lastName], (err, results, fields) => {
    if (err) {
      console.log("Fiels to insert new user: " + err)
      res.sendStatus(500)
      return
    }

    console.log("Insert a new user with id: ", results.insertedId);
    res.end()
  })

  res.end()
})

function getConnection() {
  return mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'bd_for_app'
  })
}

app.get('/user/:id', (req, res) => {
  console.log("Futching user with id: " + req.params.id)
  const connection = getConnection()

  const userId = req.params.id
  const queryString = "SELECT * FROM users WHERE id = ?"
  connection.query(queryString, [userId], (err, rows, fields) => {
    if (err) {
      console.log("Failed to query for users: " + err)
      res.sendStatus(500)
      return
    }
    res.json(rows)
  })

})

app.get("/",(req, res) => {
  console.log("Responding to root route")
  res.send("Hello from root")
})

app.get("/users", (req,res) => {
  const connection = getConnection()

  const queryString = "SELECT * FROM users"
  connection.query(queryString, (err, rows, fields) => {
    if (err) {
      console.log("Failed to query for users: " + err)
      res.sendStatus(500)
      return
    }
    res.json(rows)
  })
})

app.listen(3000,() => {
  console.log("Server is up and listening to 3000...")
})
