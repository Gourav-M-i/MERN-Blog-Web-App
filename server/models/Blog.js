const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    title:
    {
        type: String,
        required: true
    },
    description:
    {
        type: String,
        required: true
    },
    picture:
    {
        type: String,
        required: true
    },
    link:
    {
        type: String
    },
    owner:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timeStamp: true })

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog