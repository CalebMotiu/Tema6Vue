import express from "express"
import bodyParser from "body-parser"
import { notesRouter } from "./routing/notes.router.js"
import { generalRouter } from "./routing/general.router.js"

const api = express()
const port = 3000

api.use(bodyParser.json())

// Add headers before the routes are defined
api.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*")

  // Request methods you wish to allow
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE")

  // Request headers you wish to allow
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type")

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true)

  // Pass to next layer of middleware
  next()
})

api.use(generalRouter)
api.use("/notes", notesRouter)

api.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
