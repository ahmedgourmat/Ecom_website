const routes = require('express').Router()
const {createProduct , getProducts , updateProduct , deletedProduct} = require('../controllers/ProductControllers')
const Joi = require('joi')
const validateRequest = require('../middleware/joiValidation')


const createProductSchema = Joi.object().keys({
    nameP: Joi.string().min(3).required(),
    desc: Joi.string().min(20).required(),
    quantity: Joi.number().min(0).required(),
    price : Joi.number().min(10).required(),
    size : Joi.array().required(),
    colors : Joi.array().required(),
    promo : Joi.boolean().required()
});

routes.route('/').post(createProduct).get(getProducts)
routes.route('/:id').patch(updateProduct).delete(deletedProduct)


module.exports = routes