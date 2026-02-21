const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    caption:{
        type:String,
        reuired:[true, "caption is required"]
    },
    
})