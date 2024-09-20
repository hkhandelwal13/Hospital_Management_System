import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema({
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
    message:{
        type :String,
        required : true,
        minLength : [10,"Message Must Contain At least 10 characters!"]
    },
},

);
export const Message = mongoose.model("Message",messageSchema)