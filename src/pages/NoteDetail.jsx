import React from "react";
import {useState,useEffect} from 'react'
import "./NoteDetail.css"
import { BiSolidTrashAlt } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import Modal from "../components/Modal";
import {Link} from 'react-router-dom'
import axios from 'axios'
import { useParams } from "react-router";
import Loader from '../components/Loader'
import {FormatDate} from '../components/DateFormat'






const NotePage = ({deletNotes}) => {


  const[isLoading,setIsLoading]=useState(false)


  const[note,setNote]=useState({})
  const {slug}=useParams()
  const [isModalOpen,setModalOpen]=useState(false)

  const handleModal=()=>{
    setModalOpen(!isModalOpen)
  }




  useEffect(()=>{
    axios.get(`https://note-app-backend-django.onrender.com/notes/${slug}`)
    .then(res=>{
      // console.log(res.data)  it is 
      setNote(res.data)
      setIsLoading(true)
    })
    .catch(err=>{
      console.log(err.message)

    })

  },[slug])




  return (
    <>
    {!isLoading&&<Loader loading={isLoading}/>}
  
    <div className="note-container">
    <h3 className="title">{note.title}</h3>
    <span className="d-flex justify-content-center">
    <p className="note-date font-12 text-muted me-5"> created: {FormatDate(note.created)}</p>
    <p className="note-date font-12 text-muted me-5">updated: {FormatDate(note.updated)}</p>
    </span>
    <span className="button-group">
        <Link to={`/edit-notes/${note.slug}`}><button className="btn btn-primary"><FiEdit /><span>Edit</span></button></Link>
     {/* <a href="/edit-notes"> </a> */}
      <button className="btn btn-danger" onClick={handleModal}><BiSolidTrashAlt /><span>Delete</span></button>
    </span>
    <p className="description">
   {note.body}
    </p>



    

  </div>
   {isModalOpen&&<Modal handleModal={handleModal}  deletNotes={()=>deletNotes(slug)}/>}
  </>
  );
};

export default NotePage;