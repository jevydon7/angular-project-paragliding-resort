let express = require('express');
let router = express.Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const jwtKey = "my_secret_key"
const jwtExpirySeconds = 300


router.route('/').post((req,res)=>{
    const email = req.body?.email   
    const password = req.body?.password
    if(email && password){
        User.findOne({email: email}).then(userExist =>{
            if(userExist && userExist._id){
                bcrypt.compare(password, userExist?.password, function(err, response){
                    if(!err && response){
                        const token = jwt.sign({userID: userExist._id, email}, jwtKey,{
                            algorithm:"HS256",
                            expiresIn:jwtExpirySeconds
                        });
                        res.json({token:token});
                    }else{
                        res.json({status: 'warn', loginUser:false, data:'Please enter valid password'})
                    }
                })
            }else{
                res.json({status:'warn', loginUser: false.valueOf, data:'Please enter valid email'})
            }
        },(error)=>{
            res.json({status:'error', data:error})
        })
    }
})

module.exports = router;