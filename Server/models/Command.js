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
            }
        }
    ],
    delivery: {
        type: Number, 
        required: true
    },
    codePromo: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Command = mongoose.model('Command', CommandSchema);

module.exports = Command;
