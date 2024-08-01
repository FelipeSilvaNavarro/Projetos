/**
 * Define o modelo de Contato e as operações relacionadas, utilizando Mongoose para interagir com o banco de dados MongoDB.
 * O modelo inclui validação de dados, criação, edição, busca e exclusão de contatos.
 * Campos do contato incluem nome, sobrenome, email, telefone e data de criação.
 */

// Imports
const mongoose = require('mongoose') // Interage com Mongoose para operações de banco de dados
const validator = require('validator') // Utilizado para validação de email

// Definição do esquema do modelo Contato no Mongoose
const contatoSchema = new mongoose.Schema({
  nome: { type: String, required: true }, // Nome é um campo obrigatório
  sobrenome: { type: String, required: true, default: '' }, // Sobrenome é um campo obrigatório, com valor padrão vazio
  email: { type: String, required: true, default: '' }, // Email é um campo obrigatório, com valor padrão vazio
  telefone: { type: String, required: true, default: '' }, // Telefone é um campo obrigatório, com valor padrão vazio
  criadoEm: { type: Date, default: Date.now }, // Data de criação do contato
})

// Criação do modelo Contato no Mongoose
const contatoModel = mongoose.model('contato', contatoSchema) // Interage com o esquema definido para operações CRUD

/**
 * Cria uma instância de Contato.
 * @param {Object} body - O corpo da requisição que contém informações do contato.
 */
function Contato (body) {
  this.body = body // Recebe o corpo da requisição do contatoController
  this.errors = [] // Armazena erros de validação
  this.contato = null // Armazena o contato criado ou atualizado
}

/**
 * Registra um novo contato no banco de dados, após validação.
 * @returns {Promise<void>}
 */
Contato.prototype.register = async function () {
  this.valida() // Valida os dados do contato
  if (this.errors.length > 0) return // Encerra se houver erros de validação
  this.contato = await contatoModel.create(this.body) // Cria o contato no banco de dados, interage com contatoModel
}

/**
 * Valida os dados do contato fornecido, garantindo que o email seja válido e que o nome e contato sejam fornecidos.
 */
Contato.prototype.valida = function () {
  this.cleanUp() // Limpa os dados do corpo da requisição
  // Validação
  // Email precisa ser válido
  if (this.body.email && !validator.isEmail(this.body.email))
    this.errors.push('E-mail inválido') // Se o email for inválido, adiciona um erro
  if (!this.body.nome) this.errors.push('Nome é um campo obrigatorio') // Se não tiver nome, adiciona um erro
  if (!this.body.email && !this.body.telefone)
    this.errors.push('Email ou telefone precisa ser enviado') // Se nem email nem telefone forem fornecidos, adiciona um erro
}

/**
 * Limpa os dados do corpo da requisição, garantindo que todos os campos sejam strings.
 */
Contato.prototype.cleanUp = function () {
  for (const key in this.body) {
    if (typeof this.body[ key ] !== 'string') {
      this.body[ key ] = '' // Converte valores não-string para string vazia
    }
  }
  this.body = {
    nome: this.body.nome,
    sobrenome: this.body.sobrenome,
    email: this.body.email,
    telefone: this.body.telefone,
  }
}

/**
 * Edita um contato existente no banco de dados, identificando-o pelo ID fornecido.
 * @param {string} id - O ID do contato a ser editado.
 * @returns {Promise<void>}
 */
Contato.prototype.edit = async function (id) {
  if (typeof id !== 'string') return // Verifica se o ID é uma string
  this.valida() // Valida os dados do contato
  if (this.errors.length > 0) return // Encerra se houver erros de validação
  this.contato = await contatoModel.findByIdAndUpdate(id, this.body, {
    new: true, // Retorna os dados atualizados
  }) // Interage com o modelo Contato para atualizar um contato existente
}

// Funções estáticas

/**
 * Busca um contato pelo ID.
 * @param {string} id - O ID do contato a ser buscado.
 * @returns {Promise<Object|null>} O contato encontrado ou null se não existir.
 */
Contato.buscaPorId = async function (id) {
  if (typeof id !== 'string') return // Verifica se o ID é uma string
  const contato = await contatoModel.findById(id) // Interage com o modelo Contato para buscar um contato pelo ID
  return contato
}

/**
 * Busca todos os contatos, ordenando-os pela data de criação.
 * @returns {Promise<Array>} Lista de contatos ordenados pela data de criação.
 */
Contato.buscaContatos = async function () {
  const contatos = await contatoModel.find().sort({ criadoEm: 1 }) // Interage com o modelo Contato para buscar todos os contatos, ordenando pela data de criação
  return contatos
}

/**
 * Exclui um contato pelo ID.
 * @param {string} id - O ID do contato a ser excluído.
 * @returns {Promise<Object|null>} O contato excluído ou null se não existir.
 */
Contato.delete = async function (id) {
  if (typeof id !== 'string') return // Verifica se o ID é uma string
  const contato = await contatoModel.findOneAndDelete({ _id: id }) // Interage com o modelo Contato para deletar um contato pelo ID
  return contato // Retorna o contato excluído
}

module.exports = Contato // Exporta a função Contato para uso em outras partes da aplicação
