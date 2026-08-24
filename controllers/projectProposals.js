const ProjectProposal = require('../models/projectProposal')

const create = async (req, res) => {
    try {
        const projectProposal = await ProjectProposal.create(req.body)
        res.status(201).json(projectProposal)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = {
    create, 
}