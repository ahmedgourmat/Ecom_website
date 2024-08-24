const routes = require('express').Router()
const {createCategorie , deleteCategorie , getCategories} = require('../controllers/CategorieControllers')
const adminAuthMiddleware = require('../middleware/adminAuthMiddleware')

routes.route('/').get(getCategories).post(adminAuthMiddleware ,createCategorie)
routes.route('/:catId').delete(adminAuthMiddleware , deleteCategorie)



module.exports = routes