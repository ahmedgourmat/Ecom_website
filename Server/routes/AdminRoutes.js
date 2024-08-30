const router = require('express').Router()
const {createAdmin , login , updateAdmin} = require('../controllers/AdminControllers')
const Joi = require('joi')
const validateRequest = require('../middleware/joiValidation')
const adminAuthMiddleware = require('../middleware/adminAuthMiddleware')


const signupSchema = Joi.object().keys({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    numTel : Joi.string().min(10).required(),
    location: Joi.string().min(3).required(),
    role : Joi.string().min(3).required()
});


const loginSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
});


router.route('/signup').post(validateRequest(signupSchema),createAdmin)
router.route('/login').post(validateRequest(loginSchema),login)
router.route('/:userId').patch(adminAuthMiddleware,updateAdmin)

module.exports = router