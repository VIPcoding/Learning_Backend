const express = require("express")

const app = express() // create instance of server

app.use(express.json())  // use middleware 

const notes = []


app.get("/notes", (req, res)=>{
    res.send(notes)
})   

app.post("/notes", (req, res)=>{
    console.log(req.body)
    notes.push(req.body)
    res.send("notes created")
})



app.listen(3000, () => {
    console.log("The Server is running on Port 3000")
})  // start or run server