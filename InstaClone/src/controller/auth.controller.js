const userModel = require("../model/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


async function registerController(req, res) {
    const {username, email, password, bio, profileImage} = req.body

    const isUsesrAlreadyExist = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })

    if(isUsesrAlreadyExist){
        return res.status(409).json({
            message:"user already exist" +
            (isUsesrAlreadyExist.email == email ? "with email" : "with username")
        })
    }


    const hash = await bcrypt.hash(password)

    const user = await userModel.create({
        username, email, bio, profileImage, 
    })



}
