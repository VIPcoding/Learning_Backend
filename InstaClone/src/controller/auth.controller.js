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


    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username, email, bio, profileImage, password:hash
    })

    const token = jwt.sign(
        {id:user._id},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )

    res.cookie("token", token)

    res.status(200).json({
        message:"user successfully registered",
        user:{
            username:user.username,
            email:user.email,
            profileImage:user.profileImage,
            bio:user.bio
        }
    })


}

async function logiinController(req, res){
    const {username, email, password} = req.body

    const user = await userModel.findOne({
        $or: [
            {
                username: username
            },
            {
                email: email
            }
        ]
    })

    if(!user){
        return res.status(404).json({
            message:"user not found"
        })
    }

    const ispasswordValid = await bcrypt.compare(password, user.password)

    if(!ispasswordValid){
        return res.status(401).json({
            message:"password not match"
        })
    }

    const token = jwt.sign(
        {id:user._id},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )

    res.cookie("token", token)

    res.status(200).json({
        message:"User Login Succesfully"
    })
}
module.exports = {
    registerController,
    logiinController
}