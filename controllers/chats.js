const Chat = require('../models/chat')

const create = async (req, res) => {
    try {
        const chat = await Chat.create(req.body)
        res.status(201).json(chat)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const index = async (req, res) => {
    try {
        const chat = await Chat.find({})
        res.status(200).json(chat)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const show = async (req, res) => {
    try {
        const chat = await Chat.findById(req.params.chatId)
        res.status(200).json(chat)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = {
    create, index, show,
}