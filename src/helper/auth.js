const bcrypt = require('bcrypt')



//This is to hashed the password for the user
const hashedPassword = (password)=>{
    return new Promise((resolve, reject)=>{
        bcrypt.genSalt(11,(err,salt)=>{
            if (err){
                reject(err)
            }
            bcrypt.hash(password,salt,(err,hash)=>{
                if (err){
                    reject(err)
                }
                resolve(hash)
            })
        })
    })
}

//This is compared to the password
const comparePassword = (password,hash)=>{
    return new Promise((resolve, reject)=>{
        bcrypt.compare(password,hash,(err,result)=>{
            if (err){
                reject(err)
            }
            resolve(result)
        })
    })
}

module.exports = {
    hashedPassword,
    comparePassword
}