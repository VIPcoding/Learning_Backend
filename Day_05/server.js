const app = require("./src/app")

const mongoose = require("mongoose")

function connectTODB(){
    mongoose.connect("mongodb+srv://vipsachdeva1_db_user:ylOHbF8S3ddraGQX@cluster0.rabzgvd.mongodb.net/Day-6")
    .then(()=>{
        console.log("Connected to databae")
    })
}

connectTODB()



app.listen(3000, ()=>{
    console.log("server is running on port 3000")
})