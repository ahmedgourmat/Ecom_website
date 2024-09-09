const routes = require('express').Router()
const {createCommand , confirmCommand , getCommands , updateCommand , deleteCommand, getCommandForUser} = require('../controllers/CommandControllers')
const Joi = require('joi')
const validateRequest = require('../middleware/joiValidation')
const authMiddleware = require('../middleware/authMiddlewre')
const adminAuthMiddleware = require('../middleware/adminAuthMiddleware')


// const createCommandSchema = Joi.object().keys({
//     products : Joi.array().required(),
//     delivery : Joi.number().min(0).required()
// });

routes.route('/').post(authMiddleware  ,createCommand).get(adminAuthMiddleware , getCommands)
routes.route('/:commandId').patch(authMiddleware , updateCommand).delete(authMiddleware , deleteCommand)
routes.route('/confirm/:commandId').patch(adminAuthMiddleware ,confirmCommand)
routes.route('/user').get(authMiddleware , getCommandForUser)


module.exports = routes