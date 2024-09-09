const Contact = require('../models/Contact')

const createContact = async(req , res)=>{

    const userId = req.user
    const {message} = req.body


    try {
        
        await Contact.create({user : userId , message})

        res.status(201).json({message : "Created Successfully"})

    } catch (error) {
        res.status(500).json({error : error.message})
    }

}


const createReply = async(req , res)=>{

    const {contactId} = req.params
    const {reply} = req.body

    try {
        await Contact.findByIdAndUpdate(contactId , {reply , replied : true})
        res.status(201).json({message : "Updated Successfully"})
    } catch (error) {
        res.status(500).json({error : error.message})
    }

}

const getContact = async(req , res)=>{

    const {replied} = req.query

    const query = {}

    if(replied){
        query['replied'] = replied === 'true'
    }

    try {

        const data = await Contact.find(query).populate('user')

        res.status(200).json(data)
        
    } catch (error) {
        res.status(500).json({error : error.message})
    }

}

const getContactByUser = async(req , res)=>{

    const userId = req.user

    try {
        const data = await Contact.find({user : userId}).populate('user')

        res.status(200).json(data)

    } catch (error) {
        res.status(500).json({error : error.message})
    }

}

const deleteContact = async(req , res)=>{

    const {contactId} = req.params

    try {

        await Contact.findByIdAndDelete(contactId)

        res.status(200).json({message : "Deleted Successfully"})
        
    } catch (error) {
        res.status(500).json({error : error.message})
    }

}


module.exports = {
    createContact ,
    getContact , 
    deleteContact ,
    getContactByUser ,
    createReply
}