const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('../models/user')

const signUp = async (req, res) => {
    try {
        const userInDatabase = await User.findOne({
            username: req.body.username
        })

        if (userInDatabase) {
            return res.status(409).json({ err: 'Username already taken.' })
        }

        const emailInDatabase = await User.findOne({
            email: req.body.email
        })
        if (emailInDatabase) {
            return res.status(409).json({ err: 'Email already exists.' })
        }

        const hashedPassword = bcrypt.hashSync(req.body.password, 10)

        const userData = {
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email,
            role: req.body.role,
        }

        const user = await User.create(userData)

        const payload = { username: user.username, _id: user._id, role: user.role }

        const token = jwt.sign({payload}, process.env.JWT_SECRET)

        res.status(201).json({ token, user })
    } catch(err) {
        res.status(400).json({ err: err.message })
    }
}

const signIn = async (req, res) => {
    try {
        const userInDatabase = await User.findOne({
            username: req.body.username
        })

        if (!userInDatabase) {
            return res.status(404).json({ err: 'User does not exist.' })
        }
        const validPassword = bcrypt.compareSync(req.body.password, userInDatabase.password)

        if (!validPassword) {
            return res.status(401).json({ err: 'Login failed. Please try again.' })
        }

        const payload = { username: userInDatabase.username, _id: userInDatabase._id, role: userInDatabase.role }
        const token = jwt.sign({ payload }, process.env.JWT_SECRET)

        res.status(200).json({ token, user: userInDatabase })

    } catch (err) {
        res.status(500).json({ err: err.message })
    }
}

module.exports = {
    signUp,
    signIn,
}