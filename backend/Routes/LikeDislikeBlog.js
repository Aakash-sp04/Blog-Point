const express = require('express')
const router = express.Router()
const postCollection = require('../models/Post')
const userCollection = require('../models/User')

router.post('/likeblog', async (req, res) => {
    try {
        let isLogin = req.body.localStrInfo
        if (!isLogin) {
            return res.status(400).json({ msg: true });
        }
        let flag = 1;   //inc by 1
        let likeSt = req.body.likeState;
        if(!likeSt){
            flag = -1
        }
        console.log(likeSt);
        console.log(flag);

        let _id = req.body.blogId
        let updateBlog = await postCollection.Post.findByIdAndUpdate({ _id }, {
            $inc: {
                like: flag
            }
        })
        console.log(updateBlog);
        if (!updateBlog) {
            return res.status(400).json({ success: false, result: "Like not updated!" });
        }

        if(flag == 1){
            await userCollection.User.updateOne({email:isLogin}, {$push: {likedBlogs:updateBlog}})
        }else if(flag == -1){
            await userCollection.User.updateOne({email:isLogin}, {$pull: {likedBlogs:{_id : updateBlog._id}}})
        }
        console.log(updateBlog.like);
        return res.json({ success: true, blogIdData: updateBlog });
    } catch (error) {
        console.log(error);
        res.json({ success: false })
    }
})
module.exports = router
