import React from 'react'
import {useContext,createContext} from "react";
import { Link } from 'react-router-dom';
import { Context } from '../main';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
import { toast } from 'react-toastify';
// import { navigateTo } from 'react-router-dom';
const Navbar = () => {
    const [show,setShow] = useState(false);
    const navigate = useNavigate();

    const {isAuthenticated,setIsAuthenticated} = useContext(Context);
    const handleLogout = async() => {
         
            await axios.get("http://localhost:4000/api/v1/user/patient/logout", {withCredentials:true,}

            ).then(res=>{
                toast.success(res.data.message);
                setIsAuthenticated(false);
            }).catch(err=>{
                toast.error(err.message.data.message);
            })

            
           
    }
    const gotoLogin = () =>{
     navigate("/login");
    };
  return (
    <nav className='container'>
      <div className="logo">Zeecare</div>
      <div className={show ? "navLinks showmenu" : "navLinks"}>
      <div className="links">
        <Link to={"/"}>Home</Link>
        <Link to={"/appointment"}>Appointment</Link>

        <Link to={"/about"}>About Us</Link>

      </div>
      {isAuthenticated ? (<button className='logoutBtn btn' onClick={handleLogout}>LOGOUT</button>):(<button className='logoutBtn btn' onClick={gotoLogin}>LOGIN</button>)}
      </div>
     
    </nav>
  )
}

export default Navbar
