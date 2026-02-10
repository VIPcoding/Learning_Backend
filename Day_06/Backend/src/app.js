const express = require ("express")
const noteModels = require("./models/notes.models")
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(cors())

const notes = []



/* GET Method to fetch nnotes From database using notemodels  */
app.get("/notes", async (req, res)=>{
    const note = await noteModels.find()
    res.status(200).json({
        message : "Notes Fetched Successfully",
        note
    })
})


/* POST Method to create nnotes in database using notemodels  */
app.post("/notes", async (req, res)=>{
    const {title, description} = req.body
    
    const note = await noteModels.create({
        title, description
    })
    res.status(201).json({
        message : "Note Created Successfully",
        note
    })
})

app.delete("/notes/:id", async (req, res)=>{
    const id = req.params.id
    const note = await noteModels.findByIdAndDelete(id)
    res.status(200).json({
        message:"Note Deleted Successfully",
    })
})


app.patch("/notes/:id", async (req, res)=>{
    const {description} = req.body
    const id = req.params.id
    const note = await noteModels.findByIdAndUpdate(id, {description})

    res.send(200).json({
        message:"Note Modified Successfully",
        note
    })
})



module.exports = app