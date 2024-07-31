const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');
const LoginSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});
const LoginModel = mongoose.model('Login', LoginSchema);
class Login {
  constructor(body) {
    this.body = body; // Pega o body do loginController ln 6
    // Sempre validar pois nunca confiar no que o usuario digita no form
    // Se tiver algum erro dentro do array, não pode cadastrar o usuario na base de dados
    this.errors = [];
    this.user = null;
  }
  async register() {
    // É async pq sempre que trabalha com bd, se trabalha com promise pois retorna promise
    this.valida();
    if (this.errors.length > 0) return; // Se o array de erro nn estiver vazio, encerra
    await this.userExists();
    if (this.errors.length > 0) return;
    const salt = bcryptjs.genSaltSync();
    this.body.password = bcryptjs.hashSync(this.body.password, salt); // Fznd um hash da senha no bd, baseado no valor da senha e do salt
    this.user = await LoginModel.create(this.body); // Pode lançar desse jeito pois pode confiar que os dados já vai estar limpos
  }
  async login() {
    this.valida();
    if (this.errors.length > 0) return;
    this.user = await LoginModel.findOne({ email: this.body.email }); // Checa se o usuario existe no bd
    if (!this.user) {
      this.errors.push('Usuario não existe'); // Se o user nn existe, retrona um erro
      return;
    }
    if (!bcryptjs.compareSync(this.body.password, this.user.password)) {
      // Se o user existir, compara as senhas
      this.errors.push('Senha inválida');
      this.user = null;
      return;
    }
  }
  async userExists() {
    this.user = await LoginModel.findOne({ email: this.body.email }); // Verifica se o email q ta no bd é igual ao email no body
    if (this.user) this.errors.push('Usuario existente'); // Se ja tem um usuario lança um erro
  }
  valida() {
    this.cleanUp();
    // Validação
    // Email precisa ser válida
    if (!validator.isEmail(this.body.email))
      this.errors.push('E-mail inválido'); // Se nn for um email valido, lança um erro no array
    // Senha precisa estar entre 3-50
    if (this.body.password.length < 3 || this.body.password.length >= 50)
      this.errors.push('A senha precisa ter entre 3 e 50 caracteres');
  }
  cleanUp() {
    // Garantir que tudo que esta dentro do body é string e tira o CSRF
    for (const key in this.body) {
      if (typeof this.body[key] !== 'string') {
        this.body[key] = ''; // Se tiver algo q nn é uma string, converte pra uma string vazia
      }
    }
    // Tira o CSRF
    this.body = {
      email: this.body.email,
      password: this.body.password,
    };
  }
}
module.exports = Login;
