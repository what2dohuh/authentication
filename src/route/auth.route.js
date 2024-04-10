const express = require('express')
const cros= require('cors')
const router= express.Router()
const upload = require('../helper/multer')

const {get,Register,login,getProfile,logout}= require('../controller/auth.controller')

router.use(cros({
    Credential:true,
    origin:['http://localhost:3000']
}))

//These are the routes for the end points
router.get('/',get)
router.post('/register',upload.single('profile'),Register)
router.post('/login',login)
router.get('/profile',getProfile)
router.get('/logout',logout)
module.exports = router