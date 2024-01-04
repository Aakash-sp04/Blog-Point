const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const userCollection = require('../models/User')
const jwt = require("jsonwebtoken")
const jwtSecret = "MyHobbyisssGuitarDrawingCoding$#"    //Random secret
const bcrypt = require("bcryptjs")
const saltRounds = 10

router.post('/resetPasswordUser/:id/:token', [
    body('password', 'Incorrect Password').isLength({ min: 3 })],
    async (req, res) => {

        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ success: false, msg: result.array() })
        }

        const {id, token} = req.params;
        const { password } = req.body;
        
        try {
            const decoded = jwt.verify(token, jwtSecret)
            if(decoded){
                const salt = await bcrypt.genSalt(saltRounds)
                const hashPassword = await bcrypt.hash(password, salt)
                
                let updateUserPass = await userCollection.User.findByIdAndUpdate({_id : id}, {password : hashPassword})
                if(updateUserPass){
                    return res.status(200).json({ success: true, msg: 'Password Updated!' })
                }else{
                    return res.status(400).json({ success: false, msg: "Password not updated!" })
                }
            }
        } catch (error) {
            res.json({success : false})
        }
    }
)
module.exports = router;
