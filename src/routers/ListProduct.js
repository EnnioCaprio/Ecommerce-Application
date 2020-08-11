const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ListProduct = require('../models/ListProduct');

const auth = require('../middleware/auth');

router.post('/addProduct', auth, async (req, res) => {
    try{
        const listProduct = new ListProduct({
            _id: mongoose.Types.ObjectId(),
            cartName: req.body.cartName,
            cartPrice: req.body.cartPrice,
            cartQuantity: req.body.cartQuantity,
            owner: req.user._id
        })
        await listProduct.save();
        res.send({
            message: 'Product added to the list',
            listProduct: {
                _id: listProduct._id,
                cartName: listProduct.cartName,
                cartPrice: listProduct.cartPrice,
                cartQuantity: listProduct.cartQuantity,
                owner: listProduct.owner
            } 
        })
    }catch(e){
        res.status(400).send({
            message: e
        })
    }
})



router.get('/', auth, async (req, res) => {
    try{
        await req.user.populate('listProducts').execPopulate();
        res.send(req.user.listProducts)         
    }catch(e){
        res.status(404).send(e)
    }
})

router.delete('/:id', async (req, res) => {
    const _id = req.params.id;

    try{
        const product = await ListProduct.findByIdAndDelete(_id)
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
        const products = await ListProduct.deleteMany()
        res.send({
            message: 'deleted all products',
            products
        })
    }catch(e){
        res.status(500).send()
    }
})


module.exports = router