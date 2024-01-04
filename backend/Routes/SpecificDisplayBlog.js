const express = require('express')
const router = express.Router()
const postCollection = require('../models/Post')

router.post('/specificBlog', async(req, res) =>{
    try {
        let _id = req.body.blogId
        let postById = await postCollection.Post.findById({_id}) 
        if(!postById){
            return res.status(400).json({success:false, result: "Blog not found!" });   
        }

        return res.json({success:true, blogIdData: postById});   
    } catch (error) {
        console.log(error);
        res.json({success : false})
    }
})
module.exports = router