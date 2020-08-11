const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
    
    try{
        const headerT = req.headers['authorization'].split(" ")[1];
        const verifiedToken = jwt.verify(headerT, process.env.TOKEN_SECRET);
        const user = await User.findOne({_id:verifiedToken._id});
        if(!user){
            res.status(403).send({
                message: 'Not authorized'
            })
        }
        req.user = user;
        next();
    }catch(e){
        res.status(500).send(e)
    }
}