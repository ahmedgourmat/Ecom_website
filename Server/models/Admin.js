const mongoose = require('mongoose')
const User = require('./User')


const AdminSchema = new mongoose.Schema({
    role: {
        type: String,
        default: 'Admin',
        required: true
    }
})


const Admin = User.discriminator('Admin', AdminSchema)

module.exports = Admin