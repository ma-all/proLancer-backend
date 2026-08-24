const dotenv = require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')

const PORT = process.env.PORT ? process.env.PORT : "3000"

const authCtrl = require('./controllers/auth')
const usersCtrl = require('./controllers/users')


const verifyToken = require('./middleware/verify-token')



mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}. 🥭`)
})

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// Routes go here
// app.get('/auth/sign-token', authCtrl.signToken)
// app.get('/auth/verify-token', authCtrl.verifyToken)
app.post('/auth/sign-up', authCtrl.signUp)
app.post('/auth/sign-in', authCtrl.signIn)

// app.get('/users', verifyToken, usersCtrl.index)

//user router
app.post('/users', verifyToken, usersCtrl.create)
app.get('/users/:id', verifyToken, usersCtrl.show)
app.put('/users/:id', verifyToken, usersCtrl.update)
app.delete('/users/:id', verifyToken, usersCtrl.deletee)

app.listen(PORT, () => {
  console.log(`The express app is ready on port ${PORT}! 😀`)
})


