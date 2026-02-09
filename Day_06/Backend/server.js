const app = require("./src/app")
require("dotenv").config()
const connectToDb = require("./src/config/database")



connectToDb()
app.listen(3000, (req, res)=>{
    console.log("Server is running on port 3000");
})