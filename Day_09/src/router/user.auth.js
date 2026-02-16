const express = require("express")
const authRoter = express.Router()
const userModel = require("../model/user.model")
const jwt = require("jsonwebtoken")

authRoter.post("/register", async (req, res)=>{
    const {name, email, password} = req.body

    const userALreadyExist = await userModel.findOne({email})

    if(userALreadyExist){
        return res.status(400).json({message:"User already exist"});
    }

    const user = await userModel.create({
                name, email, password
            })

    const token = jwt.sign(
        {
            id:user._id,
            email:user.email
        },
        process.env.JWT_SECRET
    ) 

    res.cookie("JWT_COOKiE", token)
            
     res.status(201).json({
        message:"User Created successfully",
        user,
        token
     })       
})


authRoter.post("/login", async (req, res)=>{
    const {email, password} = req.body

    
})


module.exports = authRoter
