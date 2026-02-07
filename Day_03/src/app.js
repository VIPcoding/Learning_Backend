const express  = require("express")


const app = express()

app.use(express.json())

const notes = []


app.post('/notes', (req, res)=>{
    notes.push(req.body)
    console.log("notes created")
    res.send(notes)
})


app.get('/notes', (req, res) =>{
    res.send(notes)
    console.log("notes are here")
    console.log(notes)
})


app.delete("/notes/:index", (req, res)=>{
    delete notes[req.params.index]
    console.log("data deleted")
})

app.patch('/notes/:index', (req, res)=>{
    notes[req.params.index].descr = req.body.descr
    res.send("data updated")
})
module.exports = app

















// [
//     {
//         "title": "title 2",
//         "descr": "title descr 2"
//     },
//     {
//         "title": "title 1",
//         "descr": "title descr 1"
//     },
//     {
//         "title": "title 3",
//         "descr": "title descr 3"
//     },
//     {
//         "title": "title 4",
//         "descr": "title descr 4"
//     }
// ]