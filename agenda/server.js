// Variaveis de ambiente
require('dotenv').config()

// Iniciação do app express
const express = require('express')
const app = express()
// Trabalhar com caminhos
const path = require('path')
// Dxa a aplicação mais segura
const helmet = require('helmet')
// Token dos form
const csurf = require('csurf')
// Modelar a bd e garantir que os dados que serão salvo na bd serão realmente da forma que quero salvar
const mongoose = require('mongoose')
mongoose.connect(process.env.CONNECTIONSTRING).then(() => {
  app.emit('Pronto')
}).catch(e => console.error(e))
// Guardar a sessão nos cookies do navegador do user
const session = require('express-session')
// Informa que as sessões serão salva dentro do bd pra nn salvar na memoria
const MongoStore = require('connect-mongo')
// Mensagens auto-destrutivas, assim que é lida(executada) não vai mais existir, sem sessão essas msg nn irão funcionar
const flash = require('connect-flash')
// Rotas da aplicação
const routes = require('./routes')
// Middlewares, funções que são executadas na rota
const { middlewareGlobal, middlewareSec, checkCsrfError, CsrfMiddleware } = require('./src/middlewares/middleware')
// Pode postar formularios pra dentro da aplicação
app.use(express.urlencoded({ extended: true }))
// Pode fazer o PARSE de JSON pra dentro da aplicação
app.use(express.json())
// Todos os arquivos estaticos que podem ser acessados diretamente, tais como, img, css, js
app.use(express.static(path.resolve(__dirname, 'public')))
app.use(helmet())
app.use(helmet.referrerPolicy({policy: ["origin", "unsafe-url"]}));


const sessionOptions = session({
  secret: 'texto q ninguem vai saber',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7, // Cookie de 7 dias
    httpOnly: true
  },
  store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING })
})

app.use(sessionOptions)
app.use(flash())
// Arquivos que são renderizados na tela
app.set('views', path.resolve(__dirname, 'src', 'views'))
// O motor que esta sendo utilizado para rendezir o html
app.set('view engine', 'ejs')

app.use(csurf())
// Middlewares
app.use(middlewareGlobal)
app.use(middlewareSec)
app.use(checkCsrfError)
app.use(CsrfMiddleware)
// Chamando as rotas
app.use(routes)
// Coloca pra escutar as coisas, no caso liga a aplicação
app.on('Pronto', () => {
  app.listen(3000, () => {
    console.log('Acessar: http://localhost:3000')
  })
})
