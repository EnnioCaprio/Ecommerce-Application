const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/Product');

router.post('/createProduct', async (req, res) => {
    try{
        const product = new Product({
            _id: mongoose.Types.ObjectId(),
            name: req.body.name,
            price: req.body.price,
            quantity: req.body.quantity
        })
        await product.save();
        res.send({
            message: 'Product created',
            product: {
                _id: product._id,
                name: product.name,
                price: product.price,
                quantity: product.quantity
            } 
        })
    }catch(e){
        res.status(400).send(e)
    }
})



router.get('/', async (req, res) => {
    try{
        const products = await Product.find();
        res.send(products)         
    }catch(e){
        res.status(404).send(e)
    }
})

router.patch('/:id', async (req, res) => {
    const _id = req.params.id;
    console.log(_id)
    const arrayFilter = ['name', 'price', 'quantity'];
    const keys = Object.keys(req.body);
    const isOk = keys.every(a => arrayFilter.includes(a))
    if(!isOk){
        res.status(404).send({
            message: 'error, there are some not permitted inputs'
        })
    }
    
    try{
        const product = await Product.findByIdAndUpdate(_id, req.body, {new: true, runValidators: true});
        console.log(_id)
        res.send(product)
    }catch(e){
        res.status(500).send({
            message: "error, didn't update"
        })
    }
})

router.delete('/:id', async (req, res) => {
    const _id = req.params.id;

    try{
        const product = await Product.findByIdAndDelete(_id)
        res.send({
            message: 'product deleted',
            product
        })
    }catch(e){
        res.status(500).send()
    }
})



router.delete('/', async (req, res) => {
    try{
        const products = await Product.deleteMany()
        res.send({
            message: 'deleted all products',
            products
        })
    }catch(e){
        res.status(500).send()
    }
})


module.exports = router