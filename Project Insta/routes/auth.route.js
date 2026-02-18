const express = require("express")
const authRoute = express.Router()
const authController = require("../controller/auth.controller")

authRoute.post("/register", authController.registerController)

authRoute.use("/login", authController.loginController)


module.exports  = authRoute


