const routes = require('express').Router()
const {createProduct , getProducts , getProductById , updateProduct , deletedProduct} = require('../controllers/ProductControllers')
const Joi = require('joi')
const validateRequest = require('../middleware/joiValidation')
const adminAuthMiddleware = require('../middleware/adminAuthMiddleware')



routes.route('/').post(adminAuthMiddleware ,createProduct).get(getProducts)
routes.route('/:productId').patch(adminAuthMiddleware ,updateProduct).delete(adminAuthMiddleware ,deletedProduct).get(getProductById)


module.exports = routes