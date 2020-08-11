const mongoose = require('mongoose');
const validator = require('validator');

const listProductSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    cartName: {
        type: String,
        required: true,
        trim: true
    },
    cartPrice: {
        type: Number,
        required: true
    },
    cartQuantity: {
        type: Number,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})


const ListProduct = mongoose.model('ListProduct', listProductSchema);


module.exports = ListProduct