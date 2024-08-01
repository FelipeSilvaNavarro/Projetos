/**
 * Controlador para gerenciar as operações relacionadas aos contatos.
 * O controlador inclui uma função para buscar e exibir todos os contatos na página inicial.
 */

const Contato = require('../models/contatoModel') // Interage com o modelo de Contato para operações relacionadas a contatos

/**
 * Busca todos os contatos e renderiza a página inicial com os contatos encontrados.
 * @param {Object} req - Objeto da requisição.
 * @param {Object} res - Objeto da resposta.
 * @returns {void} Redireciona para a página inicial com a lista de contatos.
 */
exports.index = async function (req, res) {
  try {
    const contatos = await Contato.buscaContatos() // Busca todos os contatos do banco de dados usando o método estático buscaContatos
    res.render('index', { contatos }) // Renderiza a página inicial passando a lista de contatos para a visualização
  } catch (e) {
    console.error(e) // Loga o erro no console caso ocorra
    res.render('404') // Renderiza a página de erro 404 em caso de falha
  }
}
