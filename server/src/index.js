const express = require('express')
const app = express()
const port = process.env.POST || 3080
const mongoose = require('mongoose')
const cors = require('cors')
mongoose.connect('mongodb://127.0.0.1:27017/BLOGAPP')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

const BlogRoute = require('../routes/Blogs')
const UserRoute = require('../routes/Users')
const authRoute = require('../routes/Auth')

app.use('/blogs', BlogRoute)
app.use('/users', UserRoute)
app.use('/auth', authRoute)

app.listen(port, (req, res) => {
    console.log("Server running on port ", port)
});