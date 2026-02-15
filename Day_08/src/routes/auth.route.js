const express = require("express")
const userModel = require("../models/user.models")
const authRouter = express.Router()
const jwt = require("jsonwebtoken")

authRouter.post("/register", async (req, res)=>{
    const {name, email, password} = req.body

    const isUserAalreadyExist = await userModel.findOne({email})

    if(isUserAalreadyExist){
        return res.status(409).json({
            message:"The user alreadu exist"
        })
    }

    const user = await userModel.create({
        name, email, password
    })

    const token = jwt.sign(
        {
            id:user._id
        },
        process.env.JWT_SECRET
    )

    res.cookie("jwt_token", token)

    res.status(201).json({
        message:"User Register SUccessfully",
        user,
        token
    })
})



module.exports = authRouter