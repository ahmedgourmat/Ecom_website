const Admin = require('../models/Admin')
const bcrypt = require('bcrypt')
const createToken = require('../utils/createToken')
const hashingFun = require('../utils/hashThePassword')


const createAdmin = async(req , res)=>{

    const {
        name ,
        email ,
        password ,
        location ,
        numTel , 
        role
    } = req.body

    try {
        
        const existe = await Admin.findOne({email})

        if(existe){
            throw Error('This email already existe')
        }

        console.log('here')

        const hashPassword = await hashingFun(password)
        console.log(hashPassword)


        let admin = await Admin.create({
            name ,
            email ,
            password : hashPassword ,
            location ,
            numTel , 
            role
        })


        console.log('here')

        const token = createToken(admin._id)

        console.log('here')


        admin = await Admin.findById(admin._id).select('-password')

        console.log('here')


        res.status(201).json({admin , token})
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

        const existe = await Admin.findOne({email})

        if(!existe){
            throw Error('Invalid email or password')
        }

        const match = await bcrypt.compare(password , existe.password)

        if(!match){
            throw Error('Invalid email or password')
        }

        const token = createToken(existe._id)

        const admin = await Admin.findById(existe._id).select('-password')

        res.status(201).json(token)
        
    } catch (error) {
        res.status(500).json({error : error.message})
    }


}


const updateAdmin = async(req , res)=>{

    const adminId = req.params

    const {
        name , 
        email , 
        password , 
        location , 
        numTel
    } = req.body

    try {


        const admin = await Admin.findById(adminId)

        if(!admin){
            throw Error('There is no admin with this id to update')
        }

        const updatedData = {
            name : name ? name : admin.name , 
            email : email ? email : admin.email, 
            password : password ? hashingFun(password) : admin.password, 
            location : location ? location : admin.location, 
            numTel : numTel ? numTel : admin.numTel
        }

        await Admin.findByIdAndUpdate(adminId ,updatedData )
        
        res.status(200).json({message : 'Your Information has updated seccussfully'})

    } catch (error) {
        res.status(500).json({error : error.message})
    }


}



module.exports = {
    createAdmin ,
    login , 
    updateAdmin
}