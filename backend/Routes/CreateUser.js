const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const userCollection = require('../models/User')
const bcrypt = require("bcryptjs")
const saltRounds = 10
const jwtSecret = "MyHobbyisssGuitarDrawingCoding$#"    //Random secret

router.post('/createuser', [
        body('username').isLength({ min: 3 }),
        body('email').isEmail(),
        body('password').isLength({ min: 6 })
    ], async (req, res) => {

    // After defining the validation middleware, the actual route handler 
    // checks for validation errors using validationResult(req)        
    const result = validationResult(req);
    if(!result.isEmpty()){
        return res.status(400).json({result: result.array()})
    }

    //To perform password hashing
    const salt = await bcrypt.genSalt(saltRounds)
    const hashPassword = await bcrypt.hash(req.body.password, salt)
    try {
        // When using Express Validator with req.body, you typically want to validate 
        // the data that comes in the request body (e.g., from a form submission).
        await userCollection.User.create({
            username : req.body.username,
            email : req.body.email,
            password : hashPassword
        })
        res.json({success : true})
    } catch (error) {
        console.log(error);
        res.json({success : false})
    }
})

module.exports = router;