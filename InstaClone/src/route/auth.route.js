const express = require("express")
const authRoute = express.Router()
const authController = require("../controller/auth.controller")




authRoute.post("/register", authController.registerController)
authRoute.post("/login", authController.logiinController)



module.exports = authRoute

