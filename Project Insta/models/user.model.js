const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:[true, "User Already exist"],
        required:[true, "username required"]
    },
    email:{
        type:String,
        unique:[true, "Email Already exist"],
        required:[true, "Email required"]
    },
    password:{
        type:String,
        required:[true, "password is required"]
    },
    bio:String,
    profileImage:{
        type:String,
        default: "https://ik.imagekit.io/CODER/default-image.jpg?updatedAt=1771393028632"
    }
})

const userModel = mongoose.model("users", userSchema)

module.exports = userModel