import { useEffect, useState } from 'react'
import axios from "axios"


function App() {
  const [note, setNote] = useState([])

  function fetchData(){
  axios.get("http://localhost:3000/notes")
  .then((res)=>{
    setNote(res.data.note)
  })
 }

  useEffect(()=>{
    fetchData()
  },[])

  return (
  <>
  <div className='notes'> 
    {
      note.map((elem)=>{
        console.log(elem);
        return <div key={elem.id} className='note'>
           <h1>{elem.title}</h1>
          <h3>{elem.description}</h3>
        </div>
      })
    }
   
  </div>
  
  </>
  )
}

export default App
