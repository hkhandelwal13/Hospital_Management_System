import mongoose from "mongoose";
import validator from "validator";

const appointmentSchema = new mongoose.Schema({
    firstName:{
       type : String,
       required : true,
       minLength : [3,"First Name Must Conatin At Least 3 characters!"]
    },
    lastName:{
       type :String,
       required : true,
       minLength : [3,"Last Name Must Contain At least 3 characters!"]
   },
   email:{
       type :String,
       required : true,
       validate : [validator.isEmail,"Please enter a valid email address"]
   },
   phone:{
       type :String,
       required : true,
       minLength : [11,"Phone Number Must conatain Exact 11 Digits!"],
       maxLength : [11,"Phone Number Must contain Less than 11 Digits!"],
   },
   nic:{
       type :String,
       required : true,
       minLength : [12,"NIC Must conatain Exact 12 Digits!"],
       maxLength : [12,"NIC Number Must contain Less than 12 Digits!"],
   },
   dob: {
       type : Date,
       required : [true,"DOB is required!"],
   },
   gender: {
       type : String,
       required : true,
       enum : ["Male","Female"],
       
   },

   appointment_date :{
    type: String,
    required : true,

   },
   department:{
     type: String,
     required : true,
   },
   doctor : {
    firstName:{
        type : String,
        required : true,
        // minLength : [3,"First Name Must Conatin At Least 3 characters!"]
     },
     lastName:{
        type :String,
        required : true,
        // minLength : [3,"Last Name Must Contain At least 3 characters!"]
    }
   },
   hasVisited :{
    type: Boolean,
    default : false,
   },
   doctorId : {
    type : mongoose.Schema.ObjectId,
    required : true,
   },
   patientId : {
    type : mongoose.Schema.ObjectId,
    required : true,
   },
   address :{
    type : String,
    required : true,
   },
   status : {
    type : String,
    enum : ["Pending","Accepted","Rejected"],
    default : "Pending",
   }
}


);

export const Appointment = mongoose.model("Appointment",appointmentSchema);