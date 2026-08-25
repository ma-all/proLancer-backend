const dns = require("node:dns");
dns.setServers(["8.8.8.8", "1.1.1.1"])

const dotenv = require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')

const PORT = process.env.PORT ? process.env.PORT : "3000"

const authCtrl = require('./controllers/auth')
const usersCtrl = require('./controllers/users')
const projectProposalCtrl = require('./controllers/projectProposals')
const chatCtrl = require('./controllers/chats')

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
// app.post('/user', verifyToken, usersCtrl.create)
app.get('/user/:userId', verifyToken, usersCtrl.show)
app.put('/user/:userId', verifyToken, usersCtrl.update)
app.delete('/user/:userId/github', verifyToken, usersCtrl.deleteGithubLink)
app.delete('/user/:userId/deployed', verifyToken, usersCtrl.deleteDeployedLink)
app.delete('/user/:userId/skill', verifyToken, usersCtrl.deleteSkill)
// app.delete('/user/:userId', verifyToken, usersCtrl.deletee)

//project proposal routes
app.post('/projectProposal', verifyToken, projectProposalCtrl.create)
app.get('/projectProposal', verifyToken, projectProposalCtrl.index)
app.get('/projectProposal/:projectProposalId', verifyToken, projectProposalCtrl.show)
app.put('/projectProposal/:projectProposalId', verifyToken, projectProposalCtrl.update)
app.delete('/projectProposal/:projectProposalId', verifyToken, projectProposalCtrl.deleteProjectProposal)
app.put('/projectProposal/:projectProposalId/status', verifyToken, projectProposalCtrl.updateStatus)

//chat routes
app.post('/chat', verifyToken, chatCtrl.create)
app.get('/chat', verifyToken, chatCtrl.index)
app.get('/chat/:chatId', verifyToken, chatCtrl.show)
// app.put('/chat/:chatId', verifyToken, chatCtrl.update)
// app.delete('/chat/:chatId', verifyToken, chatCtrl.deleteChat)
app.post('/chat/:chatId/messages', verifyToken, chatCtrl.sendMessage)

app.listen(PORT, () => {
  console.log(`The express app is ready on port ${PORT}! 😀`)
})


