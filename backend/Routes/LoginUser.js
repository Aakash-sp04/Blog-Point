require('dotenv').config(); //At the top only to write
const express = require('express')
const router = express.Router()
const userCollection = require('../models/User')
const { body, validationResult } = require('express-validator')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const secretKey = process.env.JWT_SECRET;

router.post('/loginuser', [
    body('email').isEmail(),
    body('password', 'Incorrect Password').isLength({ min: 6 })],
    async (req, res) => {

        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ result: result.array() })
        }

        let email = req.body.email
        try {
            let userData = await userCollection.User.findOne({email})
            if (!userData) {
                return res.status(400).json({ result: "User with E-mail not exist !" });
            }

            const pwdCmp = await bcrypt.compare(req.body.password, userData.password)
            if (!pwdCmp) {
                return res.status(400).json({ result: "Incorrect Password !" });
            }

            // JWTs are commonly used in token-based authentication systems. When a user logs in, 
            // a JWT is issued and sent to the client. The client then includes the JWT in the headers 
            // of subsequent requests to access protected resources on the server. The server verifies the JWT to ensure 
            // that the client has the necessary permissions. JWT is used for stateless authentication mechanisms for users 
            // and providers, this means maintaining session is on the client-side instead of storing sessions on the server. 
            const payload = {
                user: {
                    //Here, we are taking id of user from DB
                    id : userData.id
                }
            };
            const options = {
                expiresIn: '1h' // Token expiration time
            };
            const token = jwt.sign(payload, secretKey, options);
            
            return res.json({success : true, authToken : token})
        } catch (error) {
            console.log(error);
            res.json({ success: false })
        }
    })

module.exports = router;
