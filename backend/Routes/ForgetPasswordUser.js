require('dotenv').config(); //At the top only to write
const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const userCollection = require('../models/User')
const jwt = require("jsonwebtoken")
const secretKey = process.env.JWT_SECRET;
const nodemailer = require('nodemailer')

router.post('/forgetPasswordUser', [
    body('email').isEmail()],
    async (req, res) => {

        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ success: false, msg: result.array() })
        }

        const { email } = req.body;
        let userData = await userCollection.User.findOne({ email })
        if (!userData) {
            return res.status(400).json({ success: false, msg: 'User not registered!' })
        }

        //Token generation
        const payload = {
            user: {
                //Here, we are taking id of user from DB
                id: userData._id
            }
        };
        const options = {
            expiresIn: '1h' // Token expiration time
        };
        const token = jwt.sign(payload, secretKey, options);

        //Using NodeMailer to reset password
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'aakashspachchigar@gmail.com',
                pass: 'fwhfepcpuopeuzaj'
            }
        });

        var mailOptions = {
            from: 'aakashspachchigar@gmail.com',
            to: req.body.email,
            subject: 'Reset Password Link',
            text: `http://localhost:3000/reset-password/${userData._id}/${token}`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                return res.status(200).json({ success: true, msg: 'Reset link sent!' })
            }
        });
    }
)

module.exports = router;
