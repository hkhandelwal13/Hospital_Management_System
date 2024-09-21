import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
const userSchema = new mongoose.Schema({
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
    password: {
    type : String,
    required : true,
    minLength : [8,"Password Must Contain At Least 8 characters!"],
    select : false,  
    },
    role : {
        type : String,
        required : true,
        enum : ["Admin","Patient","Docter"],
        
    },
    docterDepartment :{
        type :String
    },
    docAvatar : {
         public_id : String,
         url : String
    },
}


);

userSchema.pre("save",async function(next)
{
    if(!this.isModified("password"))
        {
            next();
        }
        this.password =  await bcrypt.hash(this.password,10);
});

userSchema.methods.comparePassword = async function(enteredPassword)
{
          return await bcrypt.compare(enteredPassword,this.password);
};

userSchema.methods.generateJsonWebToken = function()
{
      return jwt.sign({id: this._id},process.env.JWT_SECRET_KEY,
        {
            expiresIn : process.env.JWT_EXPIRES,
        });
      
};

export const User = mongoose.model("User",userSchema)

// {
//     "firstName" : "Zeeshan",
//     "lastName" : "khan",
//     "email" : "admin2@gmail.com",
//     "phone" : 95299935901,
//     "password" : "87654321",
//     "gender" : "male",
//     "dob" : "16-02-2003",
//     "nic" : "123456789012"
// }