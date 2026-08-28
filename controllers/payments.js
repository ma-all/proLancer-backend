const Stripe = require('stripe')
const stripe = Stripe(process.env.STRIPE_SECRET_KEY)
const ProjectProposal = require('../models/projectProposal')

const create = async (req, res) => {
    try {
        const { projectProposalId } = req.body
        const proposal = await ProjectProposal.findById(projectProposalId)

        if (!proposal) {
            return res.status(404).json({ error: 'proposal not found'})
        }

        if (proposal.status !== 'Accepted') {
            return res.status(400).json({ error: 'payment is not allowed for unaccepted project proposals.'})
        }

        const ownerId = (proposal.businessOwner?._id || proposal.businessOwner).toString()

        const currentUserId = (req.user?._id || req.user).toString()

        if (ownerId !== currentUserId) {
            return res.status(403).json({ error: 'You cannot pay for this project proposal'})
        }

        const payment = await stripe.paymentIntents.create({
            amount: proposal.budget * 100,
            currency: 'usd',
            metadata: {
                proposalId: proposal._id.toString(),
            }
        })
        res.json({ clientSecret: payment.client_secret })
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
}

const confirm = async (req, res) => {
    try {
        const { projectProposalId, paymentId } = req.body
        const updateStatus = await ProjectProposal.findByIdAndUpdate( projectProposalId, { status: 'In Progress', paymentStatus: 'Paid', paymentId: paymentId }, { new: true })
        res.json(updateStatus)
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
}

module.exports = {
    create, confirm,
}