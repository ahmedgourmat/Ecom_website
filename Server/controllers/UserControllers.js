const User = require('../models/User')
const bcrypt = require('bcrypt')
const createToken = require('../utils/createToken')


const signup = async(req , res)=>{

    const {
        name ,
        email ,
        password ,
        location ,
        numTel
    } = req.body

    try {
        
        const existe = await User.findOne({email})

        if(existe){
            throw Error('This email already existe')
        }

        const salt = await bcrypt.genSalt(10)

        const hashPassword = await bcrypt.hash(password , salt)

        let user = await User.create({
            name ,
            email ,
            password : hashPassword ,
            location ,
            numTel
        })

        const token = createToken(user._id)

        user = await User.findById(user._id).select('-password')

        res.status(201).json({user , token})
    } catch (error) {
        res.status(500).json({error : error.message})
    }


}


const login = async(req , res)=>{

    const {
        email ,
        password
    } = req.body


    try {

        const existe = await User.findOne({email})

        if(!existe){
            throw Error('Invalid email or password')
        }

        const match = await bcrypt.compare(password , existe.password)

        if(!match){
            throw Error('Invalid email or password')
        }

        const token = createToken(existe._id)

        const user = await User.findById(existe._id).select('-password')

        res.status(201).json({user , token})
        
    } catch (error) {
        res.status(500).json({error : error.message})
    }


}


const getUsers = async(req , res)=>{

    const search = req.query

    

}


const updateUser = async(req , res)=>{

}


const deleteUser = async(req , res)=>{

}



module.exports = {signup , login , getUsers , updateUser , deleteUser}