const Route = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
Route.post('/signup', async (req, res) => {
    try {
        const password = await bcrypt.hash(req.body.password, 8)
        const user = new User({
            firstName: req.body.fname,
            lastName: req.body.lname,
            email: req.body.email,
            password: password
        })
        const token = jwt.sign({ id: user._id }, 'helloworld')
        user.token = token
        await user.save()
        res.status(200).json({ token: user.token, id: user._id })
    }
    catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})

Route.post('/login', async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    try {
        const user = await User.findOne({ email: email })
        if (!user) {
            res.status(401).send({ message: 'Invalid email' })
        }
        const validatePassword = await bcrypt.compare(password, user.password)
        if (!validatePassword) {
            res.status(401).send({ message: 'Invalid password' })
        }
        const token = jwt.sign({ id: user._id }, 'helloworld')
        user.token = token
        await user.save()
        res.status(200).json({ token: user.token, id: user._id })
    }
    catch (e) {
        console.log(e)
        res.status(500).send()
    }

})

module.exports = Route