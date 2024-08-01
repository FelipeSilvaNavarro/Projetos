/**
 * Configuração e inicialização de um servidor Express com integração MongoDB,
 * middleware para sessões, proteção CSRF, entre outras funcionalidades.
 * O código conecta o banco de dados, configura middleware para manipulação de dados, 
 * segurança e define as rotas da aplicação.
 * 
 * @param {*} req - Objeto de solicitação HTTP
 * @param {*} res - Objeto de resposta HTTP
 * @returns Inicia o servidor na porta 3000
 */

// Carrega as variáveis de ambiente do arquivo .env
require('dotenv').config()

// Iniciação do app Express
const express = require('express')
const app = express()
// Trabalhar com caminhos de arquivos e diretórios
const path = require('path')
// Token de proteção CSRF dos FORM da aplicação
const csurf = require('csurf')
/*
* Modelagem e conexão com o banco de dados MongoDB
* Conexão com o banco de dados MongoDB usando Mongoose.
*/
const mongoose = require('mongoose')
mongoose.connect(process.env.CONNECTIONSTRING)
  .then(() => {
    app.emit('Pronto')  // Emite um sinal quando a conexão com o banco de dados estiver pronta
  })
  .catch((e) => console.error(e))
// Guardar a sessão nos cookies do navegador do user
const session = require('express-session')
// Armazenamento de sessão no MongoDB
const MongoStore = require('connect-mongo')
// Mensagens auto-destrutivas
const flash = require('connect-flash')
// Rotas da aplicação, importadas de outro arquivo
const routes = require('./routes')
// Middlewares personalizados, importados de outro arquivo
const {
  middlewareGlobal,
  middlewareSec,
  checkCsrfError,
  CsrfMiddleware,
} = require('./src/middlewares/middleware')
// Permite o envio de dados através de formulários
app.use(express.urlencoded({ extended: true }))
// Permite a manipulação de JSON na aplicação
app.use(express.json())
// Define a pasta de arquivos estáticos (imagens, CSS, JavaScript, etc.)
app.use(express.static(path.resolve(__dirname, 'public')))
// Configuração das opções de sessão, incluindo a utilização do MongoDB para armazenar as sessões.
const sessionOptions = session({
  secret: 'texto q ninguem vai saber',  // Segredo usado para assinar a sessão
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7, // Cookie válido por 7 dias
    httpOnly: true,  // Protege contra ataques XSS
  },
  store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),  // Armazena a sessão no MongoDB
})
// Aplicação das configurações de sessão à aplicação
app.use(sessionOptions)
// Configuração do middleware para exibição de mensagens temporárias.
app.use(flash())
// Define a pasta onde os templates de views estão localizados
app.set('views', path.resolve(__dirname, 'src', 'views'))
// Configura o motor de templates EJS
app.set('view engine', 'ejs')

app.use(csurf())  // Ativa a proteção contra CSRF
// Registro dos middlewares globais e de segurança
app.use(middlewareGlobal)
app.use(middlewareSec)
app.use(checkCsrfError)
app.use(CsrfMiddleware)
// Usa as rotas definidas em outro arquivo
app.use(routes)
// Inicia o servidor na porta 3000 após a conexão com o banco de dados estar pronta
app.on('Pronto', () => {
  app.listen(3000, () => {
    console.log('Acessar: http://localhost:3000')
  })
})
