import { useEffect, useState } from 'react'
import axios from "axios"


function App() {
  const [notes, setNotes] = useState([])

  function fetchData(){
  axios.get("http://localhost:3000/notes")
  .then((res)=>{
    setNotes(res.data.note)
  })
 }

  useEffect(()=>{
    fetchData()
  },[])

  
 const handleSubmit = (e) =>{
    e.prevevntDefault()

    const {title, description} = e.target.elements


    axios.post("http://localhost:3000/notes", {
      title: title.value,
      description: description.value
    })
      .then(res => {
        console.log(res.data)

        fetchNotes()
        
      })
 }


function handleDeleteNote(noteId){
    axios.delete("http://localhost:3000/notes/:noteId"+noteId)
    .then(res=>{
      console.log(res.data)
      fetchNotes()
    })
  }


  return (
  <>
  <form className='note-create-form' onSubmit={()=>handleSubmit} >
        <input name='title' type="text" placeholder='Enter title' />
        <input name='description' type="text" placeholder='Enter description' />
        <button > Create note</button>
      </form>

      <div className="notes">
        {
          notes.map(note => {
            return <div key={note._id} className="note">
              <h1>{note.title}</h1>
              <p>{note.description}</p>
              <button onClick={()=>{handleDeleteNote(note._id)}}>delete</button>
            </div>
          })
        }
      </div>
  
  </>
  )
}

export default App
