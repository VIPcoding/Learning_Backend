const express = require("express")
const authRoute = require("./route/auth.route")
const postRoute = require("./route/post.route")
const cookieParser = require("cookie-parser")
const app = express()




app.use(express.json())
app.use(cookieParser())
app.use("/api/auth", authRoute)
app.use("/api/posts", postRoute)


module.exports = app