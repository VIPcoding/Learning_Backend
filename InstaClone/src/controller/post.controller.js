const postModel = require("../model/post.model")
const imageKit = require("@imagekit/nodejs")
const {toFile} = require("@imagekit/nodejs")
const jwt = require("jsonwebtoken")

const imageFile = new imageKit({
   privateKey:process.env.IMAGEKIT_PRIVATE_KEY,
});


async function createPostConrtroller(req, res) {

    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message:"Token not provided, Unauthorized access"
        })
    }

    let decoded = null   
    try{ decoded = jwt.verify(token, process.env.JWT_SECRET)}
    catch(err){
        return res.status(401).json({
            message: "user not authorized"
        })
    }

    const file = await imageFile.files.upload({
        files: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: 'images',
        folder:"Insta-Clone-Post"
    })

    const post = await postModel.create({
        caption:req.body.caption,
        imageUrl:file.url,
        user:decode.id
    })

     res.status(201).json({
        message: "Post created successfully.",
        post
    })
    
}

async function getPostController(req, res) {
    const token = req.cookies
}

module.exports = {
    createPostConrtroller
}