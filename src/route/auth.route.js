const express = require('express')
const cros= require('cors')
const router= express.Router()

const {get,Register,login,getProfile}= require('../controller/auth.controller')

router.use(cros({
    Credential:true,
    origin:['http://localhost:3000']
}))

//These are the routes for the end points
router.get('/',get)
router.post('/register',Register)
router.post('/login',login)
router.get('/profile',getProfile)

module.exports = router