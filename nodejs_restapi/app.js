const express = require("express")
const app = express()
const morgan = require('morgan')

app.use(morgan('combined'))

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
