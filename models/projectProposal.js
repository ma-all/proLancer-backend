const mongoose = require('mongoose')

const projectProposalSchema = new mongoose.Schema({
    username: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    budget: {
        type: Number,
        required: true,
    },
    features: {
        type: String,
        enum: ['ill add it later', 'ill add it later'],
    },
    theme: {
        type: String,
    }
}, {timestamps: true})

const ProjectProposal = mongoose.model('ProjectProposal', projectProposalSchema)

module.exports = ProjectProposal