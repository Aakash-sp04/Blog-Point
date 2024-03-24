const express = require('express')
const router = express.Router()
const postCollection = require('../models/Post')
const commentCollection = require('../models/Comment')
const { body, validationResult } = require('express-validator')

router.post('/commentblog',
    body('newComment').exists().withMessage('comment require'),
    async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ result: result.array() })
        }

        try {
            let isLogin = req.body.commenter
            if (!isLogin) {
                return res.status(400).json({ success: false, msg: 'loginReq' });
            }
            // console.log(isLogin);

            const options = {
                day: "numeric",
                month: "numeric",
                year: "numeric"
            }
            let newComment = await commentCollection.Comment.create({
                commenter: req.body.commenter,
                content: req.body.newComment,
                date: new Date().toLocaleDateString("en-US", options)
            });
            // console.log(newComment);

            await postCollection.Post.updateOne({ _id: req.body.blogId }, { $push: { comments: newComment } })
            let updateBlog = await postCollection.Post.findOne({ _id: req.body.blogId })
            // console.log(updateBlog);

            return res.json({ success: true, recentAddedComment: newComment, updateBlog })
        } catch (error) {
            console.log(error);
            res.json({ success: false, msg: "emptyComment" })
        }
    })
module.exports = router