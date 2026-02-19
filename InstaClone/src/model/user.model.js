const mongoose = require("mongoose")


const userSchema = new mongoose({
    username:{
        type:String,
        unique:[true, "usesrname is already exist"],
        required:[true, "usesrname is required"]
    },
    email:{
        type:String,
        unique:[true, "email is already exist"],
        required:[true, "email is required"]
    },
    password:{
        type:String,
        required:[true, "usesrname is required"]
    }
})

const userModel = mongoose.model("users", userSchema)
module.exports = userModel