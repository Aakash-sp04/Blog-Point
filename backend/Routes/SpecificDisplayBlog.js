const express = require('express')
const router = express.Router()
const postCollection = require('../models/Post')
const userCollection = require('../models/User')

router.post('/specificBlog', async(req, res) =>{
    try {
        let _id = req.body.blogId
        let isLogin = req.body.localStrInfo
        let likeState = false
        let postById = await postCollection.Post.findById({_id}) 
        if(!postById){
            return res.status(400).json({success:false, result: "Blog not found!" });   
        }


        if(isLogin){
            let userByEmail = await userCollection.User.findOne({email : isLogin})

            let res = await userByEmail.likedBlogs.find(i => i._id == _id)
            if(res){
                likeState = true;
            }
        }
        // console.log(postById);   
        // console.log(likeState);

        return res.json({success:true, blogIdData: postById, likeState:likeState});   
    } catch (error) {
        console.log(error);
        res.json({success : false})
    }
})
module.exports = router