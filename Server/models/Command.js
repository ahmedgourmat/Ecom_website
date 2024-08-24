const mongoose = require('mongoose');

const CommandSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            color : {
                type : String ,
                required : true
            },
            size : {
                type : String ,
                required : true
            }
        }
    ],
    delivery: {
        type: Number, 
        required: true
    },
    confirm: {
        type : Boolean,
        default : false
    },
    totalPrice : Number,
    retour : {
        type : Boolean , 
        default : false
    }
}, { timestamps: true });

const Command = mongoose.model('Command', CommandSchema);

module.exports = Command;
