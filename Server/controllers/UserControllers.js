const User = require('../models/User')
const bcrypt = require('bcrypt')
const createToken = require('../utils/createToken')
const hashingFun = require('../utils/hashThePassword')


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

        

        const hashPassword = await hashingFun(password)

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

    const { numTel, email } = req.query;

    const users = {};

   
    if (numTel) {
        users['numTel'] = { $regex: numTel, $options: 'i' };
    }

    
    if (email) {
        users['email'] = { $regex: email, $options: 'i' };
    }


    try {
        

        const data = await User.find(users)

        if (!data || data.length === 0) {
            throw Error('There is no data here');
        }

        res.status(200).json(data)

    } catch (error) {
        res.status(500).json({error : error.message})
    }


}


const updateUser = async(req , res)=>{

    const userId = req.params

    const {
        name , 
        email , 
        password , 
        location , 
        numTel
    } = req.body

    try {


        const user = await User.findById(userId)

        if(!user){
            throw Error('There is no user with this id to update')
        }

        const updatedData = {
            name : name ? name : user.name , 
            email : email ? email : user.email, 
            password : password ? hashingFun(password) : user.password, 
            location : location ? location : user.location, 
            numTel : numTel ? numTel : user.numTel
        }

        await User.findByIdAndUpdate(userId ,updatedData )

        res.status(200).json({message : 'Your Information has updated seccussfully'})
        
    } catch (error) {
        res.status(500).json({error : error.message})
    }


}


const deleteUser = async(req , res)=>{

    const userId = req.params

    try {
        const user = await User.findById(userId)

        if(!user){
            throw Error('There is no user with this id to delete')
        }

        await User.findByIdAndDelete(userId)

        res.status(201).json('You have successfully deleted this user')
        
    } catch (error) {
        res.status(500).json({error : error.message})
    }


}



module.exports = {signup , login , getUsers , updateUser , deleteUser}