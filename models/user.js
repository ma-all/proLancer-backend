const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        required: true,
        enum: ['Business Owner', 'Developer']
    },

    businessDescription: {
        type: String,

    },
    businessCategory: {
        type: String,
        enum: ['Cafe', 'Restaurant', 'Bakery', 'Catering', 'Jewelry', 'Cosmetics', 'Clothing', 'Footware', 'Photo & Videography', 'Event Planning', 'Beauty Salon', 'Spa', 'Tech Equipment', 'Equipment & Machinery', 'Gym', 'Art Studio', 'Handmade Crafts', 'Interior Design', 'Furniture & Home Decor', 'Architecture', 'Stationary', 'Medical Clinic', 'Pharmacy', 'Dental Clinic', 'Fitness & Health', 'Other'],
        default: 'Other'
    },

    developerDescription: {
        type: String
    },

    githubUrl: [{
        type: String
    }],

    deployedLinks: [{
        type: String
    }],

    skills: [{
        type: String,
        enum: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'BootStrap', 'SCSS', 'Angular', 'Node.js', 'Python', 'Java', 'C#', 'Express.js', 'Django', 'MongoDB', 'PHP', 'PostgreSQL', 'JWT Authentication', 'WebSockets', 'GitHub', 'Firebase', 'Cloudinary', 'Stripe']
    }],

    projectProposals: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ProjectProposal'
        }
    ]

}, { timestamps: true })

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject.password
    }
})

const User = mongoose.model('User', userSchema)
module.exports = User