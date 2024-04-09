const express = require('express')
const app = express()
const route = require('./src/route/auth.route')
const port = 8000
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()


app.use(express.json())
app.use(express.urlencoded({ extended: false }))

mongoose.connect(process.env.MONGO_URl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(app.listen(port, () => {
    console.log(`listening on port ${port} `)
  })).catch((err)=> console.log(err))



app.use('/',route)




