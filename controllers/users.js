const User = require('../models/user')

//create a new user
// const create = async (req, res)=>{
//     try {
//         const saveUser = await User.create(req.body)
//         res.status(201).json(saveUser)
//     } catch (error) {
//         res.status(500).json({message : error.message})
        
//     }
// }

//user profile
const show = async (req, res)=>{
    try {
        const user = await User.findById(req.params.userId)
        if(!user)
            return res.status(404).json({message: 'user not found'})
        res.status(200).json(user)
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }

}

//update prf
const update = async(req, res)=>{
    try {
        const updateUser = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true, runValidators: true })

    if(!updateUser)
        return res.status(404).json({message:'user not found'})
    res.status(200).json(updateUser)
        
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const deleteGithubLink = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId)
        if (!user)
            return res.status(404).json({message:'user not found'})

        user.githubUrl = user.githubUrl.filter(link => 
            link !== req.body.githubUrl
        )
        await user.save()
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const deleteDeployedLink = async (req, res) =>{
    try {
        const user = await User.findById(req.params.userId)
        if (!user)
            return res.status(404).json({message:'user not found'})

        if (req.body.link) {
            user.deployedLinks = user.deployedLinks.filter(link => 
                link !== req.body.link
            )
        } else {
            user.deployedLinks = []
        }

        await user.save()
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const deleteSkill = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.userId, {$pull: { skills: req.body.skill}}, { new: true })
        if (!user)
            return res.status(404).json({message:'user not found'})

        // user.skills = user.skills.filter(skill => 
        //     skill !== req.body.skill)
        // await user.save()
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const indexDev = async (req, res) => {
    try {
        const developers = await User.find({ role: 'Developer' })
        res.status(200).json(developers)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

module.exports = {
    show, update, deleteGithubLink, deleteDeployedLink, deleteSkill, indexDev,
 }

//CODE GRAVEYARD
//get all user
// const index = async(req,res)=>{
//     try {
//         const users = await User.find()
//         res.status(200).json(users)
        
//     } catch (error) {
//         res.status(500).json({message: error.message})
        
//     }
// }

// const index = async (req, res) => {
//    const users = await User.find()
//    res.json(users)
// }

// const deletee = async(req,res)=>{
//     try {
//         const deleteProject = await User.findByIdAndDelete(req.params.id)
//         if(!deleteProject) return res.status(404).json({message: 'User not found'})
//             res.status(200).json({message:'project deleted successfuly'})
        
//     } catch (error) {
//         res.status(500).json({message: error.message})
        
//     }
// }