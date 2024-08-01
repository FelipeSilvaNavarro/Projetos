/**
 * Gerencia o login e o registro de usuários, realizando validação dos dados,
 * criptografia de senhas e operações com o banco de dados. Utiliza Mongoose 
 * para interagir com o MongoDB e bcryptjs para a criptografia de senhas.
 * 
 * @module Login
 */

// Importa o módulo Mongoose para interação com o banco de dados MongoDB
const mongoose = require('mongoose') // Interage com Mongoose para operações de banco de dados

// Importa o módulo validator para validação de dados
const validator = require('validator') // Utilizado para validação de e-mails

// Importa o módulo bcryptjs para criptografia de senhas
const bcryptjs = require('bcryptjs') // Utilizado para criptografar senhas

// Define o esquema do modelo Login no Mongoose
const LoginSchema = new mongoose.Schema({
  email: { type: String, required: true }, // O e-mail é obrigatório
  password: { type: String, required: true }, // A senha é obrigatória
})

// Cria o modelo Login a partir do esquema definido
const LoginModel = mongoose.model('Login', LoginSchema) // Interage com o esquema definido para operações CRUD

/**
 * Classe que gerencia o login e o registro de usuários.
 * 
 * @class
 */
class Login {
  /**
   * Cria uma instância de Login.
   * @param {Object} body - O corpo da requisição que contém email e senha.
   */
  constructor(body) {
    this.body = body // Recebe o corpo da requisição do loginController
    this.errors = [] // Armazena erros de validação
    this.user = null // Armazena o usuário autenticado ou registrado
  }

  /**
   * Registra um novo usuário no sistema, após validar os dados e verificar se o usuário já existe.
   * @returns {Promise<void>}
   */
  async register () {
    this.valida() // Valida os dados fornecidos
    if (this.errors.length > 0) return // Se houver erros, encerra
    await this.userExists() // Verifica se o usuário já existe
    if (this.errors.length > 0) return // Se houver erros após verificação, encerra

    const salt = bcryptjs.genSaltSync() // Gera um salt para criptografia
    this.body.password = bcryptjs.hashSync(this.body.password, salt) // Criptografa a senha
    this.user = await LoginModel.create(this.body) // Cria o usuário no banco de dados
  }

  /**
   * Realiza o login de um usuário existente, validando os dados e comparando a senha fornecida com a armazenada.
   * @returns {Promise<void>}
   */
  async login () {
    this.valida() // Valida os dados fornecidos
    if (this.errors.length > 0) return // Se houver erros, encerra

    this.user = await LoginModel.findOne({ email: this.body.email }) // Busca o usuário pelo e-mail
    if (!this.user) {
      this.errors.push('Usuário não existe') // Se o usuário não existir, adiciona um erro
      return
    }
    if (!bcryptjs.compareSync(this.body.password, this.user.password)) {
      // Compara a senha fornecida com a senha armazenada
      this.errors.push('Senha inválida') // Se a senha estiver incorreta, adiciona um erro
      this.user = null // Limpa o usuário
      return
    }
  }

  /**
   * Verifica se o usuário com o e-mail fornecido já existe no banco de dados.
   * @returns {Promise<void>}
   */
  async userExists () {
    this.user = await LoginModel.findOne({ email: this.body.email }) // Busca o usuário pelo e-mail
    if (this.user) this.errors.push('Usuário existente') // Se o usuário já existir, adiciona um erro
  }

  /**
   * Valida os dados fornecidos pelo usuário, garantindo que o e-mail seja válido e que a senha tenha um tamanho adequado.
   */
  valida () {
    this.cleanUp() // Limpa os dados fornecidos
    // Validação
    // O e-mail precisa ser válido
    if (!validator.isEmail(this.body.email))
      this.errors.push('E-mail inválido') // Se o e-mail não for válido, adiciona um erro
    // A senha precisa estar entre 3 e 50 caracteres
    if (this.body.password.length < 3 || this.body.password.length >= 50)
      this.errors.push('A senha precisa ter entre 3 e 50 caracteres') // Se a senha não atender aos critérios, adiciona um erro
  }

  /**
   * Limpa os dados do corpo da requisição, garantindo que todos os campos sejam strings e remove informações desnecessárias.
   */
  cleanUp () {
    // Garante que todos os campos são strings e remove o CSRF token
    for (const key in this.body) {
      if (typeof this.body[ key ] !== 'string') {
        this.body[ key ] = '' // Converte valores não-string para string vazia
      }
    }
    // Remove o CSRF token do corpo da requisição
    this.body = {
      email: this.body.email,
      password: this.body.password,
    }
  }
}

// Exporta a classe Login para uso em outras partes da aplicação
module.exports = Login // Permite que a classe Login seja utilizada em outros módulos
