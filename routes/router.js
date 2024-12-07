const express= require('express')
const userController=require('../controllers/userController')
const jwtMiddleware = require('../middleware/jwtMiddlewares')
const router=new express.Router()

//register-post
router.post('/register',userController.registerController)
//login-post
router.post('/login',userController.loginController)

//list all users
router.get('/users',jwtMiddleware,userController.listUsersController)
//list user by id
router.get('/users/:id',jwtMiddleware,userController.viewUserDetailsController)




module.exports=router