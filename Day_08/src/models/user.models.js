const express  = require("express")
const { default: mongoose } = require("mongoose")

const userSchema = new mongoose.Schema({
    name:String,
    email:{
        type:String,
        unique:[true, "user is already exist with this code"]
    },
    password:String
})


const userModel = mongoose.model("users", userSchema)


module.exports = userModel