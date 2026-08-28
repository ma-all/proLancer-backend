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

        if(proposal.businessOwner.toString() !== req.user._id) {
            return res.status(403).json({ error: 'you are not authorised to pay for this project proposal'})
        }

        const fullAmount = Math.round(proposal.budget * 100)
        const payment = await stripe.paymentIntents.create({
            amount: fullAmount,
            currency: 'usd',
            metadata: {
                projectProposalId: proposal._id.toString(),
                businessOwnerId: req.user._id
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
        const updateStatus = await ProjectProposal.findByIdAndUpdate( projectProposalId, { status: 'In Progress', paymentStatus: 'Paid', paymentId: paymentIntentId }, { new: true })
        res.json(updateStatus)
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
}

module.exports = {
    create, confirm,
}