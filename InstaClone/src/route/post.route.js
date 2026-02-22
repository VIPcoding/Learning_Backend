const express = require("express")
const postRoute = express.Router()
const postController  = require("../controller/post.controller")
const multer = require("multer")
const upload = multer({storage:multer.memoryStorage() })

postRoute.post("/", upload.single("image"), postController.createPostConrtroller)

module.exports = postRoute