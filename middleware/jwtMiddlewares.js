//import jsonwebtoken
const jwt =require('jsonwebtoken')
//middleware
const jwtMiddleware=(req,res,next)=>{
    console.log("Inside jwtMiddleWare");
    //LOGIC AUTHORIZE USER
    const token=req.headers["authorization"].split(" ")[1]//BRACKET NOTATION 
    console.log(token);
    if(token){
    //verify TOKEN use verify method 
    //token verify - object-data stored in its token payload
    try{
        const jwtResponse=jwt.verify(token,process.env.JWTPSWD)
        console.log(jwtResponse);
        req.userId=jwtResponse.userId
        next()//to go to controller 
        
    }catch{
        res.status(401).json("Authorization failed....Please Login")
    }
    }else{
        res.status(404).json("Authorization failed ...Token is Missing!!!")
    }

    //logic to authorize user
}
module.exports=jwtMiddleware