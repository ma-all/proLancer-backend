const User = require('../models/user')

// const index = async (req, res) => {
//    const users = await User.find()
//    res.json(users)
// }


//create a new user
const create = async (req, res)=>{
    try {
        const saveUser = await User.create(req.body)
        res.status(201).json(saveUser)
    } catch (error) {
        res.status(400).json({message : error.message})
        
    }
}

//get all user
// const index = async(req,res)=>{
//     try {
//         const users = await User.find()
//         res.status(200).json(users)
        
//     } catch (error) {
//         res.status(500).json({message: error.message})
        
//     }
// }

//singel user
const show = async (req, res)=>{
    try {
        const user = await User.findById(req.params.id)
        if(!user)
            return res.status(404).json({message: 'user not found'})
        res.status(200).json(user)
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }

}


//update user

const update = async(req, res)=>{
    try {
        const updateUser = await User.findByIdAndUpdate(req.params.id , {
            $set:req.body
        },
    )

    if(!updateUser)
        return res.status(404).json({message:'user not found'})
    res.status(200).json(updateUser)
        
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}





const deletee = async(req,res)=>{
    try {
        const deleteProject = await User.findByIdAndDelete(req.params.id)
        if(!deleteProject) return res.status(404).json({message: 'User not found'})
            res.status(200).json({message:'project deleted successfuly'})
        
    } catch (error) {
        res.status(500).json({message: error.message})
        
    }
}

module.exports = {
    create,  show, update, deletee
 }


