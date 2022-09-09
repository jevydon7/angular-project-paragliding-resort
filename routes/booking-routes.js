let express = require('express');
let router = express.Router()
const bookService = require('../models/bookService')

router.route('/',).get((req,res)=>{
    bookService.find((err,data)=>{
        if(err){
            return next(err)
        }
        else{
            res.json(data)
        }
    })
})

router.route('/create').post((req,res)=>{
    bookService.create(req.body,(err,data)=>{
      if (err){
         return next(err)
        }else{
             res.json(data)
        }
})
})


router.route('/find/:id').get((req,res)=> {
     bookService.findById(req.params.id,(err, data)=> {
        if(err){
            return next(err)
        } 
         else{res.json(data);
        } 
    
    })
})

router.route('/update/:id').put((req,res)=> {
     bookService.findByIdAndUpdate(req.params.id,req.body,(err, data)=> {
        if(err){
            return next(err)
        } 
         else{res.json(data);
        } 
    
    })
})

router.route('/delete/:id').delete((req,res)=> {
     bookService.findByIdAndDelete(req.params.id,(err, data)=> {
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
