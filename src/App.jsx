import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage"
import AddNotes from "./pages/AddNotes"
import EditNotePage from "./pages/EditNotePage"
import NotePage from "./pages/NoteDetail"
import axios from 'axios' // what happen if we use {axios}
import {useState,useEffect} from 'react'
import {toast } from 'react-toastify';
// import { useNavigate } from "react-router";

const App = () => {

  // let navigate = useNavigate();
  const[notes,setNotes]=useState([])
  const[isLoading,setIsLoading]=useState(false)
  const [filterText,setFilterText]=useState("")
  const [searchText,setSearchText]=useState("")

  const handleFilterText=(val)=>{
    setFilterText(val);
  }
  
  const handleSearch=(val)=>{
    setSearchText(val)
  }


  const filteredNotes=filterText==="BUSINESS"?notes.filter((note)=>note.category=="BUSINESS")
  :filterText==="PERSONAL"?notes.filter((note)=>note.category=="PERSONAL")
  :filterText==="IMPORTANT"?notes.filter((note)=>note.category=="IMPORTANT")
  :notes


  useEffect(()=>{
    // if(searchText.length<3) return
    axios.get(`https://note-app-backend-django.onrender.com/notes-search/?search=${searchText}`)
    .then(res=>{
     setNotes(res.data)
      console.log("The response is ",res.data)
    })
    .catch(err=>{
      console.log(err.message)
    })
  },[searchText])



  useEffect(()=>{
    setIsLoading(true)
    axios.get("https://note-app-backend-django.onrender.com/notes/")
    .then(res=>{
      console.log(res.data)
      setNotes(res.data)
      setIsLoading(false)
      console.log("React is success fully connectd")
    })
    .catch(err=>{
      console.log(err.message)
      console.log("react is not connected successfully")
    })
  },[])

  const addNote=(data)=>{
    axios.post('https://note-app-backend-django.onrender.com/notes/',data)
    .then(res=>{
      console.log(res.data)
      setNotes([...notes,res.data])
      toast.success("Book is Created Successfully");
      console.log("Post Data is Connected")
    
    })

    .catch(err=>{
      console.log(err.message)
      console.log("Post Data is not Connected")
    })
  }

  // axios.put(`https://127.0.0.1:8000/notes/${slug}/`,data)
   const updateNote=(data,slug)=>{
    axios.put(`https://note-app-backend-django.onrender.com/notes/${slug}/`,data)
    .then(res=>{
      toast.success("Book is updated Successfully")
    })
    .catch(err=>{
      console.log(err.message)
    })

   
  }


  const deletNotes=(slug)=>{

    axios.delete(`https://note-app-backend-django.onrender.com/notes/${slug}/`)
    .then(res=>{
      setNotes([...notes])
      // toast.success("Note Deleted Successfully")
    })
    .catch(err=>console.log(err.message))

  }




  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<MainLayout searchText={searchText} handleSearch={handleSearch} />}>
      <Route index element={<HomePage notes={filteredNotes} loading={isLoading} handleFilterText={handleFilterText} />} />
      <Route path="/add-notes" element={<AddNotes addNote={addNote}/>} />
      <Route path="/edit-notes/:slug" element={<EditNotePage  updateNote={updateNote}/>} />
      <Route path="/notes/:slug" element={<NotePage  deletNotes={deletNotes} />} />
    </Route>
  ))



  return <RouterProvider router={router} />
};

export default App;

