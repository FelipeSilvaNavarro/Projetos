import express from 'express'
import homeRouter from './src/routes/homeRoutes'
import dotenv from 'dotenv'
import './src/database'
dotenv.config()
class App {
  constructor() {
    // Sempre que chamar o APP, chama esses 3 métodos
    this.App = express()
    this.middlewares()
    this.routes()
  }
  middlewares () {
    this.App.use(express.urlencoded({ extended: true }))
    this.App.use(express.json())
  }
  routes () {
    this.App.use('/', homeRouter) // / É a home e chamou o homeRouter
  }
}
// Ja exportou instanciando pra nn precisar instaciar na hora do import
export default new App().App