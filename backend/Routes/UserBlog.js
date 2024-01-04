const express = require('express')
const router = express.Router()
const userCollection = require('../models/User')

router.post('/userblog',async(req, res)=>{
    try {
        let email = req.body.userEmail
        let userByEmail = await userCollection.User.findOne({email})

        let userBlogs = await userByEmail.myBlogs
        // console.log(userBlogs);       
        if(userBlogs.length < 1){
            return res.json({success:false})
        }
        return res.json({success:true, userBlogs:userBlogs})
    } catch (error) {
        console.log(error);
        res.json({ success: false })
    }
})
module.exports = router