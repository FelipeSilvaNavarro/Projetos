/**
 * Define as rotas da aplicação, vinculando URLs às funções dos controladores.
 * Gerencia as rotas principais de home, login e contato.
 * Utiliza middlewares para proteger rotas que exigem autenticação.
 */


const express = require('express'); // Importa o módulo Express
const route = express.Router(); // Cria uma instância do roteador do Express

// Importa os controladores responsáveis pelas funcionalidades das rotas
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const contatoController = require('./src/controllers/contatoController');

// Importa o middleware que verifica se o usuário está autenticado
const { loginRequired } = require('./src/middlewares/middleware');

// Rotas da home
route.get('/', homeController.index); // Rota para a página inicial, manipulada pelo método `index` do `homeController`

// Rotas de login
route.get('/login/index', loginController.index); // Rota para a página de login, manipulada pelo método `index` do `loginController`
route.post('/login/register', loginController.register); // Rota para o registro de novos usuários, manipulada pelo método `register` do `loginController`
route.post('/login/login', loginController.login); // Rota para o login de usuários, manipulada pelo método `login` do `loginController`
route.get('/login/logout', loginController.logout); // Rota para o logout de usuários, manipulada pelo método `logout` do `loginController`

// Rotas de contato
route.get('/contato/index', loginRequired, contatoController.index); // Rota para a página de contatos, acessível somente por usuários autenticados, manipulada pelo método `index` do `contatoController`
route.post('/contato/register', loginRequired, contatoController.register); // Rota para registrar um novo contato, acessível somente por usuários autenticados, manipulada pelo método `register` do `contatoController`
route.get('/contato/index/:id', loginRequired, contatoController.editIndex); // Rota para editar um contato específico, acessível somente por usuários autenticados, manipulada pelo método `editIndex` do `contatoController`
route.post('/contato/edit/:id', loginRequired, contatoController.edit); // Rota para atualizar um contato específico, acessível somente por usuários autenticados, manipulada pelo método `edit` do `contatoController`
route.get('/contato/delete/:id', loginRequired, contatoController.delete); // Rota para excluir um contato específico, acessível somente por usuários autenticados, manipulada pelo método `delete` do `contatoController`

module.exports = route; // Exporta o roteador para ser usado em outras partes da aplicação
