import React, { useEffect } from 'react'
import './App.css'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Appointment from './pages/Appointment'
import About from './pages/About'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Context} from "./main";
import { useContext } from 'react'
import axios from 'axios'
const App = () => {
  const {isAuthenticated,setIsAuthenticated,setUser} = useContext(Context);
  useEffect(()=>{
      const fetchUser = async() => {
        try {
          const response = await axios.get("http://localhost:4000/api/v1/user/patient/me",{withCredentials: true,});
          setIsAuthenticated(true);
          setUser(response.data.user);
        } catch (error) {
            setIsAuthenticated(false);
            setUser({});
        }
      };
      fetchUser();
  },[isAuthenticated]);
  return (
    <>
      <Router>
        <Navbar></Navbar>
        <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/appointment' element={<Appointment/>}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
       
        </Routes>
        <ToastContainer position="top-center"></ToastContainer>
      </Router>
    </>
  )
}

export default App
