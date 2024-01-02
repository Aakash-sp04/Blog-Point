require('dotenv').config(); //At the top only to write
const express = require('express')
const router = express.Router()
const request = require('request')
const { body, validationResult } = require('express-validator')

router.post('/contactPage', [
    body('firstname').exists().withMessage('firstname require').isLength({ min: 3 }),
    body('lastname').exists().withMessage('lastname require').isLength({ min: 3 }),
    body('email').isEmail()],
    async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ success: false, msg: result.array() })
        }

        try {
            const {firstname, lastname, email} = req.body

            const data = {
                members: [
                    {
                        email_address: email,
                        status: "subscribed",
                        merge_fields: {
                            FNAME: firstname,
                            LNAME: lastname
                        }
                    }
                ]
            }

            const jsonData = JSON.stringify(data);  //Because .js take data as single string format
                                                    //that we are going to send (POST) onto the server
            const options = {
                url: "https://us10.api.mailchimp.com/3.0/lists/" + process.env.MAILCHAMP_LIST_ID,
                method: "POST",
                headers: {
                    Authorization: "auth " + process.env.MAILCHAMP_API_KEY,  //anyString APIkey
                },
                body: jsonData
            }

            request(options, (err, response, body)=> {
                if(err){
                    return res.status(400).json({ success: false, msg: "error occur:::" });
                }else{
                    if(response.statusCode === 200){
                        return res.status(200).json({ success: true, msg : "statusCode:200" });
                    }else{
                        return res.status(400).json({ success: false, msg: "statusCode:400"  });
                    }
                }
            })
        } catch (error) {
            console.log(error);
            res.json({ success: false })
        }
    }
)
module.exports = router