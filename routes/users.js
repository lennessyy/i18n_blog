/* Routes for users */

const express = require('express');
const router = express.Router();
const User = require('../models/User')
const createToken = require('../helpers/createToken')

router.post('/', async (req, res, next)=>{
    try{
        let data = req.body;
        const result = await User.register(data);
        const token = createToken(result)
        return res.status(201).json({token});
    } catch(e){
        return next(e)
    }
})

router.post('/authenticate', async (req, res, next)=>{
    try{
        let data = req.body
        const result = await User.authenticate(data)
        const token = createToken(result)
        return res.status(200).json({token});
    } catch(e){
        return next(e)
    }
})

router.get('/:id', async (req, res, next)=>{
    try{
        let id = req.params.id
        const result = await User.findOne(id)
        return res.json(result)
    }catch(e){
        return next(e)
    }
})

router.get("/", async (req, res, next)=>{
    try{
        const result = await User.findAll()
        return res.json(result)
    } catch(e){
        next(e)
    }
})

router.put('/:id', async (req, res, next)=>{
    try{
        let id = req.params.id
        let data = req.body
        const result = await User.update(id, data)
        return res.json(result)
    }catch(e){
        return next(e)
    }
})

router.delete('/:id', async (req, res, next)=>{
    try{
        let id = req.params.id
        const result = await User.delete(id)

        if (result){
            return res.json({message: "Delete success"})
        } else {
            return res.json({message: "User not found"})
        }
    } catch(e){
        return next(e)
    }
})

module.exports = router;