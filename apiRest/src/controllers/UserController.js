import User from '../models/User'

class UserController {
  async store (req, res) {
    try {
      const novoUser = await User.create(req.body)
      res.json(novoUser)
    } catch (e) {
      res.status(400).json({
        errors: e.errors.map((err) => err.message)
      })
    }
  }
  // Index
  async index (req, res) {
    try {
      const users = await User.findAll()
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
      res.json(user)
      // eslint-disable-next-line no-unused-vars
    } catch (e) {
      return res.json(null)
    }
  }
  // Update
  async update (req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          errors: ['ID não enviado']
        })
      }
      const user = await User.findByPk(req.params.id)

      if (!user) {
        return res.status(400).json({
          errors: ['Usuario não existe']
        })
      }
      await user.update(req.body)
      res.json(user)
    } catch (e) {
      res.status(400).json({
        errors: e.errors.map((err) => err.message)
      })
    }
  }
  // Delete
  async delete (req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          errors: ['ID não enviado']
        })
      }
      const user = await User.findByPk(req.params.id)

      if (!user) {
        return res.status(400).json({
          errors: ['Usuario não existe']
        })
      }
      await user.destroy()
      res.json(user)
    } catch (e) {
      res.status(400).json({
        errors: e.errors.map((err) => err.message)
      })
    }
  }
}
export default new UserController()