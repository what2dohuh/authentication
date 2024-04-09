const express = require('express')
const cros= require('cors')
const router= express.Router()

const {get,Register}= require('../controller/auth.controller')

router.use(cros({
    Credential:true,
    origin:['http://localhost:3000']
}))


router.get('/',get)
router.post('/register',Register)


module.exports = router