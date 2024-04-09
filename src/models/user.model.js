const mongoose = require('mongoose');

const Usermodel = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,   
    }
},
{
    timestamps:true
})

const User = mongoose.model('User',Usermodel);
module.exports = User;