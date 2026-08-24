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

const show = async (req, res) => {
    try {
        const projectProposal = await projectProposal.findById(req.params.projectProposalId)
        res.status(200).json(projectProposal)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const update = async (req, res) => {
    try {
        const updateProjectProposal = await ProjectProposal.findByIdAndUpdate(req.params.projectProposal, req.body, { new: true })
        res.status(200).json(updateProjectProposal)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const deleteProjectProposal = async (req, res) => {
    try {
        const deletedProjectProposal = await ProjectProposal.findByIdAndDelete(req.params.projectProposalId)
        res.status(200).json(deletedProjectProposal)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = {
    create, index, show, update, deleteProjectProposal,
}