const routes = require('express').Router()
const {createProduct , getProducts , getProductById , updateProduct , deletedProduct} = require('../controllers/ProductControllers')
const Joi = require('joi')
const validateRequest = require('../middleware/joiValidation')
const adminAuthMiddleware = require('../middleware/adminAuthMiddleware')


const createProductSchema = Joi.object().keys({
    nameP: Joi.string().min(3).required(),
    desc: Joi.string().min(20).required(),
    quantity: Joi.number().min(0).required(),
    price : Joi.number().min(10).required(),
    sizes : Joi.array().required(),
    colors : Joi.array().required(),
    promo : Joi.boolean().required()
});

routes.route('/').post(adminAuthMiddleware ,validateRequest(createProductSchema) ,createProduct).get(getProducts)
routes.route('/:productId').patch(adminAuthMiddleware ,updateProduct).delete(adminAuthMiddleware ,deletedProduct).get(getProductById)


module.exports = routes