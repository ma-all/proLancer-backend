const ProjectProposal = require('../models/projectProposal')

const create = async (req, res) => {
    try {
        const userId = req.user._id || req.user.payload?._id
        req.body.businessOwner = userId
        const projectProposal = await ProjectProposal.create(req.body)
        res.status(201).json(projectProposal)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const index = async (req, res) => {
    try {
        const currentUserId = req.user._id || req.user.id
        const projectProposal = await ProjectProposal.find({
            $or: [
                { businessOwner: currentUserId},
                { developer: currentUserId},
            ]
        })
        .populate('businessOwner', 'username name email')
        .populate('developer', 'username name email')
        res.status(200).json(projectProposal)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const show = async (req, res) => {
    try {
        const projectProposal = await ProjectProposal.findById(req.params.projectProposalId)
        res.status(200).json(projectProposal)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const update = async (req, res) => {
    try {
        const updateProjectProposal = await ProjectProposal.findByIdAndUpdate(req.params.projectProposalId, req.body, { new: true })
        if (!updateProjectProposal) 
            return res.status(404).json({ error: 'project proposal not found.'})
        
        res.status(200).json(updateProjectProposal)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const updateStatus = async (req, res) => {
    try {
        const { status } = req.body
        const userId = req.user._id || req.user.payload?._id
        const validStatus = ['Pending', 'Accepted', 'Rejected', 'In Progress', 'Completed']
        if (!validStatus.includes(status)) 
            return res.status(400).json({ error: 'invalid status'})
        const updatedProjectProposal = await ProjectProposal.findByIdAndUpdate(req.params.projectProposalId, { status: status }, { new: true })
        if (!updatedProjectProposal)
            return res.status(404).json({ error: 'project proposal not found.'})
        res.status(200).json(updatedProjectProposal)
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
    create, index, show, update, deleteProjectProposal, updateStatus,
}