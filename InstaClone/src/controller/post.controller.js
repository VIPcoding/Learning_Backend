const postModel = require("../model/post.model")
const postRoute = require("../route/post.route")
const imageKit = require("@imagekit/nodejs")
const {toFile} = require("@imagekit/nodejs")

const imageFile = new imageKit({
   privateKey:process.env.IMAGEKIT_PRIVATE_KEY,
});


async function createPostConrtroller(req, res) {
    console.log(req.body, req.file);
    const file = await imageFile.files.upload({
        files: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: 'images'
    })

    res.send(file)
    
}

module.exports = {
    createPostConrtroller
}