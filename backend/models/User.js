const mongoose = require('mongoose')
const postCollection = require('./Post')

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true,
        trim : true,
        minLength : 3
    },
    email : {
        type : String,
        unique : true,
        trim : true
    },
    password : {
        type : String,
        trim : true,
        minLength : 6
    },
    myBlogs : [postCollection.postSchema]
})

const User = mongoose.model('user', userSchema)
module.exports = {User, userSchema}