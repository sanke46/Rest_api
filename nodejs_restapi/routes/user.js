const express = require('express')
const mysql = require('mysql')
const router = express.Router()
router.get('/messages', (req, res) => {
  console.log('Show some message or whatever...')
  res.end()
})

router.get("/users", (req,res) => {
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

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'us-cdbr-iron-east-01.cleardb.net',
  user: 'bbcbd5e30e6d52',
  password: '07f01df9',
  database: 'heroku_bcbda89359a239d'
})

function getConnection() {
  return pool
}

router.post('/user_create', (req, res) => {
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

router.get('/user/:id', (req, res) => {
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

module.exports = router
