/* Routes for posts */

const express = require('express');
const router = express.Router();
const Post = require('../models/Post')

router.get('/', async (req, res, next)=>{
    try{
        const result = await Post.findAll(req.query);
        return res.json(result)
    } catch(e){
        next(e)
    }
})

router.get('/:id', async (req, res, next)=>{
    try{
        const result = await Post.findOne(req.params.id);

        return res.json(result)
    } catch(e){
        next(e);
    }
})

router.post('/', async (req, res, next)=>{
    try{
        const result = await Post.create(req.body)
        return res.json(result)
    }catch(e){
        next(e)
    }
})

router.put('/:id', async (req, res, next)=>{
    try{
        const result = await Post.update(req.body, req.params.id);
        return res.json(result);
    } catch (e){
        next(e)
    }
})

router.delete('/:id', async (req, res, next)=>{
    try {
        const result = await Post.delete(req.params.id)
        return res.json(result);
    } catch (e){
        next(e)
    }
})

module.exports = router;