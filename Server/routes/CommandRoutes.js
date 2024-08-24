const routes = require('express').Router()
const {createCommand , confirmCommand , getCommands , updateCommand , deleteCommand} = require('../controllers/CommandControllers')
const Joi = require('joi')
const validateRequest = require('../middleware/joiValidation')
const authMiddleware = require('../middleware/authMiddlewre')
const adminAuthMiddleware = require('../middleware/adminAuthMiddleware')


const createCommandSchema = Joi.object().keys({
    colors : Joi.array().required(),
    delivery : Joi.number().min(0).required()
});

routes.route('/').post(authMiddleware , validateRequest(createCommandSchema) ,createCommand).get(adminAuthMiddleware , getCommands)
routes.route('/:productId').patch(authMiddleware , updateCommand).delete(authMiddleware , deleteCommand)
routes.route('/confirm/:productId').patch(adminAuthMiddleware ,confirmCommand)


module.exports = routes