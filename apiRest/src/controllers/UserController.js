import User from '../models/User'

class UserController {
  async store (req, res) {
    try {
      const novoUser = await User.create(req.body)
      const { id, nome, email } = novoUser
      // Fazendo destructor pra retornar somente o json do id, nome e email
      res.json({ id, nome, email })
    } catch (e) {
      res.status(400).json({
        errors: e.errors.map((err) => err.message)
      })
    }
  }
  // Index
  async index (req, res) {
    try {
      const users = await User.findAll({ attributes: [ 'id', 'nome', 'email' ] }) // Estes campos que serão exibidos no index
      console.log('USER ID', req.userId)
      console.log('USER EMAIL', req.userEmail)

      res.json(users)
      // eslint-disable-next-line no-unused-vars
    } catch (e) {
      return res.json(null)
    }
  }
  // Show
  async show (req, res) {
    try {
      const user = await User.findByPk(req.params.id)
      const { id, nome, email } = user
      res.json({ id, nome, email })
      // eslint-disable-next-line no-unused-vars
    } catch (e) {
      return res.json(null)
    }
  }
  // Update
  async update (req, res) {
    try {
      const user = await User.findByPk(req.userId)

      if (!user) {
        return res.status(400).json({
          errors: [ 'Usuario não existe' ]
        })
      }
      const novosDados = await user.update(req.body)
      const { id, nome, email } = novosDados
      res.json({id,nome, email})
    } catch (e) {
      res.status(400).json({
        errors: e.errors.map((err) => err.message)
      })
    }
  }
  // Delete
  async delete (req, res) {
    try {
      const user = await User.findByPk(req.userId)

      if (!user) {
        return res.status(400).json({
          errors: [ 'Usuario não existe' ]
        })
      }
      await user.destroy()
      res.json(null)
    } catch (e) {
      res.status(400).json({
        errors: e.errors.map((err) => err.message)
      })
    }
  }
}
export default new UserController()