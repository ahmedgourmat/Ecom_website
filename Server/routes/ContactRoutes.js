const router = require('express').Router()
const {createContact , getContact , deleteContact , getContactByUser , createReply} = require('../controllers/ContactControllers')
const Joi = require('joi')
const validateRequest = require('../middleware/joiValidation');
const adminAuthMiddleware = require('../middleware/adminAuthMiddleware');
const authMiddleware = require('../middleware/authMiddlewre')


const contactSchema = Joi.object().keys({
    message: Joi.string().min(10).required(),
});


router.route('/').post(authMiddleware , validateRequest(contactSchema),createContact).get(adminAuthMiddleware , getContact)
router.route('/:contactId').delete(adminAuthMiddleware ,deleteContact).patch(adminAuthMiddleware ,createReply)
router.route('/user').get(authMiddleware , getContactByUser)

module.exports = router