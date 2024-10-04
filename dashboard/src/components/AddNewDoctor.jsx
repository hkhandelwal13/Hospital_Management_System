import React from 'react'
import { useState,useContext,useEffect } from 'react';
import axios from 'axios';
import { Navigate,useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Context } from '../main.jsx';
const AddNewDoctor = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const [firstName,setFirstName] = useState("");
  const [lastName,setLastName] = useState("");
  const [email,setEmail] = useState("");
  const [phone,setPhone] = useState("");
  const [nic,setNic] = useState("");
  const [dob,setDob] = useState("");
  const [gender,setGender] = useState("");
  const [password,setPassword] = useState("");
 const [doctorDepartment,setDoctorDepartment] = useState("");
 const [docAvatar,setDocAvatar] = useState("");
 const [docAvatarPreview,setDocAvatarPreview] = useState("");
  const navigate = useNavigate();
const handleAddNewDoctor = async (e) =>
{
      e.preventDefault();
      try {
        const response = await axios.post("http://localhost:4000/api/v1/user/doctor/addnew",{firstName,lastName,email,phone,nic,dob,gender,password,},{
         withCredentials: true,
         headers : {"Content-Type": "application/json"},
        });
        toast.success(response.data.message);
       setIsAuthenticated(true);
        console.log(isAuthenticated);
        navigate("/"); 
        
   } catch (error) {
     
     toast.error(error.response.data.message);
   }
};
if(!isAuthenticated)
{
  return <Navigate to={"/login"}></Navigate>;
}
  return (
    <>
     <section className='page'>
     <div className='container form-component register-form'>
      <img src="/logo.png" alt="logo" className='logo'/>
       <h1 className='form-title'>ADD NEW ADMIN</h1>
    
       <form onSubmit={handleAddNewDoctor}>
        <div>
          <input type="text" placeholder='First Name' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          <input type="text" placeholder='Last Name' value={lastName} onChange={(e) => setLastName(e.target.value)} />

        </div>
        <div>
          <input type="text" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="number" placeholder='Phone No.' value={phone} onChange={(e) => setPhone(e.target.value)} />

        </div>
        <div>
          <input type="number" placeholder='NIC' value={nic} onChange={(e) => setNic(e.target.value)} />
          <input type="date" placeholder='DOB' value={dob} onChange={(e) => setDob(e.target.value)} />

        </div>
        <div>
             <select value={gender} onChange={(e) => setGender(e.target.value)}>
               <option value="">Select Gender</option>
               <option value="Male">Male</option>
               <option value="Female">Female</option>

             </select>
          <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />

        </div>

  <div style={{justifyContent: "center" , alignItems :"center"}}>
 <button type="submit">Add New Admin</button>
  </div>
       </form>
    </div>
      </section> 
    </>
  )
}

export default AddNewDoctor;
