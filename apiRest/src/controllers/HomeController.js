import Aluno from '../models/Aluno'

class HomeController {
  async index (req, res) {
    const novoAluno = await Aluno.create({
      nome: 'Maria',
      sobrenome: 'tadinha',
      email: 'maria@hotmail.com',
      idade: 56,
      peso: 27,
      altura: 1.56
    })
    res.json(novoAluno)
  }
}
// Pra enviar instanciado so colocar o new e os ()
export default new HomeController()