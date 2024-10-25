import Aluno from '../models/Aluno'
import Foto from '../models/Foto'
class AlunoController {
  async index (req, res) {
    const alunos = await Aluno.findAll({
      // Para mostrar a foto associada
      attributes: [ 'id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura', ],
      order: [ [ 'id', 'DESC' ], [ Foto, 'id', 'DESC' ] ],
      include: {
        model: Foto,
        attributes: [ 'url','filename' ]
      }
    })
    res.json(alunos)
  }
  async store (req, res) {
    try {
      const aluno = await Aluno.create(req.body)
      return res.json(aluno)
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map(err => err.message)
      })
    }
  }
  async show (req, res) {
    try {
      const { id } = req.params
      if (!id) {
        return res.status(400).json({
          errors: [ 'Falta ID' ]
        })
      }
      const aluno = await Aluno.findByPk(id, {
        attributes: [ 'id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura', ],
        order: [ [ 'id', 'DESC' ], [ Foto, 'id', 'DESC' ] ],
        include: {
          model: Foto,
          attributes: [ 'url','filename' ]
        }
      })
      const { nome, sobrenome, email, idade, peso, altura, Fotos } = aluno
      if (!aluno) {
        return res.status(400).json({
          errors: [ 'Aluno não existe' ]
        })
      }
      // Passando essas verificações pode exibir o aluno pois tem-se a certeza de que o aluno existe
      return res.json({ nome, sobrenome, email, idade, peso, altura, Fotos })
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map(err => err.message)
      })
    }
  }
  async update (req, res) {
    try {
      const { id } = req.params
      if (!id) {
        return res.status(400).json({
          errors: [ 'Falta ID' ]
        })
      }
      const aluno = await Aluno.findByPk(req.params.id)
      if (!aluno) {
        return res.status(400).json({
          errors: [ 'Aluno não existe' ]
        })
      }
      const novosDados = await aluno.update(req.body)
      const { nome, sobrenome, email, idade, peso, altura } = novosDados
      return res.json({ nome, sobrenome, email, idade, peso, altura })
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map(err => err.message)
      })
    }
  }
  async delete (req, res) {
    try {
      const { id } = req.params
      if (!id) {
        return res.status(400).json({
          errors: [ 'Falta ID' ]
        })
      }
      const aluno = await Aluno.findByPk(req.params.id)
      if (!aluno) {
        return res.status(400).json({
          errors: [ 'Aluno não existe' ]
        })
      }
      await aluno.destroy()
      return res.json({
        apagado: true
      })
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map(err => err.message)
      })
    }
  }
}
// Pra enviar instanciado so colocar o new e os ()
export default new AlunoController()