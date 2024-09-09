const mongoose = require('mongoose')


const ContactSchema = new mongoose.Schema({

    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User' ,
        required : true
    },
    message : {
        type : String ,
        required : true
    },
    reply : {
        type : String,
    },
    replied : {
        type : Boolean , 
        default : false
    }

},{timestamps : true})



const Contact = mongoose.model('Contact' , ContactSchema)

module.exports = Contact