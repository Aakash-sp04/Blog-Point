const express = require('express')
const router = express.Router()
const postCollection = require('../models/Post')
const userCollection = require('../models/User')

router.post('/deleteblog',async (req, res) => {
        try {
            await postCollection.Post.findByIdAndDelete({ _id: req.body.blogId })
            
            const loggedInUser = req.body.localStrInfo
            // console.log(loggedInUser);
            let result = await userCollection.User.updateOne(
                {email:loggedInUser},
                {
                    $pull : {
                        myBlogs : {
                            _id : req.body.blogId
                        }   
                    }
                }
            )
            // console.log(result);
            
            return res.status(200).json({ success: true })
        } catch (error) {
            console.log(error);
            res.json({ success: false })
        }
})
module.exports = router