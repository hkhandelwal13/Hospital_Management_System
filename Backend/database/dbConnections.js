import mongoose from "mongoose";
export const dbConnection = () => {
    mongoose.connect(process.env.MONGO_URI,{
        dbName : "Hospital_Management_DB"
    }).then(()=> {
          console.log("connection established with DB!")
    }).catch((err)=>
    {
        console.log(`some error occurred while connecting to database ! : ${err}`)
    })
}
