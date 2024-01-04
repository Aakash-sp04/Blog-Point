const express = require('express')
const router = express.Router()
const postCollection = require('../models/Post')

router.post('/likeblog', async (req, res) => {
    try {
        let isLogin = req.body.localStrInfo
        if (!isLogin) {
            return res.status(400).json({ success: false, msg: 'login required' });
        }

        let updateBlog = await postCollection.Post.findByIdAndUpdate(req.body.blogId, {
            $push: {
                likes: isLogin
            }
        }, {
            new: true
        })

        // console.log(updateBlog);
        if(!updateBlog){
            return res.status(400).json({ success: false, msg: 'error on like' });
        }else{
            return res.status(200).json({ success: true, msg: 'blog liked', updateBlog : updateBlog })
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false })
    }
})

router.post('/unlikeblog', async (req, res) => {
    try {
        let isLogin = req.body.localStrInfo
        if (!isLogin) {
            return res.status(400).json({ success: false, msg: 'login required' });
        }

        let updateBlog = await postCollection.Post.findByIdAndUpdate(req.body.blogId, {
            $pull: {
                likes: isLogin
            }
        }, {
            new: true
        })

        // console.log(updateBlog);
        if(!updateBlog){
            return res.status(400).json({ success: false, msg: 'error on unlike' });
        }else{
            return res.status(200).json({ success: true, msg: 'blog unliked', updateBlog : updateBlog })
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false })
    }
})

module.exports = router
