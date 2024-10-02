import {catchAsyncErrors} from '../middlewares/catchAsyncErrors.js'
import ErrorHandler from '../middlewares/errorMiddleware.js'
import { User} from '../models/userSchema.js'
import {generateToken} from "../utils/jwtToken.js"
import cloudinary from "cloudinary"
export const patientRegister = catchAsyncErrors(async(req,res,next) => {
    const {firstName,lastName,email,phone,nic,dob,gender,password,role,} = req.body;
           if(
            !firstName || !lastName || !email || !phone || !nic || !dob || !gender || !password || !role)
           {
                     return next(new ErrorHandler("Please fill the full form",400));
           }

           let user  = await User.findOne({email});
           if(user)
           {
            return next(new ErrorHandler("User Already Registered !",400));
           }
           user = await User.create({
            firstName,lastName,email,phone,nic,dob,gender,password,role,
           });
           generateToken(user,"User registered successfully!",200,res);

        //    res.status(200).json({
        //        success: true,
        //        message : "User registered successfully!",
        //    });
});

export const login = catchAsyncErrors(async(req,res,next)=> {
    const {email,password,confirmPassword,role} = req.body;
    if(!email || !password || !confirmPassword || !role)
    {
        return next(new ErrorHandler("Please provide all the details",400));
    }
    if(password !== confirmPassword) {
        return next(new ErrorHandler("Password and confirm Password do not match",400));
    }
    const user = await User.findOne({email}).select("+password");
    if(!user)
    {
        return next(new ErrorHandler("Invalid Password or Email",400));
    }
 const isPasswordMatched = await user.comparePassword(password);
 if(!isPasswordMatched)
 {
    return next(new ErrorHandler("Invalid Password or Email",400));
 }
 if(role !== user.role)
 {
    return next(new ErrorHandler("User with this role not Found!",400));
 }
 generateToken(user,"User Logged In successfully!",200,res);
//  res.status(200).json({
//     success: true,
//     message : "User Logged In Successfully!",
// })
})

export const addNewAdmin = catchAsyncErrors(async(req,res,next)=>{
   const{firstName,lastName,email,phone,nic,dob,gender,password,} = req.body;
   if(
    !firstName || !lastName || !email || !phone || !nic || !dob || !gender || !password)
   {
             return next(new ErrorHandler("Please fill the full form",400));
   }
   const isRegistered = await User.findOne({email});
   if(isRegistered)
   {
    return next(new ErrorHandler(`${isRegistered.role} with this Email Already Exists`));
   }
   const admin = await User.create({firstName,lastName,email,phone,nic,dob,gender,password,role:"Admin"})
   res.status(200).json({
    success:true,
    message:"New Admin Registered!",
   });
});

export const getAllDocters = catchAsyncErrors(async(req,res,next)=>{
     const docters = await User.find({role : "Doctor"});
     res.status(200).json({
        success : true,
        docters,
     });
});

export const getuserDetails = catchAsyncErrors(async(req,res,next)=>{
     const user = req.user;
     res.status(200).json({
        success : true,
        user,
     });
});

export const logoutAdmin = catchAsyncErrors(async(req,res,next)=>{
        res.status(200).cookie("adminToken","",{
            httpOnly : true,
            expires : new Date(Date.now()),
        }).json({
            success : true,
            message : "Admin Logged Out Successfully",
        });
});

export const logoutPatient = catchAsyncErrors(async(req,res,next)=>{
    res.status(200).cookie("patientToken","",{
        httpOnly : true,
        expires : new Date(Date.now()),
    }).json({
        success : true,
        message : "Patient Logged Out Successfully",
    });
});

export const addNewDoctor = catchAsyncErrors(async(req,res,next)=>{
          if(!req.files || Object.keys(req.files).length === 0)
          {
            return next(new ErrorHandler("Doctor Avatar Required !",400));
          }

          const {docAvatar} = req.files;
          const  allowedFormats = ["image/png","image/jpg","image/webp"];
          if(!allowedFormats.includes(docAvatar.mimetype)){
            return next(new ErrorHandler("File format not allowed! ",400));
          }
          const {firstName,lastName,email,phone,nic,dob,gender,password,docterDepartment} = req.body;
          if( !firstName || !lastName || !email || !phone || !nic || !dob || !gender || !password || !docterDepartment )
          {
            return next(new ErrorHandler("Please Provide Complete details",400));
          }
          const isRegistered = await User.findOne({email: email});
          if(isRegistered){
            return next(new ErrorHandler(`${isRegistered.role} already registered with this email`,400));

          }

          const cloudinaryResponse = await cloudinary.uploader.upload(docAvatar.tempFilePath);

          if(!cloudinaryResponse || cloudinaryResponse.error)
          {
                 console.error(
                    "cloudinary Error: ",
                    cloudinaryResponse.error || "Unknown Cloudinary Error"
                 );


          }
        const doctor = await User.create({
                    firstName,lastName,email,phone,nic,dob,gender,password,docterDepartment,role: "Doctor",
                    docAvatar : { public_id : cloudinaryResponse.public_id,
                        url : cloudinaryResponse.secure_url,
                    },
        });
        res.status(200).json({
            sucess : true,
            message : "New Doctor Registered successfully",
            doctor
        });
          
});





// {
//     "email" : "admin@gmail.com",
//     "password" : "12345678",
//     "confirmPassword" : "12345678",
//     "role" : "Admin"
//    }