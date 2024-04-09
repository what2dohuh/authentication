const userModel = require('../models/user.model');
const {hashedPassword,comparePassword}=require('../helper/auth');
const jwt = require('jsonwebtoken');
const get= (req,res)=>{
    res.send('Hello World')
}


//This is for registering a new user

const Register= async (req,res)=>{
    
   const {email,name,password} = req.body;
   try {
    
         if(!email){
          res.status(400).send('email is required')
         }
         if(!name){
          res.status(400).send('name is required')
         }
         if(!password || password<6){
          res.status(400).send('passwords is required and more than 6 characters ')
         }
         const hashedPass = await hashedPassword(password);
         
         const user = await userModel.create({name,email,password:hashedPass})
      
         return res.status(200).json(user)
   } catch (error) {
    res.status(500).send(error.message)
   }
}

//This is for login the user
const login = async (req,res)=>{
    const {email,password} = req.body;
    try {
        if(!email){
            res.status(400).send('email is required')
        }
        if(!password){
            res.status(400).send('password is required')
        }
        const user = await userModel.findOne({email})

        if(!user){
            res.status(400).send('email is not registered')
        }
        const isMatch = await comparePassword(password,user.password)
        if(!isMatch){
            res.status(400).send('password is incorrect')
        }else{
            jwt.sign({email:user.email,id:user._id,name:user.name},process.env.JWT_SEC,{},(err,token)=>{
                if(err){
                    res.status(500).send(err.message)
                }else{
                    res.cookie('token',token).json(user)
                }
            })
          
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

//Thia is to get the profile if token available

const getProfile = (req, res) => {
    const token = req.cookies.token;
    if(token){
        jwt.verify(token,process.env.JWT_SEC,(err,user)=>{
            if(err){
                res.status(401).send('unauthorized')
            }else{
                res.status(200).json(user)
            }
        })
    }
    else{
        res.json(null)
    }
}

module.exports ={get,Register,login,getProfile}