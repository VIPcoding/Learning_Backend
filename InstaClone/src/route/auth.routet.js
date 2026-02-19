const express = require("express")
const authRoute = express.Router()
const authController = require("../controller/auth.controller")




authRoute.post("/register")



module.exports = authRoute

