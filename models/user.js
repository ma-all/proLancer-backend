const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
     email:{
        type:String,
        required:true,
        unique:true,
    },
    role:{
        type:String,
        required:true,
        enum: ['Business Owner', 'Developer']
    },


    businessDescription: {
        type: String,
    
    },
    businessCategory:{
        type:String,
        enum: ['Video player', 'Cards', 'Reviews', 'Faq', 'Contact', 'Image']

    },

    
    developerDescription:{
        type:String
    },

    githubUrl: [{
        type:String
    }],

    deployedLinks: [{
        type:String
    }],

    skills: [{
        type:String,
        enum:['Full stack', 'Front end', 'Back end', 'Sql','Java','C++']
    }],

    projectProposals: [
       { type: mongoose.Schema.Types.ObjectId,
        ref: 'ProjectProposal'}
    ]

}, {timestamps: true})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject.password
    }
})

const User = mongoose.model('User', userSchema)
module.exports = User