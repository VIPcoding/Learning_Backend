const express = require("express")
const authRoter = express.Router()
const userModel = require("../model/user.model")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")

authRoter.post("/register", async (req, res)=>{
    const {name, email, password} = req.body

    const userALreadyExist = await userModel.findOne({email})

    if(userALreadyExist){
        return res.status(400).json({message:"User already exist"});
    }

    const hash = crypto.createHash("sha256").update(password).digest("hex")

    const user = await userModel.create({
                name, email, password:hash
            })

    const token = jwt.sign(
        {
            id:user._id,
            email:user.email
        },
        process.env.JWT_SECRET,
        {expiresIn : "1h"}
    ) 

    res.cookie("JWT_COOKiE", token)
            
     res.status(201).json({
        message:"User Created successfully",
        user,
        token
     })       
})



authRoter.get("/get-me", async (req, res)=>{
    const token = req.cookies.JWT_COOKiE

    const decode = jwt.verify(token, process.env.JWT_SECRET)
    const user = await userModel.findById(decode.id)

    res.json({
        name:user.name,
        email:user.email
    })

})

authRoter.post("/login", async (req, res)=>{
    const {email, password} = req.body

    const user = await userModel.findOne({email})

    if(!user){
        res.status(404).json({
            message:"user not found"
        })
    }
    
    const hash = crypto.createHash("sha256").update(password).digest("hex")

    const isPasswordValid = hash == user.password

     if(!isPasswordValid){
        res.status(404).json({
            message:"Password is incorrect"
        })
    }

    const token = jwt.sign(
        {
            id:user._id,
            email:user.email
        },
        process.env.JWT_SECRET,
        {expiresIn : "1h"}
    ) 

    res.cookie("JWT_COOKiE", token)
            
     res.status(201).json({
        message:"User Created successfully",
        user,
        token
     })  

})


module.exports = authRoter
