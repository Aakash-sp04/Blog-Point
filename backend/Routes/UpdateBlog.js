const express = require('express')
const router = express.Router()
const postCollection = require('../models/Post')
const userCollection = require('../models/User')
const { body, validationResult } = require('express-validator')

router.post('/updateblog', [
    body('blogName').exists().withMessage('blogname require').isLength({ min: 3 }),
    body('blogCategory').exists().withMessage('blogCategory require'),
    body('blogTitle').exists().withMessage('blogTitle require').isLength({ min: 5 }),
    body('blogContent').exists().withMessage('blogContent require').isLength({ min: 50 })],

    async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            console.log(req.body);
            return res.status(400).json({ success: false, result: result.array() })
        }

        try {
            let updatedBlog = await postCollection.Post.findByIdAndUpdate(
                { _id: req.body.blogId },
                {
                    $set: {
                        name: req.body.blogName,
                        contentType: req.body.blogCategory,
                        title: req.body.blogTitle,
                        content: req.body.blogContent
                    }
                }
            )
            // console.log(updatedBlog._id);
            
            let upId = updatedBlog._id
            const loggedInUser = req.body.loggedInUserEmail
            let foundUser = await userCollection.User.updateOne(
                {email:loggedInUser, "myBlogs._id" : upId},
                {
                    $set : {
                        "myBlogs.$.name": req.body.blogName,
                        "myBlogs.$.contentType": req.body.blogCategory,
                        "myBlogs.$.title": req.body.blogTitle,
                        "myBlogs.$.content": req.body.blogContent,
                    }
                }
            )
            // console.log(foundUser);

            return res.status(200).json({ success: true })
        } catch (error) {
            console.log(error);
            res.json({ success: false })
        }
    }
)
    
module.exports = router