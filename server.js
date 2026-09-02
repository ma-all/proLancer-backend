const dns = require("node:dns");
dns.setServers(["8.8.8.8", "1.1.1.1"])

const dotenv = require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
const http = require('http')
const { Server } = require('socket.io')

const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', //im not sure but i think i'll have to change this later for deployment
    methods: ['GET', 'POST']
  }
})

const PORT = process.env.PORT ? process.env.PORT : "3000"

const authCtrl = require('./controllers/auth')
const usersCtrl = require('./controllers/users')
const projectProposalCtrl = require('./controllers/projectProposals')
const chatCtrl = require('./controllers/chats')
const paymentCtrl = require('./controllers/payments')

const verifyToken = require('./middleware/verify-token')

mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}. 🥭`)
})

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.post('/auth/sign-up', authCtrl.signUp)
app.post('/auth/sign-in', authCtrl.signIn)
app.get('/user/developer', verifyToken, usersCtrl.indexDev)
app.get('/user/:userId', verifyToken, usersCtrl.show)
app.put('/user/:userId', verifyToken, usersCtrl.update)
app.delete('/user/:userId/github', verifyToken, usersCtrl.deleteGithubLink)
app.delete('/user/:userId/deployed', verifyToken, usersCtrl.deleteDeployedLink)
app.delete('/user/:userId/skill', verifyToken, usersCtrl.deleteSkill)
app.post('/projectProposal', verifyToken, projectProposalCtrl.create)
app.get('/projectProposal', verifyToken, projectProposalCtrl.index)
app.get('/projectProposal/:projectProposalId', verifyToken, projectProposalCtrl.show)
app.put('/projectProposal/:projectProposalId', verifyToken, projectProposalCtrl.update)
app.delete('/projectProposal/:projectProposalId', verifyToken, projectProposalCtrl.deleteProjectProposal)
app.put('/projectProposal/:projectProposalId/status', verifyToken, projectProposalCtrl.updateStatus)
app.post('/chat', verifyToken, chatCtrl.create)
app.get('/chat', verifyToken, chatCtrl.index)
app.get('/chat/:chatId', verifyToken, chatCtrl.show)
app.post('/chat/:chatId/messages', verifyToken, chatCtrl.sendMessage)
app.post('/payment/createPayment', verifyToken, paymentCtrl.create)
app.post('/payment/confirmPayment', verifyToken, paymentCtrl.confirm)

io.on('connection', (socket) => {
  console.log('Socket connected: ', socket.id)

  socket.on('join_chat', (chatId) => {
    socket.join(chatId)
    console.log(`socket ${socket.id} join ${chatId}`)
  })

  socket.on('send_message', ({ chatId, savedMessage }) => {
    socket.to(chatId).emit('chat message', savedMessage)
  })

  socket.on('disconnect', () => {
    console.log('Socket disconnected: ', socket.id)
  })
})

server.listen(PORT, () => {
  console.log(`The express app is ready on port ${PORT}! 😀`)
})


