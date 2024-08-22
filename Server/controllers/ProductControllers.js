const Product = require('../models/Product')
const uploadImage = require('../utils/uploadImages')


const createProduct = async(req,res)=>{

    const {
        nameP ,
        desc , 
        quantity , 
        price ,
        img ,
        categorie , 
        size , 
        colors ,
        promo ,
        promoPrice
    } = req.body


    try {

        console.log(req.body)

        console.log({nameP ,
            desc , 
            quantity , 
            price ,
            img ,
            categorie , 
            size , 
            colors ,
            promo ,
            promoPrice})

        if(img){
            await uploadImage(img)
            .then((url)=>{
                img = url
            })
            .catch((err)=>{
                throw Error(err)
            })
        }

        const data = await Product.create({ 
            nameP ,
            desc , 
            quantity , 
            price ,
            img,
            categorie , 
            size , 
            colors ,
            promo ,
            promoPrice
        })

        res.status(201).json(data)

        
    } catch (error) {
        res.status(500).json({error : error.message})
    }


}

const getProducts = async (req, res) => {

    const { nameP, categorie, promo, size, colors } = req.query;

    const query = {};

    if (nameP) {
        query['nameP'] = { $regex: nameP, $options: 'i' };
    }

    if (categorie) {
        query['categorie'] = categorie;
    }

    if (promo) {
        query['promo'] = promo === 'true';
    }

    if (size) {
        query['size'] = size; // Exact match for size
    }

    if (colors) {
        query['colors'] = colors ; // Partial match for color
    }

    try {
        const data = await Product.find(query);

        if (!data || data.length === 0) {
            throw new Error('No products found');
        }

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const updateProduct = async(req,res)=>{

}

const deletedProduct = async(req,res)=>{

}


module.exports = {
    createProduct ,
    getProducts , 
    updateProduct ,
    deletedProduct
}