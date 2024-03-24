require('dotenv').config(); //At the top only to write
const mongoose = require('mongoose')
const mongoURI = process.env.MONGODB_URI

const connectDb = async ()=>{
    try {
        await mongoose.connect(mongoURI);
        console.log('connected');
    } catch (error) {
        console.log(error);
    }
}
module.exports = connectDb