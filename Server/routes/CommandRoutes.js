const routes = require('express').Router()
const {createCommand , confirmCommand , getCommands , updateCommand , deleteCommand} = require('../controllers/CommandControllers')
const Joi = require('joi')
const validateRequest = require('../middleware/joiValidation')


const createCommandSchema = Joi.object().keys({
    colors : Joi.array().required(),
    delivery : Joi.number().min(0).required()
});

routes.route('/').post(validateRequest(createCommandSchema) ,createProduct).get(getProducts)
routes.route('/:productId').patch(updateProduct).delete(deletedProduct).get(getProductById)


module.exports = routes