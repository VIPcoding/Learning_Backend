require("dotenv").config()
const app = require("./src/app")
const connecToDB = require("./config/database")


connecToDB()
app.listen(3000, (req,res)=>{
    console.log("Server is running on PORT 3000");
})