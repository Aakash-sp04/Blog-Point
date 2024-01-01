const mongoose = require('mongoose')
const mongoURI = "mongodb://127.0.0.1:27017/blogPointDB"

const connectDb = async ()=>{
    try {
        await mongoose.connect(mongoURI);
        console.log('connected');
    } catch (error) {
        console.log(error);
    }
}
module.exports = connectDb