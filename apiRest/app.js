import express from 'express'
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

  }
}
export default new App().App