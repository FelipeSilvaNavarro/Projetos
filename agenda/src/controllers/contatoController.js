/**
 * Controlador para gerenciar as operações relacionadas aos contatos.
 * O controlador inclui funções para renderizar a página de contato, registrar, editar e deletar contatos.
 * Interage com o modelo de Contato para operações relacionadas a contatos.
 */
const Contato = require('../models/contatoModel') // Interage com o modelo de Contato para operações relacionadas a contatos

/**
 * Renderiza a página de contato com um objeto de contato vazio.
 * @param {Object} req - Objeto da requisição.
 * @param {Object} res - Objeto da resposta.
 * @returns {void} Renderiza a página de contato.
 */
exports.index = (req, res) => {
  res.render('contato', {
    contato: {}, // Passa um objeto de contato vazio para a visualização
  })
}

/**
 * Registra um novo contato.
 * @param {Object} req - Objeto da requisição contendo os dados do contato.
 * @param {Object} res - Objeto da resposta.
 * @returns {void} Redireciona para a página de contato ou para a página inicial do contato registrado.
 */
exports.register = async (req, res) => {
  try {
    const contato = new Contato(req.body) // Cria uma nova instância do Contato com os dados do corpo da requisição
    await contato.register() // Registra o contato no banco de dados

    if (contato.errors.length > 0) {
      req.flash('errors', contato.errors) // Adiciona erros à sessão
      req.session.save(() => res.redirect('/contato/index')) // Redireciona para a página de contato
      return
    }

    req.flash('success', 'Contato cadastrado') // Adiciona mensagem de sucesso à sessão
    req.session.save(() =>
      res.redirect(`/contato/index/${contato.contato._id}`) // Redireciona para a página do contato recém-criado
    )
  } catch (e) {
    console.log(e) // Loga o erro no console
    return res.render('404') // Renderiza a página de erro 404 em caso de falha
  }
}

/**
 * Renderiza a página de edição de um contato existente.
 * @param {Object} req - Objeto da requisição contendo o ID do contato a ser editado.
 * @param {Object} res - Objeto da resposta.
 * @returns {void} Renderiza a página de contato com os dados do contato a ser editado ou erro 404.
 */
exports.editIndex = async function (req, res) {
  if (!req.params.id) return res.render('404') // Se o parâmetro do ID não for enviado, retorna 404

  const contato = await Contato.buscaPorId(req.params.id) // Busca o contato pelo ID

  if (!contato) return res.render('404') // Se o contato não existir, retorna 404

  res.render('contato', { contato }) // Renderiza a página de contato com os dados do contato
}

/**
 * Edita um contato existente.
 * @param {Object} req - Objeto da requisição contendo o ID do contato e os novos dados.
 * @param {Object} res - Objeto da resposta.
 * @returns {void} Redireciona para a página anterior ou para a página de erro 404.
 */
exports.edit = async function (req, res) {
  if (!req.params.id) return res.render('404') // Se o parâmetro do ID não for enviado, retorna 404

  const contato = new Contato(req.body) // Cria uma nova instância do Contato com os dados do corpo da requisição
  await contato.edit(req.params.id) // Atualiza o contato no banco de dados

  try {
    if (contato.errors.length > 0) {
      req.flash('errors', contato.errors) // Adiciona erros à sessão
      req.session.save(() => res.redirect(req.get('referer'))) // Redireciona para a página anterior
      return
    }

    req.flash('success', 'Contato editado') // Adiciona mensagem de sucesso à sessão
    req.session.save(() => res.redirect(req.get('referer'))) // Redireciona para a página anterior
  } catch (e) {
    console.log(e) // Loga o erro no console
    res.render('404') // Renderiza a página de erro 404 em caso de falha
  }
}

/**
 * Deleta um contato existente.
 * @param {Object} req - Objeto da requisição contendo o ID do contato a ser deletado.
 * @param {Object} res - Objeto da resposta.
 * @returns {void} Redireciona para a página anterior ou para a página de erro 404.
 */
exports.delete = async function (req, res) {
  if (!req.params.id) return res.render('404') // Se o parâmetro do ID não for enviado, retorna 404

  const contato = await Contato.delete(req.params.id) // Deleta o contato pelo ID

  if (!contato) return res.render('404') // Se o contato não for encontrado, retorna 404

  req.flash('success', 'Contato apagado') // Adiciona mensagem de sucesso à sessão
  req.session.save(() => res.redirect(req.get('referer'))) // Redireciona para a página anterior
}
