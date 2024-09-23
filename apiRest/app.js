import express from 'express'
import homeRouter from './src/routes/homeRoutes'
import userRouter from './src/routes/UserRoutes'
import dotenv from 'dotenv'
import './src/database'
dotenv.config()
class app {
  constructor() {
    // Sempre que chamar o APP, chama esses 3 métodos
    this.app = express()
    this.middlewares()
    this.routes()
  }
  middlewares () {
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(express.json())
  }
  routes () {
    this.app.use('/', homeRouter) // '/' É a home e chamou o homeRouter
    this.app.use('/users/', userRouter) //
  }
}
// Ja exportou instanciando pra nn precisar instaciar na hora do import
export default new app().app