/* Routes for users */

const express = require('express');
const router = express.Router();
const User = require('../models/User')

router.post('/', async (req, res, next)=>{
    try{
        let data = req.body;
        const result = await User.register(data);
        return res.staus(201).json(result);
    } catch(e){
        return next(e)
    }
})

module.exports = router;