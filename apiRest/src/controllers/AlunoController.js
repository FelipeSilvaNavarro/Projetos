// eslint-disable-next-line no-unused-vars
import Aluno from '../models/Aluno'

class AlunoController {
  async index (req, res) {
    res.json('Ok')
  }
}
// Pra enviar instanciado so colocar o new e os ()
export default new AlunoController()