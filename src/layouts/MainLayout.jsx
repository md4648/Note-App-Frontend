import NavBar from '../components/NavBars'
import { Outlet } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';

const MainLayout = ({searchText,handleSearch}) => {
  return (
    <>
    <NavBar searchText={searchText} handleSearch={handleSearch} />
    <ToastContainer />
    <Outlet />
    </>
    
  )
}

export default MainLayout