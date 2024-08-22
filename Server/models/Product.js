const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    desc : {
        type : String , 
        required : true
    },
    price : {
        type : Number ,
        required : true
    },
    img : {
        type : String,
        required : true
    },
    categorie : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Categorie',
        required : true
    },
    size : [
        {
            type : String ,
            required : true
        }
    ],
    colors : [
        {
            type : String ,
            required : true
        }
    ],
    promo : {
        type : Boolean ,
        required : true
    },
    promoPrice : {
        type : Number , 
        required : true
    },
    reviews : [
        {
            type : Number 
        }
    ]
},{timestamps : true})



const Product = mongoose.model('Product' , ProductSchema)

module.exports = Product