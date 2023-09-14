const Route = require('express').Router()
const auth = require('../middleware/authorization')
const Blog = require('../models/Blog')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const multer = require('multer')
const upload = multer()

Route.get('/me', auth, async (req, res) => {
    try {
        const myProfile = await User.findById(req.user._id)
        if (!myProfile) {
            res.status(404).json({ message: 'Profile not found' })
        }
        res.status(200).send(myProfile)
    }
    catch {
        res.status(500).send()
    }
})

//get user by id
Route.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            res.status(404).send({ 'message': 'User not found' })
        }
        const userObj = user.toObject()
        delete userObj.password
        delete userObj.token
        res.status(200).send(userObj)
    }
    catch (e) {
        console.log(e)
        res.status(500).send()
    }
})

//update user
Route.patch('/update', auth, async (req, res) => {
    const { firstName, lastName, specialization, role, instagram, facebook, linkedin } = req.body
    try {
        await req.user.updateOne({ firstName: firstName, lastName: lastName, specialization: specialization, role: role, instagram: instagram, facebook: facebook, linkedin: linkedin })
        if (req.body.password && req.body.password.trim().length !== 0) {
            req.user.password = await bcrypt.hash(req.body.password, 8)
        }
        await req.user.save()
        res.status(200).send({ message: 'Profile updated successfully' })
    }
    catch (e) {
        console.log(e)
        res.status(500).send()
    }
})

Route.post('/upload', auth, upload.single('avatar'), async (req, res) => {
    try {
        req.user.avatar = req.file.buffer
        await req.user.save()
        res.status(200).send({ message: 'Avatar uploaded successully' })
    }
    catch (e) {
        console.log(e)
        res.status(500).send()
    }
})

//get the user's avatar
Route.get('/avatar/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.set('Content-Type', 'image/png')
        // console.log(user.avatar)
        if (!user.avatar) {
            res.send({ message: 'No avatar' })
        }
        res.send(user.avatar)
    } catch (e) {
        console.log(e)
        res.status(500).send()
    }
})

//add or update skills
Route.put('/addskills', auth, async (req, res) => {
    try {
        req.user.skills = req.body.skills
        await req.user.save()
        res.status(200).send(req.user.skills)
    }
    catch (e) {
        res.status(500).send()
    }
})

Route.get('/skills/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.status(200).send({ skills: user.skills })
    }
    catch (e) {
        res.status(500).send()
    }
})

//delete account
Route.delete('/deleteAccount', auth, async (req, res) => {
    try {
        const user = await User.deleteOne({ _id: req.user })
        if (user) {
            const deleteBlogsByUser = await Blog.deleteMany({ owner: req.user._id })
            res.status(200).send({ message: 'Account deleted Successfully' })
        }
    }
    catch (e) {
        console.log(e)
        res.status(200).send()
    }
})

module.exports = Route