const express = require("express")
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')

app.use(morgan('combined'))

app.get('/user/:id', (req, res) => {
  console.log("Futching user with id: " + req.params.id)
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'bd_for_app'
  })

  const userId = req.params.id
  const queryString = "SELECT * FROM users WHERE id = ?"
  connection.query(queryString, [userId], (err, rows, fields) => {
    if (err) {
      console.log("Failed to query for users: " + err)
      res.sendStatus(500)
      // throw err
      return
    }
    console.log("I think we fetched users successfully")

    const users = rows.map((row) => {
      return {firstName: row.first_name, lastName: row.last_name}
    })

    res.json(users)
  })

  // res.end()
})

app.get("/",(req, res) => {
  console.log("Responding to root route")
  res.send("Hello from root")
})

app.get("/users", (req,res) => {
  var user1 = {firstName: "Stive", lastName: "Svetlov"}
  const user2 = {firstName: "ilya", lastName: "Fedoseev"}
  res.json([user1, user2])
  // res.send("Nodemon auto update whan I save this file")
})

app.listen(3000,() => {
  console.log("Server is up and listening to 3000...")
})
