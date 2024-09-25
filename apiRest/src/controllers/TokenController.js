import User from '../models/User'
import jwt from 'jsonwebtoken'
class TokenController {
  async store (req, res) {
    const { email = '', password = '' } = req.body
    // Ter a ctz q tem valor no email e na senha
    if (!email || !password) {
      return res.status(401).json({
        errors: [ 'Credenciais inválidas' ],
      })
    }
    const user = await User.findOne({ where: { email: email } })
    // Se o email que for recebido nn existir um usuario com esse mesmo email recebido, o usuario nn existe
    if (!user) {
      return res.status(401).json({
        errors: [ 'Usuario nn existe' ],
      })
    }
    // Se a senha do usuario NÃO for válida, retorna um erro de senha inválida
    if (!(await user.passwordIsValid(password))) {
      return res.status(401).json({
        errors: [ 'Senha inválida' ],
      })
    }
    const { id } = user
    const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION
    })
    res.json({token})
  }
}
// Pra enviar instanciado so colocar o new e os ()
export default new TokenController()