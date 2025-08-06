import React from 'react'
import "./AddNotes.css"
import {useState,useEffect} from 'react'
import {useParams} from 'react-router'
import axios from 'axios'
import {useNavigate} from "react-router-dom"

const EditNotePage = ({updateNote},) => {

  const [title,setTitle]=useState("")
  const[body,setBody]=useState("")
  const[category,setCategory]=useState("")

  const{slug}=useParams()

  const navigate=useNavigate()

  useEffect(()=>{
    axios.get(`https://note-app-backend-django.onrender.com/notes/${slug}`)
    .then(res=>{
      // console.log(res.data)

      setTitle(res.data.title)
      setBody(res.data.body)
      setCategory(res.data.category)
    })
    .catch(err=>{
      console.log(err.message)

    })

  },[slug])// if we remove [slug] its infinitly called 

  const updatedNoteObject={
    title:title,
    body:body,
    category:category,

  }


  const handleSubmit=(e)=>{
    e.preventDefault()

    if(!title && !body && !category){
      return;

    }

    updateNote(updatedNoteObject,slug)
     navigate(`/notes/${slug}`)
      //  navigate(`/`)    when we use this it doesn't update authomatically it need refesh

    console.log("The form is Submitted")
  }

 

  // amm 4.2 and  8

  return (
     <form onSubmit={handleSubmit}>
      <h5>Edit Note</h5>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="Enter note's title"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="exampleFormControlTextarea1" className="form-label">
          Content
        </label>
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          rows={4}
          placeholder="Enter note's content"
          value={body}
          onChange={(e)=>setBody(e.target.value)}
        ></textarea>
      </div>

      <div className="mb-3">
      <label htmlFor="exampleFormControlTextarea1" className="form-label">
          Note's category
        </label>
      <select className="form-select" aria-label="Default select example" style={{height: "40px"}} value={category}>
          <option selected>Pick a category</option>
          <option value="BUSSINESS">Business</option>
          <option value="PERSONAL">Personal</option>
          <option value="IMPORTANT">Important</option>
        </select>
      </div>

        


      <button className="btn btn-primary d-flex justify-content-center" style={{width:"100%"}}>Save Note</button>
    </form>
  )
}

export default EditNotePage