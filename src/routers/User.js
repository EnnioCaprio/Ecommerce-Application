const User = require('../models/User');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth'); 
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');


router.post('/registration', async (req, res) => {

    try{
    const user = new User({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 10),
        wallet: req.body.wallet,
        active: req.body.wallet.active,
        amount: req.body.wallet.amount,
        totalSpent: 0,
        boughtProducts: []
    })
        await user.save();
        res.send(user)
    }catch(e){
        res.status(400).send(e)
    }

})

router.post('/login', async (req, res) => {
    const email = req.body.email;

    try{
    const user = await User.findOne({ email })
    
    if(!user){
        res.status(404).send('User email or password not correct')
    }

    const password = user.password;

    const verifyPassword = await bcrypt.compare(req.body.password, password);
    if(!verifyPassword){
        res.status(404).send('User email or password not correct')
    }

    const jwtToken = jwt.sign({_id: user._id}, 'thisiscode')

    console.log(jwtToken)

    res.send(jwtToken)
    
    }catch(e){
        res.status(404).send(e)
    }

})

router.patch('/:id', auth, async (req, res) => {
    const id = req.params.id;
    const arrayFilter = ['wallet', 'totalSpent', 'boughtProducts'];
    const keys = Object.keys(req.body);
    const isValid = keys.every(k => arrayFilter.includes(k));

    if(!isValid){
        res.status(404).send({
            message: "Couldn't update the wallet"
        })
    }

    try{    
        const user = await User.findByIdAndUpdate(id, req.body, {new: true, runValidators: true})
        res.send(user)
    }catch(e){
        res.status(500).send({
            message: "Error Network"
        })
    }

})

router.get('/me', auth, async (req, res) => {
    try{
        res.send(req.user)
    }catch(e){
        res.status(404).send({
            message: 'No information'
        });
    }
})

router.get('/', async (req, res) => {
    try{
        const users = await User.find({});
        res.send({
            message: 'users',
            users
        })
    }catch(e){
        res.status(404).send({
            message: 'no users'
        })
    }   
})



module.exports = router;