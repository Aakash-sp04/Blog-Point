const mongoose = require('mongoose')
const postCollection = require('./Post')
const findOrCreate = require('mongoose-findorcreate');
const passportLocalMongoose = require("passport-local-mongoose");

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
    googleId : String,
    myBlogs : [postCollection.postSchema],
    likedBlogs : [postCollection.postSchema],
    dislikedBlogs : [postCollection.postSchema]
})

userSchema.plugin(passportLocalMongoose); //For Hashing & Salting password by Passport package
userSchema.plugin(findOrCreate); //Level-6 OAuth findOrCreate lougin

const User = mongoose.model('user', userSchema)
module.exports = {User, userSchema}