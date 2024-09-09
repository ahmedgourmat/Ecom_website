const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String , 
        required : true
    },
    password : {
        type : String,
        required : true
    },
    location : {
        type : String , 
        required : true
    },
    numTel : {
        type : String ,
        required : true
    },
    likedProduct : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'Product'
    }
},{timestamps : true})



const User = mongoose.model('User' , UserSchema)

module.exports = User