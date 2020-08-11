const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        trim: true,
        required: true,
        max: 255
    },
    email: {
        type: String,
        trim: true,
        required: true,
        max: 255,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Not acceptable email format')
            }
        }
    },
    password: {
        type: String,
        trim: true,
        required: true,
        max: 255,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('password cannot contain itself')
            }
        }
    },
    wallet: [{
        active: {
            type: Boolean
        },
        amount: {
            type: Number,
            validator(value){
                if(value < 0){
                    throw new Error("Amount cannot be less than 0 euro")
                }
            }
        }
    }],
    totalSpent: {
        type: Number
    },
    boughtProducts: [{
        type: Object
    }]
}, {
    timestamps: {
        type: Date,
        default: Date.now
    }
})



userSchema.virtual('listProducts', {
    ref: 'ListProduct',
    localField: '_id',
    foreignField: 'owner'
})

const User = mongoose.model('User', userSchema);

module.exports = User;