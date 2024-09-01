const Product = require('../models/Product')
const uploadImage = require('../utils/uploadImages')


const createProduct = async (req, res) => {
    const {
        nameP,
        desc,
        quantity,
        price,
        img,
        categorie,
        sizes,
        colors,
        promo,
        promoPrice
    } = req.body;


    let image = img;

    try {

        if (img) {
            image = await uploadImage(img);
        }

        const data = await Product.create({
            nameP,
            desc,
            quantity,
            price,
            img: image,
            sizes,
            colors,
            promo,
            promoPrice
        });

        console.log('here is the data', data);

        res.status(201).json(data);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getProducts = async (req, res) => {

    const { nameP, categorie, promo, size, colors } = req.query;

    const query = {};

    console.log(req.query)

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
        query['size'] = size;
    }

    if (colors) {
        query['colors'] = colors ;
    }

    try {

        console.log(query)

        const data = await Product.find(query)

        // if (!data || data.length === 0) {
        //     throw new Error('No products found');
        // }

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const updateProduct = async(req,res)=>{

    const productId = req.params

    const {
        nameP ,
        desc , 
        quantity , 
        price ,
        img ,
        categorie , 
        size , 
        color ,
        promo ,
        promoPrice
    } = req.body
    

    try {

        const product = await Product.findById(productId)

        if(!product){
            res.status(404).json({message : 'There is no product with this id'})
        }


        if(img){
            await uploadImage(img)
            .then((url)=>{
                img = url
            })
            .catch((err)=>{
                throw Error(err)
            })
        }



        const updatedData = {
            nameP : nameP ? nameP : product.nameP , 
            desc : desc ? desc : product.desc, 
            quantity : quantity ? quantity : product.quantity, 
            price : price ? price : product.price, 
            img : img ? img : product.img,
            categorie : categorie ? categorie : product.categorie,
            promo : promo ? promo : product.promo,
            promoPrice : promoPrice ? promoPrice : product.promoPrice , 
            sizes : size ? [...product.sizes , size] : product.sizes ,
            colors : color ? [...product.sizes , size] : product.sizes
        }

        const data = await Product.findByIdAndUpdate(productId , updatedData)

        res.status(200).json(data)
        
    } catch (error) {
        res.status(500).json({error : error.message})
    }


}

const deletedProduct = async(req,res)=>{

    const porductId = req.params

    try {
        
        const product = await Product.findByIdAndDelete(productId)

        if(!product){
            res.status(404).json({message : '404 Not found'})
        }

        res.status(200).json({message : 'You have deleted this product successfully'})

    } catch (error) {
        res.status(500).josn({error : error.message})
    }

}

const getProductById = async(req,res)=>{

    const productId = req.params
    

    try {

        const data = await Product.findById(productId)

        if(!data){
            res.status(404).json({message : '404 data not found'})
        }

        res.status(200).json(data)
        
    } catch (error) {
        res.status(500).json({error : error.message})
    }

}



module.exports = {
    createProduct ,
    getProducts , 
    updateProduct ,
    deletedProduct , 
    getProductById
}