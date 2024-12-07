const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken')

const users=require('../models/UserModel')
//register
exports.registerController=async(req,res)=>{
    console.log('Inside registerController');
    const {FirstName,LastName,email,password,phoneNumber}=req.body
    console.log(FirstName,LastName,email,password,phoneNumber);

    try{
      const existingUser= await users.findOne({email})
      if(existingUser){
       
        res.status(406).json("User already Exist....Please Login!!!")


      }else{
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser=new users({
            FirstName,LastName,email,password:hashedPassword,phoneNumber
        })
        await newUser.save()
        res.status(200).json(newUser)
      }

    }catch(err){
        res.status(401).json(err)


    }

    
}


//login

exports.loginController=async(req,res)=>{
    console.log('Inside registerController');
    const {email,password}=req.body
    console.log(email,password);

    try{
      const existingUser= await users.findOne({email})
      if(existingUser){
         //token generate
         const token=jwt.sign({userId:existingUser._id},process.env.JWTPSWD)
        res.status(200).json({
            user:existingUser,
            token
        })


      }else{
       res.status(404).json("Invalid Email/Password")
      }

    }catch(err){
        res.status(401).json(err)


    }

    
}

exports.listUsersController=async(req,res)=>{
    console.log("inside listUserController");
    try{
        const userList=await users.find({},'-password');
        res.status(200).json(userList)

    }catch(err){
        res.status(500).json({message:"internal server error",error:err})

    }
    
}
// View user details
exports.viewUserDetailsController = async (req, res) => {
    const userId = req.params.id;  

    console.log("Inside viewUserDetailsController for user: ", userId);

    try {
        const user = await users.findById(userId, '-password');

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json("User not found");
        }
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", error: err });
    }
}