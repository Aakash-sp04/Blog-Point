const mongoose = require('mongoose')
const commentCollection = require('./Comment')

const postSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: 3
    },
    contentType: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true,
        minLength: 10
    },
    content: {
        type: String,
        required: true,
        trim: true,
        minLength: 50
    },
    date: {
        type: String,
        default: Date.now
    },
    likes: [{
        type: String,
        ref: "User"
    }],
    comments: [commentCollection.commentSchema] // Array of commentSchema objects
})
const Post = mongoose.model('post', postSchema)
module.exports = { Post, postSchema }