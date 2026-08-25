const Chat = require('../models/chat')

const create = async (req, res) => {
    try {
        const userId = req.user._id || req.user.payload?._id

        if (!userId) {
            return res.status(401).json({error: 'user id is missing'})
        }
        let chat = await Chat.findOne({
            businessOwnerId: userId,
            developerId: req.body.developerId,
        })

        if (!chat){
            chat = await Chat.create({
                businessOwnerId: req.user._id,
            developerId: req.body.developerId,
            })
        }
        // const chat = await Chat.create(chatData)
        res.status(201).json(chat)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const index = async (req, res) => {
    try {
        const userId = req.user._id || req.user.payload?._id
        const chats = await Chat.find({
            $or: [{ businessOwnerId: userId}, {developerId: userId}]
        })
        // const chat = await Chat.find({})
        res.status(200).json(chat)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const show = async (req, res) => {
    try {
        const chat = await Chat.findById(req.params.chatId)
        if (!chat) 
            return res.status(404).json({ message: 'chat not found.'})
        
        res.status(200).json(chat)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const sendMessage = async (req, res) => {
    try {
        const chat = await Chat.findById(req.params.chatId)
        if (!chat) {
            return res.status(404).json({ message: 'chat not found.'})
        }
        const userId = req.user._id || req.user.payload?._id
        const newMessage = {
            senderId: userId,
            msg: req.body.msg,
        }
        if (!chat.messages) {
            chat.messages = []
        }
        chat.messages.push(newMessage)
        await chat.save()
        res.status(201).json(chat)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = {
    create, index, show, sendMessage,
}

// CODE GRAVEYARD
// const update = async (req, res) => {
//     try {
//         const updatedChat = await Chat.findByIdAndUpdate(req.params.chatId, req.body, { new: true })
//         res.status(200).json(updatedChat)
//     } catch (error) {
//         res.status(500).json({ error: error.message })
//     }
// }

// const deleteChat = async (req, res) => {
//     try {
//         const deletedChat = await Chat.findByIdAndDelete(req.params.chatId)
//         res.status(200).json(deletedChat)
//     } catch (error) {
//         res.status(500).json({ error: error.message })
//     }
// } 