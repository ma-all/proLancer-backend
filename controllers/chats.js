const Chat = require('../models/chat')

const create = async (req, res) => {
    try {
        const userId = req.user._id || req.user.payload?._id
        if (!userId) {
            return res.status(401).json({ error: 'user id is missing' })
        }
        const targetId = req.body.businessOwnerId || req.body.developerId || req.body.targetId
        
        const targetRole = req.body.role || req.body.developerId || req.body.targetId

        if(!targetId) {
            return res.status(400).json({error: 'target id is required'})
        }

        if (userId.toString() === targetId.toString()) {
            return res.status(400).json({ error: 'Cannot start a chat with yourself'})
        }

        let chat = await Chat.findOne({
            $or: [
                { businessOwnerId: userId, developerId: targetId },
                { businessOwnerId: targetId, developerId: userId },
            ]

        })
        if (!chat) {
            const isTargetDeveloper = targetRole === 'developer' || Boolean(req.body.developerId && req.body.developerId !== userId.toString())
            chat = await Chat.create({
                businessOwnerId: isTargetDeveloper? userId : targetId,
                developerId: isTargetDeveloper? targetId : userId,
            })
        }
        res.status(201).json(chat)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const index = async (req, res) => {
    try {
        const userId = req.user._id || req.user.payload?._id
        const chats = await Chat.find({
            $or: [{ businessOwnerId: userId }, { developerId: userId }]
        })
            .populate('businessOwnerId', 'username')
            .populate('developerId', 'username')
            .sort({ updatedAt: -1 })
        res.status(200).json(chats)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const show = async (req, res) => {
    try {
        const chat = await Chat.findById(req.params.chatId)
            .populate('businessOwnerId', 'username')
            .populate('developerId', 'username')
            .populate('messages.senderId', 'username')
        if (!chat)
            return res.status(404).json({ message: 'chat not found.' })

        res.status(200).json(chat)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const sendMessage = async (req, res) => {
    try {
        const chat = await Chat.findById(req.params.chatId)
        if (!chat) {
            return res.status(404).json({ message: 'chat not found.' })
        }
        const userId = req.user._id || req.user.payload?._id
        const newMessage = {
            senderId: userId,
            msg: req.body.msg,
        }

        chat.messages.push(newMessage)
        await chat.save()
        await chat.populate('messages.senderId', 'username')
        const savedMessage = chat.messages[chat.messages.length - 1]

        res.status(201).json(savedMessage)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = {
    show, sendMessage, index, create,
}