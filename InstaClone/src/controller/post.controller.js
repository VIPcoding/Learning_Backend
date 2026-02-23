const postModel = require("../model/post.model")
const imageKit = require("@imagekit/nodejs")
const {toFile} = require("@imagekit/nodejs")
const jwt = require("jsonwebtoken")

const imageFile = new imageKit({
   privateKey:process.env.IMAGEKIT_PRIVATE_KEY,
});


async function createPostConrtroller(req, res) {
    console.log(req.body, req.file);

    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message:"Token not provided, Unauthorized access"
        })
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET)

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

module.exports = {
    createPostConrtroller
}