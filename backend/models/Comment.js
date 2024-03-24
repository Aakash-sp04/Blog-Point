const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    commenter: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
        trim: true,
        minLength: 5
    },
    date: {
        type: String,
        default: Date.now
    }
});
const Comment = mongoose.model('comment', commentSchema)
module.exports = { Comment, commentSchema }