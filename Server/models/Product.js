const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    nameP : {
        type : String,
        required : true
    },
    desc : {
        type : String , 
        required : true
    },
    quantity : {
        type : Number , 
        required : true
    },
    price : {
        type : Number ,
        required : true
    },
    img : {
        type : String,
        // required : true
    },
    categorie : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Categorie',
        // required : true
    },
    sizes : [
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
        type : Number 
    },
    reviews : {
        type : Number , 
        default : 0
    }
},{timestamps : true})



const Product = mongoose.model('Product' , ProductSchema)

module.exports = Product