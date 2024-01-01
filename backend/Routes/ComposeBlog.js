const express = require('express')
const router = express.Router()
const postCollection = require('../models/Post')
const userCollection = require('../models/User')
const { body, validationResult } = require('express-validator')

router.post('/composeblog', [
    body('postName').exists().withMessage('postname require').isLength({ min: 3 }),
    body('postCategory').exists().withMessage('postCategory require'),
    body('postTitle').exists().withMessage('postTitle require').isLength({ min: 5 }),
    body('postContent').exists().withMessage('postContent require').isLength({ min: 50 })],
    async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ result: result.array() })
        }

        try {
            const options = {
                day: "numeric",
                month: "long",
                year: "numeric"
            }
            let newPost = await postCollection.Post.create({
                name: req.body.postName,
                contentType: req.body.postCategory,
                title: req.body.postTitle,
                content: req.body.postContent,
                date: new Date().toLocaleDateString("en-US", options)
            });
            // console.log(newPost);

            const loggedInUser = req.body.loggedInUserEmail
            let foundUser = await userCollection.User.findOne({email:loggedInUser})
            if (!foundUser) {
                return res.status(400).json({ result: "Blog not submitted!" });   
            }
            // console.log(foundUser);
            await userCollection.User.updateOne({email:loggedInUser}, {$push: {myBlogs:newPost}})
            
            return res.json({ success: true })
        } catch (error) {
            console.log(error);
            res.json({ success: false })
        }
})
module.exports = router