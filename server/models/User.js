const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        firstName:
        {
            type: String,
            required: true
        },
        lastName:
        {
            type: String,
            required: true
        },
        email:
        {
            type: String,
            unique: true,
            required: true
        },
        password:
        {
            type: String,
            required: true
        },
        token:
        {
            type: String,
        },
        specialization:
        {
            type: String
        },
        avatar:
        {
            type: Buffer
        },
        instagram:
        {
            type: String,
        },
        facebook:
        {
            type: String
        },
        linkedin:
        {
            type: String
        },
        role:
        {
            type: String
        },
        skills:
            [
                {
                    skill: {
                        type: String,
                    },
                    rating: {
                        type: Number,
                        min: 0,
                        max: 100
                    }
                }
            ]
    }, { timeStamp: true }
)

const User = mongoose.model('User', userSchema)

module.exports = User