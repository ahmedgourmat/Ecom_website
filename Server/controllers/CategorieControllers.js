const Categorie = require('../models/Categories')

const createCategorie = async(req , res)=>{

    const {name} = req.body

    try {

        if(!name){
            throw Error('Please enter the categorie name')
        }

        const cat = await Categorie.findOne({name})

        if(cat){
            throw Error('This categorie is already existe')
        }

        const data = await Categorie.create({name})

        res.status(200).json(data)
        
    } catch (error) {
        res.status(500).json({error : error.message})
    }

}

const deleteCategorie = async(req , res)=>{
    
    const catId = req.params

    try {
        
        const data = await Categorie.findByIdAndDelete(catId)

        if(!data){
            res.status(404).json({message : '404 Not found'})
        }

        res.status(200).json({message : 'You have deleted it successfully'})

    } catch (error) {
        res.status(500).json({error : error.message})
    }

}

const getCategories = async(req , res)=>{
    
    const name = req.query

    try {
        
        const data = await Categorie.find({name})

        if(!data){
            res.status(404).json({message : '404 Not found'})
        }

        res.status(200).json(data)

    } catch (error) {
        res.status(500).json({error : error.message})
    }
}



module.exports = {
    createCategorie ,
    deleteCategorie ,
    getCategories
}
