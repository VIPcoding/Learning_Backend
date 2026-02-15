import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [note, setNote] = useState([]);

  function fetchdata() {
    axios.get("http://localhost:3000/api/notes").then((res) => {
      setNote(res.data.note);
    });
  }

  useEffect(() => {
    fetchdata();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const { title, description } = e.target.elements;
    axios
      .post("http://localhost:3000/api/notes", {
        title: title.value,
        description: description.value,
      })
      .then((res) => {
        fetchdata();
      });
  }


  function handleDelete(noteId){
    console.log(noteId);
    axios.delete(`http://localhost:3000/api/notes/${noteId}`)
    .then((res)=>{
        fetchdata()
    })
  }

  
  function handleUpdate(noteId,e){
    console.log(noteId,note)
    // const { description} = e.target.elements
  
    axios.patch(`http://localhost:3000/api/notes/${noteId}`, {
      description:"Data Modified"
    })
    .then((res)=>{
      console.log(res.data);
      fetchdata()
    })
  }



  return (
    <>
      <form className="note-create-form" onSubmit={handleSubmit}>
        <input name="title" type="text" placeholder="Enter title" />
        <input name="description" type="text" placeholder="Enter description" />
        <button> Create note</button>
      </form>

      <div className="notes">
        {note.map((notes) => {
          return (
            <div key={notes._id} className="note">
              <h1>{notes.title}</h1>
              <p>{notes.description}</p>
              <button onClick={()=>{ 
                handleDelete(notes._id)
              }}>delete</button>
              <button onClick={()=>{ 
                handleUpdate(notes._id)
              }}>update</button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
