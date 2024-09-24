import React from 'react'
import './App.css'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Appointment from './pages/Appointment'
import About from './pages/About'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
 import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  return (
    <>
      <Router>
        <Routes>
        <Route path='/home' element={<Home/>}></Route>
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
