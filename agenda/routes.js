const express = require('express')
const route = express.Router()
const homeController = require('./src/controllers/homeController')
const loginController = require('./src/controllers/loginController')
const contatoController = require('./src/controllers/contatoController')

const { loginRequired } = require('./src/middlewares/middleware')
// Rotas da home
route.get('/', homeController.index)
// Rotas de login
route.get('/login/index', loginController.index)
route.post('/login/register', loginController.register)
route.post('/login/login', loginController.login)
route.get('/login/logout', loginController.logout)
// Rotas de contato
route.get('/contato/index', loginRequired, contatoController.index) // Como eu quero q essa pagina so esteja acessivel pra quem estiver logado, eu coloco o middleware no meio do caminho, olhar middleware ln 22
route.post('/contato/register',loginRequired, contatoController.register)
route.get('/contato/index/:id',loginRequired, contatoController.editIndex)
route.post('/contato/edit/:id',loginRequired, contatoController.edit)

module.exports = route