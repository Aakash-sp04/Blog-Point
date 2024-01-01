const express = require('express')
const router = express.Router()
const postCollection = require('../models/Post')

router.post('/blogdata',async(req, res)=>{
    try {
        let contentType = req.body.contentType
        if(contentType == 'all'){
            let posts = await postCollection.Post.find({}).sort({date:1})
            return res.json({ success: true, filterPosts : posts })        
        }
        
        let postsCount = await postCollection.Post.find({contentType}).count()
        if(!postsCount){    //If blog count is zero i.e. empty array than success false
            return res.status(400).json({success:false, result: "Blog not found!" });   
        }
        //else send array of Blog objects
        let posts = await postCollection.Post.find({contentType})
        return res.json({ success: true, filterPosts : posts })        
    } catch (error) {
        console.log(error);
        res.json({ success: false })
    }
})
module.exports = router