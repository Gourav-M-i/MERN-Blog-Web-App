const express = require('express')
const Route = express.Router()
const Blog = require('../models/Blog')
const auth = require('../middleware/authorization')
const multer = require('multer')

//get all blog posts
Route.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find().populate('owner', 'firstName lastName')
        res.status(200).send(blogs)
    }
    catch (e) {
        console.log(e)
        res.status(500).send()
    }
})

//get all blogs by userid
Route.get('/:id', async (req, res) => {
    try {
        const currentUserBlogs = await Blog.find({ owner: req.params.id }).populate('owner', 'firstName lastName')
        res.status(200).send(currentUserBlogs)
    } catch (e) {
        console.log(e)
        res.status(500).send()
    }
})

//get blog by id
Route.get('/blog/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate('owner', 'firstName lastName')
        res.status(200).send(blog)
    }
    catch (e) {
        console.log(e)
        res.status(500).send()
    }
})


// post a new blog
const upload = multer()
Route.post('/newblog', auth, async (req, res) => {
    try {
        const newBlog = new Blog({
            title: req.body.title,
            description: req.body.description,
            picture: req.body.picture,
            link: req.body.link,
            owner: req.user._id
        })
        await newBlog.save()
        res.status(200).send({ message: 'Blog posted successfully' })
    }
    catch (e) {
        console.log(e)
        res.status(500).send()
    }
})

//get blog post image by blogId
Route.get('/picture/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id)
        res.set('Content-Type', 'image/jpeg')
        res.send(blog.picture)
    }
    catch (e) {
        res.status(500).send()
    }
})

//delete a blog post
Route.delete('/:id', auth, async (req, res) => {
    try {
        const deletd = await Blog.findByIdAndDelete(req.params.id)
        if (!deletd) {
            res.status(404).send({ message: 'Failed to deleted the blog' })
        }
        res.status(200).send({ message: 'Blog deleted successfully' })
    }
    catch (e) {
        console.log(e)
        res.status(500).send()
    }
})

//update a blog post
Route.patch('/edit/:id', auth, async (req, res) => {
    const updatedBlog = { ...req.body, owner: req.user._id }
    try {
        const updated = await Blog.findByIdAndUpdate(req.params.id, updatedBlog)
        console.log(updated)
        if (!updated) {
            res.status(404).send('Failed to update the blog')
        }
        res.status(200).send({ messgae: 'Blog updated successfully' })
    } catch (e) {
        // console.log(e)
        res.status(500).send()
    }

})



module.exports = Route