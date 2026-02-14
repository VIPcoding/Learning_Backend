const express = require("express")
const app = express()
const noteModel = require("../models/notes.model")
const cors = require("cors")
app.use(express.json())
app.use(cors())

app.post("/api/notes", async (req, res)=>{
    const {title, description}  = req.body

    const note = await noteModel.create({
        title, description
    })

    res.status(201).json({
        message:"Note successfully created",
        note
    })
})


app.get("/api/notes", async (req, res)=>{
    const note = await noteModel.find()
    res.status(200).json({
        message:"Data Fetched",
        note
    })
})

app.delete("/api/notes/:id", async (req, res)=>{
    const noteid = req.params.id
    const note = await noteModel.findByIdAndDelete(noteid)
    res.status(200).json({
        message:"Note Successfully Deleted",
        note
    })
})

app.patch("/api/notes/:id", async (req, res)=>{
    const {description} = req.body
    const noteid = req.params.id
    console.log(noteid);
    
    const note = await noteModel.findByIdAndUpdate(noteid, {description})
    res.status(200).json({
        message:"Note successfully Updated",
        note
    })
})


module.exports = app