const routes = require('express').Router()
const {createCategorie , deleteCategorie , getCategories} = require('../controllers/CategorieControllers')

routes.route('/').get(getCategories).post(createCategorie)
routes.route('/:catId').delete(deleteCategorie)



module.exports = routes