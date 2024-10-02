import React from 'react'
import AppointmentForm from '../components/AppointmentForm';
import Hero from "../components/Hero.jsx";
const Appointment = () => {
  return (
    <div>
      <Hero title={"Schedule Your Appointment | Zeecare Medical Institute"} imageUrl={"/signin.png"}></Hero>
      <AppointmentForm></AppointmentForm>
    </div>
  )
}

export default Appointment;
