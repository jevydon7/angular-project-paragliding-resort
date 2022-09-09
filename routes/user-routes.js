let express = require('express');
let router = express.Router()
const user = require('../models/user');
const bcrypt = require('bcrypt');


router.route('/',).get((req,res)=>{
    user.find((err,data)=>{
        if(err){
            return next(err)
        }
        else{
            res.json(data)
        }
    })
})

router.route('/create').post(async(req,res)=>{
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const newUser = user.create({
            email:req.body.email,
            password: hashedPassword
        })
        res.status(200).json({
            status:'Success'
        });
    }catch(err){
        res.status(404).json({
            status:'Fail'
        })
    }
})


router.route('/find/:id').get((req,res)=> {
     user.findById(req.params.id,(err, data)=> {
        if(err){
            return next(err)
        } 
         else{res.json(data);
        } 
    
    })
})

router.route('/update/:id').put((req,res)=> {
     user.findByIdAndUpdate(req.params.id,req.body,(err, data)=> {
        if(err){
            return next(err)
        } 
         else{res.json(data);
        } 
    
    })
})

router.route('/delete/:id').delete((req,res)=> {
     user.findByIdAndDelete(req.params.id,(err, data)=> {
        if(err){
            console.log(err);
            res.status(500).json({
                message:'Event not found'
            })
        }else{
            if(data){
                res.status(200).json({
                    record:data
                })
                }else{
                    res.status(404).json({
                        status:'404',
                        message:"Data not found"
                })
            }
        } 
    })
})

module.exports = router;
