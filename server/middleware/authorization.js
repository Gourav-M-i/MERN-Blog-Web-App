const jwt = require('jsonwebtoken')
const User = require('../models/User')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const verify = jwt.verify(token, 'helloworld')
        const user = await User.findById(verify.id)
        if (!user) {
            throw new Error()
        }
        req.user = user
        console.log(req.user)
        next()
    }
    catch (e) {
        res.status(401).send({ message: 'Login or signup' })
    }
}

module.exports = auth