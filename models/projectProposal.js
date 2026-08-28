const mongoose = require('mongoose')

const projectProposalSchema = new mongoose.Schema({
    // username: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true,
    // },
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
        // enum: ['ill add it later', 'ill add it later'],
        required: true,
    },
    theme: {
        type: String,
    },
    businessOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    developer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Accepted', 'Rejected', 'In Progress', 'Completed'],
        default: 'Pending'
    },
    paymentStatus: {
        type: String, 
        enum: ['Paid', 'Unpaid'],
        default: 'Unpaid',
    },
    paymentId: {
        type: String,
    }
}, {timestamps: true})

const ProjectProposal = mongoose.model('ProjectProposal', projectProposalSchema)

module.exports = ProjectProposal