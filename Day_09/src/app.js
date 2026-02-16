require("dotenv").config()
const express = require("express")
const cookieParser = require("cookie-parser")
const authRoter = require("./router/user.auth")
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth", authRoter)

module.exports = app
