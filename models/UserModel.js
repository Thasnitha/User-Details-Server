const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
    FirstName:{
        type:String,
        required:true
    },
    LastName:{
        type:String,
        required:true
    },
   
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true


    },
    phoneNumber:{
        type:String,
        required:true,
         match: /^[0-9]{10,15}$/

    }
    

})

const users=mongoose.model("users",userSchema)
module.exports=users
