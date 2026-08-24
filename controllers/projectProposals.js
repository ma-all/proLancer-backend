const ProjectProposal = require('../models/projectProposal')

const create = async (req, res) => {
    try {
        const projectProposal = await ProjectProposal.create(req.body)
        res.status(201).json(projectProposal)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const index = async (req, res) => {
    try {
        const projectProposal = await ProjectProposal.find({})
        res.status(200).json(projectProposal)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = {
    create, index
}