const userModel = require('../models/user.model');
const { use } = require('../route/auth.route');

const get= (req,res)=>{
    res.send('Hello World')
}

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
      
         const user = await userModel.create({name,email,password})
      
         return res.status(200).json(user)
   } catch (error) {
    res.status(500).send(error.message)
   }
}

module.exports ={get,Register}