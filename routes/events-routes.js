let express = require('express');
let router = express.Router()
const events = require('../models/events')


router.route('/').get((req,res)=>{
    events.find((err,data)=>{
        if(err){
            return next(err)
        }
        else{
            res.json(data)
        }
    })
})

router.route('/create').post((req,res)=>{
    events.create(req.body,(err,data)=>{
      if (err){
         return next(err)
        }else{
             res.json(data)
        }
})
})


router.route('/find/:id').get((req,res)=> {
     events.findById(req.params.id,(err, data)=> {
        if(err){
            return next(err)
        } 
         else{res.json(data);
        } 
    
    })
})

router.route('/update/:id').put((req,res)=> {
     events.findByIdAndUpdate(req.params.id,req.body,(err, data)=> {
        if(err){
            return next(err)
        } 
         else{res.json(data);
        } 
    
    })
})

router.route('/delete/:id').delete((req,res)=> {
     events.findByIdAndDelete(req.params.id,(err, data)=> {
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
