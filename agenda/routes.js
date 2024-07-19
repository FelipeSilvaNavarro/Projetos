const express = require('express')
const route = express.Router()
const homeController = require('./src/controllers/homeController')
module.exports = route
// Rotas da home
route.get('/', homeController.index)