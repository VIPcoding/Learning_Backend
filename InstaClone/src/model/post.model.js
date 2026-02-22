const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    caption:{
        type:String,
        default:""
    },
    imageUrl:{
        type:String,
        require:[true, "imgUrl is required for creating an post"]
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        require:[true, "userId is required for creating a post"]
    }
    
})

const postModel = mongoose.model("posts", postSchema)

module.exports = postModel