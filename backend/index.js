require('dotenv').config(); //At the top only to write
const express = require('express')
const connectDb = require('./db')
const app = express()
const port = process.env.PORT || 8000

//For Submitting data to backend 
//required middleware to write always
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})
//express.json() -> inbuilt in express to recognize the incoming req obj.
//as JSON obj. This method is basically called as Middleware.
app.use(express.json())

//call for DB connectivity
connectDb()

app.use('/api', require('./Routes/CreateUser'))
app.use('/api', require('./Routes/LoginUser'))
app.use('/api', require('./Routes/ComposeBlog'))
app.use('/api', require('./Routes/UpdateBlog'))
app.use('/api', require('./Routes/DeleteBlog'))
app.use('/api', require('./Routes/DisplayBlog'))
app.use('/api', require('./Routes/SpecificDisplayBlog'))
app.use('/api', require('./Routes/LikeDislikeBlog'))
app.use('/api', require('./Routes/CommetBlog'))
app.use('/api', require('./Routes/UserBlog'))
app.use('/api', require('./Routes/ContactPage'))
app.use('/api', require('./Routes/ForgetPasswordUser'))
app.use('/api', require('./Routes/ResetPasswordUser'))

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.listen(port, () => {
    console.log(`Listening to port ${port}`);
})

