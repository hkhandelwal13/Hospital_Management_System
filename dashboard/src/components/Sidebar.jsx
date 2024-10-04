import React, { useContext, useState } from 'react'
import {Context} from "../main.jsx";
import {TiHome} from "react-icons/ti";
import {RiLogoutBoxFill} from "react-icons/ri";
import {AiFillMessage} from "react-icons/ai";
import {GiHamburgerMenu} from "react-icons/gi";
import {FaUserDoctor} from "react-icons/fa6";
import {MdAddModerator} from "react-icons/md";
import {IoPersonAddSharp} from "react-icons/io5";
import {useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast } from 'react-toastify';
const Sidebar = () => {
  const [show,setShow] = useState(false);
  const {isAuthenticated,setIsAuthenticated} = useContext(Context);
    const navigate = useNavigate();
    const goToHome = () =>{
      navigate("/");
      setShow(!show);
    };
    const goToDoctorsPage = () =>{
      navigate("/doctors");
      setShow(!show);
    };
     const goToMessagePage= () =>{
      navigate("/messages");
      setShow(!show);
    };
    const goToAddNewAdmin = () =>{
      navigate("/admin/addnew");
      setShow(!show);
    };
    const goToAddNewDoctor = () =>{
      navigate("/doctor/addnew");
      setShow(!show);
    };
    const handleLogout = async() => {
         
      await axios.get("http://localhost:4000/api/v1/user/admin/logout", {withCredentials:true,}

      ).then(res=>{
          toast.success(res.data.message);
          setIsAuthenticated(false);
      }).catch(err=>{
          toast.error(err.response.data.message);
      });

      
     
};
  return (
    <>
    <nav style={!isAuthenticated ?{display : "none"}:{display:"flex"}} className={show ? "show sidebar" : "sidebar"}>

<div className='links'>
  
      <TiHome  onClick={goToHome}></TiHome>
      <FaUserDoctor onClick={goToDoctorsPage}/>
      <MdAddModerator onClick={goToAddNewAdmin} />
      <IoPersonAddSharp onClick={goToAddNewDoctor} />
      <AiFillMessage onClick={goToMessagePage}/>
      <RiLogoutBoxFill onClick={handleLogout} />
</div>
</nav>
  <div className='wrapper' style={isAuthenticated ? {display:"none"} : {display : "flex"}}>
    <GiHamburgerMenu className='hamburger' onClick={()=> setShow(!show)} />
  </div>
    </>
    
  )
}
export default Sidebar;

         

      

