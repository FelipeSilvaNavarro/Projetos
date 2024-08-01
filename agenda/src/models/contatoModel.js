const mongoose = require('mongoose');
const validator = require('validator');
const contatoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  sobrenome: { type: String, required: true, default: '' },
  email: { type: String, required: true, default: '' },
  telefone: { type: String, required: true, default: '' },
  criadoEm: { type: Date, default: Date.now },
});
const contatoModel = mongoose.model('contato', contatoSchema);

function Contato(body) {
  this.body = body;
  this.errors = [];
  this.contato = null;
}

Contato.prototype.register = async function () {
  this.valida();
  if (this.errors.length > 0) return;
  this.contato = await contatoModel.create(this.body);
};
Contato.prototype.valida = function () {
  this.cleanUp();
  // Validação
  // Email precisa ser válida
  if (this.body.email && !validator.isEmail(this.body.email))
    this.errors.push('E-mail inválido');
  if (!this.body.nome) this.errors.push('Nome é um campo obrigatorio'); // Se nn tiver nome lança um erro
  if (!this.body.email && !this.body.telefone)
    this.errors.push('Email ou telefone precisa ser enviado');
};
Contato.prototype.cleanUp = function () {
  for (const key in this.body) {
    if (typeof this.body[key] !== 'string') {
      this.body[key] = '';
    }
  }
  this.body = {
    nome: this.body.nome,
    sobrenome: this.body.sobrenome,
    email: this.body.email,
    telefone: this.body.telefone,
  };
};
Contato.prototype.edit = async function (id) {
  if (typeof id !== 'string') return;
  this.valida();
  if (this.errors.length > 0) return;
  // Se chegar até aqui significa que pode editar o contato que foi criado
  this.contato = await contatoModel.findByIdAndUpdate(id, this.body, {
    new: true,
  }); // Quando atualizar o contato, retorna os dados att, e nn os old
};
// Funções estaticas
Contato.buscaPorId = async function (id) {
  // Verifica se o id recebido é uma String
  if (typeof id !== 'string') return;
  const contato = await contatoModel.findById(id);
  return contato;
};
Contato.buscaContatos = async function () {
  const contatos = await contatoModel.find().sort({ criadoEm: 1 }); // Organiza pela ordem de criação de forma decrescente
  return contatos;
};
Contato.delete = async function (id) {
  if (typeof id !== 'string') return;
  const contato = await contatoModel.findOneAndDelete({_id: id}); // Ja procura por ID e deleta
  return contato; // Retorna o contato deletado
};

module.exports = Contato;
